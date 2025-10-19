const express = require('express');
const Quote = require('../models/Quote');
const auth = require('../middleware/auth');
const { sendContactNotification, sendContactReply } = require('../utils/emailService');
const router = express.Router();

// POST /api/quotes - Submit quote request
router.post('/', async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    
    // Send email notifications
    try {
      await sendContactNotification({
        name: quote.clientName,
        email: quote.email,
        message: `Quote Request: ${quote.projectType}\nBudget: ${quote.budget}\nTimeline: ${quote.timeline}\n\n${quote.description}`
      });
      await sendContactReply({
        name: quote.clientName,
        email: quote.email,
        message: `Thank you for your quote request for ${quote.projectType}. Budget: ${quote.budget}, Timeline: ${quote.timeline}`
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }
    
    res.json({ message: 'Quote request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/quotes - Get all quotes (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/quotes/:id - Update quote
router.put('/:id', auth, async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;