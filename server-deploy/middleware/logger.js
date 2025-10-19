const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

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
  
  const logFile = path.join(logDir, `error-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
};

const logActivity = (activity, data = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, activity, ...data };
  
  const logFile = path.join(logDir, `activity-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
};

module.exports = { logError, logActivity };