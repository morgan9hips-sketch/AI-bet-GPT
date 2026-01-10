/**
 * GET /api/v1/usage
 * Check API usage statistics
 * Requires Bearer token authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, getApiUsageStats } from '@/lib/api-auth';

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

    if (!validation.apiKey) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }

    // Get usage statistics
    const stats = await getApiUsageStats(validation.apiKey.id);

    return NextResponse.json({
      success: true,
      data: {
        planTier: validation.apiKey.planTier,
        callsUsed: stats.callsUsed,
        callsLimit: stats.callsLimit === -1 ? 'unlimited' : stats.callsLimit,
        callsRemaining: stats.callsRemaining === -1 ? 'unlimited' : stats.callsRemaining,
        percentageUsed: stats.percentageUsed,
        resetDate: stats.resetDate,
      },
    });
  } catch (error) {
    console.error('API usage error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
