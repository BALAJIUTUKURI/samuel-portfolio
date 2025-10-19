const express = require('express');
const Contact = require('../models/Contact');
const { sendContactNotification, sendContactReply } = require('../utils/emailService');
const auth = require('../middleware/auth');
const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send email notifications
    try {
      await sendContactNotification({ name, email, message });
      await sendContactReply({ name, email, message });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    res.json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/contact - Get all contacts (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;