const Project = require('../models/Project');

const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
    longDescription: "Built a comprehensive e-commerce platform using React.js for the frontend and Node.js with Express.js for the backend. Features include user registration/login, product catalog, shopping cart, order management, and Stripe payment integration. The application uses MongoDB for data storage and includes an admin panel for managing products and orders.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API", "JWT", "CSS3"],
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/anand7670/ecommerce-platform",
    featured: true,
    status: "completed",
    order: 1
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    longDescription: "Developed a task management application that allows teams to create, assign, and track tasks in real-time. The app features drag-and-drop functionality, real-time notifications using Socket.io, user roles and permissions, and detailed analytics. Built with React.js frontend and Node.js backend with MongoDB database.",
    technologies: ["React.js", "Node.js", "Socket.io", "MongoDB", "Express.js", "Material-UI"],
    liveUrl: "https://example-taskmanager.com",
    githubUrl: "https://github.com/anand7670/task-manager",
    featured: true,
    status: "completed",
    order: 2
  },
  {
    title: "Weather Dashboard",
    description: "A responsive weather dashboard that displays current weather and forecasts for multiple cities.",
    longDescription: "Created a weather dashboard that fetches real-time weather data from OpenWeatherMap API. Features include current weather display, 5-day forecast, city search functionality, favorite cities list, and responsive design. The application is built with vanilla JavaScript and uses local storage for user preferences.",
    technologies: ["JavaScript", "HTML5", "CSS3", "OpenWeatherMap API", "Chart.js"],
    liveUrl: "https://example-weather.com",
    githubUrl: "https://github.com/anand7670/weather-dashboard",
    featured: false,
    status: "completed",
    order: 3
  },
  {
    title: "Blog Platform",
    description: "A modern blog platform with content management system and user engagement features.",
    longDescription: "Built a full-featured blog platform with user authentication, rich text editor, comment system, and social sharing. The platform includes an admin dashboard for content management, SEO optimization features, and responsive design. Uses React.js for frontend and Node.js with MongoDB for backend.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "Quill.js", "Bootstrap"],
    liveUrl: "https://example-blog.com",
    githubUrl: "https://github.com/anand7670/blog-platform",
    featured: false,
    status: "completed",
    order: 4
  },
  {
    title: "Portfolio Website",
    description: "A professional portfolio website with admin panel for content management.",
    longDescription: "Developed this portfolio website with a complete admin panel for managing personal information, projects, and contact messages. Features include responsive design, smooth animations, contact form with email integration, CV download functionality, and secure admin authentication. Built with React.js and Node.js.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Framer Motion", "Nodemailer"],
    liveUrl: "https://anandyadav.com",
    githubUrl: "https://github.com/anand7670/portfolio",
    featured: true,
    status: "completed",
    order: 0
  }
];

const seedProjects = async () => {
  try {
    // Check if projects already exist
    const existingProjects = await Project.countDocuments();
    
    if (existingProjects === 0) {
      await Project.insertMany(sampleProjects);
      console.log('Sample projects seeded successfully');
    } else {
      console.log('Projects already exist, skipping seed');
    }
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};

module.exports = { seedProjects };