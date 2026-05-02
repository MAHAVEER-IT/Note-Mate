import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut } from 'lucide-react';
import './NavBar.css';
import * as AuthService from '../../services/authService';
import { useNotes } from '../../context/NotesContext';
import RemindersModal from '../Modals/RemindersModal';

function NavBar() {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const [showReminders, setShowReminders] = useState(false);
  const { notes } = useNotes();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

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
        <div className="navbar-container">
          <div className="navbar-left">
            <div className="search-box">
              <Search size={20} />
              <input type="text" placeholder="Search notes..." />
            </div>
          </div>

          <div className="navbar-right">
            <button 
              className="navbar-icon-btn"
              onClick={() => setShowReminders(true)}
              title="Reminders"
            >
              <Bell size={20} />
              {todayReminders.length > 0 && (
                <span className="badge-dot">{todayReminders.length}</span>
              )}
            </button>

            <div className="user-menu">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <span className="username">{user?.username || 'User'}</span>
              <button 
                className="logout-btn"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
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
