/**
 * POST /api/v1/analyze
 * Main prediction endpoint for B2B API
 * Requires Bearer token authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey, incrementApiUsage } from '@/lib/api-auth';
import { generatePrediction } from '@/lib/gemini';

export async function POST(request: NextRequest) {
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

    // Parse request body
    const body = await request.json();
    const { matchDetails, sport, query } = body;

    if (!sport || !query) {
      return NextResponse.json(
        { error: 'Missing required fields: sport, query' },
        { status: 400 }
      );
    }

    // Validate sport
    const validSports = ['nfl', 'nba', 'nhl', 'epl', 'champions-league', 'mlb', 'march-madness'];
    if (!validSports.includes(sport)) {
      return NextResponse.json(
        { error: `Invalid sport. Must be one of: ${validSports.join(', ')}` },
        { status: 400 }
      );
    }

    // Generate prediction
    const prediction = await generatePrediction(query, sport, matchDetails);

    return NextResponse.json({
      success: true,
      data: {
        prediction: prediction.prediction,
        confidence: prediction.confidence,
        reasoning: prediction.reasoning,
        suggestedBet: prediction.suggestedBet,
        sport,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('API analyze error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
