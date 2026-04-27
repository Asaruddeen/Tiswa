require('dotenv').config();
const mongoose = require('mongoose');

const Member = require('./models/Member');
const Payment = require('./models/Payment');
const Expense = require('./models/Expense');
const SportsData = require('./models/SportsData');

const initialMembers = [
  { name: "Asaruddeen", mobile: "+91 98765 43210", role: "Founder & Admin", joinDate: "2024-01-15" },
  { name: "Udhay Kumar", mobile: "+91 98765 43211", role: "General Secretary", joinDate: "2024-02-10" },
  { name: "Rahman Ali", mobile: "+91 99887 66551", role: "Finance Head", joinDate: "2024-03-01" },
  { name: "Fazil Mohammed", mobile: "+91 98765 01234", role: "Events Director", joinDate: "2024-03-15" },
  { name: "Nabeel Ahmed", mobile: "+91 97654 32109", role: "Member", joinDate: "2024-04-10" }
];

const initialPayments = [
  { name: "Asaruddeen", amount: 1250, date: "2026-04-14", status: "Success", ref: "TXN001", method: "UPI" },
  { name: "Abdul Rahman", amount: 500, date: "2026-04-12", status: "Success", ref: "TXN002", method: "QR" },
  { name: "Udhay K", amount: 800, date: "2026-04-11", status: "Success", ref: "TXN003", method: "Cash" },
  { name: "Riyas A", amount: 750, date: "2026-04-10", status: "Success", ref: "TXN004", method: "UPI" },
  { name: "Shameer M", amount: 1200, date: "2026-04-08", status: "Success", ref: "TXN005", method: "Bank" },
  { name: "Haneefa", amount: 2100, date: "2026-04-15", status: "Success", ref: "TXN006", method: "UPI" }
];

const initialExpenses = [
  { item: "Professional Cricket Kit", amount: 3200, date: "2026-04-05", category: "Sports", note: "6 bats + balls" },
  { item: "Stumps & Bails Set", amount: 850, date: "2026-04-06", category: "Sports", note: "wooden quality" },
  { item: "Match Refreshments", amount: 1250, date: "2026-04-09", category: "Event", note: "water & snacks" },
  { item: "Team Jerseys (8 pcs)", amount: 5400, date: "2026-04-11", category: "Apparel", note: "customized" },
  { item: "First Aid & Hydration", amount: 780, date: "2026-04-13", category: "Medical", note: "emergency kit" }
];

const initialSportsData = {
  tournament: "Ramadan Cricket Cup 2026",
  winner: "Team A (Green Stallions)",
  runner: "Team B (United Warriors)",
  manOfSeries: "Asaruddeen",
  bestBowler: "Udhay (9 wickets)",
  updates: "Final match held on April 12. Great sportsmanship!"
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tiswa')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    await Member.deleteMany({});
    await Payment.deleteMany({});
    await Expense.deleteMany({});
    await SportsData.deleteMany({});
    
    await Member.insertMany(initialMembers);
    await Payment.insertMany(initialPayments);
    await Expense.insertMany(initialExpenses);
    
    const sports = new SportsData(initialSportsData);
    await sports.save();

    console.log('Database seeded successfully!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
