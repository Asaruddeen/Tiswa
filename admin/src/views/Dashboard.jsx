import React from 'react';
import { formatCurrency, getTotalCollected, getTotalSpent, getRemainingBalance } from '../utils';

export default function Dashboard({ payments, expenses }) {
  const collected = getTotalCollected(payments);
  const spent = getTotalSpent(expenses);
  const bal = getRemainingBalance(payments, expenses);
  const percent = collected ? (bal / collected) * 100 : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        <i className="fas fa-chart-pie text-green-700 mr-2"></i>Financial Balance Dashboard
      </h2>
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <div className="admin-card p-5">
          <p className="text-gray-500">Total Collected</p>
          <p className="text-3xl font-black text-green-700">{formatCurrency(collected)}</p>
        </div>
        <div className="admin-card p-5">
          <p className="text-gray-500">Total Spent</p>
          <p className="text-3xl font-black text-red-600">{formatCurrency(spent)}</p>
        </div>
        <div className="bg-mosque-gradient p-5 rounded-3xl text-white">
          <p>Remaining</p>
          <p className="text-3xl font-black">{formatCurrency(bal)}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-green-700 h-4 rounded-full" style={{ width: `${percent}%` }}></div>
        </div>
        <p className="text-center text-sm mt-3">Fund Reserve Ratio: {Math.round(percent)}%</p>
      </div>
      <div className="mt-5 grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 p-3 rounded-xl">
          <i className="fas fa-chart-line mr-1"></i> Total transactions: {payments.length}
        </div>
        <div className="bg-gray-50 p-3 rounded-xl">
          <i className="fas fa-receipt mr-1"></i> Total expense entries: {expenses.length}
        </div>
      </div>
    </div>
  );
}
