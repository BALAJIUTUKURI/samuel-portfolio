const mongoose = require('mongoose');
require('dotenv').config();

const Contact = require('./models/Contact');
const Visitor = require('./models/Visitor');

const setupNewFeatures = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create indexes for better performance
    await Contact.createIndexes();
    await Visitor.createIndexes();

    console.log('✅ New features setup completed successfully!');
    console.log('📧 Contact form will now save messages to database');
    console.log('📊 Visitor tracking is now enabled');
    console.log('🔔 Email notifications will be sent for new contacts');
    
    process.exit(0);
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
};

setupNewFeatures();