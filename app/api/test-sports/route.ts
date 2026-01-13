import { NextResponse } from 'next/server';

// Sports to test against The Odds API
const SPORTS_TO_TEST = [
  // American Sports
  'americanfootball_nfl',
  'basketball_nba',
  'icehockey_nhl',
  'baseball_mlb',
  
  // Soccer
  'soccer_epl',
  'soccer_uefa_champs_league',
  'soccer_france_ligue_one',
  'soccer_spain_la_liga',
  'soccer_germany_bundesliga',
  'soccer_italy_serie_a',
  
  // South African Sports (to verify availability)
  'soccer_south_africa_premiership',
  'rugbyunion_super_rugby',
  'cricket_test_match',
  'cricket_international_t20',
  
  // Other
  'mma_mixed_martial_arts',
];

export async function GET() {
  const API_KEY = process.env.ODDS_API_KEY;
  
  if (!API_KEY) {
    return NextResponse.json({
      error: 'ODDS_API_KEY not configured',
    }, { status: 500 });
  }

  const results = await Promise.all(
    SPORTS_TO_TEST.map(async (sportKey) => {
      try {
        const url = `https://api.the-odds-api.com/v4/sports/${sportKey}/odds?apiKey=${API_KEY}&regions=us,uk`;
        const response = await fetch(url, { 
          method: 'GET',
          cache: 'no-store',
        });
        
        return {
          sportKey,
          available: response.ok,
          status: response.status,
          statusText: response.statusText,
        };
      } catch (error: any) {
        return {
          sportKey,
          available: false,
          status: 0,
          error: error.message,
        };
      }
    })
  );

  // Separate available and unavailable sports
  const available = results.filter(r => r.available);
  const unavailable = results.filter(r => !r.available);

  return NextResponse.json({
    summary: {
      total: results.length,
      available: available.length,
      unavailable: unavailable.length,
    },
    available: available.map(r => r.sportKey),
    unavailable: unavailable.map(r => ({ 
      sportKey: r.sportKey, 
      status: r.status,
      statusText: r.statusText 
    })),
    details: results,
  });
}
