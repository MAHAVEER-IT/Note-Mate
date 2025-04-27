import React from 'react';
import { Archive, Bell, LogOut, StickyNote } from 'lucide-react';
import './Sidebar.css';
import * as AuthService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../../context/NotesContext';

function Sidebar({ isOpen, onViewChange, currentView }) {
  const navigate = useNavigate();
  const { notes, archivedNotes } = useNotes();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Note-Mate</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li 
            className={currentView === 'notes' ? 'active' : ''}
            onClick={() => onViewChange(false)}
          >
            <StickyNote size={20} />
            <span>My Notes</span>
            <span className="note-count">{notes.length}</span>
          </li>
          <li 
            className={currentView === 'archive' ? 'active' : ''}
            onClick={() => onViewChange(true)}
          >
            <Archive size={20} />
            <span>Archive</span>
            <span className="note-count">{archivedNotes.length}</span>
          </li>
          <li>
            <Bell size={20} />
            <span>Reminders</span>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;