import React from 'react';
import { formatCurrency, formatDate } from '../utils';

export default function Payments({ payments, openAddPaymentModal, deletePayment }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">
          <i className="fas fa-hand-holding-usd text-green-700 mr-2"></i>Record New Payment
        </h2>
        <button onClick={openAddPaymentModal} className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm">
          <i className="fas fa-plus-circle"></i> Add Payment
        </button>
      </div>
      <div className="scrollable-table">
        <table className="min-w-full bg-white rounded-2xl border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p._id} className="border-b">
                <td className="p-3 whitespace-nowrap">{p.name}</td>
                <td className="p-3 font-semibold text-green-700 whitespace-nowrap">{formatCurrency(p.amount)}</td>
                <td className="p-3 text-sm whitespace-nowrap">{formatDate(p.date)}</td>
                <td className="p-3 whitespace-nowrap">
                  <span className="status-badge px-2 py-0.5 rounded-full text-xs">{p.status}</span>
                </td>
                <td className="p-3">
                  <button onClick={() => deletePayment(p._id)} className="text-red-500">
                    <i className="fas fa-trash"></i>
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
