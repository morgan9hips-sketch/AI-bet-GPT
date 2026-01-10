import { NextRequest, NextResponse } from 'next/server';
import { getOdds } from '@/lib/odds-api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sport = searchParams.get('sport') as 'americanfootball_nfl' | 'soccer_epl';

    if (!sport) {
      return NextResponse.json(
        { error: 'Sport parameter is required' },
        { status: 400 }
      );
    }

    const odds = await getOdds(sport);

    return NextResponse.json({ odds });
  } catch (error) {
    console.error('Odds API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch odds' },
      { status: 500 }
    );
  }
}
