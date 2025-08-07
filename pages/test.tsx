import { useState } from "react";
import { gql, request } from "graphql-request";

const TestQuery = gql`
  query AccountStatement {
    me {
      id
      firstName
      lastName
    }
    accountStatement {
      payments {
        id
        type
        method
        time
        amount
        status
      }
      wagers {
        id
        time
        amount
        betId
        betType
        eventTime
        resolveTime
        result
        name
        choice
        state
      }
    }
  }
`;

export default function Test() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testApi = async () => {
    if (!token) {
      setError("Please enter a token");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      console.log("Testing API at:", apiUrl);
      console.log("With token:", token.substring(0, 10) + "...");

      const auth = `Bearer ${token}`;
      const data = await request(
        apiUrl,
        TestQuery,
        {},
        new Headers({ authorization: auth })
      );

      console.log("API test successful:", data);
      setResult(data);
    } catch (err) {
      console.error("API test failed:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">GraphQL API Test</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Token:</label>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your token here"
        />
      </div>

      <button
        onClick={testApi}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Testing..." : "Test API"}
      </button>

      <div className="mt-6">
        <div className="text-sm text-gray-600 mb-2">
          API URL:{" "}
          {process.env.NEXT_PUBLIC_API_URL ||
            "http://localhost:4000 (fallback)"}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <strong>Success!</strong> API is working correctly.
            <details className="mt-2">
              <summary className="cursor-pointer">View Response</summary>
              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
