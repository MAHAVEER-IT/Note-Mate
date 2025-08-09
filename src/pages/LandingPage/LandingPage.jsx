import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import noteMateImg from '../../assets/images/Notes.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Organize Your Thoughts with <span className="highlight">Note-Mate</span></h1>
          <p className="hero-subtitle">
            A smart note-taking app with AI-powered study planning and productivity tools
          </p>
          <div className="hero-buttons">
            <button 
              className="primary-button"
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>
            <button 
              className="secondary-button"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={noteMateImg} alt="Note-Mate App" />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
