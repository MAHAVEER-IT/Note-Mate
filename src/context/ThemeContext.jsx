import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  default: {
    background: 'radial-gradient(circle at top, #fdfdff 0%, #f1f4ff 40%, #e5ecff 100%)',
    surface: 'rgba(255, 255, 255, 0.92)',
    text: '#1f2933',
    subtle: '#5f6b7c',
    primary: '#3651ff',
    primarySoft: 'rgba(54, 81, 255, 0.12)',
    border: 'rgba(103, 114, 148, 0.16)',
    shadow: '0 18px 48px rgba(15, 23, 42, 0.08)'
  },
  ocean: {
    background: 'radial-gradient(circle at 20% 20%, #f5fbff 0%, #e1f1ff 45%, #d4e4ff 100%)',
    surface: 'rgba(255, 255, 255, 0.95)',
    text: '#16263c',
    subtle: '#44566c',
    primary: '#2f89ff',
    primarySoft: 'rgba(47, 137, 255, 0.1)',
    border: 'rgba(59, 130, 246, 0.14)',
    shadow: '0 18px 46px rgba(37, 99, 235, 0.12)'
  },
  sage: {
    background: 'radial-gradient(circle at top, #fbfef8 0%, #e9f4ec 45%, #d9e8e0 100%)',
    surface: 'rgba(255, 255, 255, 0.9)',
    text: '#1d2a23',
    subtle: '#4a5a51',
    primary: '#3a956b',
    primarySoft: 'rgba(58, 149, 107, 0.12)',
    border: 'rgba(58, 149, 107, 0.18)',
    shadow: '0 18px 46px rgba(24, 108, 80, 0.12)'
  },
  citrus: {
    background: 'radial-gradient(circle at 80% 0%, #fffdf5 0%, #fff2d6 55%, #ffe4b4 100%)',
    surface: 'rgba(255, 255, 255, 0.9)',
    text: '#291d0a',
    subtle: '#725f44',
    primary: '#ff8a3d',
    primarySoft: 'rgba(255, 138, 61, 0.12)',
    border: 'rgba(255, 138, 61, 0.2)',
    shadow: '0 18px 46px rgba(240, 133, 44, 0.14)'
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Validate that the saved theme exists in our themes object
    return themes[savedTheme] ? savedTheme : 'default';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const themeStyles = themes[theme] || themes.default;
    document.documentElement.style.setProperty('--theme-background', themeStyles.background);
    document.documentElement.style.setProperty('--theme-surface', themeStyles.surface);
    document.documentElement.style.setProperty('--theme-text', themeStyles.text);
    document.documentElement.style.setProperty('--theme-subtle', themeStyles.subtle);
    document.documentElement.style.setProperty('--theme-primary', themeStyles.primary);
    document.documentElement.style.setProperty('--theme-primary-soft', themeStyles.primarySoft);
    document.documentElement.style.setProperty('--theme-border', themeStyles.border);
    document.documentElement.style.setProperty('--theme-shadow', themeStyles.shadow);
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
