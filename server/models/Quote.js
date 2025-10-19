const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  projectType: { type: String, required: true },
  budget: String,
  timeline: String,
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'quoted', 'accepted', 'rejected'], default: 'pending' },
  quotedAmount: Number,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', quoteSchema);