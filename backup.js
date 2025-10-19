const { exec } = require('child_process');
const path = require('path');

const backup = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `./backups/portfolio-${timestamp}`;
  
  // Create backup directory
  exec(`mkdir -p ${backupPath}`, (err) => {
    if (err) {
      console.error('Backup failed:', err);
      return;
    }
    
    // Backup database
    exec(`mongodump --db samuel-portfolio --out ${backupPath}/db`, (err) => {
      if (err) console.error('DB backup failed:', err);
      else console.log('Database backed up successfully');
    });
    
    // Backup uploads
    exec(`cp -r server/uploads ${backupPath}/`, (err) => {
      if (err) console.error('Files backup failed:', err);
      else console.log('Files backed up successfully');
    });
  });
};

backup();