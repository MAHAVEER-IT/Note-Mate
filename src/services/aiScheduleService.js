import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'https://note-mate-backend.onrender.com/api/ai-schedules';

const getAuthHeader = () => {
  const token = getCurrentUser()?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const saveSchedule = async (scheduleData) => {
  try {
    const response = await axios.post(API_URL, scheduleData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to save schedule');
  }
};

export const getSchedules = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch schedules');
  }
};

export const updateSchedule = async (id, scheduleData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, scheduleData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update schedule');
  }
};
