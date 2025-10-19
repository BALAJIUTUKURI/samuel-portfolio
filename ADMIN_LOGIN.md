# Admin Login Credentials

## 🔐 Direct Admin Access

**URL**: http://localhost:3000/admin

**Login Credentials**:
- **Username**: `admin`
- **Password**: `admin123`

## 🚀 Quick Access Steps

1. **Start the servers** (if not already running):
   ```bash
   # Backend
   cd server && npm run dev
   
   # Frontend  
   cd client && npm start
   ```

2. **Access Admin Panel**:
   - Go to: http://localhost:3000/admin
   - Enter username: `admin`
   - Enter password: `admin123`
   - Click "Sign in"

3. **Upload Projects**:
   - Click "Add New Project"
   - Fill in project details
   - Upload image/video files
   - Select category
   - Click "Create Project"

## 🖼️ Image Display Fix

The image display issue has been fixed by:
- ✅ Updated CORS headers for static files
- ✅ Added proper static file serving configuration
- ✅ Fixed image URL construction in frontend

## 📁 File Upload Location

Uploaded files are stored in: `server/uploads/`

## 🔧 Troubleshooting

If images still don't show:
1. Check if backend server is running on port 5000
2. Verify files exist in `server/uploads/` folder
3. Test static file serving: http://localhost:5000/test-upload
4. Check browser console for CORS errors

## 🎯 Features Available

- ✅ Direct admin login (no OTP required)
- ✅ Project upload with images/videos
- ✅ Category management
- ✅ Project editing and deletion
- ✅ Real-time preview