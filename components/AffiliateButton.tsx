'use client';

interface AffiliateButtonProps {
  bookmaker: 'draftkings' | 'fanduel' | 'bet365';
  className?: string;
}

const BOOKMAKER_CONFIG = {
  draftkings: {
    name: 'DraftKings',
    baseUrl: 'https://sportsbook.draftkings.com',
    color: 'bg-green-600 hover:bg-green-700',
    logo: '🎯',
    envKey: 'NEXT_PUBLIC_DRAFTKINGS_AFFILIATE_ID' as const,
  },
  fanduel: {
    name: 'FanDuel',
    baseUrl: 'https://sportsbook.fanduel.com',
    color: 'bg-blue-600 hover:bg-blue-700',
    logo: '🏈',
    envKey: 'NEXT_PUBLIC_FANDUEL_AFFILIATE_ID' as const,
  },
  bet365: {
    name: 'Bet365',
    baseUrl: 'https://www.bet365.com',
    color: 'bg-yellow-600 hover:bg-yellow-700',
    logo: '⚡',
    envKey: 'NEXT_PUBLIC_BET365_AFFILIATE_ID' as const,
  },
};

export default function AffiliateButton({ bookmaker, className = '' }: AffiliateButtonProps) {
  const config = BOOKMAKER_CONFIG[bookmaker];
  
  // Get affiliate ID from environment variables
  const getAffiliateUrl = () => {
    const affiliateId = process.env[config.envKey];

    // If affiliate ID exists, append it to the URL
    if (affiliateId) {
      return `${config.baseUrl}?affiliateId=${affiliateId}`;
    }
    
    return config.baseUrl;
  };

  const handleClick = () => {
    // Track affiliate click (could integrate with analytics here)
    if (typeof window !== 'undefined') {
      console.log(`Affiliate click: ${bookmaker}`);
      
      // Optional: Send to analytics
      if ((window as any).gtag) {
        (window as any).gtag('event', 'affiliate_click', {
          bookmaker: bookmaker,
          timestamp: new Date().toISOString(),
        });
      }
    }
  };

  return (
    <a
      href={getAffiliateUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center
        px-4 py-2 rounded-lg
        text-white font-medium
        transition-all duration-200
        shadow-md hover:shadow-lg
        ${config.color}
        ${className}
      `}
    >
      <span className="mr-2">{config.logo}</span>
      <span>Place bet on {config.name}</span>
      <svg
        className="ml-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}

/**
 * Component to show all affiliate buttons
 */
export function AffiliateButtons({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <AffiliateButton bookmaker="draftkings" />
      <AffiliateButton bookmaker="fanduel" />
      <AffiliateButton bookmaker="bet365" />
    </div>
  );
}
