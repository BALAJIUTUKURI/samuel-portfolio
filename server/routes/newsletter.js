const express = require('express');
const Newsletter = require('../models/Newsletter');
const auth = require('../middleware/auth');
const router = express.Router();

// POST /api/newsletter/subscribe - Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;
    const existing = await Newsletter.findOne({ email });
    
    if (existing) {
      return res.status(400).json({ message: 'Already subscribed' });
    }
    
    const subscriber = new Newsletter({ email, name });
    await subscriber.save();
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/newsletter - Get subscribers (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true }).sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;