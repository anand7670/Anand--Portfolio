const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  personalInfo: {
    name: {
      type: String,
      default: 'Anand Yadav'
    },
    role: {
      type: String,
      default: 'Full Stack Developer'
    },
    tagline: {
      type: String,
      default: 'Building innovative web solutions with modern technologies'
    },
    phone: {
      type: String,
      default: '9390154730'
    },
    email: {
      type: String,
      default: 'er.anandkumaryadav09@gmail.com'
    },
    github: {
      type: String,
      default: 'https://github.com/anand7670'
    },
    linkedin: {
      type: String,
      default: 'https://www.linkedin.com/in/anand-kumar-yadav-9041b2326'
    },
    profileImage: {
      type: String,
      default: ''
    }
  },
  aboutMe: {
    type: String,
    default: 'I am a passionate Full Stack Developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through code.'
  },
  skills: [{
    name: String,
    level: {
      type: Number,
      min: 1,
      max: 100
    }
  }],
  cvFile: {
    filename: String,
    path: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);