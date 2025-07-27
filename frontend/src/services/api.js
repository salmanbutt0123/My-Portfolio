import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const errorMessage = error.response.data?.detail || 'An error occurred';
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Request was made but no response
      return Promise.reject(new Error('Network error - please check your connection'));
    } else {
      // Something else happened
      return Promise.reject(new Error('Request failed'));
    }
  }
);

// Contact API
export const contactAPI = {
  // Submit contact form
  submit: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all contacts (admin use)
  getAll: async () => {
    try {
      const response = await api.get('/contact');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single contact
  getById: async (id) => {
    try {
      const response = await api.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Projects API
export const projectsAPI = {
  // Get all projects
  getAll: async () => {
    try {
      const response = await api.get('/projects');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single project
  getById: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get projects by category
  getByCategory: async (category) => {
    try {
      const response = await api.get(`/projects/category/${category}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new project
  create: async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update project
  update: async (id, projectData) => {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete project
  delete: async (id) => {
    try {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// General API functions
export const generalAPI = {
  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Legacy status check
  createStatusCheck: async (clientName) => {
    try {
      const response = await api.post('/status', { client_name: clientName });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get status checks
  getStatusChecks: async () => {
    try {
      const response = await api.get('/status');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Export default API object
const apiService = {
  contact: contactAPI,
  projects: projectsAPI,
  general: generalAPI,
};

export default apiService;