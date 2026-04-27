import React from 'react';
import { formatDate, formatCurrency } from '../utils';

export default function Payment({ payments, settings }) {
  const recentThree = [...payments].slice(-3).reverse();
  return (
    <div className="animate-float">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        <i className="fas fa-qrcode text-green-700 mr-2"></i>Quick Donation
      </h2>
      <div className="glass-card bg-white p-6 text-center qr-elegant shadow-md">
        <div className="bg-white w-44 h-44 mx-auto rounded-2xl flex flex-col items-center justify-center border-2 border-green-200 shadow-inner overflow-hidden">
          {settings?.qrImage ? (
            <img src={settings.qrImage} alt="Payment QR" className="w-full h-full object-contain" />
          ) : (
            <>
              <i className="fas fa-mosque text-5xl text-green-800 opacity-70"></i>
              <i className="fas fa-qrcode text-5xl text-green-700 mt-1"></i>
              <p className="text-[10px] text-gray-500 mt-2">TISWA Official QR</p>
            </>
          )}
        </div>
        <div className="mt-5 text-left bg-green-50/50 p-4 rounded-2xl">
          <p className="font-bold text-green-800 flex items-center gap-2">
            <i className="fas fa-circle-info"></i> Payment Instructions
          </p>
          <ul className="text-sm text-gray-700 space-y-1.5 mt-2 ml-1 list-disc list-inside">
            <li>Scan QR using any UPI app (GPay, PhonePe, Paytm)</li>
            <li>UPI ID: <strong className="bg-white px-2 py-0.5 rounded">{settings?.upiId || 'tiswa@icici'}</strong></li>
            <li>Enter amount &amp; mention your <strong>Full Name</strong></li>
            <li>Payment reflects within 2 hours in history</li>
          </ul>
        </div>
      </div>
      <div className="mt-5 glass-card p-4 bg-white">
        <h3 className="font-semibold text-gray-800"><i className="fas fa-clock"></i> Latest Contributions</h3>
        <div className="mt-2 space-y-2">
          {recentThree.map((p, i) => (
            <div key={i} className="flex justify-between items-center p-2 border-b border-gray-100">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-[10px] text-gray-400">{formatDate(p.date)}</p>
              </div>
              <span className="text-green-700 font-bold">{formatCurrency(p.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
