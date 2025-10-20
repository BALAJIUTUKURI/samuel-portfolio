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
  sendOTP: (data) => api.post('/api/admin/send-otp', data),
  verifyOTP: (data) => api.post('/api/admin/verify-otp', data),
  getProfile: () => api.get('/api/admin/profile'),
  uploadProfile: (formData) => api.post('/api/admin/upload-profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadResume: (formData) => api.post('/api/admin/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

// Contact API
export const contactAPI = {
  send: (data) => api.post('/api/contact', data)
};

// Testimonials API
export const testimonialsAPI = {
  getAll: () => api.get('/api/testimonials'),
  submit: (data) => api.post('/api/testimonials', data),
  approve: (id) => api.put(`/api/testimonials/${id}/approve`)
};

// Newsletter API
export const newsletterAPI = {
  subscribe: (data) => api.post('/api/newsletter/subscribe', data)
};

// Quotes API
export const quotesAPI = {
  submit: (data) => api.post('/api/quotes', data),
  getAll: () => api.get('/api/quotes')
};

// Analytics API
export const analyticsAPI = {
  trackVisitor: (data) => api.post('/api/analytics/visitor', data)
};

export default api;