const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validateProject } = require('../middleware/validation');
const { optimizeVideo } = require('../middleware/videoOptimization');
const router = express.Router();

// GET /api/projects - Fetch all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/projects/:category - Fetch projects by category
router.get('/:category', async (req, res) => {
  try {
    const projects = await Project.find({ category: req.params.category }).sort({ date: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/projects - Create new project (Admin only)
router.post('/', auth, upload.fields([{ name: 'media' }, { name: 'thumbnail' }]), optimizeVideo, validateProject, async (req, res) => {
  try {
    const { title, description, category, mediaType } = req.body;
    const mediaFile = req.files?.media?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];
    
    if (!mediaFile) {
      return res.status(400).json({ message: 'Media file is required' });
    }

    const project = new Project({
      title,
      description,
      category,
      mediaUrl: `/uploads/${mediaFile.filename}`,
      mediaType: mediaType || (mediaFile.mimetype.startsWith('video/') ? 'video' : 'image'),
      thumbnailUrl: thumbnailFile ? `/uploads/${thumbnailFile.filename}` : null
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/projects/:id - Update project (Admin only)
router.put('/:id', auth, upload.fields([{ name: 'media' }, { name: 'thumbnail' }]), optimizeVideo, validateProject, async (req, res) => {
  try {
    const { title, description, category, mediaType } = req.body;
    const mediaFile = req.files?.media?.[0];
    const thumbnailFile = req.files?.thumbnail?.[0];
    
    const updateData = { title, description, category };
    
    if (mediaFile) {
      updateData.mediaUrl = `/uploads/${mediaFile.filename}`;
      updateData.mediaType = mediaType || (mediaFile.mimetype.startsWith('video/') ? 'video' : 'image');
    }
    
    if (thumbnailFile) {
      updateData.thumbnailUrl = `/uploads/${thumbnailFile.filename}`;
    }
    
    const project = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/projects/:id - Delete project (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;