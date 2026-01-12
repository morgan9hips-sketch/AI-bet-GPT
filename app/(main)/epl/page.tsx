'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OddsCard from '@/components/OddsCard';
import { OddsData } from '@/lib/odds-api';

export default function EPLPage() {
  const router = useRouter();
  const [odds, setOdds] = useState<OddsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOdds();
  }, []);

  const fetchOdds = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/odds?sport=soccer_epl');
      
      if (!response.ok) {
        throw new Error('Failed to fetch odds');
      }

      const data = await response.json();
      setOdds(data.odds || []);
    } catch (err) {
      console.error('Error fetching odds:', err);
      setError('Failed to load odds. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFixtureSelect = (fixture: OddsData) => {
    // Navigate to chat with this fixture context
    router.push('/chat?sport=epl');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          ⚽ Premier League Predictions
        </h1>
        <button
          onClick={fetchOdds}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh Odds
        </button>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading live odds...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center text-red-600 dark:text-red-400">
            <p className="text-lg font-semibold mb-2">⚠️ {error}</p>
            <button
              onClick={fetchOdds}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : odds.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Upcoming Fixtures
          </h2>
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">No upcoming fixtures available</p>
            <p className="text-sm">Check back later for Premier League matches and predictions</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Live Odds - {odds.length} Match{odds.length !== 1 ? 'es' : ''}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click on any match to get AI-powered betting analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {odds.map((fixture) => (
              <OddsCard
                key={fixture.id}
                fixture={fixture}
                onSelect={handleFixtureSelect}
              />
            ))}
          </div>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            How It Works
          </h3>
          <ol className="space-y-2 text-gray-600 dark:text-gray-400 list-decimal list-inside">
            <li>Browse live odds from multiple bookmakers</li>
            <li>Click on a match to get AI analysis</li>
            <li>Ask for accumulator bets or single picks</li>
            <li>Get expert reasoning and risk assessment</li>
          </ol>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Top Teams to Watch
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Manchester City</li>
            <li>• Arsenal</li>
            <li>• Liverpool</li>
            <li>• Manchester United</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
