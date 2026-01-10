import axios from 'axios';

const ODDS_API_BASE = 'https://api.the-odds-api.com/v4';
const API_KEY = process.env.ODDS_API_KEY;

export interface OddsData {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Array<{
    key: string;
    title: string;
    markets: Array<{
      key: string;
      outcomes: Array<{
        name: string;
        price: number;
      }>;
    }>;
  }>;
}

export async function getOdds(sport: 'americanfootball_nfl' | 'soccer_epl'): Promise<OddsData[]> {
  try {
    const response = await axios.get(`${ODDS_API_BASE}/sports/${sport}/odds`, {
      params: {
        apiKey: API_KEY,
        regions: 'us',
        markets: 'h2h,spreads,totals',
        oddsFormat: 'american',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching odds:', error);
    return [];
  }
}

export async function getSports() {
  try {
    const response = await axios.get(`${ODDS_API_BASE}/sports`, {
      params: {
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sports:', error);
    return [];
  }
}
