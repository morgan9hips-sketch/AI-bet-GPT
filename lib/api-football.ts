import axios from 'axios';

const API_FOOTBALL_BASE = 'https://api-football-v1.p.rapidapi.com/v3';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

const headers = {
  'X-RapidAPI-Key': RAPIDAPI_KEY || '',
  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
};

export interface FixtureData {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
  };
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
}

export async function getPremierLeagueFixtures(): Promise<FixtureData[]> {
  try {
    const response = await axios.get(`${API_FOOTBALL_BASE}/fixtures`, {
      headers,
      params: {
        league: 39, // Premier League ID
        season: new Date().getFullYear(),
        next: 10,
      },
    });
    return response.data.response || [];
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return [];
  }
}

export async function getTeamStatistics(teamId: number, season: number) {
  try {
    const response = await axios.get(`${API_FOOTBALL_BASE}/teams/statistics`, {
      headers,
      params: {
        team: teamId,
        season,
        league: 39,
      },
    });
    return response.data.response;
  } catch (error) {
    console.error('Error fetching team statistics:', error);
    return null;
  }
}

export async function getStandings(league: number, season: number) {
  try {
    const response = await axios.get(`${API_FOOTBALL_BASE}/standings`, {
      headers,
      params: {
        league,
        season,
      },
    });
    return response.data.response || [];
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
}
