'use client';

import Link from 'next/link';

export default function BillingPage() {
  const currentPlan = {
    tier: 'Pro',
    price: '$149/month',
    callsLimit: '10,000 calls/month',
    nextBillingDate: '2026-02-01',
  };

  const invoices = [
    {
      id: 'inv_001',
      date: '2026-01-01',
      amount: '$149.00',
      status: 'paid',
      downloadUrl: '#',
    },
    {
      id: 'inv_002',
      date: '2025-12-01',
      amount: '$149.00',
      status: 'paid',
      downloadUrl: '#',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Billing</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-1">Current Plan</p>
            <h2 className="text-3xl font-bold mb-2">{currentPlan.tier}</h2>
            <p className="text-xl mb-4">{currentPlan.price}</p>
            <p className="text-blue-100">{currentPlan.callsLimit}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm mb-1">Next billing date</p>
            <p className="text-lg font-semibold">
              {new Date(currentPlan.nextBillingDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-6 flex space-x-3">
          <button className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
            Upgrade Plan
          </button>
          <button className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold">
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
            Update
          </button>
        </div>
        <div className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="text-3xl">💳</div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Visa ending in 4242</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Expires 12/2026</p>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Invoice History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Invoice ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white font-mono">
                    {invoice.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {invoice.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={invoice.downloadUrl}
                      className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Upgrade Your Plan
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Need more API calls? Upgrade to a higher tier for increased limits and additional features.
        </p>
        <Link
          href="/pricing"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          View All Plans
        </Link>
      </div>
    </div>
  );
}
