import { supabase } from './supabase';

export interface ChatMessage {
  id?: string;
  user_id?: string;
  message: string;
  role: 'user' | 'assistant';
  sport?: 'nfl' | 'epl';
  created_at?: string;
}

/**
 * Save a chat message to the database or localStorage
 */
export async function saveMessage(
  message: string,
  role: 'user' | 'assistant',
  sport?: 'nfl' | 'epl'
): Promise<void> {
  try {
    // Try to get authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Save to Supabase if user is authenticated
      const { error } = await supabase.from('chat_messages').insert({
        user_id: user.id,
        message,
        role,
        sport,
      });

      if (error) {
        console.error('Error saving message to Supabase:', error);
        // Fallback to localStorage
        saveToLocalStorage(message, role, sport);
      }
    } else {
      // Save to localStorage for anonymous users
      saveToLocalStorage(message, role, sport);
    }
  } catch (error) {
    console.error('Error in saveMessage:', error);
    // Fallback to localStorage
    saveToLocalStorage(message, role, sport);
  }
}

/**
 * Load chat history from database or localStorage
 */
export async function loadHistory(sport?: 'nfl' | 'epl'): Promise<ChatMessage[]> {
  try {
    // Try to get authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Load from Supabase if user is authenticated
      let query = supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (sport) {
        query = query.eq('sport', sport);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error loading messages from Supabase:', error);
        return loadFromLocalStorage(sport);
      }

      return data || [];
    } else {
      // Load from localStorage for anonymous users
      return loadFromLocalStorage(sport);
    }
  } catch (error) {
    console.error('Error in loadHistory:', error);
    return loadFromLocalStorage(sport);
  }
}

/**
 * Clear chat history
 */
export async function clearHistory(sport?: 'nfl' | 'epl'): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      let query = supabase
        .from('chat_messages')
        .delete()
        .eq('user_id', user.id);

      if (sport) {
        query = query.eq('sport', sport);
      }

      const { error } = await query;

      if (error) {
        console.error('Error clearing messages from Supabase:', error);
      }
    }

    // Always clear localStorage as well
    clearFromLocalStorage(sport);
  } catch (error) {
    console.error('Error in clearHistory:', error);
    clearFromLocalStorage(sport);
  }
}

/**
 * Save message to localStorage
 */
function saveToLocalStorage(message: string, role: 'user' | 'assistant', sport?: 'nfl' | 'epl'): void {
  try {
    const key = sport ? `chat_history_${sport}` : 'chat_history';
    const existing = localStorage.getItem(key);
    const messages: ChatMessage[] = existing ? JSON.parse(existing) : [];
    
    messages.push({
      id: Date.now().toString(),
      message,
      role,
      sport,
      created_at: new Date().toISOString(),
    });

    localStorage.setItem(key, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Load messages from localStorage
 */
function loadFromLocalStorage(sport?: 'nfl' | 'epl'): ChatMessage[] {
  try {
    const key = sport ? `chat_history_${sport}` : 'chat_history';
    const existing = localStorage.getItem(key);
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
}

/**
 * Clear messages from localStorage
 */
function clearFromLocalStorage(sport?: 'nfl' | 'epl'): void {
  try {
    const key = sport ? `chat_history_${sport}` : 'chat_history';
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}
