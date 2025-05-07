import React, { useState } from 'react';
import { Search, Bell, User, FileText, Feather, Cpu, Settings, Archive } from 'lucide-react';
import './NavBar.css';
import * as AuthService from '../../services/authService';
import { useNotes } from '../../context/NotesContext';
import RemindersModal from '../Modals/RemindersModal';

function NavBar({ activeTab, setActiveTab }) {
  const user = AuthService.getCurrentUser();
  const [showReminders, setShowReminders] = useState(false);
  const { notes, archivedNotes } = useNotes();  // Add archivedNotes from useNotes

  // Get today's reminders count
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
      <nav className="navbar">
        <div className="navbar-left">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <FileText size={20} />
              <span>Notes</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'archive' ? 'active' : ''}`}
              onClick={() => setActiveTab('archive')}
            >
              <Archive size={20} />
              <span>Archived Notes</span>
              {archivedNotes.length > 0 && (
                <span className="note-count">{archivedNotes.length}</span>
              )}
            </button>
            <button 
              className={`nav-tab ${activeTab === 'sticky' ? 'active' : ''}`}
              onClick={() => setActiveTab('sticky')}
            >
              <Feather size={20} />
              <span>Sticky Notes</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'ai' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai')}
            >
              <Cpu size={20} />
              <span>AI Creator</span>
            </button>
            <button 
              className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
          </div>
        </div>
        <div className="navbar-right">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search notes..." />
          </div>
          <button 
            className="icon-button notification-button"
            onClick={() => setShowReminders(true)}
          >
            <Bell size={24} />
            {todayReminders.length > 0 && (
              <span className="notification-badge">{todayReminders.length}</span>
            )}
          </button>
          <div className="user-profile">
            <User size={24} />
            <span className="username">{user?.username || 'User'}</span>
          </div>
        </div>
      </nav>

      <RemindersModal 
        isOpen={showReminders} 
        onClose={() => setShowReminders(false)} 
      />
    </>
  );
}

export default NavBar;