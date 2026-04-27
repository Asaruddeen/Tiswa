import React from 'react';
import { formatCurrency, formatDate } from '../utils';

export default function History({ payments }) {
  const sorted = [...payments].sort((a,b)=>new Date(b.date)-new Date(a.date));
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        <i className="fas fa-history text-green-700 mr-2"></i>Complete Payment Ledger
      </h2>
      <div className="scrollable-table">
        <table className="min-w-full bg-white rounded-2xl border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Ref</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(p => (
              <tr key={p.id}>
                <td className="p-3 whitespace-nowrap">{p.name}</td>
                <td className="p-3 text-green-700 font-bold whitespace-nowrap">{formatCurrency(p.amount)}</td>
                <td className="p-3 whitespace-nowrap">{formatDate(p.date)}</td>
                <td className="p-3 text-xs whitespace-nowrap">{p.ref}</td>
                <td className="p-3 whitespace-nowrap">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                    <i className="fas fa-check mr-1"></i> {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
