'use client';

import { useState, useEffect } from 'react';

export default function UsageAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [usageData] = useState({
    totalCalls: 2847,
    successfulCalls: 2815,
    failedCalls: 32,
    averageResponseTime: 1.2,
    topEndpoints: [
      { path: '/api/v1/analyze', calls: 1523, percentage: 53.5 },
      { path: '/api/v1/odds', calls: 847, percentage: 29.7 },
      { path: '/api/v1/stats', calls: 312, percentage: 11.0 },
      { path: '/api/v1/usage', calls: 165, percentage: 5.8 },
    ],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Usage Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor your API usage and performance metrics
          </p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Calls</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {usageData.totalCalls.toLocaleString()}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Success Rate</p>
          <p className="text-3xl font-bold text-green-600">
            {((usageData.successfulCalls / usageData.totalCalls) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Failed Calls</p>
          <p className="text-3xl font-bold text-red-600">
            {usageData.failedCalls}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Response Time</p>
          <p className="text-3xl font-bold text-blue-600">
            {usageData.averageResponseTime}s
          </p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          API Calls Over Time
        </h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
          <p className="text-gray-500 dark:text-gray-400">
            📊 Chart visualization would go here (integrate Recharts)
          </p>
        </div>
      </div>

      {/* Top Endpoints */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Top Endpoints
        </h2>
        <div className="space-y-4">
          {usageData.topEndpoints.map((endpoint, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <code className="text-sm font-mono text-gray-900 dark:text-white">
                  {endpoint.path}
                </code>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {endpoint.calls.toLocaleString()} calls ({endpoint.percentage}%)
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${endpoint.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Log */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Errors
        </h2>
        <div className="space-y-3">
          {usageData.failedCalls > 0 ? (
            <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded p-4">
              <p className="font-semibold mb-1">2026-01-10 20:45:32 UTC</p>
              <p>Error 429: Rate limit exceeded</p>
              <p className="text-xs mt-2 text-gray-500">Endpoint: /api/v1/analyze</p>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No errors in the selected time period 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
