/**
 * API Authentication and Authorization
 * Handles API key generation, validation, and rate limiting for B2B API
 */

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export interface ApiKey {
  id: string;
  userId: string;
  keyHash: string;
  keyPrefix: string;
  planTier: 'hobby' | 'pro' | 'business' | 'enterprise';
  callsLimit: number;
  callsUsed: number;
  resetDate: string;
  lastUsedAt?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ApiKeyValidation {
  isValid: boolean;
  apiKey?: ApiKey;
  error?: string;
}

export const API_TIER_LIMITS = {
  hobby: {
    callsPerMonth: 1000,
    price: 49,
  },
  pro: {
    callsPerMonth: 10000,
    price: 149,
  },
  business: {
    callsPerMonth: 100000,
    price: 499,
  },
  enterprise: {
    callsPerMonth: -1, // Unlimited
    price: null, // Custom pricing
  },
};

/**
 * Generate a new API key
 * Format: bet_live_[random_hash]
 */
export function generateApiKey(): { key: string; hash: string; prefix: string } {
  const randomBytes = crypto.randomBytes(32).toString('hex');
  const key = `bet_live_${randomBytes}`;
  const hash = hashApiKey(key);
  const prefix = key.substring(0, 16); // Store prefix for display

  return { key, hash, prefix };
}

/**
 * Hash API key for secure storage
 */
export function hashApiKey(key: string): string {
  return crypto.createHash('sha256').update(key).digest('hex');
}

/**
 * Validate API key from Authorization header
 */
export async function validateApiKey(authHeader: string | null): Promise<ApiKeyValidation> {
  if (!authHeader) {
    return { isValid: false, error: 'Missing Authorization header' };
  }

  if (!authHeader.startsWith('Bearer ')) {
    return { isValid: false, error: 'Invalid Authorization header format' };
  }

  const key = authHeader.replace('Bearer ', '').trim();

  if (!key.startsWith('bet_live_')) {
    return { isValid: false, error: 'Invalid API key format' };
  }

  const keyHash = hashApiKey(key);

  if (!supabase) {
    return { isValid: false, error: 'Database connection not available' };
  }

  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key_hash', keyHash)
      .single();

    if (error || !data) {
      return { isValid: false, error: 'Invalid API key' };
    }

    const apiKey = data as unknown as ApiKey;

    if (!apiKey.isActive) {
      return { isValid: false, error: 'API key is inactive' };
    }

    // Check if reset date has passed
    const resetDate = new Date(apiKey.resetDate);
    const now = new Date();

    if (now > resetDate) {
      // Reset usage counter
      const nextResetDate = new Date(now);
      nextResetDate.setMonth(nextResetDate.getMonth() + 1);

      await supabase
        .from('api_keys')
        .update({
          calls_used: 0,
          reset_date: nextResetDate.toISOString(),
        })
        .eq('id', apiKey.id);

      apiKey.callsUsed = 0;
      apiKey.resetDate = nextResetDate.toISOString();
    }

    // Check rate limit
    if (apiKey.callsLimit !== -1 && apiKey.callsUsed >= apiKey.callsLimit) {
      return {
        isValid: false,
        error: `Rate limit exceeded. Limit resets on ${new Date(apiKey.resetDate).toLocaleDateString()}`,
      };
    }

    return { isValid: true, apiKey };
  } catch (error) {
    console.error('API key validation error:', error);
    return { isValid: false, error: 'Internal server error' };
  }
}

/**
 * Increment API call counter
 */
export async function incrementApiUsage(apiKeyId: string): Promise<void> {
  if (!supabase) return;

  try {
    await supabase.rpc('increment_api_calls', { api_key_id: apiKeyId });
    
    // Also update last_used_at
    await supabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', apiKeyId);
  } catch (error) {
    console.error('Error incrementing API usage:', error);
  }
}

/**
 * Create a new API key for a user
 */
export async function createApiKey(
  userId: string,
  planTier: ApiKey['planTier']
): Promise<{ success: boolean; apiKey?: string; error?: string }> {
  if (!supabase) {
    return { success: false, error: 'Database connection not available' };
  }

  const { key, hash, prefix } = generateApiKey();
  const callsLimit = API_TIER_LIMITS[planTier].callsPerMonth;
  
  const resetDate = new Date();
  resetDate.setMonth(resetDate.getMonth() + 1);

  try {
    const { error } = await supabase.from('api_keys').insert({
      user_id: userId,
      key_hash: hash,
      key_prefix: prefix,
      plan_tier: planTier,
      calls_limit: callsLimit,
      calls_used: 0,
      reset_date: resetDate.toISOString(),
      is_active: true,
    });

    if (error) {
      console.error('Error creating API key:', error);
      return { success: false, error: 'Failed to create API key' };
    }

    return { success: true, apiKey: key };
  } catch (error) {
    console.error('Error creating API key:', error);
    return { success: false, error: 'Internal server error' };
  }
}

/**
 * Revoke an API key
 */
export async function revokeApiKey(apiKeyId: string, userId: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('api_keys')
      .update({ is_active: false })
      .eq('id', apiKeyId)
      .eq('user_id', userId);

    return !error;
  } catch (error) {
    console.error('Error revoking API key:', error);
    return false;
  }
}

/**
 * Get all API keys for a user
 */
export async function getUserApiKeys(userId: string): Promise<ApiKey[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching API keys:', error);
      return [];
    }

    return (data as unknown as ApiKey[]) || [];
  } catch (error) {
    console.error('Error fetching API keys:', error);
    return [];
  }
}

/**
 * Get API usage statistics
 */
export async function getApiUsageStats(apiKeyId: string): Promise<{
  callsUsed: number;
  callsLimit: number;
  callsRemaining: number;
  resetDate: string;
  percentageUsed: number;
}> {
  if (!supabase) {
    return {
      callsUsed: 0,
      callsLimit: 0,
      callsRemaining: 0,
      resetDate: new Date().toISOString(),
      percentageUsed: 0,
    };
  }

  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('calls_used, calls_limit, reset_date')
      .eq('id', apiKeyId)
      .single();

    if (error || !data) {
      throw error;
    }

    const callsRemaining = data.calls_limit === -1 
      ? -1 
      : Math.max(0, data.calls_limit - data.calls_used);
    
    const percentageUsed = data.calls_limit === -1 
      ? 0 
      : (data.calls_used / data.calls_limit) * 100;

    return {
      callsUsed: data.calls_used,
      callsLimit: data.calls_limit,
      callsRemaining,
      resetDate: data.reset_date,
      percentageUsed: Math.round(percentageUsed),
    };
  } catch (error) {
    console.error('Error fetching usage stats:', error);
    return {
      callsUsed: 0,
      callsLimit: 0,
      callsRemaining: 0,
      resetDate: new Date().toISOString(),
      percentageUsed: 0,
    };
  }
}
