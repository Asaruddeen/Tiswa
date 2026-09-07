import React, { useState, useEffect } from 'react';
import Members from './views/Members';
import Payments from './views/Payments';
import Expenses from './views/Expenses';
import History from './views/History';
import Events from './views/Events';
import Dashboard from './views/Dashboard';
import Settings from './views/Settings';
import Modal from './components/Modal';
import Logo from './components/Logo'; // Import Logo component

import { getTotalCollected, getTotalSpent, getRemainingBalance, formatCurrency } from './utils';

const API_URL = 'https://tiswa.onrender.com/api';
// const API_URL = 'http://localhost:5000/api';


export default function App() {
  const [currentTab, setCurrentTab] = useState('members');
  
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [events, setEvents] = useState([]);
  const [settings, setSettings] = useState({ upiId: 'tiswa@icici', qrImage: '' });

  // Fetch initial data
  useEffect(() => {
    fetch(`${API_URL}/members`).then(res => res.json()).then(setMembers).catch(console.error);
    fetch(`${API_URL}/payments`).then(res => res.json()).then(setPayments).catch(console.error);
    fetch(`${API_URL}/expenses`).then(res => res.json()).then(setExpenses).catch(console.error);
    fetch(`${API_URL}/events`).then(res => res.json()).then(setEvents).catch(console.error);
    fetch(`${API_URL}/settings`).then(res => res.json()).then(setSettings).catch(console.error);
  }, []);

  const [modalState, setModalState] = useState({ isOpen: false, type: null, payload: null });
  const openModal = (type, payload = null) => setModalState({ isOpen: true, type, payload });
  const closeModal = () => setModalState({ isOpen: false, type: null, payload: null });

  // Form states
  const [memberForm, setMemberForm] = useState({ name: '', mobile: '', role: '' });
  const [paymentForm, setPaymentForm] = useState({ name: '', amount: '', date: new Date().toISOString().slice(0,10) });
  const [expenseForm, setExpenseForm] = useState({ item: '', amount: '', date: new Date().toISOString().slice(0,10), category: '' });
  const [eventForm, setEventForm] = useState({ 
    title: '', 
    description: '', 
    date: new Date().toISOString().slice(0,16), 
    image: '', 
    location: '', 
    status: 'upcoming' 
  });

  // Handlers
  const handleMemberSubmit = async () => {
    if(!memberForm.name) return;
    if (modalState.type === 'editMember') {
      const res = await fetch(`${API_URL}/members/${modalState.payload}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(memberForm) });
      const updated = await res.json();
      setMembers(members.map(m => m._id === modalState.payload ? updated : m));
    } else {
      const res = await fetch(`${API_URL}/members`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({...memberForm, joinDate: new Date().toISOString().slice(0,10)}) });
      const newM = await res.json();
      setMembers([...members, newM]);
    }
    closeModal();
  };

  const deleteMember = async (id) => {
    if(window.confirm("Delete member?")) {
      await fetch(`${API_URL}/members/${id}`, { method: 'DELETE' });
      setMembers(members.filter(m => m._id !== id));
    }
  };

  const handlePaymentSubmit = async () => {
    if(!paymentForm.name || !paymentForm.amount) return;
    const body = { ...paymentForm, amount: parseFloat(paymentForm.amount), ref: "ADMIN" + Math.floor(Math.random()*9999), method: 'Manual' };
    const res = await fetch(`${API_URL}/payments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const newP = await res.json();
    setPayments([...payments, newP]);
    closeModal();
  };

  const deletePayment = async (id) => {
    if(window.confirm("Delete payment?")) {
      await fetch(`${API_URL}/payments/${id}`, { method: 'DELETE' });
      setPayments(payments.filter(p => p._id !== id));
    }
  };

  const handleExpenseSubmit = async () => {
    if(!expenseForm.item || !expenseForm.amount) return;
    const body = { ...expenseForm, amount: parseFloat(expenseForm.amount) };
    const res = await fetch(`${API_URL}/expenses`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const newE = await res.json();
    setExpenses([...expenses, newE]);
    closeModal();
  };

  const deleteExpense = async (id) => {
    if(window.confirm("Delete expense?")) {
      await fetch(`${API_URL}/expenses/${id}`, { method: 'DELETE' });
      setExpenses(expenses.filter(e => e._id !== id));
    }
  };

  // Event Handlers
  const handleEventSubmit = async () => {
    if(!eventForm.title || !eventForm.description || !eventForm.date) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      if (modalState.type === 'editEvent') {
        const res = await fetch(`${API_URL}/events/${modalState.payload}`, { 
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(eventForm) 
        });
        const updated = await res.json();
        setEvents(events.map(e => e._id === modalState.payload ? updated : e));
      } else {
        const res = await fetch(`${API_URL}/events`, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify(eventForm) 
        });
        const newEvent = await res.json();
        setEvents([...events, newEvent]);
      }
      closeModal();
    } catch (error) {
      console.error("Event Submit Error:", error);
      alert("Failed to save event. Please check your connection.");
    }
  };

  const deleteEvent = async (id) => {
    if(window.confirm("Delete this event?")) {
      try {
        await fetch(`${API_URL}/events/${id}`, { method: 'DELETE' });
        setEvents(events.filter(e => e._id !== id));
      } catch (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete event");
      }
    }
  };

  const handleSettingsUpdate = async (updatedSettings) => {
    const res = await fetch(`${API_URL}/settings`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedSettings) });
    const saved = await res.json();
    setSettings(saved);
  };

  const tabs = [
    { id: 'members', icon: 'fas fa-users', label: 'Members' },
    { id: 'payments', icon: 'fas fa-qrcode', label: 'Payments' },
    { id: 'expenses', icon: 'fas fa-receipt', label: 'Expenses' },
    { id: 'history', icon: 'fas fa-clock', label: 'Payment History' },
    { id: 'events', icon: 'fas fa-calendar-alt', label: 'Events' },
    { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Balance Dashboard' },
    { id: 'settings', icon: 'fas fa-cogs', label: 'Settings' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 lg:px-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-mosque-gradient w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
            <i className="fas fa-mosque text-white text-3xl"></i>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">TISWA <span className="text-green-700">Admin</span></h1>
            <p className="text-sm text-gray-500 -mt-0.5">Full Management Suite • Complete Control</p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-green-700 relative overflow-hidden">
          <p className="text-gray-500 text-xs">Total Members</p>
          <p className="text-2xl font-black text-gray-800">{members.length}</p>
          <i className="fas fa-user-friends text-green-200 absolute right-4 bottom-2 text-3xl"></i>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-blue-600">
          <p className="text-gray-500 text-xs">Total Collected</p>
          <p className="text-2xl font-black text-green-700">{formatCurrency(getTotalCollected(payments))}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-red-500">
          <p className="text-gray-500 text-xs">Total Expenses</p>
          <p className="text-2xl font-black text-red-600">{formatCurrency(getTotalSpent(expenses))}</p>
        </div>
        <div className="bg-mosque-gradient rounded-2xl p-4 text-white shadow-md">
          <p className="text-green-100 text-xs">Remaining</p>
          <p className="text-2xl font-black">{formatCurrency(getRemainingBalance(payments, expenses))}</p>
        </div>
      </div>

      {/* TABS */}
      <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-8">
        <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setCurrentTab(tab.id)} className={`px-5 py-3 font-semibold text-sm transition-all flex items-center gap-2 border-b-2 ${currentTab === tab.id ? 'border-green-700 text-green-700' : 'border-transparent text-gray-600 hover:text-green-700'}`}>
              <i className={tab.icon}></i> {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-5 md:p-6 animate-fade">
          {currentTab === 'members' && <Members members={members} deleteMember={deleteMember} openAddMemberModal={() => { setMemberForm({name:'',mobile:'',role:''}); openModal('addMember'); }} editMember={(id) => { const m = members.find(x=>x._id===id); setMemberForm({name:m.name,mobile:m.mobile,role:m.role}); openModal('editMember', id); }} />}
          {currentTab === 'payments' && <Payments payments={payments} deletePayment={deletePayment} openAddPaymentModal={() => { setPaymentForm({name:'',amount:'',date:new Date().toISOString().slice(0,10)}); openModal('addPayment'); }} />}
          {currentTab === 'expenses' && <Expenses expenses={expenses} deleteExpense={deleteExpense} openAddExpenseModal={() => { setExpenseForm({item:'',amount:'',date:new Date().toISOString().slice(0,10),category:''}); openModal('addExpense'); }} />}
          {currentTab === 'history' && <History payments={payments} />}
          {currentTab === 'events' && <Events 
            events={events} 
            setEvents={setEvents}
            openAddEventModal={() => { 
              setEventForm({
                title: '', 
                description: '', 
                date: new Date().toISOString().slice(0,16), 
                image: '', 
                location: '', 
                status: 'upcoming'
              }); 
              openModal('addEvent'); 
            }}
            openEditEventModal={(event) => { 
              const formattedDate = new Date(event.date).toISOString().slice(0,16);
              setEventForm({...event, date: formattedDate}); 
              openModal('editEvent', event._id); 
            }}
            deleteEvent={deleteEvent}
          />}
          {currentTab === 'dashboard' && <Dashboard payments={payments} expenses={expenses} />}
          {currentTab === 'settings' && <Settings settings={settings} setSettings={handleSettingsUpdate} />}
        </div>
      </div>

      <Modal isOpen={modalState.isOpen} onClose={closeModal} title={
        modalState.type === 'editMember' ? 'Edit Member' : 
        modalState.type === 'addMember' ? 'Add Member' : 
        modalState.type === 'addPayment' ? 'Record Payment' : 
        modalState.type === 'addExpense' ? 'Add Expense' :
        modalState.type === 'editEvent' ? 'Edit Event' :
        modalState.type === 'addEvent' ? 'Add Event' : ''
      }>
        {modalState.type?.includes('Member') && (
          <>
            <input value={memberForm.name} onChange={e=>setMemberForm({...memberForm, name: e.target.value})} placeholder="Full Name" className="w-full border p-3 rounded-xl mb-3" />
            <input value={memberForm.mobile} onChange={e=>setMemberForm({...memberForm, mobile: e.target.value})} placeholder="Mobile" className="w-full border p-3 rounded-xl mb-3" />
            <input value={memberForm.role} onChange={e=>setMemberForm({...memberForm, role: e.target.value})} placeholder="Role (Admin/Member)" className="w-full border p-3 rounded-xl mb-3" />
            <button onClick={handleMemberSubmit} className="bg-green-700 w-full text-white py-3 rounded-xl">Save Member</button>
          </>
        )}
        {modalState.type === 'addPayment' && (
          <>
            <input value={paymentForm.name} onChange={e=>setPaymentForm({...paymentForm, name: e.target.value})} placeholder="Member Name" className="w-full border p-3 rounded-xl mb-3" />
            <input type="number" value={paymentForm.amount} onChange={e=>setPaymentForm({...paymentForm, amount: e.target.value})} placeholder="Amount" className="w-full border p-3 rounded-xl mb-3" />
            <input type="date" value={paymentForm.date} onChange={e=>setPaymentForm({...paymentForm, date: e.target.value})} className="w-full border p-3 rounded-xl mb-3" />
            <button onClick={handlePaymentSubmit} className="bg-green-700 w-full text-white py-3 rounded-xl">Add Payment</button>
          </>
        )}
        {modalState.type === 'addExpense' && (
          <>
            <input value={expenseForm.item} onChange={e=>setExpenseForm({...expenseForm, item: e.target.value})} placeholder="Item name" className="w-full border p-3 rounded-xl mb-3" />
            <input type="number" value={expenseForm.amount} onChange={e=>setExpenseForm({...expenseForm, amount: e.target.value})} placeholder="Amount" className="w-full border p-3 rounded-xl mb-3" />
            <input type="date" value={expenseForm.date} onChange={e=>setExpenseForm({...expenseForm, date: e.target.value})} className="w-full border p-3 rounded-xl mb-3" />
            <input value={expenseForm.category} onChange={e=>setExpenseForm({...expenseForm, category: e.target.value})} placeholder="Category" className="w-full border p-3 rounded-xl mb-3" />
            <button onClick={handleExpenseSubmit} className="bg-green-700 w-full text-white py-3 rounded-xl">Add Expense</button>
          </>
        )}
        {(modalState.type === 'addEvent' || modalState.type === 'editEvent') && (
          <>
            <input 
              value={eventForm.title} 
              onChange={e=>setEventForm({...eventForm, title: e.target.value})} 
              placeholder="Event Title *" 
              className="w-full border p-3 rounded-xl mb-3" 
              required
            />
            <textarea 
              value={eventForm.description} 
              onChange={e=>setEventForm({...eventForm, description: e.target.value})} 
              placeholder="Event Description *" 
              className="w-full border p-3 rounded-xl mb-3" 
              rows="3"
              required
            />
            <input 
              type="datetime-local" 
              value={eventForm.date} 
              onChange={e=>setEventForm({...eventForm, date: e.target.value})} 
              className="w-full border p-3 rounded-xl mb-3" 
              required
            />
            <input 
              value={eventForm.location} 
              onChange={e=>setEventForm({...eventForm, location: e.target.value})} 
              placeholder="Location" 
              className="w-full border p-3 rounded-xl mb-3" 
            />
            <select 
              value={eventForm.status} 
              onChange={e=>setEventForm({...eventForm, status: e.target.value})} 
              className="w-full border p-3 rounded-xl mb-3"
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEventForm({...eventForm, image: reader.result});
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full border p-2 rounded-xl"
              />
              {eventForm.image && eventForm.image.startsWith('data:image') && (
                <div className="mt-2">
                  <img 
                    src={eventForm.image} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover rounded-lg border"
                  />
                </div>
              )}
              {eventForm.image && !eventForm.image.startsWith('data:image') && (
                <div className="mt-2">
                  <img 
                    src={eventForm.image} 
                    alt="Preview" 
                    className="h-20 w-20 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
            <button 
              onClick={handleEventSubmit} 
              className="bg-green-700 w-full text-white py-3 rounded-xl hover:bg-green-800 transition"
            >
              {modalState.type === 'editEvent' ? 'Update Event' : 'Create Event'}
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}