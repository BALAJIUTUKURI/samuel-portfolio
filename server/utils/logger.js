const fs = require('fs');
const path = require('path');

const logError = (error, req = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    error: error.message,
    stack: error.stack,
    url: req?.url,
    method: req?.method,
    ip: req?.ip
  };
  
  console.error('Error:', logEntry);
};

module.exports = { logError };