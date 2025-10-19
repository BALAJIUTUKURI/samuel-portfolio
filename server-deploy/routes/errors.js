const express = require('express');
const { logError } = require('../middleware/logger');
const router = express.Router();

router.post('/errors', (req, res) => {
  const { message, stack, url, userAgent, timestamp } = req.body;
  
  const clientError = new Error(message);
  clientError.stack = stack;
  
  logError(clientError, {
    url,
    userAgent,
    timestamp,
    type: 'client-error',
    ip: req.ip
  });
  
  res.status(200).json({ received: true });
});

module.exports = router;