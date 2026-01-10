export interface User {
  id: string;
  email: string;
  subscription_tier: 'free' | 'premium' | 'api';
  daily_predictions_used: number;
  api_key?: string;
  created_at: string;
}

export interface Bet {
  id: string;
  user_id: string;
  sport: 'nfl' | 'epl';
  match_details: string;
  prediction: string;
  confidence: number;
  stake?: number;
  odds?: number;
  status: 'pending' | 'won' | 'lost';
  result?: string;
  created_at: string;
}

export interface Prediction {
  id: string;
  user_id: string;
  sport: 'nfl' | 'epl';
  query: string;
  prediction: string;
  confidence: number;
  reasoning: string;
  created_at: string;
}

export interface Subscription {
  tier: 'free' | 'premium' | 'api';
  price: number;
  features: string[];
  limits: {
    predictions_per_day?: number;
    api_calls_per_month?: number;
  };
}

export interface ApiUsage {
  user_id: string;
  calls_made: number;
  limit: number;
  reset_date: string;
}
