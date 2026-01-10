'use client';

import { useState } from 'react';

const API_ENDPOINTS = [
  {
    method: 'POST',
    path: '/api/v1/analyze',
    description: 'Generate AI-powered betting analysis for a specific match',
    auth: true,
    params: [
      { name: 'sport', type: 'string', required: true, description: 'Sport identifier (nfl, nba, epl, etc.)' },
      { name: 'query', type: 'string', required: true, description: 'Natural language query about the match' },
      { name: 'matchDetails', type: 'object', required: false, description: 'Additional match information' },
    ],
    example: {
      request: `curl -X POST https://api.aibet-gpt.com/api/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sport": "nfl",
    "query": "Should I bet on the Patriots vs Bills game?",
    "matchDetails": {
      "homeTeam": "Patriots",
      "awayTeam": "Bills"
    }
  }'`,
      response: `{
  "success": true,
  "data": {
    "prediction": "Bills are favored to win",
    "confidence": 78,
    "reasoning": "Based on recent form and head-to-head...",
    "suggestedBet": "Bills -3.5",
    "sport": "nfl",
    "timestamp": "2026-01-10T21:00:00Z"
  }
}`,
    },
  },
  {
    method: 'GET',
    path: '/api/v1/odds',
    description: 'Retrieve current betting odds for matches',
    auth: true,
    params: [
      { name: 'sport', type: 'string', required: false, description: 'Sport identifier (default: americanfootball_nfl)' },
      { name: 'region', type: 'string', required: false, description: 'Region (default: us)' },
      { name: 'markets', type: 'string', required: false, description: 'Market type (default: h2h)' },
    ],
    example: {
      request: `curl -X GET "https://api.aibet-gpt.com/api/v1/odds?sport=americanfootball_nfl" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "success": true,
  "data": [...],
  "cached": true,
  "timestamp": "2026-01-10T21:00:00Z"
}`,
    },
  },
  {
    method: 'GET',
    path: '/api/v1/stats',
    description: 'Get team and player statistics',
    auth: true,
    params: [
      { name: 'sport', type: 'string', required: true, description: 'Sport identifier' },
      { name: 'team', type: 'string', required: false, description: 'Team name' },
      { name: 'player', type: 'string', required: false, description: 'Player name' },
    ],
    example: {
      request: `curl -X GET "https://api.aibet-gpt.com/api/v1/stats?sport=nfl&team=Patriots" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "success": true,
  "data": {
    "sport": "nfl",
    "team": "Patriots",
    "stats": { ... }
  },
  "cached": true
}`,
    },
  },
  {
    method: 'POST',
    path: '/api/v1/batch',
    description: 'Batch prediction endpoint (Business tier and above)',
    auth: true,
    params: [
      { name: 'requests', type: 'array', required: true, description: 'Array of prediction requests (max 50)' },
    ],
    example: {
      request: `curl -X POST https://api.aibet-gpt.com/api/v1/batch \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "requests": [
      {
        "sport": "nfl",
        "query": "Patriots vs Bills prediction"
      },
      {
        "sport": "nba",
        "query": "Lakers vs Warriors prediction"
      }
    ]
  }'`,
      response: `{
  "success": true,
  "data": {
    "total": 2,
    "successful": 2,
    "failed": 0,
    "results": [...]
  }
}`,
    },
  },
  {
    method: 'GET',
    path: '/api/v1/usage',
    description: 'Check your API usage statistics',
    auth: true,
    params: [],
    example: {
      request: `curl -X GET https://api.aibet-gpt.com/api/v1/usage \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "success": true,
  "data": {
    "planTier": "pro",
    "callsUsed": 2847,
    "callsLimit": 10000,
    "callsRemaining": 7153,
    "percentageUsed": 28,
    "resetDate": "2026-02-01T00:00:00Z"
  }
}`,
    },
  },
  {
    method: 'GET',
    path: '/api/v1/sports/active',
    description: 'Get list of currently active sports based on season calendar',
    auth: true,
    params: [
      { name: 'include_inactive', type: 'boolean', required: false, description: 'Include off-season sports' },
    ],
    example: {
      request: `curl -X GET https://api.aibet-gpt.com/api/v1/sports/active \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "success": true,
  "data": {
    "active": [...],
    "comingSoon": [...]
  },
  "timestamp": "2026-01-10T21:00:00Z"
}`,
    },
  },
];

export default function ApiDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'curl' | 'javascript' | 'python'>('curl');

  const endpoint = API_ENDPOINTS[selectedEndpoint];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Documentation</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Complete reference for the AI.bet-GPT API v1
        </p>
      </div>

      {/* Base URL */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">Base URL</p>
        <code className="text-sm bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded px-3 py-2 block">
          https://api.aibet-gpt.com
        </code>
      </div>

      {/* Authentication */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Authentication</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          All API requests require authentication using a Bearer token. Include your API key in the Authorization header:
        </p>
        <code className="block bg-gray-100 dark:bg-gray-900 rounded px-4 py-3 text-sm">
          Authorization: Bearer YOUR_API_KEY
        </code>
      </div>

      {/* Endpoints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sticky top-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">Endpoints</h3>
            <ul className="space-y-1">
              {API_ENDPOINTS.map((ep, index) => (
                <li key={index}>
                  <button
                    onClick={() => setSelectedEndpoint(index)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedEndpoint === index
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className={`font-semibold mr-2 ${
                      ep.method === 'GET' ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="text-xs">{ep.path}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Endpoint Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-3">
              <span className={`px-3 py-1 rounded font-bold text-sm ${
                endpoint.method === 'GET'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {endpoint.method}
              </span>
              <code className="text-lg font-mono">{endpoint.path}</code>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{endpoint.description}</p>
          </div>

          {/* Parameters */}
          {endpoint.params.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Parameters</h3>
              <div className="space-y-3">
                {endpoint.params.map((param, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <code className="text-sm font-semibold text-gray-900 dark:text-white">
                        {param.name}
                      </code>
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                        {param.type}
                      </span>
                      {param.required && (
                        <span className="text-xs px-2 py-0.5 rounded bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                          required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{param.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Example */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Example</h3>
              <div className="flex space-x-2">
                {(['curl', 'javascript', 'python'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      selectedLanguage === lang
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {lang === 'curl' ? 'cURL' : lang === 'javascript' ? 'JavaScript' : 'Python'}
                  </button>
                ))}
              </div>
            </div>

            {/* Request */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Request</p>
              <pre className="bg-gray-900 text-gray-100 rounded p-4 text-sm overflow-x-auto">
                <code>{endpoint.example.request}</code>
              </pre>
            </div>

            {/* Response */}
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Response</p>
              <pre className="bg-gray-900 text-gray-100 rounded p-4 text-sm overflow-x-auto">
                <code>{endpoint.example.response}</code>
              </pre>
            </div>
          </div>

          {/* Rate Limiting */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Rate Limiting</h4>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              API calls are limited based on your plan tier. Check your usage with the <code>/api/v1/usage</code> endpoint.
              Exceeding your limit will result in 429 (Too Many Requests) responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
