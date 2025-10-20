import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch, placeholder = "Search projects..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
    onSearch('');
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FaSearch className="text-gray-500" />
        <span className="text-gray-500">Search...</span>
        <kbd className="hidden md:inline-block bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">
          Ctrl+K
        </kbd>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="p-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleClose}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                  <span>Press Enter to search</span>
                  <span>ESC to close</span>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;