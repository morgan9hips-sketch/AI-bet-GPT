'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { saveMessage, loadHistory, clearHistory } from '@/lib/chat-history';
import { AffiliateButtons } from '@/components/AffiliateButton';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  confidence?: number;
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sport, setSport] = useState<'nfl' | 'epl'>('nfl');
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial sport from URL params
  useEffect(() => {
    const sportParam = searchParams.get('sport');
    if (sportParam === 'nfl' || sportParam === 'epl') {
      setSport(sportParam);
    }
  }, [searchParams]);

  // Load chat history on mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const history = await loadHistory(sport);
        if (history.length > 0) {
          setMessages(history.map(msg => ({
            role: msg.role,
            content: msg.message,
          })));
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      } finally {
        setHistoryLoaded(true);
      }
    };

    loadChatHistory();
  }, [sport]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    // Save user message to history
    await saveMessage(input, 'user', sport);
    
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, sport }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.prediction,
          confidence: data.confidence,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        
        // Save assistant message to history
        await saveMessage(data.prediction, 'assistant', sport);
      } else {
        throw new Error(data.error || 'Failed to get prediction');
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
      await saveMessage(errorMessage.content, 'assistant', sport);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      await clearHistory(sport);
      setMessages([]);
    }
  };

  const shouldShowAffiliateButtons = (message: Message) => {
    // Show affiliate buttons after AI responses that mention betting
    return (
      message.role === 'assistant' &&
      (message.content.toLowerCase().includes('bet') ||
        message.content.toLowerCase().includes('odds') ||
        message.content.toLowerCase().includes('parlay') ||
        message.content.toLowerCase().includes('pick'))
    );
  };

  if (!historyLoaded) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading chat history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[calc(100vh-12rem)]">
        {/* Header */}
        <div className="border-b dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Prediction Chat
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSport('nfl')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  sport === 'nfl'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                🏈 NFL
              </button>
              <button
                onClick={() => setSport('epl')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  sport === 'epl'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                ⚽ EPL
              </button>
              {messages.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  title="Clear chat history"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-8rem)]">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">👋 Welcome to AI Bet GPT!</p>
              <p className="text-sm">Ask me about any {sport.toUpperCase()} match for predictions</p>
              <div className="mt-6 space-y-2 text-xs">
                <p className="font-semibold">Try asking:</p>
                <p>&quot;I have $20, give me a 3-game parlay suggestion&quot;</p>
                <p>&quot;Which team should I bet on this weekend?&quot;</p>
                <p>&quot;Analyze the Chiefs vs 49ers matchup&quot;</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {message.role === 'assistant' && message.confidence && (
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold">Confidence Score</span>
                        <span className="text-sm font-bold">{message.confidence}%</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
                
                {/* Show affiliate buttons after AI betting suggestions */}
                {shouldShowAffiliateButtons(message) && (
                  <div className="flex justify-start mt-3 ml-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-w-[80%]">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                        Ready to place your bet?
                      </p>
                      <AffiliateButtons />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t dark:border-gray-700 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
              placeholder="Ask for a prediction..."
              className="flex-1 px-4 py-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
