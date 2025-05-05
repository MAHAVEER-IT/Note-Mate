import axios from "axios";

const API_URL = 'https://note-mate-backend.onrender.com/api/notes';

const getNotes = async (token) => {
    const res = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const createNote = async (noteData, token) => {
    const res = await axios.post(API_URL, noteData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const updateNote = async (id, updatedData, token) => {
    const res = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const deleteNote = async (id, token) => {
    const res = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const archiveNote = async (id, token) => {
    const res = await axios.put(`${API_URL}/${id}/archive`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const unarchiveNote = async (id, token) => {
    const res = await axios.put(`${API_URL}/${id}/unarchive`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const setReminder = async (id, reminderDate, token) => {
    const res = await axios.put(`${API_URL}/${id}/reminder`, { reminder: reminderDate }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const noteService = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    setReminder,
};

export default noteService;
