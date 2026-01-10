import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Developer Portal - AI.bet-GPT',
  description: 'Manage your API keys, view usage, and access documentation',
};

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Portal Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                AI.bet-GPT
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Developer Portal
              </span>
            </div>
            <Link
              href="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              ← Back to App
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sticky top-8">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/portal"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    📊 Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portal/keys"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    🔑 API Keys
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portal/docs"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    📖 Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portal/usage"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    📈 Usage Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portal/billing"
                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    💳 Billing
                  </Link>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p className="font-semibold mb-1">Need Help?</p>
                  <a
                    href="mailto:support@aibet-gpt.com"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
