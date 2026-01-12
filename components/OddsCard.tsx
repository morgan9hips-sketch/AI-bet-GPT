'use client';

import { OddsData } from '@/lib/odds-api';
import { formatOdds } from '@/utils/parlay-calculator';

interface OddsCardProps {
  fixture: OddsData;
  onSelect?: (fixture: OddsData) => void;
}

export default function OddsCard({ fixture, onSelect }: OddsCardProps) {
  const commenceDate = new Date(fixture.commence_time);
  const isUpcoming = commenceDate > new Date();

  // Extract best odds for each market
  const getBestOdds = () => {
    let bestMoneyline: any = {};
    let bestSpread: any = {};
    let bestTotal: any = {};

    fixture.bookmakers.forEach((bookmaker) => {
      bookmaker.markets.forEach((market) => {
        if (market.key === 'h2h') {
          market.outcomes.forEach((outcome) => {
            if (!bestMoneyline[outcome.name] || outcome.price > bestMoneyline[outcome.name].price) {
              bestMoneyline[outcome.name] = {
                price: outcome.price,
                bookmaker: bookmaker.title,
              };
            }
          });
        } else if (market.key === 'spreads') {
          market.outcomes.forEach((outcome) => {
            if (outcome.point !== undefined && (!bestSpread[outcome.name] || outcome.price > bestSpread[outcome.name].price)) {
              bestSpread[outcome.name] = {
                point: outcome.point,
                price: outcome.price,
                bookmaker: bookmaker.title,
              };
            }
          });
        } else if (market.key === 'totals') {
          market.outcomes.forEach((outcome) => {
            if (outcome.point !== undefined && (!bestTotal[outcome.name] || outcome.price > bestTotal[outcome.name].price)) {
              bestTotal[outcome.name] = {
                point: outcome.point,
                price: outcome.price,
                bookmaker: bookmaker.title,
              };
            }
          });
        }
      });
    });

    return { bestMoneyline, bestSpread, bestTotal };
  };

  const { bestMoneyline, bestSpread, bestTotal } = getBestOdds();

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl ${
        onSelect ? 'cursor-pointer' : ''
      }`}
      onClick={() => onSelect && onSelect(fixture)}
    >
      {/* Header - Teams */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {fixture.away_team}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">@</span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {fixture.home_team}
          </h3>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {commenceDate.toLocaleDateString()} at {commenceDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          {!isUpcoming && (
            <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
              In Progress / Completed
            </span>
          )}
        </div>
      </div>

      {/* Odds Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Moneyline */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Moneyline
          </h4>
          {bestMoneyline[fixture.away_team] && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {fixture.away_team}
              </p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {formatOdds(bestMoneyline[fixture.away_team].price)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                {bestMoneyline[fixture.away_team].bookmaker}
              </p>
            </div>
          )}
          {bestMoneyline[fixture.home_team] && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {fixture.home_team}
              </p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {formatOdds(bestMoneyline[fixture.home_team].price)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                {bestMoneyline[fixture.home_team].bookmaker}
              </p>
            </div>
          )}
        </div>

        {/* Spreads */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Spread
          </h4>
          {bestSpread[fixture.away_team] && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {fixture.away_team}
              </p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {bestSpread[fixture.away_team].point >= 0 ? '+' : ''}
                {bestSpread[fixture.away_team].point}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {formatOdds(bestSpread[fixture.away_team].price)}
              </p>
            </div>
          )}
          {bestSpread[fixture.home_team] && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {fixture.home_team}
              </p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {bestSpread[fixture.home_team].point >= 0 ? '+' : ''}
                {bestSpread[fixture.home_team].point}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {formatOdds(bestSpread[fixture.home_team].price)}
              </p>
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Total
          </h4>
          {bestTotal['Over'] && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">Over</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {bestTotal['Over'].point}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {formatOdds(bestTotal['Over'].price)}
              </p>
            </div>
          )}
          {bestTotal['Under'] && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">Under</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {bestTotal['Under'].point}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {formatOdds(bestTotal['Under'].price)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Number of bookmakers */}
      <div className="mt-4 pt-4 border-t dark:border-gray-700">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          Odds from {fixture.bookmakers.length} bookmaker{fixture.bookmakers.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
