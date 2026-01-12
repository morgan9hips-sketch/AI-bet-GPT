/**
 * Convert American odds to decimal odds
 */
export function americanToDecimal(americanOdds: number): number {
  if (americanOdds > 0) {
    return (americanOdds / 100) + 1;
  } else {
    return (100 / Math.abs(americanOdds)) + 1;
  }
}

/**
 * Convert decimal odds to American odds
 */
export function decimalToAmerican(decimalOdds: number): number {
  if (decimalOdds >= 2) {
    return Math.round((decimalOdds - 1) * 100);
  } else {
    return Math.round(-100 / (decimalOdds - 1));
  }
}

/**
 * Convert American odds to fractional odds
 */
export function americanToFractional(americanOdds: number): string {
  const decimal = americanToDecimal(americanOdds);
  const numerator = Math.round((decimal - 1) * 100);
  return `${numerator}/100`;
}

/**
 * Calculate combined odds for a parlay
 */
export function calculateParlayOdds(americanOddsArray: number[]): {
  decimalOdds: number;
  americanOdds: number;
} {
  const decimalOdds = americanOddsArray.reduce((acc, odds) => {
    return acc * americanToDecimal(odds);
  }, 1);

  return {
    decimalOdds: Math.round(decimalOdds * 100) / 100,
    americanOdds: decimalToAmerican(decimalOdds),
  };
}

/**
 * Calculate potential payout from stake and odds
 */
export function calculatePayout(stake: number, americanOdds: number): number {
  const decimalOdds = americanToDecimal(americanOdds);
  return Math.round(stake * decimalOdds * 100) / 100;
}

/**
 * Calculate parlay payout
 */
export function calculateParlayPayout(stake: number, americanOddsArray: number[]): {
  totalPayout: number;
  profit: number;
  combinedOdds: number;
} {
  const { decimalOdds, americanOdds } = calculateParlayOdds(americanOddsArray);
  const totalPayout = calculatePayout(stake, americanOdds);
  const profit = totalPayout - stake;

  return {
    totalPayout: Math.round(totalPayout * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    combinedOdds: americanOdds,
  };
}

/**
 * Assess risk level based on number of legs and odds
 */
export function assessParlayRisk(legs: number, combinedOdds: number): {
  level: 'Low' | 'Moderate' | 'High' | 'Very High';
  description: string;
} {
  if (legs <= 2 && Math.abs(combinedOdds) < 300) {
    return {
      level: 'Low',
      description: 'Few legs with favorable odds',
    };
  } else if (legs <= 3 && Math.abs(combinedOdds) < 500) {
    return {
      level: 'Moderate',
      description: 'Standard parlay with manageable risk',
    };
  } else if (legs <= 4 || Math.abs(combinedOdds) < 1000) {
    return {
      level: 'High',
      description: 'Multiple legs increase difficulty',
    };
  } else {
    return {
      level: 'Very High',
      description: 'High number of legs - all must win',
    };
  }
}

/**
 * Format odds display
 */
export function formatOdds(americanOdds: number): string {
  return americanOdds > 0 ? `+${americanOdds}` : `${americanOdds}`;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
