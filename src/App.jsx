import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from "./pages/Login"
import Register from "./pages/Register"
import HomePage from './pages/Home/HomePage'
import { NotesProvider } from './context/NotesContext'
import { NotificationsProvider } from './context/NotificationsContext'
import NotificationsBar from './components/Notifications/NotificationsBar'

function App() {
  return (
    <NotificationsProvider>
      <NotesProvider>
        <div className="app-container">
          <NotificationsBar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </NotesProvider>
    </NotificationsProvider>
  );
}

export default App
