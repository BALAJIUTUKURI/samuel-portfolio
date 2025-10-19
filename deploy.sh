#!/bin/bash

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build client
echo "🏗️ Building client..."
cd client && npm run build && cd ..

# Setup database
echo "🗄️ Setting up database..."
cd server && node setup.js && cd ..

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5000"
echo "👨‍💼 Admin: http://localhost:3000/admin (admin/admin123)"