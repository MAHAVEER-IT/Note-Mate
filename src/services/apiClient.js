import axios from 'axios';

// Get base URL from environment or use fallback
const getBaseURL = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return baseUrl || 'https://note-mate-backend.onrender.com/api';
};

// Create axios instance with base URL
export const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to attach token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 (Unauthorized) errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
