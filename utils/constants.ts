export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    predictions_per_day: 5,
    features: [
      '5 AI predictions per day',
      'Basic stats dashboard',
      'Bet tracker',
      'NFL & EPL coverage',
      'Mobile responsive',
    ],
    showAds: true,
  },
  premium: {
    name: 'Premium',
    price: 9.99,
    predictions_per_day: -1, // unlimited
    features: [
      'Unlimited AI predictions',
      'Advanced stats dashboard',
      'Detailed bet tracking',
      'NFL & EPL coverage',
      'Ad-free experience',
      'Priority support',
      'Dark mode',
    ],
    showAds: false,
  },
  api: {
    name: 'API Access',
    price: 49,
    predictions_per_day: -1,
    features: [
      'Full REST API access',
      'Authentication & rate limiting',
      'Developer portal',
      'API documentation',
      'Up to 10,000 calls/month',
    ],
    showAds: false,
  },
};

export const API_TIERS = [
  { name: 'Starter', price: 49, calls: 10000 },
  { name: 'Professional', price: 149, calls: 50000 },
  { name: 'Enterprise', price: 499, calls: 200000 },
];
