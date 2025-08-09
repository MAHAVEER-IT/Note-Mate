import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { AIProvider } from './context/AIContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/Home/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import NotificationsBar from './components/Notifications/NotificationsBar';
import AIHistoryDetails from './components/AI/AIHistoryDetails';
import './App.css';

function App() {
  const location = useLocation();
  // Check if we're on the landing page
  const isLandingPage = location.pathname === '/';

  return (
    <div className="App">
      <ThemeProvider>
        <AuthProvider>
          <NotesProvider>
            <NotificationsProvider>
              <AIProvider>
                {!isLandingPage && <NotificationsBar />}
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/ai-history/:id" element={<AIHistoryDetails />} />
                  <Route path="/" element={<LandingPage />} />
                </Routes>
              </AIProvider>
            </NotificationsProvider>
          </NotesProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
