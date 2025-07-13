import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { format } from 'date-fns';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid token parameter' });
  }

  let browser = null;
  
  try {
    // Launch Puppeteer browser
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    
    // Set user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
    );

    // Get the base URL for the current request
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const baseUrl = `${protocol}://${host}`;
    
    // Navigate to the main page with the token
    const response = await page.goto(`${baseUrl}?token=${token}`, { 
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    if (!response || response.status() !== 200) {
      throw new Error(`Failed to load page - ${response?.statusText() ?? 'Unknown Error'}`);
    }

    // Generate PDF
    const pdf = await page.pdf({ 
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      }
    });

    await browser.close();

    // Set response headers for PDF download
    const filename = `${format(new Date(), 'yyyy-MM-dd')}-account-statement.pdf`;
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdf.length);
    
    return res.send(pdf);

  } catch (error) {
    console.error('PDF generation error:', error);
    
    if (browser) {
      await browser.close();
    }
    
    return res.status(500).json({ 
      error: 'Failed to generate PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}