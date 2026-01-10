/**
 * GET /api/v1/sports/active
 * Return list of currently active sports based on season calendar
 * Requires Bearer token authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, incrementApiUsage } from '@/lib/api-auth';
import { getActiveSports, getComingSoonSports, getAllSportsWithStatus } from '@/lib/seasons';

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

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const includeInactive = searchParams.get('include_inactive') === 'true';

    let sports;
    
    if (includeInactive) {
      sports = getAllSportsWithStatus();
    } else {
      const active = getActiveSports();
      const comingSoon = getComingSoonSports();
      sports = { active, comingSoon };
    }

    return NextResponse.json({
      success: true,
      data: sports,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API sports/active error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
