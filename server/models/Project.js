const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  longDescription: {
    type: String
  },
  technologies: [{
    type: String
  }],
  images: [{
    filename: String,
    path: String,
    alt: String
  }],
  liveUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  demoUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);