import { NextRequest, NextResponse } from 'next/server';
import { getOdds } from '@/lib/odds-api';
import { withCache, CACHE_DURATIONS, generateCacheKey, getCacheAge, formatCacheAge } from '@/lib/cache';
import { getSportById, getDefaultSport } from '@/lib/sport-config';

// Mark as dynamic since it uses searchParams
export const dynamic = 'force-dynamic';

// Cache TTL for odds data - 5 minutes as per requirements
const ODDS_CACHE_TTL_SECONDS = 300;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sportParam = searchParams.get('sport');
    const daysParam = searchParams.get('days');

    // Use default sport if not specified
    const sport = sportParam || getDefaultSport().id;
    const days = daysParam ? parseInt(daysParam, 10) : 5;

    // Validate days parameter
    if (days < 1 || days > 30) {
      return NextResponse.json(
        { error: 'Days parameter must be between 1 and 30' },
        { status: 400 }
      );
    }

    // Validate sport exists
    const sportConfig = getSportById(sport);
    if (!sportConfig) {
      return NextResponse.json(
        { 
          error: 'Sport not found',
          message: `Sport "${sport}" is not available. Try NFL or EPL.`,
          availableSports: ['americanfootball_nfl', 'soccer_epl', 'basketball_nba']
        },
        { status: 404 }
      );
    }

    // Check if sport is enabled
    if (!sportConfig.enabled) {
      return NextResponse.json(
        { 
          error: 'Sport not available',
          message: `${sportConfig.name} is currently unavailable. Try NFL or EPL.`,
        },
        { status: 503 }
      );
    }

    // Use cache with 5 minutes TTL as per requirements
    const cacheKey = generateCacheKey('odds', { sport, days });
    
    try {
      const odds = await withCache(
        cacheKey,
        () => getOdds(sport, { days }),
        { ttl: ODDS_CACHE_TTL_SECONDS }
      );

      // Get cache age for display
      const cacheAge = await getCacheAge(cacheKey);
      const cacheAgeFormatted = formatCacheAge(cacheAge);

      return NextResponse.json({ 
        odds, 
        cached: true,
        cacheAge: cacheAgeFormatted,
        sport: sportConfig.name,
        sportId: sport,
        days,
      });
    } catch (oddsError: any) {
      // Handle specific errors from odds API
      if (oddsError.status === 422 || oddsError.message.includes('not currently available')) {
        console.error(`[Odds API Route] Sport "${sport}" not available (422)`);
        return NextResponse.json({
          error: 'Sport not available',
          message: oddsError.message || `The sport "${sport}" is not currently available. Try NFL, NBA, or EPL.`,
          availableSports: ['americanfootball_nfl', 'basketball_nba', 'soccer_epl', 'baseball_mlb', 'icehockey_nhl'],
          odds: [],
        }, { status: 422 });
      } else if (oddsError.message.includes('Rate limit')) {
        return NextResponse.json(
          { 
            error: 'Rate limit reached',
            message: 'Rate limit reached. Showing cached odds if available.',
            odds: [],
          },
          { status: 429 }
        );
      }
      
      throw oddsError;
    }
  } catch (error: any) {
    console.error('[Odds API Route] Error:', error.message);
    return NextResponse.json(
      { 
        error: 'Failed to fetch odds',
        message: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
