import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsAPI } from '../utils/api';
import ImageOptimizer from './ImageOptimizer';
import SearchBar from './SearchBar';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Branding', 'Digital Campaigns', 'Social Media', 'Print Design', 'Photography', 'Video Editing'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === category));
    }
  };

  const openLightbox = (project) => {
    setSelectedProject(project);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-6">Portfolio</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my creative work across various design disciplines
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={(query) => {
            if (query) {
              setFilteredProjects(projects.filter(p => 
                p.title.toLowerCase().includes(query.toLowerCase()) ||
                p.description.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase())
              ));
            } else {
              filterProjects(activeCategory);
            }
          }} />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => filterProjects(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-accent text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                whileHover={{ y: -10 }}
                onClick={() => openLightbox(project)}
              >
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  {project.mediaType === 'video' ? (
                    <video 
                      className="w-full h-full object-cover"
                      poster={project.thumbnailUrl ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${project.thumbnailUrl}` : undefined}
                    >
                      <source src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${project.mediaUrl}`} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${project.mediaUrl}`}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                    {project.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl max-h-[90vh] overflow-auto"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-primary dark:text-white">{selectedProject.title}</h3>
                    <button
                      onClick={closeLightbox}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    {selectedProject.mediaType === 'video' ? (
                      <video 
                        controls 
                        className="w-full max-h-96 object-contain"
                        poster={selectedProject.thumbnailUrl ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${selectedProject.thumbnailUrl}` : undefined}
                      >
                        <source src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${selectedProject.mediaUrl}`} type="video/mp4" />
                      </video>
                    ) : (
                      <img 
                        src={`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${selectedProject.mediaUrl}`}
                        alt={selectedProject.title}
                        className="w-full max-h-96 object-contain"
                      />
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedProject.description}</p>
                  <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                    {selectedProject.category}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;