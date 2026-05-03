import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import * as AuthService from "../services/authService";
import { Eye, EyeOff, Sparkles, ArrowRight } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      if (!email || !password) {
        setError("Email and password are required");
        setIsLoading(false);
        return;
      }
      const response = await AuthService.login(email, password);
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      // Handle error messages from authService
      if (error.message) {
        setError(error.message);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
      console.error("Login failed", error);
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
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          {error && <div className="auth-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Create one</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;