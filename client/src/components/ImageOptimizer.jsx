import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ImageOptimizer = ({ src, alt, className = "", ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState('');

  useEffect(() => {
    const img = new Image();
    
    // Create optimized version based on device pixel ratio
    const devicePixelRatio = window.devicePixelRatio || 1;
    const isHighDPI = devicePixelRatio > 1;
    
    // Add query parameters for optimization
    const url = new URL(src, window.location.origin);
    if (isHighDPI) {
      url.searchParams.set('dpr', '2');
    }
    url.searchParams.set('auto', 'format,compress');
    url.searchParams.set('q', '85');
    
    setOptimizedSrc(url.toString());
    
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
    img.src = url.toString();
  }, [src]);

  if (error) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      
      <motion.img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        initial={{ scale: 1.1 }}
        animate={{ scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 0.3 }}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default ImageOptimizer;