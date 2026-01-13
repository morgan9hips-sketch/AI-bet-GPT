/**
 * Sport configuration for the multi-sport betting platform
 */

export interface Sport {
  id: string;
  name: string;
  category: 'American' | 'Soccer' | 'South African' | 'Other';
  flag: string;
  enabled: boolean;
  regions?: string[]; // Bookmaker regions (us, uk, eu, za)
}

export const AVAILABLE_SPORTS: Sport[] = [
  // American Sports
  { 
    id: 'americanfootball_nfl', 
    name: 'NFL', 
    category: 'American', 
    flag: '🏈',
    enabled: true,
    regions: ['us']
  },
  { 
    id: 'basketball_nba', 
    name: 'NBA', 
    category: 'American', 
    flag: '🏀',
    enabled: true,
    regions: ['us']
  },
  { 
    id: 'baseball_mlb', 
    name: 'MLB', 
    category: 'American', 
    flag: '⚾',
    enabled: true,
    regions: ['us']
  },
  { 
    id: 'icehockey_nhl', 
    name: 'NHL', 
    category: 'American', 
    flag: '🏒',
    enabled: true,
    regions: ['us']
  },
  
  // Soccer
  { 
    id: 'soccer_epl', 
    name: 'Premier League (England)', 
    category: 'Soccer', 
    flag: '⚽',
    enabled: true,
    regions: ['us', 'uk', 'eu']
  },
  { 
    id: 'soccer_uefa_champs_league', 
    name: 'Champions League', 
    category: 'Soccer', 
    flag: '⚽',
    enabled: true,
    regions: ['us', 'uk', 'eu']
  },
  { 
    id: 'soccer_spain_la_liga', 
    name: 'La Liga (Spain)', 
    category: 'Soccer', 
    flag: '⚽',
    enabled: true,
    regions: ['us', 'uk', 'eu']
  },
  { 
    id: 'soccer_germany_bundesliga', 
    name: 'Bundesliga (Germany)', 
    category: 'Soccer', 
    flag: '⚽',
    enabled: true,
    regions: ['us', 'uk', 'eu']
  },
  { 
    id: 'soccer_italy_serie_a', 
    name: 'Serie A (Italy)', 
    category: 'Soccer', 
    flag: '⚽',
    enabled: true,
    regions: ['us', 'uk', 'eu']
  },
  { 
    id: 'soccer_france_ligue_one', 
    name: 'Ligue 1 (France)', 
    category: 'Soccer', 
    flag: '⚽',
    enabled: true,
    regions: ['us', 'uk', 'eu']
  },
  
  // South African Sports 🇿🇦
  { 
    id: 'soccer_south_africa_premiership', 
    name: 'PSL - Premier Soccer League', 
    category: 'South African', 
    flag: '⚽🇿🇦',
    enabled: true,
    regions: ['uk', 'za']
  },
  { 
    id: 'rugbyunion_super_rugby', 
    name: 'URC Rugby (Bulls, Stormers, Sharks, Lions)', 
    category: 'South African', 
    flag: '🏉🇿🇦',
    enabled: true,
    regions: ['uk', 'za']
  },
  { 
    id: 'cricket_test_match', 
    name: 'Cricket - Proteas (South Africa)', 
    category: 'South African', 
    flag: '🏏🇿🇦',
    enabled: true,
    regions: ['uk', 'za']
  },
  
  // Other Sports
  { 
    id: 'mma_mixed_martial_arts', 
    name: 'UFC/MMA', 
    category: 'Other', 
    flag: '🥊',
    enabled: true,
    regions: ['us', 'uk']
  },
];

/**
 * Get sport by ID
 */
export function getSportById(id: string): Sport | undefined {
  return AVAILABLE_SPORTS.find(sport => sport.id === id);
}

/**
 * Get sports by category
 */
export function getSportsByCategory(category: Sport['category']): Sport[] {
  return AVAILABLE_SPORTS.filter(sport => sport.category === category && sport.enabled);
}

/**
 * Get all enabled sports
 */
export function getEnabledSports(): Sport[] {
  return AVAILABLE_SPORTS.filter(sport => sport.enabled);
}

/**
 * Get sport categories
 */
export function getSportCategories(): Array<Sport['category']> {
  return ['American', 'Soccer', 'South African', 'Other'];
}

/**
 * Get default sport (most popular)
 */
export function getDefaultSport(): Sport {
  return AVAILABLE_SPORTS[0]; // NFL as default
}

/**
 * Map legacy sport names to API IDs
 */
export function mapLegacySportName(sport: string): string {
  const legacyMap: Record<string, string> = {
    'nfl': 'americanfootball_nfl',
    'epl': 'soccer_epl',
    'nba': 'basketball_nba',
    'mlb': 'baseball_mlb',
    'nhl': 'icehockey_nhl',
  };
  
  return legacyMap[sport.toLowerCase()] || sport;
}

/**
 * Sport-specific analysis factors for AI
 */
export const SPORT_ANALYSIS_FACTORS: Record<string, string[]> = {
  // NFL
  americanfootball_nfl: [
    'Injuries and inactive players',
    'Weather conditions (wind, temperature, precipitation)',
    'Home/away records',
    'Head-to-head history',
    'Division rivalry factors',
    'Recent form (last 5 games)',
    'Offensive and defensive rankings',
    'Turnover differential'
  ],
  
  // NBA
  basketball_nba: [
    'Back-to-back games and rest days',
    'Home/away performance',
    'Injury reports (especially star players)',
    'Head-to-head matchups',
    'Recent form and momentum',
    'Pace and scoring trends',
    'Defensive efficiency'
  ],
  
  // MLB
  baseball_mlb: [
    'Starting pitcher matchup',
    'Bullpen strength',
    'Home/away splits',
    'Weather (wind direction, temperature)',
    'Recent batting form',
    'Head-to-head records',
    'Ballpark factors'
  ],
  
  // NHL
  icehockey_nhl: [
    'Goalie matchups',
    'Home/away records',
    'Recent form (last 10 games)',
    'Special teams (power play/penalty kill)',
    'Rest days between games',
    'Head-to-head history',
    'Injuries'
  ],
  
  // Soccer (general)
  soccer: [
    'Recent form (last 5 matches)',
    'Head-to-head records',
    'League position and points',
    'Home/away performance',
    'Injuries and suspensions',
    'Motivation factors (title race, relegation battle)',
    'Squad rotation and fixture congestion',
    'Tactical matchups'
  ],
  
  // Rugby
  rugby: [
    'Forward pack dominance',
    'Try-scoring records',
    'Home advantage',
    'Weather conditions',
    'Recent form',
    'Head-to-head history',
    'Injury list (especially front row)',
    'Defensive strength'
  ],
  
  // Cricket
  cricket: [
    'Pitch conditions',
    'Weather forecast',
    'Batting/bowling lineups',
    'Recent form in format',
    'Head-to-head records',
    'Home advantage',
    'Powerplay performance',
    'Death bowling strength'
  ],
  
  // UFC/MMA
  mma_mixed_martial_arts: [
    'Fight styles and matchup',
    'Recent form and momentum',
    'Reach and size advantage',
    'Ground game vs striking',
    'Cardio and conditioning',
    'Experience level',
    'Home crowd advantage',
    'Weight cut issues'
  ]
};

/**
 * Get analysis factors for a sport
 */
export function getAnalysisFactors(sportId: string): string[] {
  // Check for exact match
  if (SPORT_ANALYSIS_FACTORS[sportId]) {
    return SPORT_ANALYSIS_FACTORS[sportId];
  }
  
  // Check if it's a soccer league
  if (sportId.startsWith('soccer_')) {
    return SPORT_ANALYSIS_FACTORS.soccer;
  }
  
  // Check if it's rugby
  if (sportId.includes('rugby')) {
    return SPORT_ANALYSIS_FACTORS.rugby;
  }
  
  // Check if it's cricket
  if (sportId.includes('cricket')) {
    return SPORT_ANALYSIS_FACTORS.cricket;
  }
  
  // Default factors
  return [
    'Recent form',
    'Head-to-head history',
    'Home/away advantage',
    'Injuries and team news',
    'Motivation factors'
  ];
}
