'use client';

import { useState, useMemo } from 'react';
import { OddsData } from '@/lib/odds-api';
import { getDateLabels, groupByDate, formatDateGroupHeader } from '@/utils/date-range';
import OddsCard from './OddsCard';

interface FixtureCalendarProps {
  fixtures: OddsData[];
  onFixtureSelect?: (fixture: OddsData) => void;
  days?: number;
}

export default function FixtureCalendar({ 
  fixtures, 
  onFixtureSelect,
  days = 5 
}: FixtureCalendarProps) {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);

  // Generate date labels for navigation
  const dateLabels = useMemo(() => getDateLabels(days), [days]);

  // Group fixtures by date
  const fixturesByDate = useMemo(() => {
    return groupByDate(fixtures, (fixture) => fixture.commence_time);
  }, [fixtures]);

  // Get sorted date keys
  const sortedDateKeys = useMemo(() => {
    return Array.from(fixturesByDate.keys()).sort();
  }, [fixturesByDate]);

  // Filter fixtures by selected date if any
  const displayedDateKeys = selectedDateIndex !== null
    ? [dateLabels[selectedDateIndex].date.toISOString().split('T')[0]]
    : sortedDateKeys;

  return (
    <div className="space-y-6">
      {/* Date Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            📅 Select Date
          </h3>
          {selectedDateIndex !== null && (
            <button
              onClick={() => setSelectedDateIndex(null)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Show All Days
            </button>
          )}
        </div>

        {/* Date Tabs - Desktop */}
        <div className="hidden md:grid grid-cols-5 gap-2">
          {dateLabels.map((dateLabel, index) => {
            const dateKey = dateLabel.date.toISOString().split('T')[0];
            const count = fixturesByDate.get(dateKey)?.length || 0;
            const isSelected = selectedDateIndex === index;

            return (
              <button
                key={index}
                onClick={() => setSelectedDateIndex(isSelected ? null : index)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }`}
              >
                <div className="text-center">
                  <p className={`text-xs font-semibold mb-1 ${
                    isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {dateLabel.label}
                  </p>
                  <p className={`text-sm ${
                    isSelected ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-900 dark:text-white'
                  }`}>
                    {dateLabel.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                  <p className={`text-xs mt-1 ${
                    count > 0 
                      ? 'text-green-600 dark:text-green-400 font-semibold' 
                      : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {count} {count === 1 ? 'game' : 'games'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Date Tabs - Mobile (Horizontal Scroll) */}
        <div className="md:hidden overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {dateLabels.map((dateLabel, index) => {
              const dateKey = dateLabel.date.toISOString().split('T')[0];
              const count = fixturesByDate.get(dateKey)?.length || 0;
              const isSelected = selectedDateIndex === index;

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDateIndex(isSelected ? null : index)}
                  className={`flex-shrink-0 p-3 rounded-lg border-2 transition-all min-w-[100px] ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                  }`}
                >
                  <div className="text-center">
                    <p className={`text-xs font-semibold mb-1 ${
                      isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {dateLabel.shortLabel}
                    </p>
                    <p className={`text-xs mt-1 ${
                      count > 0 
                        ? 'text-green-600 dark:text-green-400 font-semibold' 
                        : 'text-gray-400 dark:text-gray-500'
                    }`}>
                      {count} {count === 1 ? 'game' : 'games'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixtures by Date */}
      {displayedDateKeys.length > 0 ? (
        displayedDateKeys.map(dateKey => {
          const dateFixtures = fixturesByDate.get(dateKey) || [];
          if (dateFixtures.length === 0 && selectedDateIndex === null) return null;

          return (
            <div key={dateKey} className="space-y-4">
              {/* Date Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 rounded-lg shadow-lg p-4">
                <h2 className="text-xl font-bold text-white">
                  {formatDateGroupHeader(dateKey)}
                </h2>
                <p className="text-sm text-blue-100 mt-1">
                  {dateFixtures.length} {dateFixtures.length === 1 ? 'game' : 'games'} scheduled
                </p>
              </div>

              {/* Fixtures Grid */}
              {dateFixtures.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {dateFixtures.map((fixture) => (
                    <OddsCard
                      key={fixture.id || `${fixture.home_team}-${fixture.away_team}-${fixture.commence_time}`}
                      fixture={fixture}
                      onSelect={onFixtureSelect}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <p className="text-lg mb-2">📅 No games scheduled</p>
                    <p className="text-sm">Check back later or select a different date</p>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">📅 No fixtures found</p>
            <p className="text-sm">No games scheduled for the next {days} days</p>
          </div>
        </div>
      )}
    </div>
  );
}
