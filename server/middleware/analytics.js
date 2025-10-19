const Visitor = require('../models/Visitor');

const trackVisitor = async (req, res, next) => {
  try {
    const userAgent = req.get('User-Agent') || '';
    const ip = req.ip || req.connection.remoteAddress;
    
    // Parse user agent for device/browser info
    const device = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'Mobile' : 'Desktop';
    const browser = userAgent.includes('Chrome') ? 'Chrome' : 
                   userAgent.includes('Firefox') ? 'Firefox' : 
                   userAgent.includes('Safari') ? 'Safari' : 'Other';
    const os = userAgent.includes('Windows') ? 'Windows' :
               userAgent.includes('Mac') ? 'macOS' :
               userAgent.includes('Linux') ? 'Linux' : 'Other';

    const visitorData = {
      ip,
      userAgent,
      device,
      browser,
      os,
      referrer: req.get('Referer') || 'Direct',
      page: req.originalUrl,
      sessionId: req.sessionID || `${ip}-${Date.now()}`
    };

    await Visitor.create(visitorData);
  } catch (error) {
    console.error('Analytics tracking error:', error);
  }
  
  next();
};

module.exports = { trackVisitor };