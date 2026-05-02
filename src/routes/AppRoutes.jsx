import {Routes,Route,Navigate} from 'react-router-dom';
import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import HomePage from '../pages/Home/HomePage';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
        </Routes>
    );
}

export default AppRoutes;
