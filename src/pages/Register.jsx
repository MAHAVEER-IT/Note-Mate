import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Register.css";
import NotesImage from "../assets/images/Notes.png";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import img3 from "../assets/images/img3.png";
import * as AuthService from "../services/authService"

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (!email || !password || !username) {
                setError("All fields are required");
                return;
            }

            if (password.length < 6) {
                setError("Password must be at least 6 characters long");
                return;
            }

            const response = await AuthService.register(username, email, password);
            if (response) {
                console.log("Registration successful");
                navigate('/login');
            }
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
            console.error("Registration failed", error);
        }
    };

    return (
        <div className="notes-app-container">
            {/* Left Panel - Image */}
            <div className="notes-app-image-panel">
                <div className="notes-app-overlay">
                    <div className="notes-app-logo">
                        <i className="notes-app-icon file-text-icon"></i>
                    </div>
                    <h1 className="notes-app-title">Note-Mate</h1>
                    <p className="notes-app-tagline">
                        Join our community of note-takers and organize your thoughts effectively.
                    </p>
                    <div className="notes-app-features">
                        <div className="notes-app-feature-icon">
                            <img 
                                src={img1} 
                                alt="Feature 1"
                                className="notes-app-feature-image"
                            />
                        </div>
                        <div className="notes-app-feature-icon">
                            <img 
                                src={img2} 
                                alt="Feature 2"
                                className="notes-app-feature-image"
                            />
                        </div>
                        <div className="notes-app-feature-icon">
                            <img 
                                src={img3} 
                                alt="Feature 3"
                                className="notes-app-feature-image"
                            />
                        </div>
                    </div>
                </div>
                <img 
                    src={NotesImage} 
                    alt="Notes app illustration" 
                    className="notes-app-bg-image"
                />
            </div>
            
            {/* Right Panel - Form */}
            <div className="notes-app-form-panel">
                <div className="notes-app-form-container">
                    <div className="notes-app-form-header">
                        <h2 className="notes-app-form-title">Create Account</h2>
                        <p className="notes-app-form-subtitle">
                            Sign up to start creating notes
                        </p>
                    </div>
                    
                    {error && (
                        <div className="notes-app-error">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="notes-app-form">
                        <div className="notes-app-input-group">
                            <i className="user-icon notes-app-input-icon"></i>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="notes-app-input"
                                required
                            />
                        </div>
                        
                        <div className="notes-app-input-group">
                            <i className="mail-icon notes-app-input-icon"></i>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="notes-app-input"
                                required
                            />
                        </div>
                        
                        <div className="notes-app-input-group">
                            <i className="lock-icon notes-app-input-icon"></i>
                            <input
                                type="password"
                                placeholder="Password (min. 6 characters)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="notes-app-input"
                                required
                                minLength={6}
                            />
                        </div>
                        
                        <button type="submit" className="notes-app-button">
                            Create Account
                        </button>
                    </form>
                    
                    <div className="notes-app-toggle-container">
                        <p className="notes-app-toggle-text">
                            Already have an account?
                            <Link to="/login" className="notes-app-toggle-button">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;