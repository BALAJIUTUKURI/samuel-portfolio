# 🚀 Deployment Guide

## Prerequisites
1. GitHub account
2. MongoDB Atlas account (already set up)
3. Gmail account with app password (already set up)

## 📋 Step-by-Step Deployment

### 1. Push to GitHub
```bash
cd C:\Portfolia
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/samuel-portfolio.git
git push -u origin main
```

### 2. Deploy Backend (Railway)
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Choose the `server` folder
6. Add environment variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://chandrapal:chandrapal123@cluster0.aqgzd.mongodb.net/samuel-portfolio
   JWT_SECRET=samuel-paul-portfolio-super-secret-key-2024
   NODE_ENV=production
   EMAIL_USER=Chandrapal.creative5@gmail.com
   EMAIL_PASS=cnum rftg uhmd pgmu
   ```
7. Deploy and copy the Railway URL

### 3. Deploy Frontend (Netlify)
1. Go to [Netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
   - Base directory: `client`
6. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-railway-url.railway.app
   ```
7. Deploy and copy the Netlify URL

### 4. Update CORS Settings
1. Go to Railway dashboard
2. Update environment variable:
   ```
   CORS_ORIGIN=https://your-netlify-site.netlify.app
   ```
3. Redeploy

### 5. Test Everything
- ✅ Website loads
- ✅ Portfolio images/videos display
- ✅ Admin login works
- ✅ File uploads work
- ✅ Resume download works
- ✅ Contact form works

## 🔧 Post-Deployment Setup
1. Run setup script to create admin user:
   - Go to Railway logs
   - Admin will be created automatically on first run

## 📱 Features Working:
- ✅ Responsive design
- ✅ Image/video uploads
- ✅ Profile picture management
- ✅ Resume upload/download
- ✅ Contact form with email
- ✅ Dark/light mode
- ✅ Admin dashboard
- ✅ OTP authentication
- ✅ Real-time updates

## 🌐 URLs After Deployment:
- **Website**: https://your-site.netlify.app
- **Admin**: https://your-site.netlify.app/admin
- **API**: https://your-backend.railway.app

## 🔑 Admin Credentials:
- **Email**: Chandrapal.creative5@gmail.com
- **Username**: admin
- **Password**: admin123