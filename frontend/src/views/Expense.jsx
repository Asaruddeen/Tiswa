import React from 'react';
import { formatDate, formatCurrency, getTotalSpent } from '../utils';

export default function Expense({ expenses, setExpenses }) {
  const totalExp = getTotalSpent(expenses);

  const addDemoExpense = () => {
    const newItem = { item: "Cricket Refreshments (Demo)", amount: 650, date: new Date().toISOString().slice(0, 10), category: "Event" };
    setExpenses(prev => [...prev, newItem]);
    alert("✅ Demo expense added: ₹650 (Cricket Refreshments)");
  };

  return (
    <div className="animate-float">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-gray-800">
          <i className="fas fa-cart-shopping text-green-700 mr-2"></i>Expense Tracker
        </h2>
        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">{formatCurrency(totalExp)}</span>
      </div>
      <div className="glass-card bg-white overflow-hidden rounded-3xl mb-4">
        <div className="scrollable-table">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left">Item</th>
                <th className="px-5 py-3 text-left">Amount</th>
                <th className="px-5 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e, i) => (
                <tr key={i} className="border-b">
                  <td className="px-5 py-3 font-medium whitespace-nowrap">{e.item}</td>
                  <td className="px-5 py-3 text-red-600 font-semibold whitespace-nowrap">{formatCurrency(e.amount)}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">{formatDate(e.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
