import React, { useState } from 'react';
import { X, Archive, FileText, LogOut, Bell } from 'lucide-react';
import './Sidebar.css';
import * as AuthService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../../context/NotesContext';
import RemindersModal from '../Modals/RemindersModal';

function Sidebar({ isOpen, onClose, onViewChange, currentView }) {
  const navigate = useNavigate();
  const { notes, archivedNotes } = useNotes();
  const [showReminders, setShowReminders] = useState(false);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  // Get today's reminders
  const todayReminders = notes.filter(note => {
    if (!note.reminder) return false;
    const today = new Date();
    const reminderDate = new Date(note.reminder);
    return (
      today.getDate() === reminderDate.getDate() &&
      today.getMonth() === reminderDate.getMonth() &&
      today.getFullYear() === reminderDate.getFullYear()
    );
  });

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="sidebar-content">
          <button 
            className={`sidebar-item ${currentView === 'notes' ? 'active' : ''}`}
            onClick={() => onViewChange(false)}
          >
            <FileText size={20} />
            <span>My Notes</span>
            <span className="note-count">{notes.length}</span>
          </button>
          <button 
            className={`sidebar-item ${currentView === 'archive' ? 'active' : ''}`}
            onClick={() => onViewChange(true)}
          >
            <Archive size={20} />
            <span>Archive</span>
            <span className="note-count">{archivedNotes.length}</span>
          </button>
          <button 
            className="sidebar-item"
            onClick={() => setShowReminders(true)}
          >
            <Bell size={20} />
            <span>Reminders</span>
            <span className="note-count">{todayReminders.length}</span>
          </button>
        </div>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
      <RemindersModal 
        isOpen={showReminders} 
        onClose={() => setShowReminders(false)} 
      />
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
    </>
  );
}

export default Sidebar;