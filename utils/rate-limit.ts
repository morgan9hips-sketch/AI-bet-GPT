// Simple in-memory rate limiter
// For production, consider using Redis or a dedicated rate limiting service

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  interval: number; // in milliseconds
  maxRequests: number;
}

export function rateLimit(config: RateLimitConfig) {
  return {
    check: (identifier: string): { success: boolean; remaining: number; resetTime: number } => {
      const now = Date.now();
      const record = store[identifier];

      // If no record exists or the time window has passed, create a new record
      if (!record || now > record.resetTime) {
        store[identifier] = {
          count: 1,
          resetTime: now + config.interval,
        };
        return {
          success: true,
          remaining: config.maxRequests - 1,
          resetTime: now + config.interval,
        };
      }

      // Increment the count
      record.count++;

      // Check if limit exceeded
      if (record.count > config.maxRequests) {
        return {
          success: false,
          remaining: 0,
          resetTime: record.resetTime,
        };
      }

      return {
        success: true,
        remaining: config.maxRequests - record.count,
        resetTime: record.resetTime,
      };
    },
  };
}

// Predefined rate limit configurations
export const RATE_LIMITS = {
  FREE_TIER: {
    interval: 24 * 60 * 60 * 1000, // 24 hours
    maxRequests: 5,
  },
  PREMIUM_TIER: {
    interval: 60 * 60 * 1000, // 1 hour
    maxRequests: 1000,
  },
  API_STARTER: {
    interval: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxRequests: 10000,
  },
  API_PROFESSIONAL: {
    interval: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxRequests: 50000,
  },
  API_ENTERPRISE: {
    interval: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxRequests: 200000,
  },
};
