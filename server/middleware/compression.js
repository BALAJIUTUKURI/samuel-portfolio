const compression = require('compression');

const compressionFilter = (req, res) => {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
};

const compressionOptions = {
  filter: compressionFilter,
  level: 6,
  threshold: 1024,
  chunkSize: 1024,
  windowBits: 15,
  memLevel: 8
};

module.exports = compression(compressionOptions);