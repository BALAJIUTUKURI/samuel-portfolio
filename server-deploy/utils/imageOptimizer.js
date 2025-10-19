const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const optimizeImage = async (inputPath, outputPath, options = {}) => {
  const {
    width = 1920,
    height = 1080,
    quality = 80,
    format = 'webp'
  } = options;

  try {
    await sharp(inputPath)
      .resize(width, height, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality })
      .toFile(outputPath);
    
    return outputPath;
  } catch (error) {
    console.error('Image optimization failed:', error);
    return inputPath;
  }
};

const generateThumbnail = async (inputPath, outputPath, size = 300) => {
  try {
    await sharp(inputPath)
      .resize(size, size, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 70 })
      .toFile(outputPath);
    
    return outputPath;
  } catch (error) {
    console.error('Thumbnail generation failed:', error);
    return null;
  }
};

module.exports = { optimizeImage, generateThumbnail };