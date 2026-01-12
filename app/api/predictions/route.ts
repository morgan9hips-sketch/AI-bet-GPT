import { NextRequest, NextResponse } from 'next/server';
import { generatePrediction } from '@/lib/gemini';
import { getOdds } from '@/lib/odds-api';
import { formatOddsForAI } from '@/lib/betting-context';

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

    // Fetch live odds to provide context to AI
    let oddsContext = '';
    try {
      const sportKey = sport === 'nfl' ? 'americanfootball_nfl' : 'soccer_epl';
      const oddsData = await getOdds(sportKey);
      oddsContext = formatOddsForAI(oddsData);
    } catch (error) {
      console.error('Failed to fetch odds for context:', error);
      // Continue without odds context if fetch fails
    }

    const prediction = await generatePrediction(prompt, sport, undefined, oddsContext);

    return NextResponse.json(prediction);
  } catch (error) {
    console.error('Prediction API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}
