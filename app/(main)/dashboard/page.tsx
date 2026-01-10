import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Welcome to AI Bet GPT
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Predictions Today
            </h3>
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">0/5</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Free tier daily limit
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Active Bets
            </h3>
            <span className="text-3xl">🎯</span>
          </div>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">0</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Pending outcomes
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Win Rate
            </h3>
            <span className="text-3xl">🏆</span>
          </div>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">--%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            No bets yet
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/chat"
            className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <span className="text-3xl mr-4">💬</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Get AI Prediction
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chat with AI for match predictions
              </p>
            </div>
          </Link>

          <Link
            href="/nfl"
            className="flex items-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
          >
            <span className="text-3xl mr-4">🏈</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                NFL Predictions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View upcoming NFL games
              </p>
            </div>
          </Link>

          <Link
            href="/epl"
            className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
          >
            <span className="text-3xl mr-4">⚽</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                EPL Predictions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                View Premier League fixtures
              </p>
            </div>
          </Link>

          <Link
            href="/pricing"
            className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/50 transition-colors"
          >
            <span className="text-3xl mr-4">💎</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Upgrade to Premium
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Unlimited predictions, ad-free
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No recent activity</p>
          <p className="text-sm mt-2">Start by getting your first AI prediction!</p>
        </div>
      </div>
    </div>
  );
}
