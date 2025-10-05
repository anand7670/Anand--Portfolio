const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

const initializeAdmin = async () => {
  try {
    // Check if admin user exists
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL || 'admin@anandyadav.com' });
    
    if (!adminExists) {
      const adminUser = new User({
        email: process.env.ADMIN_EMAIL || 'admin@anandyadav.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('Admin user created successfully');
    }

    // Check if portfolio data exists
    const portfolioExists = await Portfolio.findOne();
    
    if (!portfolioExists) {
      const defaultPortfolio = new Portfolio({
        personalInfo: {
          name: 'Anand Yadav',
          role: 'Full Stack Developer',
          tagline: 'Building innovative web solutions with modern technologies',
          phone: '9390154730',
          email: 'er.anandkumaryadav09@gmail.com',
          github: 'https://github.com/anand7670',
          linkedin: 'https://www.linkedin.com/in/anand-kumar-yadav-9041b2326'
        },
        aboutMe: 'I am a passionate Full Stack Developer with expertise in React.js, Node.js, MongoDB, and modern web technologies. I love creating innovative solutions and bringing ideas to life through clean, efficient code.',
        skills: [
          { name: 'JavaScript', level: 90 },
          { name: 'React.js', level: 85 },
          { name: 'Node.js', level: 80 },
          { name: 'MongoDB', level: 75 },
          { name: 'Express.js', level: 80 },
          { name: 'HTML/CSS', level: 95 },
          { name: 'Git', level: 85 }
        ]
      });
      
      await defaultPortfolio.save();
      console.log('Default portfolio data created successfully');
    }
    
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

module.exports = { initializeAdmin };