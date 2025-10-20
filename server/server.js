const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const projectRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');
const analyticsRoutes = require('./routes/analytics');
const contactRoutes = require('./routes/contact');
const testimonialRoutes = require('./routes/testimonials');
const quoteRoutes = require('./routes/quotes');
const newsletterRoutes = require('./routes/newsletter');
const sitemapRoutes = require('./routes/sitemap');
const healthRoutes = require('./routes/health');
const errorRoutes = require('./routes/errors');
const { trackVisitor } = require('./middleware/analytics');
const { logError, logActivity } = require('./middleware/logger');
const advancedCompression = require('./middleware/compression');
const { generalLimiter, contactLimiter, sanitizeInput } = require('./middleware/security');
const { performanceMonitor, cacheControl, requestLogger } = require('./middleware/performance');
const { scheduleBackups } = require('./utils/backup');

const app = express();

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(advancedCompression);

// Middleware
app.use(performanceMonitor);
app.use(requestLogger);
app.use(cacheControl);
app.use(generalLimiter);
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CORS_ORIGIN?.split(',') || ['https://samuel-paul-portfolio.netlify.app']
    : ['http://localhost:3000', 'http://192.168.31.15:3000'],
  credentials: true
}));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(sanitizeInput);

// Static file serving with proper headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  maxAge: '1d',
  setHeaders: (res, path) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cache-Control', 'public, max-age=86400');
  }
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test static files
app.get('/test-upload', (req, res) => {
  const fs = require('fs');
  const uploadsPath = path.join(__dirname, 'uploads');
  const files = fs.readdirSync(uploadsPath).filter(f => f !== '.gitkeep');
  res.json({
    message: 'Static files test',
    files,
    sampleUrl: files.length > 0 ? `/uploads/${files[0]}` : null
  });
});

// Analytics tracking middleware (only for main pages)
app.use('/', (req, res, next) => {
  if (req.path === '/' || req.path.startsWith('/portfolio') || req.path.startsWith('/contact')) {
    trackVisitor(req, res, next);
  } else {
    next();
  }
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/', sitemapRoutes);
app.use('/', healthRoutes);
app.use('/api', errorRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logError(err, req);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

connectDB();

// Schedule automated backups
if (process.env.NODE_ENV === 'production') {
  scheduleBackups();
}

const PORT = process.env.PORT || 5000;

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});