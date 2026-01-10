/**
 * GET /api/v1/odds
 * Retrieve current betting odds
 * Requires Bearer token authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, incrementApiUsage } from '@/lib/api-auth';
import { getOdds } from '@/lib/odds-api';
import { withCache, CACHE_DURATIONS, generateCacheKey } from '@/lib/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Validate API key
    const authHeader = request.headers.get('authorization');
    const validation = await validateApiKey(authHeader);

    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error || 'Unauthorized' },
        { status: 401 }
      );
    }

    // Increment usage counter
    if (validation.apiKey) {
      await incrementApiUsage(validation.apiKey.id);
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const sport = searchParams.get('sport') || 'americanfootball_nfl';
    const region = searchParams.get('region') || 'us';
    const markets = searchParams.get('markets') || 'h2h';

    // Generate cache key
    const cacheKey = generateCacheKey('api:odds', { sport, region, markets });

    // Fetch with caching
    const odds = await withCache(
      cacheKey,
      () => getOdds(sport, region, markets),
      { ttl: CACHE_DURATIONS.ODDS }
    );

    return NextResponse.json({
      success: true,
      data: odds,
      cached: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API odds error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
