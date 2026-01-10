export default function ApiDocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        API Documentation
      </h1>

      {/* Introduction */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Getting Started
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The AI Bet GPT API provides programmatic access to our AI-powered sports betting predictions.
          Subscribe to an API tier to get your API key and start making requests.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Base URL:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">https://aibetgpt.com/api</code>
          </p>
        </div>
      </div>

      {/* Authentication */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Authentication
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          All API requests require authentication using your API key. Include your API key in the request header:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
          <code className="text-sm text-gray-800 dark:text-gray-200">
{`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
          </code>
        </pre>
      </div>

      {/* Rate Limiting */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Rate Limiting
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Requests/Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 text-gray-900 dark:text-white">Starter</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">10,000</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">$49/mo</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-900 dark:text-white">Professional</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">50,000</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">$149/mo</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-900 dark:text-white">Enterprise</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">200,000</td>
                <td className="px-6 py-4 text-gray-900 dark:text-white">$499/mo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Endpoints - Simplified for space */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          API Endpoints
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Full documentation with code examples available in the developer portal after subscribing to an API tier.
        </p>
      </div>
    </div>
  );
}
