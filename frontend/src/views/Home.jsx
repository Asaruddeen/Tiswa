import React from 'react';
import { getRemainingBalance, formatCurrency, getRecentActivity } from '../utils';

export default function Home({ payments, expenses }) {
  const balance = getRemainingBalance(payments, expenses);
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const activities = getRecentActivity(payments, expenses);

  return (
    <div className="space-y-5 animate-float pb-4">
      <div className="glass-card p-5 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4">
          <div className="bg-mosque-gradient w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
            <i className="fas fa-mosque text-white text-3xl drop-shadow-sm"></i>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-800">TISWA</h1>
            <p className="text-xs text-green-700 font-medium -mt-0.5"></p>
          </div>
        </div>
        <div className="bg-green-100 px-3 py-1.5 rounded-full">
          <i className="fas fa-shield-alt text-green-700 text-xs"></i>
          <span className="text-[11px] font-semibold text-green-800 ml-1">Unity</span>
        </div>
      </div>
      
      <div className="glass-card p-5 bg-white border-l-8 border-green-700">
        <p className="text-gray-600 text-sm leading-relaxed">
          <i className="fas fa-quote-left text-green-600 mr-2 opacity-70"></i>
          Serving community with integrity, transparency, and collective growth. Every contribution builds a stronger tomorrow.
        </p>
      </div>

      <div className="bg-mosque-gradient rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-green-100 text-sm font-medium tracking-wide">TOTAL BALANCE</p>
            <p className="text-4xl font-bold mt-1 tracking-tight">{formatCurrency(balance)}</p>
          </div>
          <i className="fas fa-hand-holding-heart text-4xl text-white/30"></i>
        </div>
        <div className="mt-4 flex justify-between items-center text-green-100 text-xs">
          <span><i className="far fa-calendar-alt mr-1"></i> {today}</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full">Verified</span>
        </div>
      </div>

      <div className="glass-card p-5 bg-white">
        <h2 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
          <i className="fas fa-waveform text-green-700"></i> Recent Activity
        </h2>
        <div className="mt-3 space-y-3">
          {activities.map((act, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">{act.icon}</div>
              <p className="text-sm text-gray-700 flex-1">{act.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Powered By Section - Gradient Style */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-transparent to-green-50 rounded-2xl opacity-50"></div>
        <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-green-100/30">
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-md">
                <i className="fas fa-crown text-white text-[10px]"></i>
              </div>
              <span className="text-xs text-gray-600">Powered by</span>
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
              Yunrah Technologies
            </span>
            <span className="text-[10px] text-gray-400 bg-gray-100/50 px-2 py-0.5 rounded-full">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}