import React from 'react';
import { Menu, Search, Bell, User, FileText, Feather, Cpu, Settings } from 'lucide-react';
import './NavBar.css';
import * as AuthService from '../../services/authService';

function NavBar({ toggleSidebar, activeTab, setActiveTab }) {
  const user = AuthService.getCurrentUser();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-button" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <FileText size={20} />
            <span>Notes</span>
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
        <button className="icon-button">
          <Bell size={24} />
        </button>
        <div className="user-profile">
          <User size={24} />
          <span className="username">{user?.username || 'User'}</span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
