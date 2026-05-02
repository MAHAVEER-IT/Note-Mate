import React, { useState, useMemo, useCallback } from 'react';
import { Plus, LayoutGrid, Archive, Lightbulb, Settings, LogOut, Menu, X } from 'lucide-react';
import NavBar from '../../components/NavBar/NavBar';
import NoteList from '../../components/Notes/NoteList';
import AddNoteModal from '../../components/Notes/AddNoteModal';
import { useNotes } from '../../context/NotesContext';
import { StickyNoteProvider } from '../../context/StickyNotesContext';
import { AIProvider } from '../../context/AIContext';
import StickyNoteList from '../../components/StickyNote/StickyNoteList';
import AddStickyNoteModal from '../../components/StickyNote/AddStickyNoteModal';
import AIPage from '../../components/AI/AIPage';
import SettingsPage from '../../components/Settings/SettingsPage';
import './HomePage.css';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('notes');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { addNote } = useNotes();
  
  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  
  const handleSaveNote = useCallback((note) => {
    addNote(note);
    setIsModalOpen(false);
  }, [addNote]);

  const navigationItems = [
    { id: 'notes', label: 'My Notes', icon: LayoutGrid },
    { id: 'sticky', label: 'Today\'s Focus', icon: Lightbulb },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'ai', label: 'AI Assistant', icon: Lightbulb },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const notesTabContent = useMemo(() => (
    <div className="tab-content">
      <div className="tab-header">
        <div>
          <h1>My Notes</h1>
          <p className="text-muted">Organize and manage your notes</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          <Plus size={20} />
          New Note
        </button>
      </div>
      <div className="notes-content">
        <NoteList isArchiveView={false} />
      </div>
      {isModalOpen && (     
        <AddNoteModal
          onClose={handleCloseModal}
          onSave={handleSaveNote}
        />
      )}
    </div>
  ), [isModalOpen, handleOpenModal, handleCloseModal, handleSaveNote]);

  const archiveTabContent = useMemo(() => (
    <div className="tab-content">
      <div className="tab-header">
        <div>
          <h1>Archived Notes</h1>
          <p className="text-muted">View your archived notes</p>
        </div>
      </div>
      <div className="notes-content">
        <NoteList isArchiveView={true} />
      </div>
    </div>
  ), []);

  const stickyTabContent = useMemo(() => (
    <StickyNoteProvider>
      <div className="tab-content">
        <div className="tab-header">
          <div>
            <h1>Today's Focus</h1>
            <p className="text-muted">Quick notes for today</p>
          </div>
          <AddStickyNoteModal />
        </div>
        <div className="sticky-content">
          <StickyNoteList />
        </div>
      </div>
    </StickyNoteProvider>
  ), []);
  
  const aiTabContent = useMemo(() => (
    <AIProvider>
      <div className="tab-content">
        <AIPage />
      </div>
    </AIProvider>
  ), []);
  
  const settingsTabContent = useMemo(() => (
    <div className="tab-content">
      <SettingsPage />
    </div>
  ), []);

  return (
    <div className="home-page-container">
      <NavBar />
      <div className="home-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <h2>Note-Mate</h2>
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="sidebar-nav">
            {navigationItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <button className="nav-item logout">
              <LogOut size={20} />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content-new">
          {activeTab === 'notes' && notesTabContent}
          {activeTab === 'archive' && archiveTabContent}
          {activeTab === 'sticky' && stickyTabContent}
          {activeTab === 'ai' && aiTabContent}
          {activeTab === 'settings' && settingsTabContent}
        </main>
      </div>
    </div>
  );
}

export default HomePage;
