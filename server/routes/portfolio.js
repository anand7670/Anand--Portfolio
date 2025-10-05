const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const Portfolio = require('../models/Portfolio');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'cv') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files are allowed for CV'));
      }
    } else {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    }
  }
});

// @route   GET /api/portfolio
// @desc    Get portfolio data
// @access  Public
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      // Create default portfolio if none exists
      portfolio = new Portfolio();
      await portfolio.save();
    }

    const projects = await Project.find().sort({ order: 1, createdAt: -1 });

    res.json({
      portfolio,
      projects
    });

  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/portfolio/personal-info
// @desc    Update personal information
// @access  Private
router.put('/personal-info', [
  auth,
  body('name').trim().isLength({ min: 1 }),
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio();
    }

    portfolio.personalInfo = { ...portfolio.personalInfo, ...req.body };
    await portfolio.save();

    res.json(portfolio);

  } catch (error) {
    console.error('Update personal info error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/portfolio/about
// @desc    Update about me section
// @access  Private
router.put('/about', [
  auth,
  body('aboutMe').trim().isLength({ min: 1 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio();
    }

    portfolio.aboutMe = req.body.aboutMe;
    await portfolio.save();

    res.json(portfolio);

  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/portfolio/cv
// @desc    Upload CV
// @access  Private
router.post('/cv', auth, upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio();
    }

    // Delete old CV file if exists
    if (portfolio.cvFile && portfolio.cvFile.path) {
      const oldPath = portfolio.cvFile.path;
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    portfolio.cvFile = {
      filename: req.file.filename,
      path: req.file.path,
      uploadDate: new Date()
    };

    await portfolio.save();

    res.json({ message: 'CV uploaded successfully', cvFile: portfolio.cvFile });

  } catch (error) {
    console.error('Upload CV error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/portfolio/cv/check
// @desc    Check CV file status (for debugging)
// @access  Public
router.get('/cv/check', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    
    if (!portfolio || !portfolio.cvFile) {
      return res.json({ 
        exists: false, 
        message: 'No CV file in database',
        portfolio: portfolio ? 'Portfolio exists' : 'No portfolio found'
      });
    }

    const filePath = portfolio.cvFile.path;
    const fileExists = fs.existsSync(filePath);
    
    res.json({
      exists: fileExists,
      filePath: filePath,
      filename: portfolio.cvFile.filename,
      uploadDate: portfolio.cvFile.uploadDate,
      message: fileExists ? 'File exists' : 'File not found on disk'
    });

  } catch (error) {
    console.error('Check CV error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/portfolio/cv/download
// @desc    Download CV
// @access  Public
router.get('/cv/download', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    
    if (!portfolio || !portfolio.cvFile || !portfolio.cvFile.path) {
      console.log('CV not found in database');
      return res.status(404).json({ message: 'CV not found in database' });
    }

    const filePath = portfolio.cvFile.path;
    console.log('Attempting to download CV from path:', filePath);
    
    if (!fs.existsSync(filePath)) {
      console.error('CV file not found at path:', filePath);
      return res.status(404).json({ message: 'CV file not found on server' });
    }

    console.log('CV file found, starting download...');
    
    // Set proper headers for PDF download
    const filename = `${portfolio.personalInfo.name.replace(/\s+/g, '_')}_CV.pdf`;
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', fs.statSync(filePath).size);
    
    // Create read stream and pipe to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    fileStream.on('error', (err) => {
      console.error('Error streaming CV file:', err);
      if (!res.headersSent) {
        res.status(500).json({ message: 'Error downloading CV' });
      }
    });

  } catch (error) {
    console.error('Download CV error:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

module.exports = router;