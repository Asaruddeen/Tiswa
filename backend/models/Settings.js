const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  upiId: {
    type: String,
    default: 'tiswa@icici'
  },
  qrImage: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);
