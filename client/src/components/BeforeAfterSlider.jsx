import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BeforeAfterSlider = ({ beforeImage, afterImage, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPosition(e.target.value);
  };

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      <div className="absolute inset-0">
        <img 
          src={afterImage} 
          alt={`${title} - After`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt={`${title} - Before`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-accent rounded-full"></div>
        </div>
      </div>
      
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize"
      />
      
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm">
        After
      </div>
    </div>
  );
};

export default BeforeAfterSlider;