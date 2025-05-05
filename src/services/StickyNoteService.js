import axios from 'axios';
import {getCurrentUser} from '../services/authService';

const API_URL ='https://note-mate-backend.onrender.com/api/sticky-notes';


const getAuthHeader = () => {
  const token = getCurrentUser()?.token; 
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create a new sticky note
export const createStickyNote = async (noteData) => {
  try {
    const response = await axios.post(API_URL, noteData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create sticky note');
  }
};

// Fetch all sticky notes for the user
export const fetchStickyNotes = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch sticky notes');
  }
};

export const updateStickyNote = async (id, noteData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, noteData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update sticky note');
  }
};

// Delete a sticky note
export const deleteStickyNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete sticky note');
  }
};