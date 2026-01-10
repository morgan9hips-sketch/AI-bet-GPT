'use client';

interface NativeAdProps {
  className?: string;
}

export default function NativeAd({ className = '' }: NativeAdProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <div className="flex items-start space-x-4">
          {/* Ad Image */}
          <div className="flex-shrink-0 w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', height: '100%' }}
              data-ad-client={process.env.NEXT_PUBLIC_ADMOB_APP_ID}
              data-ad-format="fluid"
              data-ad-layout-key="-6t+ed+2i-1n-4w"
            />
          </div>

          {/* Ad Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 uppercase tracking-wide">
                Sponsored
              </span>
            </div>
            <ins
              className="adsbygoogle"
              style={{ display: 'block', textAlign: 'left' }}
              data-ad-client={process.env.NEXT_PUBLIC_ADMOB_APP_ID}
              data-ad-format="fluid"
              data-ad-layout="text-only"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
