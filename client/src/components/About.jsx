import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminAPI } from '../utils/api';

const About = () => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const response = await adminAPI.getProfile();
      setAdminProfile(response.data.admin);
      if (response.data.admin?.profilePicture) {
        setProfileImage(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${response.data.admin.profilePicture}?t=${Date.now()}`);
      }
      if (response.data.admin?.resume) {
        setResumeUrl(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${response.data.admin.resume}`);
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    }
  };

  const skills = [
    'Photoshop', 'Illustrator', 'InDesign', 'Premier Pro', 
    'After Effects', 'Adobe XD', 'PowerPoint'
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">About Me</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            I'm a passionate graphic designer with expertise in creating compelling visual stories 
            that connect brands with their audiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            {profileImage && (
              <motion.div
                className="mb-6 flex justify-center md:justify-start"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <img
                  src={profileImage}
                  alt="Samuel Paul"
                  className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-accent/20"
                />
              </motion.div>
            )}
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">My Journey</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              With years of experience in graphic design, I specialize in creating visual identities 
              that make lasting impressions. From branding to digital campaigns, I bring creativity 
              and strategic thinking to every project.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              My approach combines artistic vision with practical solutions, ensuring that every 
              design not only looks great but also serves its intended purpose effectively.
            </p>
            
            {resumeUrl && (
              <motion.a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📄 Download Resume
              </motion.a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-primary dark:text-white mb-6">Skills & Expertise</h3>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;