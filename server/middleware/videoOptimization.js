const path = require('path');

const optimizeVideo = (req, res, next) => {
  if (req.files?.media?.[0]?.mimetype?.startsWith('video/')) {
    const videoFile = req.files.media[0];
    
    // Check video duration (basic validation)
    if (videoFile.size > 100 * 1024 * 1024) { // 100MB limit
      return res.status(400).json({ message: 'Video file too large. Maximum 100MB allowed.' });
    }
    
    // Add video metadata
    req.videoMetadata = {
      originalName: videoFile.originalname,
      size: videoFile.size,
      mimetype: videoFile.mimetype
    };
  }
  
  next();
};

module.exports = { optimizeVideo };