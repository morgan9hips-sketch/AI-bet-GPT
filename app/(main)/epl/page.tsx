export default function EPLPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        ⚽ Premier League Predictions
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Upcoming Fixtures
        </h2>
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg mb-2">No upcoming fixtures available</p>
          <p className="text-sm">Check back later for Premier League matches and predictions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured Prediction
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get AI-powered predictions for Premier League matches. Our AI analyzes form, 
            head-to-head records, and team statistics to give you the edge in your betting decisions.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Top Teams to Watch
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Manchester City</li>
            <li>• Arsenal</li>
            <li>• Liverpool</li>
            <li>• Manchester United</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
