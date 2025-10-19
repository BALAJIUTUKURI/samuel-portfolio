const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    required: true,
    enum: ['image', 'video']
  },
  thumbnailUrl: {
    type: String // For video thumbnails
  },
  category: {
    type: String,
    required: true,
    enum: ['Branding', 'Digital Campaigns', 'Social Media', 'Print Design', 'Photography', 'Video Editing'],
    index: true
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Compound index for category and date queries
projectSchema.index({ category: 1, date: -1 });

module.exports = mongoose.model('Project', projectSchema);