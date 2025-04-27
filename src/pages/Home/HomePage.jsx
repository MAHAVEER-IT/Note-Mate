import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import NoteList from '../../components/Notes/NoteList';
import AddNoteModal from '../../components/Notes/AddNoteModal';
import { useNotes } from '../../context/NotesContext';
import { StickyNoteProvider } from '../../context/StickyNotesContext'; 
import StickyNoteList from '../../components/StickyNote/StickyNoteList';
import AddStickyNoteModal from '../../components/StickyNote/AddStickyNoteModal';
import './HomePage.css';

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveView, setIsArchiveView] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); 
  const { addNote } = useNotes();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleViewChange = (isArchive) => {
    setIsArchiveView(isArchive);
  };

  return (
    <div className="home-page">
      <NavBar toggleSidebar={toggleSidebar} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onViewChange={handleViewChange}
        currentView={isArchiveView ? 'archive' : 'notes'}
      />
      
      <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        {activeTab === 'notes' && (
          <>
            <div className="view-header">
              <h1>{isArchiveView ? 'Archived Notes' : 'My Notes'}</h1>
            </div>
            <NoteList isArchiveView={isArchiveView} />
            {!isArchiveView && (
              <button 
                className="add-note-button"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus size={24} />
              </button>
            )}
            {isModalOpen && (
              <AddNoteModal
                onClose={() => setIsModalOpen(false)}
                onSave={(note) => {
                  addNote(note);
                  setIsModalOpen(false);
                }}
              />
            )}
          </>
        )}

        {activeTab === 'sticky' && (
          <StickyNoteProvider>
            <div className="page">
              <h1 className="title">Interactive Sticky Notes</h1>
              <p className="subtitle">Drag them around, change colors, and organize your thoughts!</p>
              <StickyNoteList />
              <AddStickyNoteModal />
            </div>
          </StickyNoteProvider>
        )}

        {activeTab === 'ai' && (
          <div className="page">
            <h1 className="title">AI Creator</h1>
            <p className="subtitle">This will be your AI content generation space.</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="page">
            <h1 className="title">Settings</h1>
            <p className="subtitle">Manage your account settings here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
