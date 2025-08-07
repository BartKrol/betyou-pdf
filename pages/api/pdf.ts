import { NextApiRequest, NextApiResponse } from "next";
import { format } from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res
      .status(400)
      .json({ error: "Missing or invalid token parameter" });
  }

  let browser = null;

  try {
    console.log(
      "Starting PDF generation for token:",
      token.substring(0, 10) + "..."
    );

    // Use different launch configuration based on environment
    // if (process.env.NODE_ENV === "production") {
    // Production: use puppeteer-core with @sparticuz/chromium
    const puppeteerCore = await import("puppeteer-core");
    const chromium = await import("@sparticuz/chromium");

    browser = await puppeteerCore.default.launch({
      args: [
        ...chromium.default.args,
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
        "--disable-web-security",
        "--allow-running-insecure-content",
      ],
      defaultViewport: chromium.default.defaultViewport,
      executablePath: await chromium.default.executablePath(),
      headless: chromium.default.headless,
    });
    // } else {
    //   // Development: use regular puppeteer with bundled Chromium
    //   const puppeteer = await import("puppeteer");

    //   browser = await puppeteer.default.launch({
    //     args: [
    //       "--no-sandbox",
    //       "--disable-setuid-sandbox",
    //       "--disable-dev-shm-usage",
    //       "--disable-accelerated-2d-canvas",
    //       "--no-first-run",
    //       "--no-zygote",
    //       "--disable-gpu",
    //     ],
    //     headless: true,
    //   });
    // }

    const page = await browser.newPage();

    // Set up console logging from the page
    page.on("console", (msg) => {
      console.log("PAGE LOG:", msg.text());
    });

    // Set up error logging from the page
    page.on("pageerror", (err) => {
      console.log("PAGE ERROR:", err.message);
    });

    // Set up request failure logging
    page.on("requestfailed", (req) => {
      console.log("REQUEST FAILED:", req.url(), req.failure()?.errorText);
    });

    // Set user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"
    );

    // Get the base URL for the current request
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    const targetUrl = `${baseUrl}?token=${token}`;

    console.log("Navigating to:", targetUrl);

    // Navigate to the main page with the token
    const response = await page.goto(targetUrl, {
      waitUntil: "networkidle0",
      timeout: 45000,
    });

    if (!response || response.status() !== 200) {
      throw new Error(
        `Failed to load page - Status: ${response?.status()} ${
          response?.statusText() ?? "Unknown Error"
        }`
      );
    }

    console.log("Page loaded successfully, status:", response.status());

    // Wait for the content to be ready by checking if the main content is loaded
    await page.waitForFunction(
      () => {
        const content = document.querySelector('div[class*="space-y-4"]');
        const loading = document.querySelector('div[class*="spinner-border"]');
        const error = document
          .querySelector("div")
          ?.textContent?.includes("error");

        // Return true if content is loaded and not in loading or error state
        return content && !loading && !error;
      },
      { timeout: 30000 }
    );

    // Additional check to ensure the page has actual content
    const hasContent = await page.evaluate(() => {
      const content = document.querySelector('div[class*="space-y-4"]');
      const tables = document.querySelectorAll("table");
      const text = document.body.textContent || "";

      return (
        content &&
        (tables.length > 0 || text.includes("BetYou Account Statement"))
      );
    });

    if (!hasContent) {
      throw new Error(
        "Page loaded but content is not available - GraphQL query might have failed"
      );
    }

    console.log("Content verification passed, generating PDF...");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm",
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
    });

    await browser.close();

    console.log("PDF generated successfully, size:", pdf.length, "bytes");

    // Set response headers for PDF download
    const filename = `${format(
      new Date(),
      "yyyy-MM-dd"
    )}-account-statement.pdf`;

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": pdf.length.toString(),
      "Cache-Control": "no-cache",
    });

    return res.end(pdf);
  } catch (error) {
    console.error("PDF generation error:", error);

    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }

    return res.status(500).json({
      error: "Failed to generate PDF",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
