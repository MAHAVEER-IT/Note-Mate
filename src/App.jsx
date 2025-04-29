import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotesProvider } from './context/NotesContext';
import { NotificationsProvider } from './context/NotificationsContext';
import { AIProvider } from './context/AIContext';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/Home/HomePage';
import NotificationsBar from './components/Notifications/NotificationsBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NotesProvider>
          <NotificationsProvider>
            <AIProvider>
              <NotificationsBar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
              </Routes>
            </AIProvider>
          </NotificationsProvider>
        </NotesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
