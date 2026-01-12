import { OddsData } from './odds-api';
import { formatOdds } from '@/utils/parlay-calculator';
import { getSportById, getAnalysisFactors } from './sport-config';

/**
 * Format odds data for AI consumption with multi-sport support
 */
export function formatOddsForAI(oddsData: OddsData[], sportId?: string): string {
  if (!oddsData || oddsData.length === 0) {
    return 'No live odds available at the moment.';
  }

  let formattedOdds = '=== LIVE BETTING ODDS ===\n\n';

  // Add sport-specific analysis factors if provided
  if (sportId) {
    const sport = getSportById(sportId);
    const factors = getAnalysisFactors(sportId);
    
    if (sport && factors.length > 0) {
      formattedOdds += `SPORT: ${sport.name} ${sport.flag}\n`;
      formattedOdds += `KEY ANALYSIS FACTORS:\n`;
      factors.forEach(factor => {
        formattedOdds += `  - ${factor}\n`;
      });
      formattedOdds += '\n';
    }
  }

  oddsData.forEach((fixture, index) => {
    formattedOdds += `${index + 1}. ${fixture.away_team} @ ${fixture.home_team}\n`;
    formattedOdds += `   Commence: ${new Date(fixture.commence_time).toLocaleString()}\n`;

    // Group bookmakers by market type
    const moneylineMarkets: Array<{ bookmaker: string; outcomes: any[] }> = [];
    const spreadMarkets: Array<{ bookmaker: string; outcomes: any[] }> = [];
    const totalMarkets: Array<{ bookmaker: string; outcomes: any[] }> = [];

    fixture.bookmakers.forEach((bookmaker) => {
      bookmaker.markets.forEach((market) => {
        if (market.key === 'h2h') {
          moneylineMarkets.push({ bookmaker: bookmaker.title, outcomes: market.outcomes });
        } else if (market.key === 'spreads') {
          spreadMarkets.push({ bookmaker: bookmaker.title, outcomes: market.outcomes });
        } else if (market.key === 'totals') {
          totalMarkets.push({ bookmaker: bookmaker.title, outcomes: market.outcomes });
        }
      });
    });

    // Moneyline
    if (moneylineMarkets.length > 0) {
      formattedOdds += '\n   MONEYLINE:\n';
      const bestOdds = findBestMoneylineOdds(moneylineMarkets, fixture.home_team, fixture.away_team);
      formattedOdds += `     ${fixture.away_team}: ${formatOdds(bestOdds.away)} (best at ${bestOdds.awayBookmaker})\n`;
      formattedOdds += `     ${fixture.home_team}: ${formatOdds(bestOdds.home)} (best at ${bestOdds.homeBookmaker})\n`;
    }

    // Spreads
    if (spreadMarkets.length > 0) {
      formattedOdds += '\n   SPREADS:\n';
      const bestSpreads = findBestSpreads(spreadMarkets, fixture.home_team, fixture.away_team);
      if (bestSpreads.away) {
        formattedOdds += `     ${fixture.away_team} ${bestSpreads.away.point >= 0 ? '+' : ''}${bestSpreads.away.point} (${formatOdds(bestSpreads.away.price)})\n`;
      }
      if (bestSpreads.home) {
        formattedOdds += `     ${fixture.home_team} ${bestSpreads.home.point >= 0 ? '+' : ''}${bestSpreads.home.point} (${formatOdds(bestSpreads.home.price)})\n`;
      }
    }

    // Totals
    if (totalMarkets.length > 0) {
      formattedOdds += '\n   TOTALS:\n';
      const bestTotals = findBestTotals(totalMarkets);
      if (bestTotals.over) {
        formattedOdds += `     Over ${bestTotals.over.point} (${formatOdds(bestTotals.over.price)})\n`;
      }
      if (bestTotals.under) {
        formattedOdds += `     Under ${bestTotals.under.point} (${formatOdds(bestTotals.under.price)})\n`;
      }
    }

    formattedOdds += '\n';
  });

  return formattedOdds;
}

/**
 * Find best moneyline odds across bookmakers
 */
function findBestMoneylineOdds(
  markets: Array<{ bookmaker: string; outcomes: any[] }>,
  homeTeam: string,
  awayTeam: string
) {
  let bestHome = -Infinity;
  let bestAway = -Infinity;
  let homeBookmaker = '';
  let awayBookmaker = '';

  markets.forEach((market) => {
    market.outcomes.forEach((outcome) => {
      if (outcome.name === homeTeam && outcome.price > bestHome) {
        bestHome = outcome.price;
        homeBookmaker = market.bookmaker;
      }
      if (outcome.name === awayTeam && outcome.price > bestAway) {
        bestAway = outcome.price;
        awayBookmaker = market.bookmaker;
      }
    });
  });

  return {
    home: bestHome,
    away: bestAway,
    homeBookmaker,
    awayBookmaker,
  };
}

/**
 * Find best spreads
 */
function findBestSpreads(
  markets: Array<{ bookmaker: string; outcomes: any[] }>,
  homeTeam: string,
  awayTeam: string
): {
  home: { point: number; price: number } | null;
  away: { point: number; price: number } | null;
} {
  let bestHome: { point: number; price: number } | null = null;
  let bestAway: { point: number; price: number } | null = null;

  markets.forEach((market) => {
    market.outcomes.forEach((outcome) => {
      if (outcome.name === homeTeam && outcome.point !== undefined) {
        if (!bestHome || outcome.price > bestHome.price) {
          bestHome = { point: outcome.point, price: outcome.price };
        }
      }
      if (outcome.name === awayTeam && outcome.point !== undefined) {
        if (!bestAway || outcome.price > bestAway.price) {
          bestAway = { point: outcome.point, price: outcome.price };
        }
      }
    });
  });

  return { home: bestHome, away: bestAway };
}

/**
 * Find best totals
 */
function findBestTotals(markets: Array<{ bookmaker: string; outcomes: any[] }>): {
  over: { point: number; price: number } | null;
  under: { point: number; price: number } | null;
} {
  let bestOver: { point: number; price: number } | null = null;
  let bestUnder: { point: number; price: number } | null = null;

  markets.forEach((market) => {
    market.outcomes.forEach((outcome) => {
      if (outcome.name === 'Over' && outcome.point !== undefined) {
        if (!bestOver || outcome.price > bestOver.price) {
          bestOver = { point: outcome.point, price: outcome.price };
        }
      }
      if (outcome.name === 'Under' && outcome.point !== undefined) {
        if (!bestUnder || outcome.price > bestUnder.price) {
          bestUnder = { point: outcome.point, price: outcome.price };
        }
      }
    });
  });

  return { over: bestOver, under: bestUnder };
}

// Value bet detection threshold
// -150 represents a strong favorite (60% implied probability)
// Odds better than this threshold indicate potentially favorable value
const VALUE_BET_THRESHOLD = -150;

/**
 * Identify value bets (odds significantly better than average)
 */
export function findValueBets(oddsData: OddsData[]): Array<{
  fixture: string;
  bet: string;
  bestOdds: number;
  bookmaker: string;
  value: number;
}> {
  const valueBets: Array<any> = [];

  oddsData.forEach((fixture) => {
    const matchup = `${fixture.away_team} @ ${fixture.home_team}`;

    fixture.bookmakers.forEach((bookmaker) => {
      bookmaker.markets.forEach((market) => {
        if (market.key === 'h2h') {
          market.outcomes.forEach((outcome) => {
            // Simple value detection: odds better than threshold for favorites
            if (outcome.price > VALUE_BET_THRESHOLD && outcome.price < 0) {
              valueBets.push({
                fixture: matchup,
                bet: `${outcome.name} ML`,
                bestOdds: outcome.price,
                bookmaker: bookmaker.title,
                value: Math.abs(outcome.price) / Math.abs(VALUE_BET_THRESHOLD),
              });
            }
          });
        }
      });
    });
  });

  return valueBets.slice(0, 5); // Return top 5 value bets
}

/**
 * Format multiple sports odds for cross-sport parlay suggestions
 */
export function formatMultiSportOddsForAI(
  oddsDataBySport: Record<string, OddsData[]>
): string {
  let formattedOdds = '=== MULTI-SPORT BETTING ODDS ===\n\n';
  
  const sportIds = Object.keys(oddsDataBySport);
  
  if (sportIds.length === 0) {
    return 'No live odds available for any sport at the moment.';
  }
  
  sportIds.forEach(sportId => {
    const oddsData = oddsDataBySport[sportId];
    const sport = getSportById(sportId);
    
    if (!sport || !oddsData || oddsData.length === 0) {
      return;
    }
    
    formattedOdds += `\n${'='.repeat(60)}\n`;
    formattedOdds += `${sport.flag} ${sport.name.toUpperCase()}\n`;
    formattedOdds += `${'='.repeat(60)}\n\n`;
    
    // Add key analysis factors for this sport
    const factors = getAnalysisFactors(sportId);
    if (factors.length > 0) {
      formattedOdds += `Key Analysis Factors:\n`;
      factors.slice(0, 3).forEach(factor => {
        formattedOdds += `  • ${factor}\n`;
      });
      formattedOdds += '\n';
    }
    
    // Add fixtures (limit to 5 per sport for AI context)
    const limitedFixtures = oddsData.slice(0, 5);
    limitedFixtures.forEach((fixture, index) => {
      formattedOdds += `${index + 1}. ${fixture.away_team} @ ${fixture.home_team}\n`;
      formattedOdds += `   Commence: ${new Date(fixture.commence_time).toLocaleString()}\n`;
      
      // Get best moneyline odds
      const moneylineMarkets: Array<{ bookmaker: string; outcomes: any[] }> = [];
      fixture.bookmakers.forEach((bookmaker) => {
        bookmaker.markets.forEach((market) => {
          if (market.key === 'h2h') {
            moneylineMarkets.push({ bookmaker: bookmaker.title, outcomes: market.outcomes });
          }
        });
      });
      
      if (moneylineMarkets.length > 0) {
        const bestOdds = findBestMoneylineOdds(moneylineMarkets, fixture.home_team, fixture.away_team);
        formattedOdds += `   ${fixture.away_team}: ${formatOdds(bestOdds.away)} | ${fixture.home_team}: ${formatOdds(bestOdds.home)}\n`;
      }
      
      formattedOdds += '\n';
    });
    
    if (oddsData.length > 5) {
      formattedOdds += `   ... and ${oddsData.length - 5} more fixture(s)\n\n`;
    }
  });
  
  formattedOdds += `\n${'='.repeat(60)}\n`;
  formattedOdds += `CROSS-SPORT PARLAY TIPS:\n`;
  formattedOdds += `- Combine picks from different sports for diversification\n`;
  formattedOdds += `- Consider different time zones and game start times\n`;
  formattedOdds += `- Balance favorites and underdogs for optimal risk/reward\n`;
  formattedOdds += `- Each sport has unique factors - analyze them separately\n`;
  
  return formattedOdds;
}
