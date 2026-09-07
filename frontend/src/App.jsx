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
    { id: 'events', icon: 'fas fa-calendar-alt', label: 'Events' },
    { id: 'expense', icon: 'fas fa-receipt', label: 'Expense' },
    { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Balance' }
  ];

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-20 relative">
      {/* Header with Logo */}
      <div className="mb-6">
        <Logo size="md" />
      </div>

      <div>
        {currentPage === 'home' && <Home payments={payments} expenses={expenses} />}
        {currentPage === 'members' && <Members members={members} />}
        {currentPage === 'payment' && <Payment payments={payments} settings={settings} />}
        {currentPage === 'history' && <History payments={payments} />}
        {currentPage === 'events' && <Events />}
        {currentPage === 'expense' && <Expense expenses={expenses} setExpenses={setExpenses} />}
        {currentPage === 'dashboard' && <Dashboard payments={payments} expenses={expenses} />}
      </div>

      {/* Bottom Navigation - Compact */}
      <div className="fixed bottom-2 left-0 right-0 flex justify-center z-40">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 w-[calc(100%-1.5rem)] max-w-md mx-auto px-1 py-1.5">
          <div className="flex justify-around items-center">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-btn flex flex-col items-center gap-0.5 px-1.5 py-1 rounded-xl transition-all duration-200 border-none ${
                  currentPage === item.id 
                    ? 'active bg-green-700 text-white shadow-[0_4px_12px_rgba(15,76,42,0.25)]' 
                    : 'text-gray-600 bg-transparent hover:bg-gray-100'
                }`}
              >
                <i className={`${item.icon} text-sm sm:text-base`}></i>
                <span className="text-[7px] sm:text-[9px] font-medium leading-tight whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;