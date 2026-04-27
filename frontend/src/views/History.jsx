import React from 'react';
import { formatDate, formatCurrency } from '../utils';

export default function History({ payments }) {
  const sorted = [...payments].sort((a,b)=> new Date(b.date)-new Date(a.date));
  return (
    <div className="animate-float">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        <i className="fas fa-receipt text-green-700 mr-2"></i>GPay Style Ledger
      </h2>
      <div className="glass-card bg-white overflow-hidden rounded-3xl">
        <div className="scrollable-table">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-gray-700 text-xs">
              <tr>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Amount</th>
                <th className="px-5 py-3 text-left">Date</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => (
                <tr key={i} className="border-b">
                  <td className="px-5 py-3 font-medium whitespace-nowrap">{p.name}</td>
                  <td className="px-5 py-3 font-semibold text-green-700 whitespace-nowrap">{formatCurrency(p.amount)}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">{formatDate(p.date)}</td>
                  <td className="px-5 py-3 text-left">
                    <span className="bg-green-100 text-green-800 text-[11px] px-2 py-1 rounded-full whitespace-nowrap">
                      <i className="fas fa-check-circle"></i> {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">
        <i className="fas fa-shield-alt mr-1"></i> All transactions verified &amp; immutable
      </p>
    </div>
  );
}
