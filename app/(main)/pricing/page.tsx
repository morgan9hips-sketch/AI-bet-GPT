import { SUBSCRIPTION_TIERS, API_TIERS } from '@/utils/constants';

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Start free, upgrade anytime for unlimited predictions
        </p>
      </div>

      {/* Subscription Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {Object.entries(SUBSCRIPTION_TIERS).map(([key, tier]) => (
          <div
            key={key}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${
              key === 'premium' ? 'ring-2 ring-blue-500 transform scale-105' : ''
            }`}
          >
            {key === 'premium' && (
              <div className="bg-blue-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-4">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {tier.name}
            </h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${tier.price}
              </span>
              {tier.price > 0 && (
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              )}
            </div>
            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                key === 'premium'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {key === 'free' ? 'Get Started' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      {/* API Pricing */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-8">
        <h2 className="text-3xl font-bold mb-4">API Access for Developers</h2>
        <p className="text-lg mb-6">
          Integrate our AI betting predictions into your own applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {API_TIERS.map((tier) => (
          <div
            key={tier.name}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {tier.name}
            </h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${tier.price}
              </span>
              <span className="text-gray-600 dark:text-gray-400">/month</span>
            </div>
            <div className="mb-8">
              <p className="text-gray-600 dark:text-gray-400">
                Up to <span className="font-bold text-gray-900 dark:text-white">{tier.calls.toLocaleString()}</span> API calls/month
              </p>
            </div>
            <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get API Access
            </button>
          </div>
        ))}
      </div>

      {/* Affiliate Section */}
      <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Ready to Start Betting?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Check out our recommended betting platforms
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
            DraftKings →
          </button>
          <button className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
            FanDuel →
          </button>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            BetMGM →
          </button>
        </div>
      </div>
    </div>
  );
}
