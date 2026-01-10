'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PortalDashboard() {
  const [stats, setStats] = useState({
    totalKeys: 0,
    activeKeys: 0,
    totalCalls: 0,
    callsThisMonth: 0,
  });

  useEffect(() => {
    // TODO: Fetch actual stats from API
    setStats({
      totalKeys: 2,
      activeKeys: 1,
      totalCalls: 15234,
      callsThisMonth: 2847,
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Developer Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to your API developer portal. Manage your keys, view usage, and access documentation.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total API Keys</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalKeys}
              </p>
            </div>
            <div className="text-4xl">🔑</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Keys</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.activeKeys}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Calls</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {stats.totalCalls.toLocaleString()}
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {stats.callsThisMonth.toLocaleString()}
              </p>
            </div>
            <div className="text-4xl">📈</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/portal/keys"
            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-2xl">➕</span>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Create New API Key
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate a new key for your application
              </p>
            </div>
          </Link>

          <Link
            href="/portal/docs"
            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-2xl">📚</span>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                View Documentation
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Learn how to integrate our API
              </p>
            </div>
          </Link>

          <Link
            href="/portal/usage"
            className="flex items-center space-x-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="text-2xl">📊</span>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                View Analytics
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check your API usage statistics
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Getting Started with AI.bet-GPT API</h2>
        <p className="text-blue-100 mb-4">
          Follow these steps to integrate sports betting predictions into your application:
        </p>
        <ol className="space-y-2 mb-6">
          <li className="flex items-start space-x-2">
            <span className="font-bold">1.</span>
            <span>Create an API key from the Keys page</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">2.</span>
            <span>Review the API documentation to understand available endpoints</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">3.</span>
            <span>Make your first API call using the code examples</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="font-bold">4.</span>
            <span>Monitor your usage and stay within your plan limits</span>
          </li>
        </ol>
        <Link
          href="/portal/docs"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
        >
          Read Documentation
        </Link>
      </div>
    </div>
  );
}
