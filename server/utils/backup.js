const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const createBackup = async () => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const backup = {
      timestamp: new Date().toISOString(),
      data: {}
    };

    for (const collection of collections) {
      const collectionName = collection.name;
      const data = await mongoose.connection.db.collection(collectionName).find({}).toArray();
      backup.data[collectionName] = data;
    }

    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const filename = `backup-${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(backupDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(backup, null, 2));
    console.log(`Backup created: ${filepath}`);
    
    return filepath;
  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  }
};

const restoreBackup = async (backupPath) => {
  try {
    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    
    for (const [collectionName, data] of Object.entries(backupData.data)) {
      await mongoose.connection.db.collection(collectionName).deleteMany({});
      if (data.length > 0) {
        await mongoose.connection.db.collection(collectionName).insertMany(data);
      }
    }
    
    console.log('Backup restored successfully');
  } catch (error) {
    console.error('Restore failed:', error);
    throw error;
  }
};

// Auto backup every 24 hours
const scheduleBackups = () => {
  setInterval(createBackup, 24 * 60 * 60 * 1000);
};

module.exports = { createBackup, restoreBackup, scheduleBackups };