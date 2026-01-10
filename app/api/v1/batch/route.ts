/**
 * POST /api/v1/batch
 * Batch prediction endpoint (Business tier and above)
 * Process multiple matches in a single request
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

    // Check if user has Business tier or above
    if (validation.apiKey && !['business', 'enterprise'].includes(validation.apiKey.planTier)) {
      return NextResponse.json(
        { error: 'Batch endpoint requires Business tier or above' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { requests } = body;

    if (!Array.isArray(requests) || requests.length === 0) {
      return NextResponse.json(
        { error: 'requests must be a non-empty array' },
        { status: 400 }
      );
    }

    if (requests.length > 50) {
      return NextResponse.json(
        { error: 'Maximum 50 requests per batch' },
        { status: 400 }
      );
    }

    // Process all requests
    const results = await Promise.all(
      requests.map(async (req: any, index: number) => {
        try {
          const { matchDetails, sport, query } = req;

          if (!sport || !query) {
            return {
              index,
              success: false,
              error: 'Missing required fields: sport, query',
            };
          }

          const prediction = await generatePrediction(query, sport, matchDetails);

          return {
            index,
            success: true,
            data: {
              prediction: prediction.prediction,
              confidence: prediction.confidence,
              reasoning: prediction.reasoning,
              suggestedBet: prediction.suggestedBet,
              sport,
            },
          };
        } catch (error) {
          return {
            index,
            success: false,
            error: 'Failed to generate prediction',
          };
        }
      })
    );

    // Increment usage counter for all successful requests
    if (validation.apiKey) {
      const successCount = results.filter(r => r.success).length;
      for (let i = 0; i < successCount; i++) {
        await incrementApiUsage(validation.apiKey.id);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        total: requests.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('API batch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
