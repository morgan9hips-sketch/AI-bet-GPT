'use client';

import { useState, useEffect } from 'react';

interface InterstitialAdProps {
  showAfter?: number; // Show after X analyses
  onClose?: () => void;
}

export default function InterstitialAd({ showAfter = 3, onClose }: InterstitialAdProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [analysisCount, setAnalysisCount] = useState(0);

  useEffect(() => {
    // Check if we should show the ad
    const count = parseInt(localStorage.getItem('analysisCount') || '0');
    setAnalysisCount(count);

    if (count > 0 && count % showAfter === 0) {
      setIsVisible(true);
    }
  }, [showAfter]);

  useEffect(() => {
    if (isVisible && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, countdown]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleSkip = () => {
    if (countdown === 0) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-full max-w-2xl mx-4">
        {/* Ad Container */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 relative">
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Advertisement
            </p>
          </div>

          {/* Ad Content */}
          <div className="flex items-center justify-center min-h-[300px] bg-gray-100 dark:bg-gray-800 rounded">
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client={process.env.NEXT_PUBLIC_ADMOB_APP_ID}
              data-ad-slot={process.env.NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID}
              data-ad-format="auto"
            />
          </div>

          {/* Skip Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSkip}
              disabled={countdown > 0}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                countdown > 0
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {countdown > 0 ? `Skip in ${countdown}s` : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
