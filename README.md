# Anand Yadav - Professional Portfolio

A fully functional professional portfolio web application with secure admin panel built with React.js, Node.js, Express.js, and MongoDB.

## Features

- **Portfolio Website**: Hero section, projects showcase, about me, contact form
- **Admin Panel**: Secure login, content management, project CRUD operations
- **Download CV**: Dynamic PDF serving
- **Contact Form**: Email integration with validation
- **Responsive Design**: Mobile-friendly and optimized for all devices
- **Modern Animations**: Smooth scrolling and professional UI

## Tech Stack

- **Frontend**: React.js, CSS3, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Email**: Nodemailer

## Quick Start

### Prerequisites

- Node.js 16+ installed
- MongoDB installed locally or MongoDB Atlas account
- Git installed

### Option 1: Quick Start (Windows)

```bash
# Double-click start.bat or run in command prompt
start.bat
```

### Option 2: Quick Start (Mac/Linux)

```bash
# Make script executable and run
chmod +x start.sh
./start.sh
```

### Option 3: Manual Setup

1. **Clone and install dependencies**:

   ```bash
   git clone <repository-url>
   cd Anand-portfolio
   npm run install-all
   ```

2. **Set up environment variables**:

   - Server environment is already configured for local development
   - For email functionality, update `server/.env` with your Gmail credentials
   - Client environment is pre-configured

3. **Start MongoDB**:

   ```bash
   # If using local MongoDB
   mongod

   # Or use MongoDB Atlas connection string in server/.env
   ```

4. **Start development servers**:

   ```bash
   npm run dev
   ```

5. **Access the application**:
   - **Portfolio**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin
   - **API**: http://localhost:5000/api

## Default Admin Credentials

- **Email**: admin@anandyadav.com
- **Password**: admin123

⚠️ **Important**: Change the default password after first login!

## Deployment

### Frontend (Netlify/Vercel)

1. Build the client: `cd client && npm run build`
2. Deploy the `build` folder

### Backend (Heroku/Railway)

1. Deploy the `server` directory
2. Set environment variables in your hosting platform

## Contact Information

- **Name**: Anand Yadav
- **Phone**: 9390154730
- **Email**: er.anandkumaryadav09@gmail.com
- **GitHub**: https://github.com/anand7670
- **LinkedIn**: https://www.linkedin.com/in/anand-kumar-yadav-9041b2326

## License

MIT License - feel free to use this project for your own portfolio!

#

# Features Overview

### Portfolio Website

- **Hero Section**: Professional introduction with name, role, and tagline
- **About Section**: Personal information and skills showcase
- **Projects Section**: Interactive project cards with detailed modals
- **Contact Form**: Functional contact form with email integration
- **Responsive Design**: Mobile-friendly and optimized for all devices
- **Smooth Animations**: Professional animations using Framer Motion
- **Download CV**: Direct PDF download functionality

### Admin Panel

- **Secure Authentication**: JWT-based login system
- **Dashboard**: Overview of projects, messages, and quick actions
- **Personal Info Management**: Edit name, contact details, social links, and about section
- **Project Management**: Full CRUD operations for projects with image uploads
- **Contact Management**: View, respond to, and manage contact form submissions
- **CV Management**: Upload and manage resume/CV files
- **Real-time Updates**: Changes reflect immediately on the live portfolio

### Technical Features

- **Security**: Helmet.js, rate limiting, input validation, and secure file uploads
- **Performance**: Optimized images, lazy loading, and efficient API calls
- **SEO Ready**: Proper meta tags and semantic HTML structure
- **Error Handling**: Comprehensive error handling and user feedback
- **Validation**: Form validation on both client and server sides

## Project Structure

```
Anand-portfolio/
├── client/                 # React.js frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Portfolio/ # Portfolio website components
│   │   │   ├── Admin/     # Admin panel components
│   │   │   └── Common/    # Shared components
│   │   ├── contexts/      # React contexts for state management
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   ├── uploads/          # File uploads directory
│   └── index.js          # Server entry point
├── package.json          # Root package.json
├── README.md
├── DEPLOYMENT.md         # Deployment guide
├── start.bat            # Windows startup script
└── start.sh             # Unix startup script
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Portfolio

- `GET /api/portfolio` - Get portfolio data
- `PUT /api/portfolio/personal-info` - Update personal info
- `PUT /api/portfolio/about` - Update about section
- `POST /api/portfolio/cv` - Upload CV
- `GET /api/portfolio/cv/download` - Download CV

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin)
- `PUT /api/contact/:id/status` - Update message status
- `DELETE /api/contact/:id` - Delete message

## Customization Guide

### Personal Information

1. Login to admin panel at `/admin`
2. Go to "Personal Info" tab
3. Update your details:
   - Name, role, tagline
   - Contact information
   - Social media links
   - About me section
   - Upload your CV

### Adding Projects

1. Go to "Projects" in admin panel
2. Click "Add New Project"
3. Fill in project details:
   - Title and descriptions
   - Technologies used
   - Project URLs (GitHub, live demo)
   - Upload project images
   - Set as featured if desired

### Managing Contact Messages

1. Go to "Messages" in admin panel
2. View all contact form submissions
3. Mark messages as read/replied
4. Reply directly via email
5. Delete spam or unwanted messages

### Styling Customization

- Edit CSS files in `client/src/components/`
- Main styles: `App.css`, `Portfolio.css`, `Admin.css`
- Colors and themes can be customized in CSS variables

## Email Configuration

To enable contact form email notifications:

1. **Gmail Setup**:

   - Enable 2-Factor Authentication
   - Generate App Password in Google Account settings
   - Update `server/.env`:
     ```env
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     EMAIL_FROM=your-email@gmail.com
     ```

2. **Other Email Providers**:
   - Update SMTP settings in `server/.env`
   - Modify `server/utils/emailService.js` if needed

## Database Setup

### Local MongoDB

```bash
# Install MongoDB
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt install mongodb

# Start MongoDB
mongod
```

### MongoDB Atlas (Cloud)

1. Create account at mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `server/.env`

## Troubleshooting

### Common Issues

1. **Port Already in Use**:

   ```bash
   # Kill processes on ports 3000 and 5000
   npx kill-port 3000 5000
   ```

2. **MongoDB Connection Error**:

   - Ensure MongoDB is running
   - Check connection string format
   - Verify network access (for Atlas)

3. **Email Not Working**:

   - Verify Gmail app password
   - Check spam folder
   - Test email configuration

4. **File Upload Issues**:

   - Check file permissions
   - Ensure uploads directory exists
   - Verify file size limits

5. **Build Errors**:

   ```bash
   # Clear npm cache
   npm cache clean --force

   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## Performance Optimization

- Images are automatically optimized
- API responses are cached where appropriate
- Database queries are optimized
- Frontend uses code splitting and lazy loading

## Security Features

- JWT authentication with secure tokens
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- File upload restrictions
- CORS configuration
- Helmet.js security headers

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues:

- **Email**: er.anandkumaryadav09@gmail.com
- **GitHub**: https://github.com/anand7670
- **LinkedIn**: https://www.linkedin.com/in/anand-kumar-yadav-9041b2326

## Changelog

### Version 1.0.0

- Initial release
- Complete portfolio website
- Admin panel with full CRUD operations
- Contact form with email integration
- CV download functionality
- Responsive design
- Security features implemented

---

**Built with ❤️ by Anand Yadav**
