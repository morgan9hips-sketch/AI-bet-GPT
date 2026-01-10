import { NextRequest, NextResponse } from 'next/server';
import { getPremierLeagueFixtures } from '@/lib/api-football';

export async function GET(request: NextRequest) {
  try {
    const fixtures = await getPremierLeagueFixtures();

    return NextResponse.json({ fixtures });
  } catch (error) {
    console.error('Fixtures API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fixtures' },
      { status: 500 }
    );
  }
}
