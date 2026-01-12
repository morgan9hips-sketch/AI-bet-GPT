/**
 * Timezone utilities for multi-region support
 */

/**
 * Common timezones
 */
export const TIMEZONES = {
  US_EASTERN: 'America/New_York',
  US_CENTRAL: 'America/Chicago',
  US_MOUNTAIN: 'America/Denver',
  US_PACIFIC: 'America/Los_Angeles',
  UK: 'Europe/London',
  EUROPE_CENTRAL: 'Europe/Paris',
  SOUTH_AFRICA: 'Africa/Johannesburg',
  AUSTRALIA: 'Australia/Sydney',
};

/**
 * Detect user's timezone
 */
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (error) {
    console.warn('Could not detect timezone, using UTC');
    return 'UTC';
  }
}

/**
 * Format date for a specific timezone
 */
export function formatForTimezone(
  date: Date | string,
  timezone: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
    ...options,
  };
  
  return dateObj.toLocaleString('en-US', {
    timeZone: timezone,
    ...defaultOptions,
  });
}

/**
 * Format time only for a specific timezone
 */
export function formatTimeForTimezone(
  date: Date | string,
  timezone: string
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleString('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format date only for a specific timezone
 */
export function formatDateForTimezone(
  date: Date | string,
  timezone: string
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleString('en-US', {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get timezone offset string (e.g., "+02:00")
 */
export function getTimezoneOffset(timezone: string): string {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'longOffset',
  });
  
  const parts = formatter.formatToParts(date);
  const offsetPart = parts.find(part => part.type === 'timeZoneName');
  
  if (offsetPart && offsetPart.value.includes('GMT')) {
    return offsetPart.value.replace('GMT', '');
  }
  
  return '+00:00';
}

/**
 * Convert date to ISO string in a specific timezone
 */
export function toISOStringInTimezone(date: Date | string, timezone: string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Get the date components in the target timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  
  const parts = formatter.formatToParts(dateObj);
  const getValue = (type: string) => parts.find(p => p.type === type)?.value || '00';
  
  return `${getValue('year')}-${getValue('month')}-${getValue('day')}T${getValue('hour')}:${getValue('minute')}:${getValue('second')}`;
}

/**
 * Check if a date is today in a specific timezone
 */
export function isTodayInTimezone(date: Date | string, timezone: string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  
  const dateStr = formatDateForTimezone(dateObj, timezone);
  const nowStr = formatDateForTimezone(now, timezone);
  
  return dateStr === nowStr;
}

/**
 * Check if a date is tomorrow in a specific timezone
 */
export function isTomorrowInTimezone(date: Date | string, timezone: string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dateStr = formatDateForTimezone(dateObj, timezone);
  const tomorrowStr = formatDateForTimezone(tomorrow, timezone);
  
  return dateStr === tomorrowStr;
}
