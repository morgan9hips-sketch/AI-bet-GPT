'use client';

import { useEffect, useState } from 'react';
import { getSeasonStatus, Sport } from '@/lib/seasons';

interface SeasonIndicatorProps {
  sport: Sport;
  showFullStatus?: boolean;
}

export default function SeasonIndicator({ sport, showFullStatus = false }: SeasonIndicatorProps) {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    setStatus(getSeasonStatus(sport));
  }, [sport]);

  const isActive = status === 'Active';

  if (!showFullStatus && isActive) {
    return null; // Don't show indicator for active sports in compact mode
  }

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-2 h-2 rounded-full ${
          isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
        }`}
      />
      <span
        className={`text-xs font-medium ${
          isActive
            ? 'text-green-600 dark:text-green-400'
            : 'text-gray-500 dark:text-gray-400'
        }`}
      >
        {status}
      </span>
    </div>
  );
}
