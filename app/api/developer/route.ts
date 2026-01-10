import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    name: 'AI Bet GPT API',
    version: '1.0.0',
    endpoints: {
      predictions: '/api/developer/predictions',
      odds: '/api/developer/odds',
      fixtures: '/api/developer/fixtures',
    },
    documentation: 'https://docs.aibetgpt.com',
  });
}
