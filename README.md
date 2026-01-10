# AI.bet-GPT 🏈⚽🏀

> **Comprehensive Sports Betting Analysis Platform powered by AI**

AI.bet-GPT is a production-ready web application that provides AI-powered sports betting predictions, analysis, and statistics. Built with Next.js 14, TypeScript, and Google Gemini AI, it offers both B2C consumer features and B2B API access.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## 🌟 Key Features

### 🎯 Consumer App (B2C)
- **AI-Powered Chat Interface** - Natural language betting queries with streaming responses
- **Dynamic Sports Calendar** - Only shows sports currently in season (NFL, NBA, NHL, EPL, Champions League)
- **Real-time Predictions** - Confidence scores, risk assessment, and detailed reasoning
- **Bet Tracker** - Record bets, track performance, and analyze ROI
- **Stats Dashboard** - Visual analytics with charts and historical data
- **Multiple Sports** - NFL, NBA, NHL, EPL, Champions League, MLB (seasonal)
- **Dark Mode** - Beautiful dark/light theme toggle
- **Mobile Responsive** - Perfect on all devices

### 💼 API Platform (B2B)
- **RESTful API** - Versioned endpoints (v1) for predictions and analysis
- **Developer Portal** - Comprehensive dashboard for managing API keys
- **Multiple Tiers** - Hobby ($49), Pro ($149), Business ($499), Enterprise (custom)
- **Rate Limiting** - Built-in quota management with Supabase
- **Interactive Documentation** - Complete API reference with code examples
- **Usage Analytics** - Real-time monitoring and historical charts
- **Batch Processing** - Process multiple predictions in a single request

### 💎 Monetization
- **Free Tier** - 5 predictions/day with ads (AdMob integration)
- **Premium** - $9.99/month for unlimited predictions, ad-free
- **API Subscriptions** - Four tiers from $49-$499/month
- **Affiliate Links** - DraftKings, FanDuel, Bet365 integrations
- **Rewarded Videos** - Earn bonus predictions by watching ads

### 🔒 Legal & Compliance
- **Terms of Service** - Comprehensive legal terms
- **Privacy Policy** - GDPR & CCPA compliant
- **Gambling Disclaimer** - Prominent warnings and age restrictions
- **Responsible Gambling** - Resources and support information
- **API Terms** - Separate B2B terms of service

## 🏗️ Tech Stack

### Core
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI, Lucide Icons

### AI & Data
- **AI Engine**: Google Gemini API (free tier - 60 req/min)
- **Sports Data**: 
  - The Odds API (500 req/month free)
  - API-Football via RapidAPI (100 req/day free)
  - ESPN hidden API (unlimited)

### Backend & Database
- **Database**: Supabase (PostgreSQL + Row Level Security)
- **Authentication**: Supabase Auth
- **Caching**: Supabase + In-memory fallback
- **Rate Limiting**: Upstash Redis (optional)

### Payments & Monetization
- **Payments**: Stripe (subscriptions + one-time)
- **Ads**: AdMob/Google AdSense integration
- **Analytics**: Vercel Analytics (built-in)

### Deployment
- **Hosting**: Vercel (optimized for Next.js)
- **CDN**: Vercel Edge Network
- **Domain**: Custom domain support

## 📦 Project Structure

```
ai-bet-gpt/
├── app/
│   ├── (main)/                    # Consumer web application
│   │   ├── page.tsx              # Landing page
│   │   ├── chat/                 # AI chat interface
│   │   ├── dashboard/            # Stats dashboard
│   │   ├── bets/                 # Bet tracker
│   │   ├── pricing/              # Subscription plans
│   │   ├── nfl/                  # NFL-specific page
│   │   ├── epl/                  # EPL-specific page
│   │   ├── terms/                # Legal: Terms of Service
│   │   ├── privacy/              # Legal: Privacy Policy
│   │   ├── disclaimer/           # Legal: Disclaimer
│   │   ├── responsible-gambling/ # Legal: Responsible Gambling
│   │   ├── api-terms/            # Legal: API Terms
│   │   ├── api-docs/             # Public API documentation
│   │   └── layout.tsx
│   ├── portal/                    # Developer portal (B2B)
│   │   ├── page.tsx              # Portal dashboard
│   │   ├── keys/                 # API key management
│   │   ├── docs/                 # API documentation
│   │   ├── usage/                # Usage analytics
│   │   ├── billing/              # Subscription management
│   │   └── layout.tsx
│   ├── api/
│   │   ├── v1/                   # Public API endpoints (B2B)
│   │   │   ├── analyze/          # POST - AI prediction
│   │   │   ├── odds/             # GET - Betting odds
│   │   │   ├── stats/            # GET - Team statistics
│   │   │   ├── batch/            # POST - Batch predictions
│   │   │   ├── usage/            # GET - API usage stats
│   │   │   └── sports/active/    # GET - Active sports
│   │   └── (internal)/           # Internal API routes
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ads/                       # AdMob components
│   │   ├── BannerAd.tsx
│   │   ├── InterstitialAd.tsx
│   │   ├── RewardedVideoAd.tsx
│   │   └── NativeAd.tsx
│   ├── premium/                   # Premium/pricing components
│   │   ├── UpgradePrompt.tsx
│   │   └── PricingCard.tsx
│   ├── sports/                    # Sports-related components
│   │   ├── SportSelector.tsx
│   │   └── SeasonIndicator.tsx
│   ├── Navigation.tsx
│   ├── DarkModeToggle.tsx
│   └── Providers.tsx
├── lib/
│   ├── seasons.ts                 # Sports season calendar logic
│   ├── cache.ts                   # Caching utilities
│   ├── api-auth.ts                # API authentication
│   ├── gemini.ts                  # Gemini AI client
│   ├── odds-api.ts                # The Odds API integration
│   ├── api-football.ts            # API-Football integration
│   └── supabase.ts                # Supabase client
├── types/
│   └── index.ts                   # TypeScript definitions
├── utils/
│   ├── rate-limit.ts              # Rate limiting utilities
│   ├── constants.ts               # App constants
│   └── helpers.ts                 # Helper functions
├── public/                        # Static assets
├── supabase-schema.sql            # Database schema
├── .env.example                   # Environment variables template
├── middleware.ts                  # Next.js middleware
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Supabase account (free tier)
- Google Gemini API key (free tier)
- The Odds API key (free tier)
- RapidAPI key for API-Football (free tier)
- Stripe account (for payments, optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/morgan9hips-sketch/AI-bet-GPT.git
cd AI-bet-GPT
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your API keys:
```env
# Supabase (Database & Auth)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI Engine
GEMINI_API_KEY=your_gemini_api_key

# Sports Data APIs
ODDS_API_KEY=your_odds_api_key
RAPIDAPI_KEY=your_rapidapi_key

# Payments (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# AdMob/AdSense (Optional)
NEXT_PUBLIC_ADMOB_APP_ID=your_admob_app_id
NEXT_PUBLIC_ADMOB_BANNER_ID=your_admob_banner_id
NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID=your_admob_interstitial_id
NEXT_PUBLIC_ADMOB_REWARDED_ID=your_admob_rewarded_id

# Affiliate Links (Optional)
DRAFTKINGS_AFFILIATE_ID=your_draftkings_id
FANDUEL_AFFILIATE_ID=your_fanduel_id
BET365_AFFILIATE_ID=your_bet365_id
```

4. **Set up Supabase database**

Run the SQL schema in your Supabase project:
```bash
# Copy contents of supabase-schema.sql
# Paste into Supabase SQL Editor and run
```

This creates:
- `user_profiles` - User accounts and subscriptions
- `predictions` - AI prediction history
- `bets` - User bet tracking
- `api_keys` - B2B API key management
- `cache` - Response caching
- RLS policies and security functions

5. **Run the development server**
```bash
npm run dev
```

6. **Open in browser**
```
http://localhost:3000
```

### Building for Production

```bash
npm run build
npm start
```

## 📚 API Documentation

### Base URL
```
https://api.aibet-gpt.com (or your domain)
```

### Authentication
All API requests require a Bearer token:
```bash
Authorization: Bearer YOUR_API_KEY
```

### Endpoints

#### POST /api/v1/analyze
Generate AI-powered betting analysis
```bash
curl -X POST https://api.aibet-gpt.com/api/v1/analyze \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "sport": "nfl",
    "query": "Should I bet on Patriots vs Bills?",
    "matchDetails": {
      "homeTeam": "Patriots",
      "awayTeam": "Bills"
    }
  }'
```

#### GET /api/v1/odds
Retrieve current betting odds
```bash
curl https://api.aibet-gpt.com/api/v1/odds?sport=americanfootball_nfl \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### GET /api/v1/sports/active
Get currently active sports
```bash
curl https://api.aibet-gpt.com/api/v1/sports/active \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Rate Limits
- **Hobby**: 1,000 calls/month (~33/day)
- **Pro**: 10,000 calls/month (~333/day)
- **Business**: 100,000 calls/month (~3,333/day)
- **Enterprise**: Unlimited (custom)

For complete API documentation, visit `/portal/docs`

## 🎮 Usage

### Consumer App

1. **Browse Active Sports**
   - Only sports currently in season are displayed
   - January 2026: NFL playoffs, NBA, NHL, EPL, Champions League

2. **Get Predictions**
   - Navigate to Chat page
   - Select your sport
   - Ask questions in natural language
   - Receive AI analysis with confidence scores

3. **Track Bets**
   - Go to Bets page
   - Log your bets with odds and stakes
   - Track pending and settled bets
   - View profit/loss analytics

4. **Upgrade to Premium**
   - Remove ads
   - Unlimited predictions
   - Access all sports year-round

### Developer Portal

1. **Create API Key**
   - Visit `/portal/keys`
   - Select your plan tier
   - Generate and securely store your key

2. **Make API Calls**
   - Use your Bearer token for authentication
   - Check `/portal/docs` for examples
   - Monitor usage at `/portal/usage`

3. **Manage Billing**
   - View invoices at `/portal/billing`
   - Upgrade or downgrade plans
   - Update payment methods

## 🎨 Customization

### Sports Configuration
Edit `lib/seasons.ts` to add/modify sports:
```typescript
export const SPORTS: Sport[] = [
  {
    id: 'nfl',
    name: 'NFL',
    emoji: '🏈',
    seasonStart: { month: 9, day: 1 },
    seasonEnd: { month: 2, day: 28 },
    leagueId: 'americanfootball_nfl',
  },
  // Add more sports...
];
```

### Theme Customization
Modify `tailwind.config.ts` for custom colors and styling.

### Ad Configuration
Update ad unit IDs in `.env`:
```env
NEXT_PUBLIC_ADMOB_BANNER_ID=ca-app-pub-xxx/banner
NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID=ca-app-pub-xxx/interstitial
NEXT_PUBLIC_ADMOB_REWARDED_ID=ca-app-pub-xxx/rewarded
```

## 📊 Database Schema

Key tables:
- **user_profiles**: User accounts, subscription tiers, daily limits
- **api_keys**: B2B API keys with rate limits and usage tracking
- **predictions**: AI prediction history for accuracy analysis
- **bets**: User bet tracking with results and ROI
- **cache**: Response caching to minimize external API calls

See `supabase-schema.sql` for complete schema.

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- API keys hashed with SHA-256
- Bearer token authentication for API
- Secure session management with Supabase
- Rate limiting to prevent abuse
- CORS protection
- Environment variable protection

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Environment Variables in Vercel
Add all variables from `.env.example` in Vercel dashboard.

### Custom Domain
Configure in Vercel settings.

## 📄 Legal Compliance

The app includes comprehensive legal pages:
- **Terms of Service** (`/terms`)
- **Privacy Policy** (`/privacy`) - GDPR & CCPA compliant
- **Disclaimer** (`/disclaimer`) - Gambling warnings
- **Responsible Gambling** (`/responsible-gambling`) - Resources and help
- **API Terms** (`/api-terms`) - B2B API terms

### Disclaimers
⚠️ **IMPORTANT**: This app is for entertainment purposes only. We do not guarantee prediction accuracy. Users must be 18+ (21+ in some jurisdictions). Please gamble responsibly.

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for predictions
- The Odds API for betting data
- API-Football for match data
- Supabase for backend infrastructure
- Next.js team for the amazing framework
- Vercel for hosting platform

## 📧 Contact

- **Website**: https://aibet-gpt.com
- **Email**: support@aibet-gpt.com
- **API Support**: api@aibet-gpt.com
- **Legal**: legal@aibet-gpt.com

## ⚠️ Responsible Gambling

If you or someone you know has a gambling problem, help is available:
- **NCPG Helpline**: 1-800-522-4700
- **Website**: [www.ncpgambling.org](https://www.ncpgambling.org)

---

**Built with ❤️ for responsible sports betting analysis**
