const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, default: 'Success' },
  ref: { type: String },
  method: { type: String }
});

module.exports = mongoose.model('Payment', paymentSchema);
