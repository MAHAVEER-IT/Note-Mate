import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:5000/api/ai-schedules';

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
