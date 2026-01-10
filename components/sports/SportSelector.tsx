'use client';

import { useState, useEffect } from 'react';
import { getActiveSports, getComingSoonSports, Sport } from '@/lib/seasons';

interface SportSelectorProps {
  selectedSport: string;
  onSportChange: (sportId: string) => void;
  showInactive?: boolean;
}

export default function SportSelector({
  selectedSport,
  onSportChange,
  showInactive = false,
}: SportSelectorProps) {
  const [activeSports, setActiveSports] = useState<Sport[]>([]);
  const [comingSoonSports, setComingSoonSports] = useState<Sport[]>([]);

  useEffect(() => {
    const active = getActiveSports();
    const comingSoon = getComingSoonSports();
    setActiveSports(active);
    setComingSoonSports(comingSoon);
  }, []);

  return (
    <div className="w-full">
      {/* Active Sports */}
      {activeSports.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            Active Sports
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {activeSports.map((sport) => (
              <button
                key={sport.id}
                onClick={() => onSportChange(sport.id)}
                className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedSport === sport.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{sport.emoji}</span>
                <span className="text-sm font-semibold">{sport.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Coming Soon Sports */}
      {showInactive && comingSoonSports.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            Coming Soon
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {comingSoonSports.map((sport) => (
              <div
                key={sport.id}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 border border-dashed border-gray-300 dark:border-gray-700 cursor-not-allowed"
              >
                <span className="text-xl opacity-50">{sport.emoji}</span>
                <span className="text-sm font-semibold">{sport.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
