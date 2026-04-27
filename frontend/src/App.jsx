import React, { useState, useEffect } from 'react';
import Home from './views/Home';
import Members from './views/Members';
import Payment from './views/Payment';
import History from './views/History';
import Sports from './views/Sports';
import Expense from './views/Expense';
import Dashboard from './views/Dashboard';

const API_URL = 'https://tiswa.onrender.com/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [settings, setSettings] = useState({ upiId: 'tiswa@icici', qrImage: '' });

  useEffect(() => {
    fetch(`${API_URL}/members`).then(res => res.json()).then(data => setMembers(data)).catch(console.error);
    fetch(`${API_URL}/payments`).then(res => res.json()).then(data => setPayments(data)).catch(console.error);
    fetch(`${API_URL}/expenses`).then(res => res.json()).then(data => setExpenses(data)).catch(console.error);
    fetch(`${API_URL}/settings`).then(res => res.json()).then(data => setSettings(data)).catch(console.error);
  }, []);

  const navItems = [
    { id: 'home', icon: 'fas fa-home', label: 'Home' },
    { id: 'members', icon: 'fas fa-users', label: 'Members' },
    { id: 'payment', icon: 'fas fa-qrcode', label: 'Pay' },
    { id: 'history', icon: 'fas fa-history', label: 'History' },
    { id: 'sports', icon: 'fas fa-futbol', label: 'Sports' },
    { id: 'expense', icon: 'fas fa-receipt', label: 'Expense' },
    { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Balance' }
  ];

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-24 relative">
      <div>
        {currentPage === 'home' && <Home payments={payments} expenses={expenses} />}
        {currentPage === 'members' && <Members members={members} />}
        {currentPage === 'payment' && <Payment payments={payments} settings={settings} />}
        {currentPage === 'history' && <History payments={payments} />}
        {currentPage === 'sports' && <Sports />}
        {currentPage === 'expense' && <Expense expenses={expenses} setExpenses={setExpenses} />}
        {currentPage === 'dashboard' && <Dashboard payments={payments} expenses={expenses} />}
      </div>

      <div className="fixed bottom-3 left-0 right-0 flex justify-center z-40">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 w-[calc(100%-2rem)] max-w-md mx-auto px-2 py-2">
          <div className="flex justify-around items-center bottom-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-btn flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-200 border-none ${
                  currentPage === item.id ? 'active bg-green-700 text-white shadow-[0_6px_14px_rgba(15,76,42,0.25)]' : 'text-gray-600 bg-transparent'
                }`}
              >
                <i className={`${item.icon} text-lg`}></i>
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
