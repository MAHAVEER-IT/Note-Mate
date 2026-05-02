import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * Ensures only authenticated users can access protected routes
 * Redirects unauthenticated users to the login page
 */
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the component
  return element;
};

export default ProtectedRoute;
