const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const Admin = require('../models/Admin');
const { validateLogin } = require('../middleware/validation');
const { loginLimiter } = require('../middleware/rateLimiter');
const { sendOTP } = require('../utils/emailService');
const router = express.Router();

// Profile picture upload configuration
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'admin-profile' + path.extname(file.originalname));
  }
});

const profileUpload = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'));
    }
  }
});

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'admin-resume.pdf');
  }
});

const resumeUpload = multer({
  storage: resumeStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'));
    }
  }
});

// In-memory OTP storage (use Redis in production)
const otpStore = new Map();

// POST /api/admin/login - Admin authentication
router.post('/login', loginLimiter, validateLogin, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Development bypass - direct login
    if (username === 'admin' && password === 'admin123') {
      const admin = await Admin.findOne({ username: 'admin' });
      if (admin) {
        const token = jwt.sign(
          { id: admin._id, username: admin.username },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );
        return res.json({ token, admin: { id: admin._id, username: admin.username } });
      }
    }
    
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, admin: { id: admin._id, username: admin.username } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/admin/send-otp - Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email matches admin email
    if (email !== 'Chandrapal.creative5@gmail.com') {
      return res.status(401).json({ message: 'Invalid email address' });
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with 5 min expiry
    otpStore.set(email, { otp, expires: Date.now() + 300000 });
    
    // Send OTP via email
    try {
      await sendOTP(email, otp);
      res.json({ message: 'OTP sent successfully' });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      console.log(`Fallback - OTP for ${email}: ${otp}`);
      res.json({ message: 'OTP sent successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/admin/verify-otp - Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Check if email matches admin email
    if (email !== 'Chandrapal.creative5@gmail.com') {
      return res.status(401).json({ message: 'Invalid email address' });
    }
    
    const stored = otpStore.get(email);
    
    if (!stored || stored.expires < Date.now() || stored.otp !== otp) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }
    
    otpStore.delete(email);
    
    let admin = await Admin.findOne({ email: 'Chandrapal.creative5@gmail.com' });
    if (!admin) {
      // Create default admin if doesn't exist
      admin = new Admin({
        username: 'admin',
        password: 'admin123',
        email: 'Chandrapal.creative5@gmail.com'
      });
      await admin.save();
    }
    
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, admin: { id: admin._id, username: admin.username } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/admin/upload-profile - Upload profile picture
router.post('/upload-profile', profileUpload.single('profilePicture'), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const profilePicturePath = `/uploads/${req.file.filename}`;
    
    await Admin.findOneAndUpdate(
      { email: 'Chandrapal.creative5@gmail.com' }, 
      { profilePicture: profilePicturePath },
      { upsert: true }
    );
    
    res.json({ 
      message: 'Profile picture updated successfully',
      profilePicture: profilePicturePath
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/admin/upload-resume - Upload resume
router.post('/upload-resume', resumeUpload.single('resume'), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const resumePath = `/uploads/${req.file.filename}`;
    
    await Admin.findOneAndUpdate(
      { email: 'Chandrapal.creative5@gmail.com' }, 
      { resume: resumePath },
      { upsert: true }
    );
    
    res.json({ 
      message: 'Resume updated successfully',
      resume: resumePath
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/profile - Get admin profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      // Return default admin profile for public access
      const admin = await Admin.findOne({ email: 'Chandrapal.creative5@gmail.com' }).select('-password');
      return res.json({ admin });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    
    res.json({ admin });
  } catch (error) {
    // Fallback to default admin for public access
    try {
      const admin = await Admin.findOne({ email: 'Chandrapal.creative5@gmail.com' }).select('-password');
      res.json({ admin });
    } catch (fallbackError) {
      res.status(500).json({ message: error.message });
    }
  }
});

// GET /api/resume - Get public resume
router.get('/resume', async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: 'Chandrapal.creative5@gmail.com' }).select('resume');
    res.json({ resume: admin?.resume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;