import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaEnvelope, FaPhone, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Samuel Paul</h3>
            <p className="text-gray-300 mb-4">
              Graphic Designer & Creative Professional specializing in branding, 
              digital campaigns, and visual storytelling.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Portfolio', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => document.querySelector(`#${item.toLowerCase()}`).scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="text-accent" />
                <span className="text-gray-300">+91 99122 26742</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-accent" />
                <span className="text-gray-300">kandulachandrapal@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaInstagram className="text-accent" />
                <a 
                  href="https://www.instagram.com/samuel_paul555/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  @samuel_paul555
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-700 mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 flex items-center justify-center space-x-2">
            <span>© 2024 Samuel Paul. Made with</span>
            <FaHeart className="text-accent" />
            <span>All rights reserved.</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;