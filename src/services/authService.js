import axios from 'axios';

const API_URL = 'https://note-mate-backend.onrender.com/api/auth';

export const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password
    });
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password
    });
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};