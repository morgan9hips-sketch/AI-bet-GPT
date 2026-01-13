import axios from 'axios';
import { getSportById } from './sport-config';
import { isRSASport } from './rsa-sports';

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
        point?: number; // For spreads and totals
      }>;
    }>;
  }>;
}

export interface OddsOptions {
  days?: number; // Number of days to fetch (default: 5)
  regions?: string; // Bookmaker regions (default: based on sport)
  markets?: string; // Markets to fetch (default: h2h,spreads,totals)
  oddsFormat?: 'american' | 'decimal'; // Odds format (default: american)
}

/**
 * Get odds for a specific sport with optional date range
 */
export async function getOdds(sport: string, options: OddsOptions = {}): Promise<OddsData[]> {
  const {
    days = 5,
    markets = 'h2h,spreads,totals',
    oddsFormat = 'american',
  } = options;

  try {
    // Determine regions based on sport
    let regions = options.regions;
    if (!regions) {
      const sportConfig = getSportById(sport);
      if (sportConfig?.regions) {
        regions = sportConfig.regions.join(',');
      } else if (isRSASport(sport)) {
        regions = 'uk,za';
      } else if (sport.startsWith('soccer_')) {
        regions = 'us,uk,eu';
      } else {
        regions = 'us';
      }
    }

    // Calculate date range
    const now = new Date();
    const commenceTimeFrom = now.toISOString();
    
    const to = new Date(now);
    to.setDate(to.getDate() + days);
    const commenceTimeTo = to.toISOString();

    if (process.env.NODE_ENV === 'development') {
      console.log(`[OddsAPI] Fetching ${sport} odds from ${commenceTimeFrom} to ${commenceTimeTo}`);
      console.log(`[OddsAPI] URL: ${ODDS_API_BASE}/sports/${sport}/odds`);
      console.log(`[OddsAPI] Regions: ${regions}, Markets: ${markets}`);
    }

    const response = await axios.get(`${ODDS_API_BASE}/sports/${sport}/odds`, {
      params: {
        apiKey: API_KEY,
        regions,
        markets,
        oddsFormat,
        dateFormat: 'iso',
        commenceTimeFrom,
        commenceTimeTo,
      },
      timeout: 10000, // 10 second timeout
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`[OddsAPI] Response status: ${response.status}`);
      console.log(`[OddsAPI] Fetched ${response.data?.length || 0} fixtures for ${sport}`);
    }
    
    return response.data || [];
  } catch (error: any) {
    if (error.response?.status === 422) {
      console.error(`[OddsAPI] Sport "${sport}" not available via The Odds API (422 error)`);
      const err: any = new Error(`Sport "${sport}" is not currently available. Try NFL, NBA, or EPL.`);
      err.status = 422;
      throw err;
    } else if (error.response?.status === 429) {
      console.error('[OddsAPI] Rate limit exceeded');
      throw new Error('Rate limit exceeded. Please try again later.');
    } else if (error.response?.status === 401) {
      console.error('[OddsAPI] Invalid API key');
      throw new Error('Invalid API key configuration');
    } else if (error.code === 'ECONNABORTED') {
      console.error('[OddsAPI] Request timeout');
      throw new Error('Request timeout. Please try again.');
    } else {
      console.error('[OddsAPI] Error fetching odds:', error.message);
      if (error.response) {
        console.error(`[OddsAPI] Response status: ${error.response.status}`);
        console.error(`[OddsAPI] Response data:`, error.response.data);
      }
      throw new Error(`Failed to fetch odds: ${error.message}`);
    }
  }
}

export async function getSports() {
  try {
    const response = await axios.get(`${ODDS_API_BASE}/sports`, {
      params: {
        apiKey: API_KEY,
      },
      timeout: 5000,
    });
    return response.data;
  } catch (error: any) {
    console.error('[OddsAPI] Error fetching sports:', error.message);
    return [];
  }
}

/**
 * Get multiple sports odds in parallel
 */
export async function getMultipleSportsOdds(
  sports: string[],
  options: OddsOptions = {}
): Promise<Record<string, OddsData[]>> {
  const results: Record<string, OddsData[]> = {};

  try {
    const promises = sports.map(async (sport) => {
      try {
        const odds = await getOdds(sport, options);
        return { sport, odds };
      } catch (error) {
        console.error(`[OddsAPI] Failed to fetch odds for ${sport}:`, error);
        return { sport, odds: [] };
      }
    });

    const settled = await Promise.all(promises);
    settled.forEach(({ sport, odds }) => {
      results[sport] = odds;
    });

    return results;
  } catch (error) {
    console.error('[OddsAPI] Error fetching multiple sports:', error);
    return results;
  }
}
