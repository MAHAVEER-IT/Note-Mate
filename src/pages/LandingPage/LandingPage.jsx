import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Brain,
  Lock,
  Users,
  BarChart3,
  Shield,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: <Zap size={28} />,
      title: 'Smart Notes',
      description: 'Create and organize notes with intuitive interface and instant search.',
    },
    {
      icon: <Brain size={28} />,
      title: 'AI Assistant',
      description: 'Generate personalized study plans powered by advanced AI technology.',
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Sticky Notes',
      description: 'Quick, draggable sticky notes for your immediate thoughts and reminders.',
    },
    {
      icon: <Lock size={28} />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and stored securely on our servers.',
    },
    {
      icon: <BarChart3 size={28} />,
      title: 'Analytics',
      description: 'Track your productivity with detailed insights and statistics.',
    },
    {
      icon: <Users size={28} />,
      title: 'Collaborate',
      description: 'Share notes and plans with your study group or team.',
    },
  ];

  const testimonials = [];

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="gradient-sphere gradient-sphere-1"></div>
        <div className="gradient-sphere gradient-sphere-2"></div>
        <div className="gradient-sphere gradient-sphere-3"></div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Welcome to the Future of Note-Taking</span>
          </div>

          <h1 className="hero-title">
            Your AI-Powered
            <br />
            <span className="gradient-text">Productivity Companion</span>
          </h1>

          <p className="hero-subtitle">
            Organize your thoughts, plan your studies, and achieve your goals with intelligent note-taking powered by advanced AI.
          </p>

          <div className="hero-buttons">
            <button
              className="btn btn-primary btn-large"
              onClick={() => navigate('/register')}
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button 
              className="btn btn-outline btn-large"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <Zap size={24} className="card-icon" />
            <div className="card-content">
              <div className="card-title">Quick Notes</div>
              <div className="card-bar"></div>
              <div className="card-bar short"></div>
            </div>
          </div>

          <div className="floating-card card-2">
            <Brain size={24} className="card-icon" />
            <div className="card-content">
              <div className="card-title">Smart Planning</div>
              <div className="card-bar"></div>
              <div className="card-bar short"></div>
            </div>
          </div>

          <div className="floating-card card-3">
            <Sparkles size={24} className="card-icon" />
            <div className="card-content">
              <div className="card-title">AI Assistant</div>
              <div className="card-bar"></div>
              <div className="card-bar short"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <ChevronDown className="chevron-animate" size={24} />
      </div>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to boost your productivity</p>
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card"
              style={{
                animationDelay: `${idx * 0.1}s`,
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-arrow">
                <ArrowRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="showcase">
        <div className="showcase-container">
          <div className="showcase-content">
            <h2>Smart Note Organization</h2>
            <p>
              Keep all your notes organized with our intuitive interface. Color-code, search, and archive your notes effortlessly.
            </p>
            <ul className="showcase-list">
              <li><CheckCircle size={20} /> Organize with color categories</li>
              <li><CheckCircle size={20} /> Instant search and filtering</li>
              <li><CheckCircle size={20} /> Archive completed notes</li>
              <li><CheckCircle size={20} /> Set reminders and notifications</li>
            </ul>
            <button className="btn btn-primary" onClick={() => navigate('/register')}>
              Learn More <ArrowRight size={18} />
            </button>
          </div>
          <div className="showcase-visual">
            <div className="showcase-box">
              <div className="showcase-item item-1"></div>
              <div className="showcase-item item-2"></div>
              <div className="showcase-item item-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Planner Section */}
      <section className="ai-section">
        <div className="showcase-container reversed">
          <div className="showcase-visual">
            <div className="ai-visual">
              <div className="ai-box">
                <Brain size={48} className="ai-icon" />
              </div>
            </div>
          </div>
          <div className="showcase-content">
            <h2>AI-Powered Study Planner</h2>
            <p>
              Let our AI create personalized study schedules tailored to your needs. Get smart recommendations and stay on track.
            </p>
            <ul className="showcase-list">
              <li><CheckCircle size={20} /> Generate custom study plans</li>
              <li><CheckCircle size={20} /> Time-based scheduling</li>
              <li><CheckCircle size={20} /> Activity suggestions</li>
              <li><CheckCircle size={20} /> Track your progress</li>
            </ul>
            <button className="btn btn-primary" onClick={() => navigate('/register')}>
              Try AI Planner <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Productivity?</h2>
          <p>Join thousands of users who are already achieving their goals with Note-Mate</p>
          <div className="cta-buttons">
            <button
              className="btn btn-primary btn-large"
              onClick={() => navigate('/register')}
            >
              Get Started <ArrowRight size={20} />
            </button>
            <button 
              className="btn btn-white btn-large"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <div className="footer-brand">
              <Sparkles size={24} />
              <span>Note-Mate</span>
            </div>
            <p className="footer-desc">Your AI-powered productivity companion</p>
          </div>

          <div className="footer-column">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#blog">Blog</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Security</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Note-Mate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
