# Samuel Paul - Portfolio Website

A modern, dynamic portfolio website for Graphic Designer Samuel Paul built with the MERN stack.

## Features

- **Modern Design**: Clean, minimalist design with professional typography
- **Responsive**: Fully responsive across all devices
- **Dynamic Portfolio**: Admin-managed portfolio with category filtering
- **Video & Image Support**: Upload and display both images and video reels
- **Lightbox Gallery**: Click images/videos for detailed view with video player
- **Admin Panel**: Secure admin dashboard for content management
- **Smooth Animations**: Framer Motion animations for polished UX

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Upload**: Multer (Images & Videos)
- **Authentication**: JWT + OTP Verification
- **Video Player**: Custom video player with controls

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
cd Portfolia
npm run install-all
```

2. **Setup environment variables:**
```bash
# In server/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/samuel-portfolio
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

3. **Setup database:**
```bash
cd server
node setup.js
```

4. **Start development servers:**
```bash
# From root directory
npm run dev
```

This will start:
- Backend server: http://localhost:5000
- Frontend app: http://localhost:3000

## Admin Access

- **URL**: http://localhost:3000/admin
- **Username**: admin
- **Password**: admin123

## Project Structure

```
Portfolia/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript interfaces
│   │   └── utils/         # API utilities
├── server/                # Node.js backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── uploads/          # Image storage
└── README.md
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:category` - Get projects by category
- `POST /api/projects` - Create project (Admin only)
- `DELETE /api/projects/:id` - Delete project (Admin only)

### Admin
- `POST /api/admin/login` - Admin authentication

## Portfolio Categories

- Branding
- Digital Campaigns
- Social Media
- Print Design
- Photography
- Video Editing

## Contact Information

- **Phone**: +91 99122 26742
- **Email**: kandulachandrapal@gmail.com
- **Location**: Hyderabad, India
- **Instagram**: [@samuel_paul555](https://www.instagram.com/samuel_paul555/)

## Skills Showcased

- Photoshop
- Illustrator
- InDesign
- Premier Pro
- After Effects
- Adobe XD
- PowerPoint

## Development

### Adding New Projects
1. Login to admin panel at `/admin` (OTP verification)
2. Choose media type (Image or Video)
3. Upload media file and optional thumbnail for videos
4. Fill out project details and category
5. Projects appear immediately on the main portfolio

### Customization
- Colors: Edit `tailwind.config.js`
- Content: Update component files in `client/src/components/`
- API: Modify routes in `server/routes/`

## Deployment

### Frontend (Netlify/Vercel)
```bash
cd client
npm run build
# Deploy dist folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy server folder
```

## License

© 2024 Samuel Paul. All rights reserved.