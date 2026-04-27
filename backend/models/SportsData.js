const mongoose = require('mongoose');

const sportsDataSchema = new mongoose.Schema({
  tournament: { type: String },
  winner: { type: String },
  runner: { type: String },
  manOfSeries: { type: String },
  bestBowler: { type: String },
  updates: { type: String }
});

module.exports = mongoose.model('SportsData', sportsDataSchema);
