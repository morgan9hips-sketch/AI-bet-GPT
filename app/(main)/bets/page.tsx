'use client';

import { useState } from 'react';
import { formatDate } from '@/utils/helpers';

interface Bet {
  id: string;
  match: string;
  prediction: string;
  confidence: number;
  stake: number;
  odds: number;
  status: 'pending' | 'won' | 'lost';
  date: string;
}

export default function BetsPage() {
  const [bets] = useState<Bet[]>([]);

  const totalStaked = bets.reduce((sum, bet) => sum + bet.stake, 0);
  const wonBets = bets.filter(bet => bet.status === 'won');
  const totalWon = wonBets.reduce((sum, bet) => sum + (bet.stake * (bet.odds / 100)), 0);
  const winRate = bets.length > 0 ? (wonBets.length / bets.length) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        My Bets
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Bets</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{bets.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Staked</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalStaked.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Won</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">${totalWon.toFixed(2)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-2">Win Rate</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{winRate.toFixed(1)}%</p>
        </div>
      </div>

      {/* Bets Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bet History</h2>
        </div>
        
        {bets.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">No bets tracked yet</p>
            <p className="text-sm">Start by getting AI predictions and tracking your bets!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Prediction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Stake
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {bets.map((bet) => (
                  <tr key={bet.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {bet.match}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {bet.prediction}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {bet.confidence}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      ${bet.stake}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        bet.status === 'won' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                        bet.status === 'lost' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                        'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {bet.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(bet.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
