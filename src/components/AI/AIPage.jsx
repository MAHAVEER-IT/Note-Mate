import React, { useState, useEffect, useMemo } from 'react';
import { useAI } from '../../context/AIContext';
import { Calendar, History, X, Mic, MicOff, Sparkles, BookOpen, Clock, Zap } from 'lucide-react';
import { saveSchedule, getSchedules } from '../../services/aiScheduleService';
import { useNavigate } from 'react-router-dom';
import './AIPage.css';
const AIPage = () => {
  const { generateStudyPlan, studyPlan, isLoading, error, setExistingPlan } = useAI();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [scheduleHistory, setScheduleHistory] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [savedNotification, setSavedNotification] = useState(false);

  const recognition = useMemo(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      return recognitionInstance;
    }
    return null;
  }, []);
  
  useEffect(() => {
    if (showHistory) {
      loadScheduleHistory();
    }
  }, [showHistory]);
  const loadScheduleHistory = async () => {
    try {
      const history = await getSchedules();
      setScheduleHistory(history);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };
  const handleGeneratePlan = async () => {
    setHasStarted(true);
    await generateStudyPlan(prompt || 'Give me a study plan for tomorrow');
  };
  const handleSaveSchedule = async () => {
    if (studyPlan) {
      try {
        await saveSchedule({
          prompt,
          schedule: studyPlan.schedule
        });
        setSavedNotification(true);
        setTimeout(() => setSavedNotification(false), 3000);
        // Refresh history if it's open
        if (showHistory) {
          loadScheduleHistory();
        }
      } catch (error) {
        console.error('Error saving schedule:', error);
      }
    }
  };
  const loadHistorySchedule = (historicalSchedule) => {
    navigate(`/ai-history/${historicalSchedule._id}`);
  };
  const startRecording = () => {
    if (!recognition) {
      console.error('Speech recognition not supported');
      return;
    }
    recognition.onstart = () => {
      setIsRecording(true);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };
    recognition.onend = () => {
      setIsRecording(false);
    };
    recognition.start();
  };
  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };
  return (
    <div className="ai-page-wrapper">
      <div className="ai-page">
        {!hasStarted && !studyPlan && (
          <div className="ai-welcome">
            <div className="ai-welcome-content">
              <div className="ai-welcome-icon">
                <Sparkles className="sparkle-icon" size={48} />
              </div>
              <h1>Welcome to AI Study Planner</h1>
              <p className="ai-welcome-subtitle">Your intelligent companion for creating personalized, effective study schedules tailored to your goals.</p>
              <div className="ai-features">
                <div className="ai-feature">
                  <div className="ai-feature-icon">
                    <BookOpen size={24} />
                  </div>
                  <div className="ai-feature-content">
                    <h3>Smart Scheduling</h3>
                    <p>Get personalized study plans based on your needs</p>
                  </div>
                </div>
                <div className="ai-feature">
                  <div className="ai-feature-icon">
                    <Clock size={24} />
                  </div>
                  <div className="ai-feature-content">
                    <h3>Track History</h3>
                    <p>Access and review your previous study plans</p>
                  </div>
                </div>
                <div className="ai-feature">
                  <div className="ai-feature-icon">
                    <Zap size={24} />
                  </div>
                  <div className="ai-feature-content">
                    <h3>Voice Input</h3>
                    <p>Speak your requirements for quick plan generation</p>
                  </div>
                </div>
              </div>
              <p className="ai-start-prompt">
                <Sparkles size={16} className="inline-icon" />
                Type your study requirements below or use voice input to get started!
              </p>
            </div>
          </div>
        )}
        <div className={`ai-interface ${!hasStarted && !studyPlan ? 'with-welcome' : ''}`}>
          <button
            className="history-corner-button"
            onClick={() => setShowHistory(!showHistory)}
            title="View Schedule History"
          >
            <History size={24} />
          </button>

          {savedNotification && (
            <div className="save-notification">
              <Sparkles size={16} />
              <span>Schedule saved successfully!</span>
            </div>
          )}

          {error && (
            <div className="error-message">
              <div className="error-icon">⚠️</div>
              <div>
                <strong>Oops!</strong> {error}. Please try again.
              </div>
            </div>
          )}

          {isLoading && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Creating your personalized study plan...</p>
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          {studyPlan && !error && !isLoading && (
            <div className="study-plan">
              <div className="study-plan-header">
                <div className="header-content">
                  <Sparkles className="header-icon" size={24} />
                  <h2>Your Study Schedule</h2>
                </div>
                <button
                  className="save-button"
                  onClick={handleSaveSchedule}
                >
                  <Calendar size={18} />
                  Save Schedule
                </button>
              </div>
              <div className="timeline">
                {studyPlan.schedule.map((item, index) => (
                  <div key={index} className="timeline-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="timeline-content">
                      <div className="time-marker">
                        <div className="time-badge">
                          <Clock size={18} />
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-header">
                          <h3>{item.time}</h3>
                          <div className="card-decorator"></div>
                        </div>
                        <p>{item.activity}</p>
                      </div>
                    </div>
                    {index < studyPlan.schedule.length - 1 && <div className="timeline-connector" />}
                  </div>
                ))}
              </div>
            </div>
          )}
          {showHistory && (
            <div className="history-modal" onClick={() => setShowHistory(false)}>
              <div className="history-content" onClick={(e) => e.stopPropagation()}>
                <div className="history-header">
                  <div className="history-title">
                    <History size={24} />
                    <h3>Schedule History</h3>
                  </div>
                  <button
                    className="close-button"
                    onClick={() => setShowHistory(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="history-list">
                  {scheduleHistory.length === 0 ? (
                    <div className="empty-history">
                      <Calendar size={48} />
                      <p>No saved schedules yet</p>
                      <span>Create and save your first study plan!</span>
                    </div>
                  ) : (
                    scheduleHistory.map((item, index) => (
                      <div
                        key={item._id}
                        className="history-item"
                        onClick={() => loadHistorySchedule(item)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="history-item-icon">
                          <BookOpen size={20} />
                        </div>
                        <div className="history-item-content">
                          <p className="history-prompt">{item.prompt}</p>
                          <div className="history-meta">
                            <Clock size={14} />
                            <span className="history-date">
                              {new Date(item.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="ai-input-section">
            <div className="input-with-mic">
              <input
                type="text"
                placeholder="Describe your study needs... (e.g., 'Study plan for math exam next week')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleGeneratePlan()}
                className="ai-input"
                disabled={isLoading}
              />
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`mic-button ${isRecording ? 'recording' : ''}`}
                title={isRecording ? 'Stop recording' : 'Start recording'}
                disabled={isLoading}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            </div>
            <button
              onClick={handleGeneratePlan}
              className="generate-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="button-spinner"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Plan
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIPage;