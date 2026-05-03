import axios from 'axios';

// Construct API URL from environment variable
const getAuthApiUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (baseUrl) {
    return `${baseUrl}/auth`;
  }
  // Fallback for development
  return 'https://note-mate-backend.onrender.com/api/auth';
};

const API_URL = getAuthApiUrl();

// Configure axios instance with better error handling
const authAPI = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor to handle common errors
authAPI.interceptors.response.use(
  response => response,
  error => {
    console.error('Auth API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error;
  }
);

export const register = async (userData) => {
  try {
    const response = await authAPI.post('/register', userData);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
  }
};

export const login = async (email, password) => {
  try {
    const response = await authAPI.post('/login', {
      email,
      password
    });
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  // If no token, user is not authenticated
  if (!token) {
    localStorage.removeItem('user');
    return null;
  }
  
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Failed to parse user data:', e);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    }
  }
  return null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};