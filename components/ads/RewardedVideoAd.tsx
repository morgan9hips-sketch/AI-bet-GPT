'use client';

import { useState } from 'react';

interface RewardedVideoAdProps {
  onRewardEarned?: () => void;
  rewardAmount?: number;
}

export default function RewardedVideoAd({
  onRewardEarned,
  rewardAmount = 3,
}: RewardedVideoAdProps) {
  const [isWatching, setIsWatching] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleWatchAd = () => {
    setIsWatching(true);
    setProgress(0);

    // Simulate video progress (30 seconds)
    const duration = 30;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsWatching(false);
          if (onRewardEarned) onRewardEarned();
          return 100;
        }
        return prev + (100 / duration);
      });
    }, 1000);
  };

  if (isWatching) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
        <div className="w-full max-w-3xl mx-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Rewarded Video Advertisement
              </p>
            </div>

            {/* Video Ad Container */}
            <div className="flex items-center justify-center min-h-[400px] bg-gray-900 rounded relative">
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={process.env.NEXT_PUBLIC_ADMOB_APP_ID}
                data-ad-slot={process.env.NEXT_PUBLIC_ADMOB_REWARDED_ID}
                data-ad-format="auto"
              />
              
              {/* Progress Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-white text-center">
                  <div className="text-4xl font-bold mb-2">
                    {Math.ceil((100 - progress) * 0.3)}s
                  </div>
                  <p className="text-sm">Watch to earn +{rewardAmount} analyses</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
              Complete the video to earn your reward
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleWatchAd}
      className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg"
    >
      <span className="text-xl">🎬</span>
      <div className="text-left">
        <div className="font-bold">Watch Video</div>
        <div className="text-xs opacity-90">
          Earn +{rewardAmount} bonus analyses
        </div>
      </div>
    </button>
  );
}
