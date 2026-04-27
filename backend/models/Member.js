const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String },
  role: { type: String, default: 'Member' },
  joinDate: { type: String }
});

module.exports = mongoose.model('Member', memberSchema);
