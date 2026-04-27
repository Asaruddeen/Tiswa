import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay transition-all animate-fade" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl transform transition-all" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
