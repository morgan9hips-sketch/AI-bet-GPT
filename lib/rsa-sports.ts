/**
 * South African sports configuration and bookmakers
 */

export interface RSABookmaker {
  name: string;
  url: string;
  region: string;
  logo?: string;
}

export const RSA_BOOKMAKERS: RSABookmaker[] = [
  { 
    name: 'Hollywoodbets', 
    url: 'https://www.hollywoodbets.net', 
    region: 'ZA',
    logo: '🎬'
  },
  { 
    name: 'Betway Africa', 
    url: 'https://betway.co.za', 
    region: 'ZA',
    logo: '🦁'
  },
  { 
    name: 'Supabets', 
    url: 'https://www.supabets.co.za', 
    region: 'ZA',
    logo: '⭐'
  },
  { 
    name: 'Sportingbet', 
    url: 'https://www.sportingbet.co.za', 
    region: 'ZA',
    logo: '🎰'
  },
];

export const RSA_SPORTS = {
  // PSL - Premier Soccer League (South Africa)
  soccer: 'soccer_south_africa_premiership',
  
  // Rugby competitions involving South African teams
  rugby: 'rugbyunion_super_rugby',
  rugbyWorldCup: 'rugbyunion_world_cup',
  currieCup: 'rugbyunion_currie_cup',
  
  // Cricket - South African domestic and international
  cricket: 'cricket_international_t20',
  cricketT20: 'cricket_t20_challenge',
  cricketOneDayCup: 'cricket_one_day_cup',
};

/**
 * South African timezone (SAST - UTC+2)
 */
export const RSA_TIMEZONE = 'Africa/Johannesburg';
export const RSA_TIMEZONE_OFFSET = '+02:00';

/**
 * Get RSA bookmakers list
 */
export function getRSABookmakers(): RSABookmaker[] {
  return RSA_BOOKMAKERS;
}

/**
 * Get RSA sports list
 */
export function getRSASports() {
  return RSA_SPORTS;
}

/**
 * Check if a sport is South African
 */
export function isRSASport(sportId: string): boolean {
  return Object.values(RSA_SPORTS).includes(sportId) || 
         sportId.includes('south_africa');
}

/**
 * Format time for South African timezone
 */
export function formatRSATime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleString('en-ZA', {
    timeZone: RSA_TIMEZONE,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}
