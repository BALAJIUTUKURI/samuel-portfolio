const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const setupDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create default admin user
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const admin = new Admin({
        username: 'admin',
        password: 'admin123', // This will be hashed automatically
        email: 'Chandrapal.creative5@gmail.com'
      });
      await admin.save();
      console.log('Default admin user created: username=admin, password=admin123, email=Chandrapal.creative5@gmail.com');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database setup complete');
    process.exit(0);
  } catch (error) {
    console.error('Database setup failed:', error);
    process.exit(1);
  }
};

setupDatabase();