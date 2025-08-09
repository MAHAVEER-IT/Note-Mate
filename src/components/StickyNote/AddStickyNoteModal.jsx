import { useContext, useEffect, useState } from 'react';
import { StickyNotesContext } from '../../context/StickyNotesContext';
import './StickyNote.css';

function AddStickyNoteModal() {
  const { addNote } = useContext(StickyNotesContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAddNote = async () => {
    try {
      const container = document.querySelector('.sticky-notes__list');
      if (!container) {
        return;
      }
      
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      // Adjust note dimensions based on screen size
      let noteWidth = 200;
      let noteHeight = 150;
      
      if (window.innerWidth <= 360) {
        noteWidth = 110;
        noteHeight = 90;
      } else if (window.innerWidth <= 480) {
        noteWidth = 130;
        noteHeight = 100;
      } else if (window.innerWidth <= 576) {
        noteWidth = 140;
        noteHeight = 110;
      } else if (window.innerWidth <= 768) {
        noteWidth = 160;
        noteHeight = 120;
      } else if (window.innerWidth <= 1024) {
        noteWidth = 180;
        noteHeight = 130;
      }
      
      // Position notes more centrally on mobile
      let randomX, randomY;
      
      if (isMobile) {
        // For mobile, position notes in a more central and accessible area
        const usableWidth = containerWidth * 0.7; // Use 70% of available width
        const usableHeight = containerHeight * 0.6; // Use 60% of available height
        
        const startX = (containerWidth - usableWidth) / 2;
        const startY = (containerHeight - usableHeight) / 3; // Position higher up
        
        randomX = startX + Math.random() * usableWidth;
        randomY = startY + Math.random() * usableHeight;
        
        // Snap to a 10px grid for better positioning
        randomX = Math.round(randomX / 10) * 10;
        randomY = Math.round(randomY / 10) * 10;
      } else {
        // For desktop, use the full container area
        randomX = Math.random() * (containerWidth - noteWidth);
        randomY = Math.random() * (containerHeight - noteHeight);
      }

      const colors = ['yellow', 'pink', 'green', 'blue', 'purple', 'red', 'indigo'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      await addNote(randomX, randomY, randomColor);
    } catch (err) {
      console.error('Failed to add sticky note:', err);
    }
  };

  return (
    <button 
      className="sticky-note__add-btn" 
      onClick={handleAddNote}
      aria-label="Add new sticky note"
      title="Add new note"
    >
      ➕
    </button>
  );
}

export default AddStickyNoteModal;