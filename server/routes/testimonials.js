const express = require('express');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/testimonials - Get approved testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/testimonials - Submit testimonial
router.post('/', async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.json({ message: 'Testimonial submitted for review' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/testimonials/admin - Get all testimonials (Admin)
router.get('/admin', auth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/testimonials/:id/approve - Approve testimonial
router.put('/:id/approve', auth, async (req, res) => {
  try {
    await Testimonial.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.json({ message: 'Testimonial approved' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;