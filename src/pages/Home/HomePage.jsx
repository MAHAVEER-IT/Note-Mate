import React, { useState, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
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
  const { addNote } = useNotes();
  
  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  
  const handleSaveNote = useCallback((note) => {
    addNote(note);
    setIsModalOpen(false);
  }, [addNote]);

  // Memoize tab components to prevent unnecessary re-renders
  const notesTabContent = useMemo(() => (
    <div className="notes-page">
      <div className="view-header">
        <h1 className="page-title">My Notes</h1>
      </div>
      <div className="notes-content">
        <NoteList isArchiveView={false} />
      </div>
      <button className="add-note-button" onClick={handleOpenModal}>
        <Plus size={24} />
      </button>
      {isModalOpen && (     
        <AddNoteModal
          onClose={handleCloseModal}
          onSave={handleSaveNote}
        />
      )}
    </div>
  ), [isModalOpen, handleOpenModal, handleCloseModal, handleSaveNote]);

  const archiveTabContent = useMemo(() => (
    <div className="notes-page">
      <div className="view-header">
        <h1 className="page-title">Archived Notes</h1>
      </div>
      <div className="notes-content">
        <NoteList isArchiveView={true} />
      </div>
    </div>
  ), []);

  const stickyTabContent = useMemo(() => (
    <StickyNoteProvider>
      <div className="page">
        <h1 className="title">Today's Focus</h1>
        <StickyNoteList />
        <AddStickyNoteModal />
      </div>
    </StickyNoteProvider>
  ), []);
  
  const aiTabContent = useMemo(() => (
    <AIProvider>
      <AIPage />
    </AIProvider>
  ), []);
  
  const settingsTabContent = useMemo(() => <SettingsPage />, []);

  return (
    <div className="home-page">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="page-wrapper">
        <main className="main-content">
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
