# Deployment Guide

This guide will help you deploy your portfolio application to production.

## Prerequisites

- Node.js 16+ installed
- MongoDB database (local or cloud)
- Email service credentials (Gmail recommended)

## Local Development Setup

1. **Clone and Install Dependencies**
   ```bash
   cd Anand-portfolio
   npm run install-all
   ```

2. **Set up Environment Variables**
   
   **Server (.env in server directory):**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/anand-portfolio
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=your-email@gmail.com
   
   # Admin Credentials
   ADMIN_EMAIL=admin@anandyadav.com
   ADMIN_PASSWORD=admin123
   
   NODE_ENV=development
   ```
   
   **Client (.env in client directory):**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SITE_URL=http://localhost:3000
   ```

3. **Start Development Servers**
   ```bash
   npm run dev
   ```

## Production Deployment

### Option 1: Heroku + Netlify

**Backend (Heroku):**

1. Create a Heroku app:
   ```bash
   heroku create your-portfolio-api
   ```

2. Add MongoDB Atlas database:
   ```bash
   heroku addons:create mongolab:sandbox
   ```

3. Set environment variables:
   ```bash
   heroku config:set JWT_SECRET=your-production-jwt-secret
   heroku config:set EMAIL_HOST=smtp.gmail.com
   heroku config:set EMAIL_PORT=587
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   heroku config:set EMAIL_FROM=your-email@gmail.com
   heroku config:set ADMIN_EMAIL=admin@anandyadav.com
   heroku config:set ADMIN_PASSWORD=your-secure-password
   heroku config:set NODE_ENV=production
   ```

4. Deploy:
   ```bash
   git subtree push --prefix server heroku main
   ```

**Frontend (Netlify):**

1. Build the client:
   ```bash
   cd client
   npm run build
   ```

2. Update client/.env for production:
   ```env
   REACT_APP_API_URL=https://your-portfolio-api.herokuapp.com/api
   REACT_APP_SITE_URL=https://your-portfolio.netlify.app
   ```

3. Deploy the `build` folder to Netlify

### Option 2: Railway

**Backend:**

1. Connect your GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy from the `server` directory

**Frontend:**

1. Deploy to Vercel or Netlify
2. Update environment variables for production URLs

### Option 3: VPS (DigitalOcean, Linode, etc.)

1. **Server Setup:**
   ```bash
   # Install Node.js, MongoDB, and PM2
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs mongodb
   sudo npm install -g pm2
   
   # Clone your repository
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   
   # Install dependencies
   npm run install-all
   
   # Set up environment variables
   cp server/.env.example server/.env
   # Edit server/.env with your production values
   
   # Build client
   cd client && npm run build
   
   # Start server with PM2
   cd ../server
   pm2 start index.js --name "portfolio-api"
   pm2 startup
   pm2 save
   ```

2. **Nginx Configuration:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Serve React app
       location / {
           root /path/to/portfolio/client/build;
           try_files $uri $uri/ /index.html;
       }
       
       # Proxy API requests
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in EMAIL_PASS environment variable

## MongoDB Setup

**Local Development:**
- Install MongoDB locally or use MongoDB Compass

**Production:**
- Use MongoDB Atlas (recommended)
- Create a cluster and get connection string
- Update MONGODB_URI in environment variables

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Use environment variables for all secrets
- [ ] Enable MongoDB authentication
- [ ] Set up rate limiting
- [ ] Regular security updates

## Monitoring

- Set up error tracking (Sentry)
- Monitor server performance
- Set up uptime monitoring
- Regular database backups

## Troubleshooting

**Common Issues:**

1. **CORS Errors:**
   - Update CORS origins in server/index.js
   - Ensure client URL is in allowed origins

2. **Database Connection:**
   - Check MongoDB URI format
   - Ensure database is accessible
   - Check firewall settings

3. **Email Not Working:**
   - Verify Gmail app password
   - Check email service settings
   - Test with a simple email first

4. **File Uploads:**
   - Ensure uploads directory exists
   - Check file permissions
   - Verify multer configuration

## Support

For issues or questions:
- Check the README.md file
- Review error logs
- Contact: er.anandkumaryadav09@gmail.com