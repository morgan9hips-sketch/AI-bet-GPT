'use client';

import { useState, useEffect } from 'react';
import { Sport, AVAILABLE_SPORTS, getSportsByCategory, getSportCategories } from '@/lib/sport-config';

interface SportSelectorProps {
  selected?: string;
  onSelect: (sportId: string) => void;
  className?: string;
}

export default function SportSelector({ selected, onSelect, className = '' }: SportSelectorProps) {
  const [selectedSport, setSelectedSport] = useState<string>(selected || 'americanfootball_nfl');
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['American', 'Soccer']));

  // Load last selected sport from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastSelected = localStorage.getItem('lastSelectedSport');
      if (lastSelected && !selected) {
        setSelectedSport(lastSelected);
        onSelect(lastSelected);
      } else if (selected) {
        setSelectedSport(selected);
      }
    }
  }, [selected, onSelect]);

  const handleSelect = (sportId: string) => {
    setSelectedSport(sportId);
    setIsOpen(false);
    setSearchTerm('');
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastSelectedSport', sportId);
    }
    
    onSelect(sportId);
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Filter sports based on search term
  const filteredSports = AVAILABLE_SPORTS.filter(sport => 
    sport.enabled && 
    (searchTerm === '' || 
     sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     sport.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get selected sport details
  const selectedSportDetails = AVAILABLE_SPORTS.find(s => s.id === selectedSport);

  return (
    <div className={`relative ${className}`}>
      {/* Selected Sport Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{selectedSportDetails?.flag}</span>
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {selectedSportDetails?.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {selectedSportDetails?.category}
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-h-96 overflow-hidden">
            {/* Search Bar */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search sports..."
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Sports List */}
            <div className="overflow-y-auto max-h-72">
              {searchTerm === '' ? (
                // Grouped by category
                getSportCategories().map(category => {
                  const categorySports = getSportsByCategory(category);
                  if (categorySports.length === 0) return null;

                  const isExpanded = expandedCategories.has(category);

                  return (
                    <div key={category} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {category}
                        </span>
                        <svg
                          className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Category Sports */}
                      {isExpanded && (
                        <div>
                          {categorySports.map(sport => (
                            <button
                              key={sport.id}
                              onClick={() => handleSelect(sport.id)}
                              className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                                selectedSport === sport.id ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                              }`}
                            >
                              <span className="text-xl">{sport.flag}</span>
                              <span className="text-sm text-gray-900 dark:text-white">
                                {sport.name}
                              </span>
                              {selectedSport === sport.id && (
                                <svg className="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                // Filtered search results
                <div>
                  {filteredSports.length > 0 ? (
                    filteredSports.map(sport => (
                      <button
                        key={sport.id}
                        onClick={() => handleSelect(sport.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${
                          selectedSport === sport.id ? 'bg-blue-100 dark:bg-blue-900/30' : ''
                        }`}
                      >
                        <span className="text-xl">{sport.flag}</span>
                        <div className="text-left">
                          <p className="text-sm text-gray-900 dark:text-white">{sport.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{sport.category}</p>
                        </div>
                        {selectedSport === sport.id && (
                          <svg className="w-4 h-4 ml-auto text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                      <p className="text-sm">No sports found</p>
                      <p className="text-xs mt-1">Try a different search term</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
