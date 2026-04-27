import React from 'react';

export default function Members({ members, openAddMemberModal, editMember, deleteMember }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
        <h2 className="text-xl font-bold text-gray-800">
          <i className="fas fa-users text-green-700 mr-2"></i>Manage Members
        </h2>
        <button onClick={openAddMemberModal} className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 shadow">
          <i className="fas fa-plus"></i> Add Member
        </button>
      </div>
      <div className="scrollable-table">
        <table className="min-w-full bg-white rounded-2xl overflow-hidden border">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Mobile</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(m => (
              <tr key={m._id} className="border-b hover:bg-green-50/40">
                <td className="p-3 font-medium whitespace-nowrap">{m.name}</td>
                <td className="p-3 text-gray-600 whitespace-nowrap">{m.mobile}</td>
                <td className="p-3 whitespace-nowrap">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">{m.role}</span>
                </td>
                <td className="p-3 text-center whitespace-nowrap">
                  <button onClick={() => editMember(m._id)} className="text-blue-600 mr-3"><i className="fas fa-edit"></i></button>
                  <button onClick={() => deleteMember(m._id)} className="text-red-500"><i className="fas fa-trash-alt"></i></button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr><td colSpan="4" className="text-center p-6 text-gray-400">No members added</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
