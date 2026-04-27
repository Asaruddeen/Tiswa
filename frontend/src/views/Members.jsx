import React from 'react';

export default function Members({ members }) {
  return (
    <div className="animate-float">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          <i className="fas fa-users text-green-700 mr-2"></i>Leadership & Members
        </h2>
        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">{members.length} registered</span>
      </div>
      <div className="glass-card bg-white overflow-hidden p-1">
        <div className="scrollable-table">
          <table className="min-w-full text-sm">
            <thead className="bg-green-50 text-gray-700 text-xs font-semibold">
              <tr>
                <th className="px-5 py-3 text-left">Member</th>
                <th className="px-5 py-3 text-left">Mobile</th>
                <th className="px-5 py-3 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-green-50/30 transition">
                  <td className="px-5 py-3 font-semibold text-gray-800 whitespace-nowrap">{m.name}</td>
                  <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">{m.mobile}</td>
                  <td className="px-5 py-3 text-left">
                    <span className="bg-green-100 text-green-800 text-[11px] px-2 py-1 rounded-full whitespace-nowrap">{m.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 text-center text-gray-400 text-[11px]">
        <i className="fas fa-address-card mr-1"></i> Verified community directory
      </div>
    </div>
  );
}
