import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaTimes } from 'react-icons/fa';

const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-dismissed', 'true');
  };

  if (!showInstallPrompt || localStorage.getItem('pwa-dismissed')) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-accent/10 p-2 rounded-lg">
              <FaDownload className="text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Install App</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Add to home screen for quick access
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            onClick={handleInstall}
            className="flex-1 bg-accent text-white py-2 px-4 rounded-lg text-sm font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Install
          </motion.button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 text-sm"
          >
            Later
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstall;