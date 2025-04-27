import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import NavBar from '../../components/NavBar/NavBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import NoteList from '../../components/Notes/NoteList';
import AddNoteModal from '../../components/Notes/AddNoteModal';
import { useNotes } from '../../context/NotesContext';
import './HomePage.css';

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchiveView, setIsArchiveView] = useState(false);
  const { addNote } = useNotes();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleViewChange = (isArchive) => {
    setIsArchiveView(isArchive);
  };

  return (
    <div className="home-page">
      <NavBar toggleSidebar={toggleSidebar} />
      <Sidebar 
        isOpen={isSidebarOpen} 
        onViewChange={handleViewChange}
        currentView={isArchiveView ? 'archive' : 'notes'}
      />
      <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
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
      </main>
    </div>
  );
}

export default HomePage;