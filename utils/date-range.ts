/**
 * Date range utilities for fixture filtering
 */

/**
 * Get date range for next N days
 */
export function getDateRange(days: number = 5): { from: Date; to: Date } {
  const now = new Date();
  const from = new Date(now);
  from.setHours(0, 0, 0, 0); // Start of today
  
  const to = new Date(now);
  to.setDate(to.getDate() + days);
  to.setHours(23, 59, 59, 999); // End of last day
  
  return { from, to };
}

/**
 * Get ISO string for date range (for API calls)
 */
export function getDateRangeISO(days: number = 5): { from: string; to: string } {
  const { from, to } = getDateRange(days);
  return {
    from: from.toISOString(),
    to: to.toISOString(),
  };
}

/**
 * Get Unix timestamp for date range
 */
export function getDateRangeUnix(days: number = 5): { from: number; to: number } {
  const { from, to } = getDateRange(days);
  return {
    from: Math.floor(from.getTime() / 1000),
    to: Math.floor(to.getTime() / 1000),
  };
}

/**
 * Get array of dates for next N days
 */
export function getDateArray(days: number = 5): Date[] {
  const dates: Date[] = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    dates.push(date);
  }
  
  return dates;
}

/**
 * Get date labels for UI (Today, Tomorrow, Day+2, etc.)
 */
export function getDateLabels(days: number = 5): Array<{ date: Date; label: string; shortLabel: string }> {
  const labels: Array<{ date: Date; label: string; shortLabel: string }> = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    
    let label: string;
    let shortLabel: string;
    
    if (i === 0) {
      label = 'Today';
      shortLabel = 'Today';
    } else if (i === 1) {
      label = 'Tomorrow';
      shortLabel = 'Tom';
    } else {
      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      label = `${weekday}, ${month} ${day}`;
      shortLabel = date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
    }
    
    labels.push({ date, label, shortLabel });
  }
  
  return labels;
}

/**
 * Check if a date is within range
 */
export function isDateInRange(date: Date | string, days: number = 5): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const { from, to } = getDateRange(days);
  
  return dateObj >= from && dateObj <= to;
}

/**
 * Group items by date
 */
export function groupByDate<T>(
  items: T[],
  getDate: (item: T) => Date | string
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  
  items.forEach(item => {
    const date = getDate(item);
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const dateKey = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
    
    const group = grouped.get(dateKey);
    if (group) {
      group.push(item);
    } else {
      grouped.set(dateKey, [item]);
    }
  });
  
  return grouped;
}

/**
 * Format date for grouping header
 */
export function formatDateGroupHeader(dateKey: string): string {
  const date = new Date(dateKey);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === now.toDateString()) {
    return `Today - ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow - ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
}

/**
 * Get relative day label (Today, Tomorrow, etc.)
 */
export function getRelativeDayLabel(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const dateCopy = new Date(dateObj);
  dateCopy.setHours(0, 0, 0, 0);
  
  const diffTime = dateCopy.getTime() - now.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 1 && diffDays <= 7) return `In ${diffDays} days`;
  if (diffDays < -1 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;
  
  return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
