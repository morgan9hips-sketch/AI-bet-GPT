/**
 * Caching utilities for API responses
 * Uses Supabase for persistence with TTL
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabase: ReturnType<typeof createClient> | null = null;

// Initialize Supabase client only if credentials are available
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export interface CacheOptions {
  ttl: number; // Time to live in seconds
}

export const CACHE_DURATIONS = {
  ODDS: 15 * 60, // 15 minutes
  TEAM_STATS: 60 * 60, // 1 hour
  HISTORICAL_DATA: 24 * 60 * 60, // 24 hours
  MATCH_SCHEDULES: 12 * 60 * 60, // 12 hours
  PLAYER_INFO: 6 * 60 * 60, // 6 hours
  FIXTURES: 30 * 60, // 30 minutes
};

/**
 * In-memory cache fallback if Supabase is not available
 */
const memoryCache: Map<string, { value: any; expiresAt: Date }> = new Map();

/**
 * Get cached data
 */
export async function getCached<T>(key: string): Promise<T | null> {
  // Try Supabase cache first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('cache')
        .select('value, expires_at')
        .eq('key', key)
        .single();

      if (error) {
        console.error('Cache read error:', error);
        return getMemoryCached<T>(key);
      }

      if (data && new Date(data.expires_at) > new Date()) {
        return data.value as T;
      }

      // Expired, delete it
      if (data) {
        await supabase.from('cache').delete().eq('key', key);
      }

      return null;
    } catch (error) {
      console.error('Cache error:', error);
      return getMemoryCached<T>(key);
    }
  }

  // Fallback to memory cache
  return getMemoryCached<T>(key);
}

/**
 * Set cached data
 */
export async function setCached<T>(
  key: string,
  value: T,
  options: CacheOptions
): Promise<void> {
  const expiresAt = new Date(Date.now() + options.ttl * 1000);

  // Try Supabase cache first
  if (supabase) {
    try {
      const { error } = await supabase.from('cache').upsert(
        {
          key,
          value,
          expires_at: expiresAt.toISOString(),
        },
        { onConflict: 'key' }
      );

      if (error) {
        console.error('Cache write error:', error);
        setMemoryCached(key, value, expiresAt);
      }
      return;
    } catch (error) {
      console.error('Cache error:', error);
      setMemoryCached(key, value, expiresAt);
    }
  }

  // Fallback to memory cache
  setMemoryCached(key, value, expiresAt);
}

/**
 * Delete cached data
 */
export async function deleteCached(key: string): Promise<void> {
  if (supabase) {
    try {
      await supabase.from('cache').delete().eq('key', key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  memoryCache.delete(key);
}

/**
 * Clear all expired cache entries
 */
export async function clearExpiredCache(): Promise<void> {
  if (supabase) {
    try {
      await supabase.from('cache').delete().lt('expires_at', new Date().toISOString());
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }

  // Clear expired memory cache
  const now = new Date();
  for (const [key, { expiresAt }] of memoryCache.entries()) {
    if (expiresAt < now) {
      memoryCache.delete(key);
    }
  }
}

/**
 * Get data from memory cache
 */
function getMemoryCached<T>(key: string): T | null {
  const cached = memoryCache.get(key);
  if (!cached) return null;

  if (cached.expiresAt < new Date()) {
    memoryCache.delete(key);
    return null;
  }

  return cached.value as T;
}

/**
 * Set data in memory cache
 */
function setMemoryCached<T>(key: string, value: T, expiresAt: Date): void {
  memoryCache.set(key, { value, expiresAt });

  // Limit memory cache size
  if (memoryCache.size > 100) {
    const firstKey = memoryCache.keys().next().value;
    if (firstKey) {
      memoryCache.delete(firstKey);
    }
  }
}

/**
 * Wrapper function to cache API calls
 */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions
): Promise<T> {
  // Try to get from cache
  const cached = await getCached<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Fetch fresh data
  const data = await fetcher();

  // Store in cache
  await setCached(key, data, options);

  return data;
}

/**
 * Generate cache key
 */
export function generateCacheKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return `${prefix}:${sortedParams}`;
}

/**
 * Get time since last cache update
 */
export async function getCacheAge(key: string): Promise<number | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('cache')
        .select('created_at')
        .eq('key', key)
        .single();

      if (error || !data) return null;

      const createdAt = new Date(data.created_at);
      const now = new Date();
      const ageInSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

      return ageInSeconds;
    } catch (error) {
      return null;
    }
  }

  const cached = memoryCache.get(key);
  if (!cached) return null;

  // For memory cache, we don't track creation time, only expiration
  // Return approximate age based on TTL
  return 0;
}

/**
 * Format cache age for display
 */
export function formatCacheAge(ageInSeconds: number | null): string {
  if (ageInSeconds === null) return 'Just now';

  if (ageInSeconds < 60) {
    return `${ageInSeconds} seconds ago`;
  }

  const minutes = Math.floor(ageInSeconds / 60);
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours} hour${hours > 1 ? 's' : ''} ago`;
}
