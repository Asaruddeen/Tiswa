import React, { useState, useEffect } from 'react';
import Home from './views/Home';
import Members from './views/Members';
import Payment from './views/Payment';
import History from './views/History';
import Events from './views/Events';
import Expense from './views/Expense';
import Dashboard from './views/Dashboard';
import Logo from './components/Logo';

const API_URL = 'https://tiswa.onrender.com/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [settings, setSettings] = useState({ upiId: 'tiswa@icici', qrImage: '' });

  useEffect(() => {
    fetch(`${API_URL}/members`).then(res => res.json()).then(setMembers).catch(console.error);
    fetch(`${API_URL}/payments`).then(res => res.json()).then(setPayments).catch(console.error);
    fetch(`${API_URL}/expenses`).then(res => res.json()).then(setExpenses).catch(console.error);
    fetch(`${API_URL}/settings`).then(res => res.json()).then(setSettings).catch(console.error);
  }, []);

  const navItems = [
    { id: 'home', icon: 'fas fa-home', label: 'Home' },
    { id: 'members', icon: 'fas fa-users', label: 'Members' },
    { id: 'payment', icon: 'fas fa-qrcode', label: 'Pay' },
    { id: 'history', icon: 'fas fa-history', label: 'History' },
    { id: 'events', icon: 'fas fa-calendar-alt', label: 'Events' },
    { id: 'expense', icon: 'fas fa-receipt', label: 'Expense' },
    { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Balance' }
  ];

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 relative min-h-screen" style={{ paddingBottom: 'calc(6.5rem + env(safe-area-inset-bottom))' }}>

      <div>
        {currentPage === 'home' && <Home payments={payments} expenses={expenses} />}
        {currentPage === 'members' && <Members members={members} />}
        {currentPage === 'payment' && <Payment payments={payments} settings={settings} />}
        {currentPage === 'history' && <History payments={payments} />}
        {currentPage === 'events' && <Events />}
        {currentPage === 'expense' && <Expense expenses={expenses} setExpenses={setExpenses} />}
        {currentPage === 'dashboard' && <Dashboard payments={payments} expenses={expenses} />}
      </div>

      {/* Bottom Navigation */}
      <div
        className="fixed bottom-0 left-0 right-0 flex justify-center z-40 px-2"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <nav className="tiswa-nav bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 w-full max-w-md mx-auto px-1.5 py-1.5">
          <div className="flex items-stretch justify-between gap-0.5 overflow-x-auto scrollbar-hide">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-btn flex flex-col items-center justify-center gap-0.5 rounded-2xl transition-all duration-200 border-none flex-shrink-0 ${
                  currentPage === item.id
                    ? 'active bg-green-700 text-white shadow-[0_6px_14px_rgba(15,76,42,0.25)]'
                    : 'text-gray-600 bg-transparent'
                }`}
              >
                <i className={`${item.icon} nav-icon`}></i>
                <span className="nav-label font-medium leading-tight">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .nav-btn {
          min-width: 44px;
          min-height: 44px;
          padding: 6px clamp(4px, 1.8vw, 10px);
          -webkit-tap-highlight-color: transparent;
        }
        .nav-icon {
          font-size: clamp(15px, 4.2vw, 19px);
        }
        .nav-label {
          font-size: clamp(8px, 2.4vw, 10px);
          white-space: nowrap;
        }

        /* Very small phones (old iPhone SE, etc.) — shrink further before scroll kicks in */
        @media (max-width: 340px) {
          .nav-btn { min-width: 40px; padding: 5px 3px; }
          .nav-label { font-size: 7.5px; }
        }
      `}</style>
    </div>
  );
}

export default App;