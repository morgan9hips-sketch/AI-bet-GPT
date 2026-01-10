'use client';

interface PricingCardProps {
  tier: 'free' | 'premium' | 'hobby' | 'pro' | 'business' | 'enterprise';
  highlighted?: boolean;
}

const TIER_INFO = {
  free: {
    name: 'Free',
    price: '$0',
    period: '/forever',
    features: [
      '5 AI analyses per day',
      'Basic predictions',
      'Active sports only',
      'Ad-supported',
      'Community support',
    ],
    limitations: [
      'Limited daily predictions',
      'Contains ads',
      'Limited sports access',
    ],
    cta: 'Get Started',
    color: 'gray',
  },
  premium: {
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    features: [
      'Unlimited AI analyses',
      '100% Ad-free experience',
      'All sports access',
      'Advanced statistics',
      'Priority support',
      'Export bet history',
      'Custom alerts',
      'Accuracy tracking',
    ],
    limitations: [],
    cta: 'Upgrade to Premium',
    color: 'blue',
  },
  hobby: {
    name: 'Hobby API',
    price: '$49',
    period: '/month',
    features: [
      '1,000 API calls/month',
      'Basic predictions',
      'API documentation',
      'Email support',
    ],
    limitations: ['~33 calls per day'],
    cta: 'Start with Hobby',
    color: 'green',
  },
  pro: {
    name: 'Pro API',
    price: '$149',
    period: '/month',
    features: [
      '10,000 API calls/month',
      'Full predictions',
      'Advanced statistics',
      'Priority support',
      'Code examples',
    ],
    limitations: ['~333 calls per day'],
    cta: 'Upgrade to Pro',
    color: 'purple',
  },
  business: {
    name: 'Business API',
    price: '$499',
    period: '/month',
    features: [
      '100,000 API calls/month',
      'Batch predictions',
      'Priority support',
      'White-label option',
      'Dedicated account manager',
      'Custom integration',
    ],
    limitations: ['~3,333 calls per day'],
    cta: 'Go Business',
    color: 'orange',
  },
  enterprise: {
    name: 'Enterprise API',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited API calls',
      'Custom integration',
      'Dedicated infrastructure',
      'SLA guarantee',
      '24/7 phone support',
      'Custom features',
    ],
    limitations: [],
    cta: 'Contact Sales',
    color: 'red',
  },
};

export default function PricingCard({ tier, highlighted = false }: PricingCardProps) {
  const info = TIER_INFO[tier];

  const colorClasses = {
    gray: 'border-gray-300 dark:border-gray-700',
    blue: 'border-blue-500 shadow-blue-500/20',
    green: 'border-green-500 shadow-green-500/20',
    purple: 'border-purple-500 shadow-purple-500/20',
    orange: 'border-orange-500 shadow-orange-500/20',
    red: 'border-red-500 shadow-red-500/20',
  };

  const buttonClasses = {
    gray: 'bg-gray-600 hover:bg-gray-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
    red: 'bg-red-600 hover:bg-red-700',
  };

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 rounded-lg border-2 p-6 transition-all ${
        highlighted
          ? `${colorClasses[info.color]} shadow-xl scale-105`
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {info.name}
        </h3>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
            {info.price}
          </span>
          {info.period && (
            <span className="text-gray-500 dark:text-gray-400 ml-1">
              {info.period}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {info.features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <span className="text-green-500 flex-shrink-0">✓</span>
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      {info.limitations.length > 0 && (
        <div className="mb-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            {info.limitations.join(' • ')}
          </p>
        </div>
      )}

      <button
        className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-colors ${
          buttonClasses[info.color]
        }`}
      >
        {info.cta}
      </button>
    </div>
  );
}
