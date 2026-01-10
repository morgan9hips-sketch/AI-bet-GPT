'use client';

import { useEffect, useRef } from 'react';

interface BannerAdProps {
  className?: string;
  refreshInterval?: number; // in seconds, default 60
}

export default function BannerAd({ className = '', refreshInterval = 60 }: BannerAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load AdMob script
    const adUnitId = process.env.NEXT_PUBLIC_ADMOB_BANNER_ID;
    
    if (!adUnitId) {
      console.warn('AdMob Banner ID not configured');
      return;
    }

    // Initialize ad
    const loadAd = () => {
      if (adRef.current && typeof window !== 'undefined') {
        try {
          if (window.adsbygoogle) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (error) {
          console.error('Ad loading error:', error);
        }
      }
    };

    loadAd();

    // Set up refresh interval
    const interval = setInterval(() => {
      loadAd();
    }, refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 py-2 px-4 min-h-[60px]">
        <div ref={adRef} className="w-full max-w-screen-md">
          {/* AdMob Banner Ad Container */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={process.env.NEXT_PUBLIC_ADMOB_APP_ID}
            data-ad-slot={process.env.NEXT_PUBLIC_ADMOB_BANNER_ID}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
      <div className="text-center py-1">
        <span className="text-xs text-gray-400">Advertisement</span>
      </div>
    </div>
  );
}
