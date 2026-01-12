'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NFLPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to unified sports page with NFL selected
    router.replace('/sports?sport=americanfootball_nfl');
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Redirecting to NFL predictions...</p>
        </div>
      </div>
    </div>
  );
}
