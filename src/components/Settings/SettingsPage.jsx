import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { themes } from '../../context/ThemeContext';
import './Settings.css';

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1>Settings</h1>
        
        <div className="settings-section">
          <h2>Theme Settings</h2>
          <div className="theme-selector">
            {Object.entries(themes).map(([name, themeValue]) => (
              <button
                key={name}
                className={`theme-button ${theme === name ? 'active' : ''}`}
                onClick={() => setTheme(name)}
              >
                <div 
                  className="theme-preview" 
                  style={{ background: themeValue.background }}
                />
                <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
