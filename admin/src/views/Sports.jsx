import React, { useState } from 'react';

export default function Sports({ sportsData, setSportsData }) {
  const [formData, setFormData] = useState(sportsData);

  const handleSave = () => {
    setSportsData(formData);
    alert("Sports data updated!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        <i className="fas fa-futbol text-green-700 mr-2"></i>Sports Tournament Control
      </h2>
      <div className="bg-white rounded-2xl p-5 border">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Winner</label>
            <input value={formData.winner} onChange={e => setFormData({...formData, winner: e.target.value})} className="w-full border rounded-xl p-2 mt-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Runner Up</label>
            <input value={formData.runner} onChange={e => setFormData({...formData, runner: e.target.value})} className="w-full border rounded-xl p-2 mt-1" />
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium">Man of Series</label>
          <input value={formData.manOfSeries} onChange={e => setFormData({...formData, manOfSeries: e.target.value})} className="w-full border rounded-xl p-2 mt-1" />
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium">Best Bowler</label>
          <input value={formData.bestBowler} onChange={e => setFormData({...formData, bestBowler: e.target.value})} className="w-full border rounded-xl p-2 mt-1" />
        </div>
        <div className="mt-3">
          <label className="block text-sm font-medium">Extra Updates</label>
          <textarea rows="2" value={formData.updates} onChange={e => setFormData({...formData, updates: e.target.value})} className="w-full border rounded-xl p-2 mt-1"></textarea>
        </div>
        <button onClick={handleSave} className="mt-4 bg-green-700 text-white px-5 py-2 rounded-xl">Save Sports Updates</button>
      </div>
    </div>
  );
}
