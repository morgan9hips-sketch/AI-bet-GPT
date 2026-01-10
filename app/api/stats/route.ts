import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch user stats from database
    const stats = {
      total_predictions: 0,
      total_bets: 0,
      won_bets: 0,
      lost_bets: 0,
      pending_bets: 0,
      win_rate: 0,
      total_staked: 0,
      total_won: 0,
      profit_loss: 0,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
