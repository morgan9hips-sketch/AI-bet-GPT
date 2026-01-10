/**
 * GET /api/v1/stats
 * Get team/player statistics
 * Requires Bearer token authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, incrementApiUsage } from '@/lib/api-auth';
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
    const sport = searchParams.get('sport');
    const team = searchParams.get('team');
    const player = searchParams.get('player');

    if (!sport) {
      return NextResponse.json(
        { error: 'Missing required parameter: sport' },
        { status: 400 }
      );
    }

    // Generate cache key
    const cacheKey = generateCacheKey('api:stats', { sport, team, player });

    // Mock stats data (replace with actual API call)
    const stats = await withCache(
      cacheKey,
      async () => ({
        sport,
        team,
        player,
        stats: {
          wins: 10,
          losses: 5,
          pointsPerGame: 28.5,
          pointsAllowedPerGame: 22.3,
          homeRecord: '6-2',
          awayRecord: '4-3',
          lastFiveGames: ['W', 'W', 'L', 'W', 'W'],
        },
        timestamp: new Date().toISOString(),
      }),
      { ttl: CACHE_DURATIONS.TEAM_STATS }
    );

    return NextResponse.json({
      success: true,
      data: stats,
      cached: true,
    });
  } catch (error) {
    console.error('API stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
