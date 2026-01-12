'use client';

import { getSportById } from '@/lib/sport-config';

interface SportIconProps {
  sportId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  className?: string;
}

export default function SportIcon({ 
  sportId, 
  size = 'md', 
  showName = false,
  className = '' 
}: SportIconProps) {
  const sport = getSportById(sportId);
  
  if (!sport) {
    return null;
  }

  // Size mappings
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  // Color mappings by category
  const categoryColors = {
    American: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    Soccer: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    'South African': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
    Other: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  };

  const colorClass = categoryColors[sport.category];

  if (showName) {
    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full ${colorClass} ${className}`}>
        <span className={sizeClasses[size]}>{sport.flag}</span>
        <span className={`font-medium ${textSizeClasses[size]}`}>{sport.name}</span>
      </div>
    );
  }

  return (
    <span 
      className={`inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
      title={sport.name}
    >
      {sport.flag}
    </span>
  );
}
