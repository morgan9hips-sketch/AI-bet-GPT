import { NextRequest, NextResponse } from 'next/server';
import { getOdds } from '@/lib/odds-api';
import { withCache, CACHE_DURATIONS, generateCacheKey } from '@/lib/cache';

// Mark as dynamic since it uses searchParams
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sport = searchParams.get('sport') as 'americanfootball_nfl' | 'soccer_epl';

    if (!sport) {
      return NextResponse.json(
        { error: 'Sport parameter is required' },
        { status: 400 }
      );
    }

    // Use cache with 5 minutes TTL (300 seconds)
    const cacheKey = generateCacheKey('odds', { sport });
    const odds = await withCache(
      cacheKey,
      () => getOdds(sport),
      { ttl: 300 } // 5 minutes cache as per requirements
    );

    return NextResponse.json({ odds, cached: true });
  } catch (error) {
    console.error('Odds API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch odds' },
      { status: 500 }
    );
  }
}
