import { NextRequest, NextResponse } from 'next/server';
import { generatePrediction } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { prompt, sport } = await request.json();

    if (!prompt || !sport) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Check user subscription tier and daily limits
    // TODO: Track prediction usage in database

    const prediction = await generatePrediction(prompt, sport);

    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Prediction API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}
