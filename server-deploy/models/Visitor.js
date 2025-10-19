const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  country: String,
  city: String,
  device: String,
  browser: String,
  os: String,
  referrer: String,
  page: String,
  sessionId: String,
  visitedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Visitor', visitorSchema);