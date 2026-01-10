# AI Bet GPT 🏈⚽

AI-powered sports betting predictions app with confidence scores, stats dashboard, and bet tracking.

## Features

### 🤖 AI Predictions
- Powered by Google Gemini API
- Confidence scores (0-100)
- Detailed reasoning for predictions
- Support for NFL and EPL

### 💬 Chat Interface
- Interactive chat with AI
- Real-time predictions
- Conversation history
- Sport-specific analysis

### 📊 Stats Dashboard
- Track your betting performance
- Win rate analytics
- Profit/loss tracking
- Bet history

### 🎯 Bet Tracker
- Record all your bets
- Track pending outcomes
- Historical performance
- Detailed statistics

### 💎 Subscription Tiers

#### Free Tier
- 5 AI predictions per day
- Basic stats dashboard
- Bet tracker
- Ad-supported (AdMob)
- Affiliate links to betting platforms

#### Premium ($9.99/month)
- Unlimited predictions
- Ad-free experience
- Advanced analytics
- Priority support

#### API Access ($49-$499/month)
- REST API access
- Authentication & rate limiting
- Developer portal
- API documentation
- 10,000-200,000 calls/month

### 🏈 NFL & ⚽ EPL Focus
- Dedicated sections for NFL and Premier League
- The Odds API integration
- API-Football integration
- Live odds and fixtures

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API
- **Database:** Supabase
- **Authentication:** Supabase Auth
- **Payments:** Stripe
- **Sports Data:** The Odds API, API-Football
- **Ads:** AdMob

## Features

✅ Mobile-responsive design
✅ Dark mode support
✅ PWA (Progressive Web App)
✅ REST API with authentication
✅ Rate limiting
✅ Developer portal

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Gemini API key
- The Odds API key
- RapidAPI key (for API-Football)
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/morgan9hips-sketch/AI-bet-GPT.git
cd AI-bet-GPT
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`
- `ODDS_API_KEY`
- `RAPIDAPI_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

The app uses Supabase for authentication and data storage. You'll need to create the following tables:

### Users Table
- `id` (uuid, primary key)
- `email` (text)
- `subscription_tier` (text: 'free', 'premium', 'api')
- `daily_predictions_used` (integer)
- `api_key` (text, nullable)
- `created_at` (timestamp)

### Predictions Table
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `sport` (text: 'nfl', 'epl')
- `query` (text)
- `prediction` (text)
- `confidence` (integer)
- `reasoning` (text)
- `created_at` (timestamp)

### Bets Table
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `sport` (text)
- `match_details` (text)
- `prediction` (text)
- `confidence` (integer)
- `stake` (numeric, nullable)
- `odds` (numeric, nullable)
- `status` (text: 'pending', 'won', 'lost')
- `result` (text, nullable)
- `created_at` (timestamp)

## API Documentation

### Predictions API
```
POST /api/predictions
Body: { prompt: string, sport: 'nfl' | 'epl' }
Returns: { prediction, confidence, reasoning }
```

### Odds API
```
GET /api/odds?sport=americanfootball_nfl
Returns: { odds: OddsData[] }
```

### Fixtures API
```
GET /api/fixtures
Returns: { fixtures: FixtureData[] }
```

### Bets API
```
GET /api/bets - Get user's bets
POST /api/bets - Create new bet
```

### Stats API
```
GET /api/stats - Get user statistics
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js 14:
- Netlify
- AWS Amplify
- Railway
- Render

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Disclaimer

This app is for entertainment purposes only. Always gamble responsibly and within your means. The predictions provided by the AI are not guarantees and should not be relied upon for betting decisions.
