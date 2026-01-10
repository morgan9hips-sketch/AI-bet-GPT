# Deployment Guide for AI Bet GPT

This guide will help you deploy the AI Bet GPT application to production.

## Prerequisites

Before deploying, make sure you have:
- A GitHub account
- A Vercel account (or other hosting provider)
- Supabase account with a project created
- Google Gemini API key
- The Odds API key
- RapidAPI account (for API-Football)
- Stripe account (for payments - optional)

## Step 1: Set up Supabase

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy and paste the contents of `supabase-schema.sql` and execute it
4. Enable Email authentication in Authentication > Providers
5. Note your project URL and anon key from Settings > API

## Step 2: Get API Keys

### Google Gemini API
1. Visit [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Save it securely

### The Odds API
1. Sign up at [https://the-odds-api.com](https://the-odds-api.com)
2. Get your free API key (500 requests per month)
3. Upgrade if you need more requests

### API-Football (RapidAPI)
1. Sign up at [https://rapidapi.com](https://rapidapi.com)
2. Subscribe to API-Football: [https://rapidapi.com/api-sports/api/api-football](https://rapidapi.com/api-sports/api/api-football)
3. Copy your RapidAPI key

### Stripe (Optional - for payments)
1. Create a Stripe account at [https://stripe.com](https://stripe.com)
2. Get your API keys from the Dashboard
3. Set up products for Premium and API tiers

## Step 3: Deploy to Vercel

### Method 1: Deploy via GitHub

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables (see below)
6. Click "Deploy"

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 4: Configure Environment Variables

In your Vercel project settings, add these environment variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# The Odds API
ODDS_API_KEY=your_odds_api_key

# API-Football (RapidAPI)
RAPIDAPI_KEY=your_rapidapi_key

# Stripe (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# AdMob (Optional)
NEXT_PUBLIC_ADMOB_APP_ID=your_admob_app_id
NEXT_PUBLIC_ADMOB_AD_UNIT_ID=your_admob_ad_unit_id

# API Security
API_SECRET_KEY=generate_a_random_secret_key
```

## Step 5: Set up Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click on "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Step 6: Enable PWA Features

The app is already configured as a PWA. After deployment:

1. Users can install it on their devices
2. Icons are loaded from `/public/icon-192.png` and `/public/icon-512.png`
3. You may want to create actual icon files to replace the placeholders

## Step 7: Set up Monitoring (Optional)

### Vercel Analytics
Enable Vercel Analytics in your project settings for traffic insights.

### Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- PostHog for product analytics

## Step 8: Configure Cron Jobs (Optional)

To reset daily prediction limits, set up a cron job:

1. Create an API route: `/app/api/cron/reset-daily/route.ts`
2. Call the Supabase function: `reset_daily_predictions()`
3. Set up Vercel Cron or use an external service like cron-job.org

## Production Checklist

- [ ] All API keys are added to environment variables
- [ ] Supabase database is set up with the schema
- [ ] Authentication is working
- [ ] Dark mode toggle works
- [ ] All pages are responsive on mobile
- [ ] PWA manifest is configured
- [ ] Custom domain is set up (if applicable)
- [ ] Analytics are enabled
- [ ] Error tracking is configured
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] Social media sharing tags are added (optional)
- [ ] Sitemap is generated (optional)

## Testing in Production

After deployment:

1. Visit your live site
2. Test user registration and login
3. Try the AI chat feature (you'll need API keys configured)
4. Navigate through all pages
5. Test dark mode toggle
6. Check mobile responsiveness
7. Test PWA installation

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify TypeScript compilation with `npm run build`
- Check Vercel build logs for specific errors

### API Not Working
- Verify environment variables are set correctly
- Check API key validity and rate limits
- Review API endpoint logs in Vercel

### Database Errors
- Verify Supabase connection strings
- Check RLS policies are correctly set
- Review Supabase logs

## Scaling Considerations

As your app grows:

1. **Caching**: Implement Redis for caching API responses
2. **Rate Limiting**: Add rate limiting middleware
3. **Database**: Consider read replicas for Supabase
4. **CDN**: Use Vercel's edge network for static assets
5. **API Optimization**: Batch requests and implement request queuing

## Security Best Practices

1. Never commit `.env` files to Git
2. Rotate API keys regularly
3. Enable Supabase RLS policies
4. Implement CSRF protection
5. Use HTTPS only
6. Sanitize user inputs
7. Implement rate limiting on API routes
8. Monitor for suspicious activity

## Support

For issues or questions:
- Check the [GitHub Issues](https://github.com/morgan9hips-sketch/AI-bet-GPT/issues)
- Review the [README.md](README.md)
- Contact support (add your email)

## License

MIT License - See LICENSE file for details
