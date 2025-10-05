const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for project images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/projects/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'project-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private
router.post('/', [
  auth,
  upload.array('images', 5),
  body('title').trim().isLength({ min: 1, max: 200 }),
  body('description').trim().isLength({ min: 1, max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const projectData = {
      title: req.body.title,
      description: req.body.description,
      longDescription: req.body.longDescription || '',
      technologies: req.body.technologies ? req.body.technologies.split(',').map(t => t.trim()) : [],
      liveUrl: req.body.liveUrl || '',
      githubUrl: req.body.githubUrl || '',
      demoUrl: req.body.demoUrl || '',
      featured: req.body.featured === 'true',
      status: req.body.status || 'completed',
      order: parseInt(req.body.order) || 0
    };

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      projectData.images = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        alt: req.body.title
      }));
    }

    const project = new Project(projectData);
    await project.save();

    res.status(201).json(project);

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', [
  auth,
  upload.array('images', 5),
  body('title').trim().isLength({ min: 1, max: 200 }),
  body('description').trim().isLength({ min: 1, max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update project data
    project.title = req.body.title;
    project.description = req.body.description;
    project.longDescription = req.body.longDescription || '';
    project.technologies = req.body.technologies ? req.body.technologies.split(',').map(t => t.trim()) : [];
    project.liveUrl = req.body.liveUrl || '';
    project.githubUrl = req.body.githubUrl || '';
    project.demoUrl = req.body.demoUrl || '';
    project.featured = req.body.featured === 'true';
    project.status = req.body.status || 'completed';
    project.order = parseInt(req.body.order) || 0;

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      // Delete old images if replacing
      if (req.body.replaceImages === 'true') {
        project.images.forEach(img => {
          if (fs.existsSync(img.path)) {
            fs.unlinkSync(img.path);
          }
        });
        
        project.images = req.files.map(file => ({
          filename: file.filename,
          path: file.path,
          alt: req.body.title
        }));
      } else {
        // Add new images to existing ones
        const newImages = req.files.map(file => ({
          filename: file.filename,
          path: file.path,
          alt: req.body.title
        }));
        project.images = [...project.images, ...newImages];
      }
    }

    await project.save();

    res.json(project);

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete associated images
    project.images.forEach(img => {
      if (fs.existsSync(img.path)) {
        fs.unlinkSync(img.path);
      }
    });

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: 'Project deleted successfully' });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;