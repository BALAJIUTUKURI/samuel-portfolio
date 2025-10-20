import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Projects API
export const projectsAPI = {
  getAll: () => api.get('/api/projects'),
  getByCategory: (category) => api.get(`/api/projects/${category}`),
  create: (formData) => api.post('/api/projects', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/api/projects/${id}`)
};

// Admin API
export const adminAPI = {
  login: (credentials) => api.post('/api/admin/login', credentials),
  verifyOTP: (data) => api.post('/api/admin/verify-otp', data)
};

// Contact API
export const contactAPI = {
  send: (data) => api.post('/api/contact', data)
};

export default api;