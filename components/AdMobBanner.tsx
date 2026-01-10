'use client';

import { useEffect, useRef } from 'react';

export default function AdMobBanner() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would normally initialize AdMob
    // For now, it's a placeholder for the free tier
    if (typeof window !== 'undefined' && adRef.current) {
      // AdMob initialization would go here
      console.log('AdMob banner placeholder');
    }
  }, []);

  return (
    <div 
      ref={adRef}
      className="bg-gray-100 dark:bg-gray-800 p-4 text-center text-sm text-gray-500 dark:text-gray-400 rounded-lg"
    >
      <p>Advertisement - Upgrade to Premium to remove ads</p>
    </div>
  );
}
