import React, { useState, useEffect } from 'react';

export default function Settings({ settings, setSettings }) {
  const [upiId, setUpiId] = useState('');
  const [qrImage, setQrImage] = useState('');

  useEffect(() => {
    if (settings) {
      setUpiId(settings.upiId || '');
      setQrImage(settings.qrImage || '');
    }
  }, [settings]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setSettings({ upiId, qrImage });
    alert("Settings saved!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-5 flex items-center text-gray-800">
        <i className="fas fa-cogs text-green-700 mr-2"></i> Payment Settings
      </h2>
      <div className="bg-white p-6 rounded-2xl shadow-sm border max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">UPI ID</label>
          <input 
            value={upiId} 
            onChange={e => setUpiId(e.target.value)} 
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600" 
            placeholder="e.g. tiswa@icici" 
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Payment QR Image (Optional)</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="w-full border p-3 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
          />
          {qrImage && (
            <div className="mt-4 flex flex-col items-center border rounded-xl p-2 bg-gray-50">
              <span className="text-xs text-gray-400 mb-2">Preview</span>
              <img src={qrImage} alt="QR Preview" className="w-32 h-32 object-contain" />
            </div>
          )}
        </div>
        <button onClick={handleSave} className="bg-green-700 w-full text-white py-3 rounded-xl font-bold hover:bg-green-800 transition-colors shadow">
          Save Settings
        </button>
      </div>
    </div>
  );
}
