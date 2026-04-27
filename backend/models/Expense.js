const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  item: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  category: { type: String, default: 'General' },
  note: { type: String }
});

module.exports = mongoose.model('Expense', expenseSchema);
