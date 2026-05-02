import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Register.css";
import * as AuthService from "../services/authService";
import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      if (!email || !password || !username) {
        setError("All fields are required");
        setIsLoading(false);
        return;
      }
      const response = await AuthService.register({
        username,
        email,
        password
      });
      if (response) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      console.error("Registration failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Animated Background */}
      <div className="auth-animated-bg">
        <div className="auth-sphere auth-sphere-1"></div>
        <div className="auth-sphere auth-sphere-2"></div>
        <div className="auth-sphere auth-sphere-3"></div>
      </div>

      {/* Form Container */}
      <div className="auth-form-container">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <div className="auth-logo-brand">
              <Sparkles size={32} />
              <span>Note-Mate</span>
            </div>
            <h1>Create Your Account</h1>
            <p>Join our community and start organizing your ideas</p>
          </div>

          {error && <div className="auth-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <div className="auth-password-wrapper">
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  aria-label="Toggle password visibility"
                >
                  {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="auth-spinner"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;