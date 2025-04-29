import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as AuthService from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);
        setLoading(false);

        // Redirect to login if no user and not already on auth pages
        if (!currentUser && !location.pathname.match(/\/(login|register)/)) {
            navigate('/login');
        }
    }, [navigate, location]);

    const login = async (email, password) => {
        try {
            const userData = await AuthService.login(email, password);
            setUser(userData);
            navigate('/home');
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const register = async (username, email, password) => {
        try {
            const userData = await AuthService.register(username, email, password);
            navigate('/login');
            return userData;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        AuthService.logout();
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            register,
            logout,
            loading
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}