const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/emailService');
const auth = require('../middleware/auth');

const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: { message: 'Too many contact form submissions, please try again later.' }
});

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', [
  contactLimiter,
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('email').isEmail().normalizeEmail(),
  body('subject').trim().isLength({ min: 5, max: 200 }),
  body('message').trim().isLength({ min: 10, max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;

    // Create contact record
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip
    });

    await contact.save();

    // Send email notification
    const emailSent = await sendContactEmail({ name, email, subject, message });
    
    if (!emailSent) {
      console.warn('Failed to send contact email notification');
    }

    res.json({ 
      message: 'Thank you for your message! I will get back to you soon.',
      success: true 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Contact.countDocuments();

    res.json({
      contacts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/contact/:id/status
// @desc    Update contact message status
// @access  Private
router.put('/:id/status', [
  auth,
  body('status').isIn(['new', 'read', 'replied'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json(contact);

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact message
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json({ message: 'Contact message deleted successfully' });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;