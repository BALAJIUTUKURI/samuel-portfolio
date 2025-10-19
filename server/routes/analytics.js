const express = require('express');
const Project = require('../models/Project');
const Visitor = require('../models/Visitor');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const router = express.Router();

// GET /api/analytics/stats - Get portfolio statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const imageCount = await Project.countDocuments({ mediaType: 'image' });
    const videoCount = await Project.countDocuments({ mediaType: 'video' });
    
    const categoryStats = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category mediaType createdAt');
    
    // Analytics data
    const totalVisitors = await Visitor.countDocuments();
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    
    const visitorStats = await Visitor.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    const browserStats = await Visitor.aggregate([
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      totalProjects,
      imageCount,
      videoCount,
      categoryStats,
      recentProjects,
      totalVisitors,
      totalContacts,
      newContacts,
      visitorStats,
      browserStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/visitors - Get visitor details
router.get('/visitors', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    
    const visitors = await Visitor.find()
      .sort({ visitedAt: -1 })
      .skip(skip)
      .limit(limit);
      
    const total = await Visitor.countDocuments();
    
    res.json({
      visitors,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/analytics/traffic - Get traffic analytics
router.get('/traffic', auth, async (req, res) => {
  try {
    const { period = '7d' } = req.query;
    let dateFilter = {};
    
    if (period === '24h') {
      dateFilter = { visitedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } };
    } else if (period === '7d') {
      dateFilter = { visitedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } };
    } else if (period === '30d') {
      dateFilter = { visitedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } };
    }
    
    const dailyVisits = await Visitor.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$visitedAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    const topPages = await Visitor.aggregate([
      { $match: dateFilter },
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    res.json({ dailyVisits, topPages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;