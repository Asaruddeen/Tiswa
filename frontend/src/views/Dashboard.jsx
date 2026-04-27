import React from 'react';
import { formatCurrency, getTotalCollected, getTotalSpent, getRemainingBalance } from '../utils';

export default function Dashboard({ payments, expenses }) {
  const collected = getTotalCollected(payments);
  const spent = getTotalSpent(expenses);
  const remaining = getRemainingBalance(payments, expenses);
  const percentRemaining = collected ? (remaining / collected) * 100 : 0;

  return (
    <div className="animate-float">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        <i className="fas fa-chart-line text-green-700 mr-2"></i>Balance Dashboard
      </h2>
      <div className="space-y-4">
        <div className="glass-card bg-white p-5 rounded-2xl dashboard-stat">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Collected</p>
              <p className="text-3xl font-extrabold text-green-700">{formatCurrency(collected)}</p>
            </div>
            <i className="fas fa-hand-holding-usd text-4xl text-green-200"></i>
          </div>
        </div>
        <div className="glass-card bg-white p-5 rounded-2xl dashboard-stat">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Spent</p>
              <p className="text-3xl font-extrabold text-rose-600">{formatCurrency(spent)}</p>
            </div>
            <i className="fas fa-chart-simple text-4xl text-rose-200"></i>
          </div>
        </div>
        <div className="bg-mosque-gradient rounded-2xl p-6 text-white shadow-xl">
          <p className="text-green-100 text-sm tracking-wide">REMAINING BALANCE</p>
          <p className="text-4xl font-black mt-1">{formatCurrency(remaining)}</p>
          <div className="w-full bg-green-900/40 rounded-full h-2 mt-4">
            <div className="bg-white h-2 rounded-full" style={{ width: `${percentRemaining}%` }}></div>
          </div>
          <div className="flex justify-between text-green-100 text-xs mt-3">
            <span>💰 Community Fund</span>
            <span>⚡ {Math.round(percentRemaining)}% reserve</span>
          </div>
        </div>
        <div className="text-center text-[11px] text-gray-400 mt-2">
          <i className="far fa-clock mr-1"></i> Real-time financial integrity
        </div>
      </div>
    </div>
  );
}
