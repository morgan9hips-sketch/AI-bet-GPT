import { NextRequest, NextResponse } from 'next/server';
import { generatePrediction } from '@/lib/gemini';
import { getOdds } from '@/lib/odds-api';
import { formatOddsForAI } from '@/lib/betting-context';
import { getSportById } from '@/lib/sport-config';

export async function POST(request: NextRequest) {
  try {
    const { prompt, sport, sports } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Missing prompt field' },
        { status: 400 }
      );
    }

    // Support both single sport and multiple sports
    const requestedSports = sports || (sport ? [sport] : ['americanfootball_nfl']);

    // TODO: Check user subscription tier and daily limits
    // TODO: Track prediction usage in database

    // Fetch live odds to provide context to AI
    let oddsContext = '';
    try {
      // For multi-sport requests, fetch odds for all sports
      if (requestedSports.length > 1) {
        const oddsPromises = requestedSports.map(async (s: string) => {
          try {
            // Map legacy sport names to API IDs
            const sportId = s === 'nfl' ? 'americanfootball_nfl' : 
                           s === 'epl' ? 'soccer_epl' : s;
            
            const sportConfig = getSportById(sportId);
            if (!sportConfig || !sportConfig.enabled) {
              return { sportId, odds: [] };
            }
            
            const odds = await getOdds(sportId, { days: 5 });
            return { sportId, odds };
          } catch (error) {
            console.error(`Failed to fetch odds for ${s}:`, error);
            return { sportId: s, odds: [] };
          }
        });
        
        const results = await Promise.all(oddsPromises);
        const oddsDataBySport: Record<string, any[]> = {};
        results.forEach(({ sportId, odds }) => {
          oddsDataBySport[sportId] = odds;
        });
        
        // Use multi-sport formatting
        const { formatMultiSportOddsForAI } = await import('@/lib/betting-context');
        oddsContext = formatMultiSportOddsForAI(oddsDataBySport);
      } else {
        // Single sport request
        const sportId = requestedSports[0] === 'nfl' ? 'americanfootball_nfl' : 
                       requestedSports[0] === 'epl' ? 'soccer_epl' : 
                       requestedSports[0];
        
        const sportConfig = getSportById(sportId);
        if (sportConfig && sportConfig.enabled) {
          const oddsData = await getOdds(sportId, { days: 5 });
          oddsContext = formatOddsForAI(oddsData, sportId);
        }
      }
    } catch (error) {
      console.error('Failed to fetch odds for context:', error);
      // Continue without odds context if fetch fails
    }

    const prediction = await generatePrediction(
      prompt, 
      requestedSports.length > 1 ? 'multi-sport' : requestedSports[0], 
      undefined, 
      oddsContext
    );

    return NextResponse.json(prediction);
  } catch (error: any) {
    console.error('[Prediction API] Error:', error.message);
    return NextResponse.json(
      { error: 'Failed to generate prediction', message: error.message },
      { status: 500 }
    );
  }
}
