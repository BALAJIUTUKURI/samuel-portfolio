import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import { projectsAPI } from '../utils/api';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Branding',
    mediaType: 'image'
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const navigate = useNavigate();

  const categories = ['Branding', 'Digital Campaigns', 'Social Media', 'Print Design', 'Photography', 'Video Editing'];

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('mediaType', formData.mediaType);
    
    if (mediaFile) {
      formDataToSend.append('media', mediaFile);
    }
    
    if (thumbnailFile && formData.mediaType === 'video') {
      formDataToSend.append('thumbnail', thumbnailFile);
    }

    try {
      await projectsAPI.create(formDataToSend);
      setShowAddForm(false);
      setFormData({
        title: '',
        description: '',
        category: 'Branding',
        mediaType: 'image'
      });
      setMediaFile(null);
      setThumbnailFile(null);
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setShowAddForm(true)}
              className="bg-accent text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus />
              <span>Add Project</span>
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-video bg-gray-200 relative">
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
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs">
                    {project.category}
                  </span>
                  <motion.button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-500 hover:text-red-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects yet. Add your first project!</p>
          </div>
        )}
      </div>

      {/* Add Project Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Media Type</label>
                  <select
                    value={formData.mediaType}
                    onChange={(e) => setFormData({...formData, mediaType: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-accent"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {formData.mediaType === 'video' ? 'Video File' : 'Image File'}
                  </label>
                  <input
                    type="file"
                    accept={formData.mediaType === 'video' ? 'video/*' : 'image/*'}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const maxSize = formData.mediaType === 'video' ? 500 * 1024 * 1024 : 50 * 1024 * 1024;
                        if (file.size > maxSize) {
                          alert(`File too large. Max size: ${formData.mediaType === 'video' ? '500MB' : '50MB'}`);
                          e.target.value = '';
                          return;
                        }
                        setMediaFile(file);
                      }
                    }}
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Max size: {formData.mediaType === 'video' ? '500MB' : '50MB'}
                  </p>
                </div>

                {formData.mediaType === 'video' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Thumbnail (Optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setThumbnailFile(e.target.files[0])}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-accent text-white py-2 rounded-lg hover:bg-accent/90"
                  >
                    Add Project
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;