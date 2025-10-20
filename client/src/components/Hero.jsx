import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-primary mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Samuel Paul
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Graphic Designer & Creative Professional
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Specializing in branding, digital campaigns, social media design, and creative solutions 
            that bring your vision to life.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 text-gray-600">
              <FaPhone className="text-accent" />
              <span>+91 99122 26742</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaEnvelope className="text-accent" />
              <span>kandulachandrapal@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-accent" />
              <span>Hyderabad, India</span>
            </div>
          </motion.div>

          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              onClick={() => document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' })}
              className="bg-accent text-white px-8 py-3 rounded-full hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.button>
            
            <motion.a
              href="https://www.instagram.com/samuel_paul555/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-accent text-accent px-8 py-3 rounded-full hover:bg-accent hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram />
              Follow Me
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;