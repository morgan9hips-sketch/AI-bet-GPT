/**
 * Sports Season Calendar System
 * Determines which sports are currently active based on the current date
 * Critical for showing only relevant sports to users
 */

export interface Sport {
  id: string;
  name: string;
  emoji: string;
  seasonStart: { month: number; day: number };
  seasonEnd: { month: number; day: number };
  leagueId?: string; // For API integration
  active?: boolean;
  comingSoon?: boolean;
}

export const SPORTS: Sport[] = [
  {
    id: 'nfl',
    name: 'NFL',
    emoji: '🏈',
    seasonStart: { month: 9, day: 1 },
    seasonEnd: { month: 2, day: 28 }, // Extends to February for playoffs
    leagueId: 'americanfootball_nfl',
  },
  {
    id: 'nba',
    name: 'NBA',
    emoji: '🏀',
    seasonStart: { month: 10, day: 1 },
    seasonEnd: { month: 6, day: 30 },
    leagueId: 'basketball_nba',
  },
  {
    id: 'nhl',
    name: 'NHL',
    emoji: '🏒',
    seasonStart: { month: 10, day: 1 },
    seasonEnd: { month: 6, day: 30 },
    leagueId: 'icehockey_nhl',
  },
  {
    id: 'epl',
    name: 'Premier League',
    emoji: '⚽',
    seasonStart: { month: 8, day: 1 },
    seasonEnd: { month: 5, day: 31 },
    leagueId: 'soccer_epl',
  },
  {
    id: 'champions-league',
    name: 'Champions League',
    emoji: '🏆',
    seasonStart: { month: 9, day: 1 },
    seasonEnd: { month: 5, day: 31 },
    leagueId: 'soccer_uefa_champs_league',
  },
  {
    id: 'mlb',
    name: 'MLB',
    emoji: '⚾',
    seasonStart: { month: 3, day: 20 },
    seasonEnd: { month: 10, day: 31 },
    leagueId: 'baseball_mlb',
  },
  {
    id: 'march-madness',
    name: 'March Madness',
    emoji: '🏀',
    seasonStart: { month: 3, day: 12 },
    seasonEnd: { month: 4, day: 10 },
    leagueId: 'basketball_ncaab',
  },
];

/**
 * Check if a sport is currently in season
 * Handles seasons that span across year boundaries (e.g., NFL: Sept to Feb)
 */
export function isSportInSeason(sport: Sport, date: Date = new Date()): boolean {
  const currentMonth = date.getMonth() + 1; // JavaScript months are 0-indexed
  const currentDay = date.getDate();
  
  const { seasonStart, seasonEnd } = sport;
  
  // Helper function to compare dates
  const isAfterOrEqual = (month: number, day: number, refMonth: number, refDay: number): boolean => {
    if (month > refMonth) return true;
    if (month < refMonth) return false;
    return day >= refDay;
  };
  
  const isBeforeOrEqual = (month: number, day: number, refMonth: number, refDay: number): boolean => {
    if (month < refMonth) return true;
    if (month > refMonth) return false;
    return day <= refDay;
  };
  
  // Season within same calendar year
  if (seasonStart.month <= seasonEnd.month) {
    return (
      isAfterOrEqual(currentMonth, currentDay, seasonStart.month, seasonStart.day) &&
      isBeforeOrEqual(currentMonth, currentDay, seasonEnd.month, seasonEnd.day)
    );
  }
  
  // Season spans across year boundary (e.g., September to February)
  return (
    isAfterOrEqual(currentMonth, currentDay, seasonStart.month, seasonStart.day) ||
    isBeforeOrEqual(currentMonth, currentDay, seasonEnd.month, seasonEnd.day)
  );
}

/**
 * Get all currently active sports
 */
export function getActiveSports(date: Date = new Date()): Sport[] {
  return SPORTS.filter(sport => isSportInSeason(sport, date)).map(sport => ({
    ...sport,
    active: true,
  }));
}

/**
 * Get inactive sports (off-season)
 */
export function getInactiveSports(date: Date = new Date()): Sport[] {
  return SPORTS.filter(sport => !isSportInSeason(sport, date)).map(sport => ({
    ...sport,
    active: false,
  }));
}

/**
 * Get sports coming soon (within 30 days)
 */
export function getComingSoonSports(date: Date = new Date()): Sport[] {
  const inactiveSports = getInactiveSports(date);
  
  return inactiveSports.filter(sport => {
    const daysUntilStart = getDaysUntilSeasonStarts(sport, date);
    return daysUntilStart !== null && daysUntilStart <= 30 && daysUntilStart > 0;
  }).map(sport => ({
    ...sport,
    comingSoon: true,
  }));
}

/**
 * Calculate days until a sport's season starts
 * Returns null if the sport is currently in season
 */
export function getDaysUntilSeasonStarts(sport: Sport, date: Date = new Date()): number | null {
  if (isSportInSeason(sport, date)) {
    return null; // Already in season
  }
  
  const currentYear = date.getFullYear();
  const { seasonStart } = sport;
  
  // Create date for season start in current year
  let seasonStartDate = new Date(currentYear, seasonStart.month - 1, seasonStart.day);
  
  // If the season start has already passed this year, it must be next year
  if (seasonStartDate < date) {
    seasonStartDate = new Date(currentYear + 1, seasonStart.month - 1, seasonStart.day);
  }
  
  const diffTime = seasonStartDate.getTime() - date.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Get a sport by its ID
 */
export function getSportById(sportId: string): Sport | undefined {
  return SPORTS.find(sport => sport.id === sportId);
}

/**
 * Format season status for display
 */
export function getSeasonStatus(sport: Sport, date: Date = new Date()): string {
  if (isSportInSeason(sport, date)) {
    return 'Active';
  }
  
  const daysUntil = getDaysUntilSeasonStarts(sport, date);
  if (daysUntil === null) {
    return 'Active';
  }
  
  if (daysUntil <= 30) {
    return `Starts in ${daysUntil} days`;
  }
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return `Season starts ${monthNames[sport.seasonStart.month - 1]}`;
}

/**
 * Get all sports with their current status
 */
export function getAllSportsWithStatus(date: Date = new Date()): Sport[] {
  return SPORTS.map(sport => ({
    ...sport,
    active: isSportInSeason(sport, date),
    comingSoon: (() => {
      const days = getDaysUntilSeasonStarts(sport, date);
      return days !== null && days <= 30 && days > 0;
    })(),
  }));
}
