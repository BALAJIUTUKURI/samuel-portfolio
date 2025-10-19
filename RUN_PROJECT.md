# 🚀 HOW TO RUN THE PROJECT

## **Quick Start (3 Steps)**

### **1. Install Dependencies**
```bash
cd Portfolia
npm install

cd server
npm install

cd ../client
npm install
```

### **2. Setup Database**
```bash
cd ../server
node setupNew.js
```

### **3. Start Application**
```bash
# From root directory (Portfolia)
npm run dev
```

## **What Will Happen:**
- ✅ **Backend**: http://localhost:5000
- ✅ **Frontend**: http://localhost:3000
- ✅ **Database**: MongoDB Atlas (cloud)
- ✅ **Email**: Configured and ready

## **Admin Access:**
- **URL**: http://localhost:3000/admin
- **Email**: Any email for OTP
- **Backup Login**: admin / admin123

## **If Any Issues:**
```bash
# Install missing dependencies
npm install -g nodemon
npm install response-time speakeasy qrcode

# Check if ports are free
netstat -an | findstr :3000
netstat -an | findstr :5000
```

**Everything is ready to run!** 🌟