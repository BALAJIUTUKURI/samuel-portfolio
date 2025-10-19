const multer = require('multer');
const path = require('path');
const { optimizeImage, generateThumbnail } = require('../utils/imageOptimizer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'media') {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed'), false);
    }
  } else if (file.fieldname === 'thumbnail') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Thumbnails must be images'), false);
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024 // 200MB
  }
});

const processImages = async (req, res, next) => {
  if (req.file && req.file.mimetype.startsWith('image/')) {
    try {
      const optimizedPath = req.file.path.replace(path.extname(req.file.path), '.webp');
      await optimizeImage(req.file.path, optimizedPath);
      req.file.path = optimizedPath;
      req.file.filename = req.file.filename.replace(path.extname(req.file.filename), '.webp');
    } catch (error) {
      console.error('Image optimization failed:', error);
    }
  }
  next();
};

module.exports = { upload, processImages };