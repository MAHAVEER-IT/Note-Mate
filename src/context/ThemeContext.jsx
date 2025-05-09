import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    background: 'linear-gradient(135deg, #f6f8ff 0%, #f0e7fe 100%)',
    text: '#333',
    card: 'rgba(255, 255, 255, 0.9)'
  },
  lavender: {
    background: 'linear-gradient(135deg, #E6E6FA 0%, #D8BFD8 100%)',
    text: '#333',
    card: 'rgba(255, 255, 255, 0.85)'
  },
  mint: {
    background: 'linear-gradient(135deg, #F0FFF0 0%, #98FB98 100%)',
    text: '#333',
    card: 'rgba(255, 255, 255, 0.85)'
  },
  peach: {
    background: 'linear-gradient(135deg, #FFDAB9 0%, #FFA07A 100%)',
    text: '#333',
    card: 'rgba(255, 255, 255, 0.85)'
  },
  sky: {
    background: 'linear-gradient(135deg, #F0F8FF 0%, #87CEEB 100%)',
    text: '#333',
    card: 'rgba(255, 255, 255, 0.85)'
  },
  sunset: {
    background: 'linear-gradient(135deg, #FFE4E1 0%, #FFA07A 100%)',
    text: '#333',
    card: 'rgba(255, 255, 255, 0.85)'
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'default';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const themeStyles = themes[theme];
    document.documentElement.style.setProperty('--theme-background', themeStyles.background);
    document.documentElement.style.setProperty('--theme-text', themeStyles.text);
    document.documentElement.style.setProperty('--theme-card', themeStyles.card);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
