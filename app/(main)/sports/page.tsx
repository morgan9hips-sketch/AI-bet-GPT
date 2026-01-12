'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SportSelector from '@/components/SportSelector';
import FixtureCalendar from '@/components/FixtureCalendar';
import { OddsData } from '@/lib/odds-api';
import { getSportById, getDefaultSport } from '@/lib/sport-config';

function SportsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sportParam = searchParams.get('sport');
  
  const [selectedSport, setSelectedSport] = useState<string>(sportParam || getDefaultSport().id);
  const [fixtures, setFixtures] = useState<OddsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cacheAge, setCacheAge] = useState<string | null>(null);
  const [days, setDays] = useState<number>(5);

  // Fetch odds when sport or days change
  useEffect(() => {
    fetchOdds();
  }, [selectedSport, days]);

  // Update URL when sport changes
  useEffect(() => {
    if (selectedSport) {
      const url = new URL(window.location.href);
      url.searchParams.set('sport', selectedSport);
      window.history.pushState({}, '', url.toString());
    }
  }, [selectedSport]);

  const fetchOdds = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/odds?sport=${selectedSport}&days=${days}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch odds');
      }

      const data = await response.json();
      setFixtures(data.odds || []);
      setCacheAge(data.cacheAge || null);
    } catch (err: any) {
      console.error('Error fetching odds:', err);
      setError(err.message || 'Failed to load odds. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSportSelect = (sportId: string) => {
    setSelectedSport(sportId);
  };

  const handleFixtureSelect = (fixture: OddsData) => {
    // Navigate to chat with this fixture context
    router.push(`/chat?sport=${selectedSport}`);
  };

  const sportConfig = getSportById(selectedSport);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          🏆 Multi-Sport Predictions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Live odds and AI-powered analysis for {sportConfig?.name || 'all sports'}
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sport Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Select Sport
            </label>
            <SportSelector selected={selectedSport} onSelect={handleSportSelect} />
          </div>

          {/* Days Selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Fixture Range
            </label>
            <select
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value, 10))}
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            >
              <option value={1}>Next 24 hours</option>
              <option value={3}>Next 3 days</option>
              <option value={5}>Next 5 days</option>
              <option value={7}>Next week</option>
              <option value={14}>Next 2 weeks</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t dark:border-gray-700">
          <div className="flex items-center space-x-2">
            {cacheAge && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                📊 Data updated {cacheAge}
              </p>
            )}
          </div>
          <button
            onClick={fetchOdds}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Refreshing...' : 'Refresh Odds'}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading fixtures...</p>
          </div>
        </div>
      ) : error ? (
        /* Error State */
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
      ) : (
        /* Fixtures */
        <>
          {/* Stats Summary */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
              <div className="text-center">
                <p className="text-3xl font-bold">{fixtures.length}</p>
                <p className="text-sm text-blue-100">Total Fixtures</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{sportConfig?.flag}</p>
                <p className="text-sm text-blue-100">{sportConfig?.name}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{days}</p>
                <p className="text-sm text-blue-100">Days Ahead</p>
              </div>
            </div>
          </div>

          {/* Fixture Calendar */}
          <FixtureCalendar
            fixtures={fixtures}
            onFixtureSelect={handleFixtureSelect}
            days={days}
          />
        </>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            🤖 How It Works
          </h3>
          <ol className="space-y-2 text-gray-600 dark:text-gray-400 list-decimal list-inside">
            <li>Select your sport from the dropdown</li>
            <li>Browse fixtures with live odds</li>
            <li>Click any game for AI analysis</li>
            <li>Get expert predictions and parlays</li>
          </ol>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            ⚡ Features
          </h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>• 14+ sports including NFL, NBA, EPL</li>
            <li>• Live odds from multiple bookmakers</li>
            <li>• South African leagues (PSL, Rugby, Cricket)</li>
            <li>• Cross-sport parlay suggestions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function SportsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <SportsPageContent />
    </Suspense>
  );
}
