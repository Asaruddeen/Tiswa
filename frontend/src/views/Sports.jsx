import React from 'react';

export default function Sports() {
  return (
    <div className="animate-float">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        <i className="fas fa-futbol text-green-700 mr-2"></i>Ramadan Cricket '26
      </h2>
      <div className="glass-card bg-white p-5 rounded-3xl shadow">
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <p className="text-gray-500 text-xs">CHAMPIONS</p>
            <p className="text-2xl font-black text-green-800">🏆 Team A</p>
            <p className="text-xs">Green Stallions</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs">RUNNERS-UP</p>
            <p className="text-xl font-bold text-gray-700">Team B</p>
            <p className="text-xs">United Warriors</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div className="bg-green-50 p-2 rounded-xl">
            <i className="fas fa-crown text-yellow-600 mr-1"></i> <strong>Player of Series:</strong> Asaruddeen
          </div>
          <div className="bg-green-50 p-2 rounded-xl">
            <i className="fas fa-chart-simple mr-1"></i> <strong>Most Wickets:</strong> Udhay (9 wkts)
          </div>
        </div>
        <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center gap-3">
          <i className="fas fa-camera-retro text-green-700 text-xl"></i>
          <span className="text-xs text-gray-600">📸 Action photos &amp; award ceremony gallery will be uploaded after Eid celebration.</span>
        </div>
      </div>
    </div>
  );
}
