const responseTime = require('response-time');

const performanceMonitor = responseTime((req, res, time) => {
  if (time > 1000) {
    console.warn(`Slow request: ${req.method} ${req.url} - ${time.toFixed(2)}ms`);
  }
});

const cacheControl = (req, res, next) => {
  if (req.url.includes('/uploads/')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  } else if (req.url.includes('/api/')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
  }
  next();
};

const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
  });
  next();
};

module.exports = { performanceMonitor, cacheControl, requestLogger };