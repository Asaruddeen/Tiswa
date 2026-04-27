import React from 'react';
import { formatCurrency, formatDate } from '../utils';

export default function Expenses({ expenses, openAddExpenseModal, deleteExpense }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">
          <i className="fas fa-shopping-cart text-green-700 mr-2"></i>Expense Management
        </h2>
        <button onClick={openAddExpenseModal} className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm">
          <i className="fas fa-plus"></i> Add Expense
        </button>
      </div>
      <div className="scrollable-table">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Item</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(e => (
              <tr key={e._id} className="border-b">
                <td className="p-3 font-medium whitespace-nowrap">{e.item}</td>
                <td className="p-3 text-red-600 font-semibold whitespace-nowrap">{formatCurrency(e.amount)}</td>
                <td className="p-3 text-sm whitespace-nowrap">{formatDate(e.date)}</td>
                <td className="p-3 whitespace-nowrap">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{e.category}</span>
                </td>
                <td className="p-3">
                  <button onClick={() => deleteExpense(e._id)} className="text-red-500">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
