import React, { useState, useEffect, useMemo } from 'react';
import { useAI } from '../../context/AIContext';
import { Calendar, History, X, Mic, MicOff } from 'lucide-react';
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
    await generateStudyPlan(prompt || 'Give me a study plan for tomorrow');
  };

  const handleSaveSchedule = async () => {
    if (studyPlan) {
      try {
        await saveSchedule({
          prompt,
          schedule: studyPlan.schedule
        });
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
        <button 
          className="history-corner-button"
          onClick={() => setShowHistory(!showHistory)}
        >
          <History size={24} />
        </button>

        {error && (
          <div className="error-message">
            Error: {error}. Please try again.
          </div>
        )}

        {studyPlan && !error && (
          <div className="study-plan">
            <div className="study-plan-header">
              <h2>Your Study Schedule</h2>
              <button 
                className="save-button"
                onClick={handleSaveSchedule}
              >
                Save Schedule
              </button>
            </div>
            <div className="timeline">
              {studyPlan.schedule.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-content">
                    <div className="time-marker">
                      <Calendar size={20} />
                      <span>{item.time}</span>
                    </div>
                    <div className="card">
                      <h3>{item.time}</h3>
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
          <div className="history-modal">
            <div className="history-content">
              <div className="history-header">
                <h3>Schedule History</h3>
                <button 
                  className="close-button"
                  onClick={() => setShowHistory(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="history-list">
                {scheduleHistory.map((item) => (
                  <div 
                    key={item._id}
                    className="history-item"
                    onClick={() => loadHistorySchedule(item)}
                  >
                    <p className="history-prompt">{item.prompt}</p>
                    <span className="history-date">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="ai-input-section">
          <div className="input-with-mic">
            <input
              type="text"
              placeholder="Ask for a study plan..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="ai-input"
              disabled={isLoading}
            />
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`mic-button ${isRecording ? 'recording' : ''}`}
              title={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          </div>
          <button 
            onClick={handleGeneratePlan}
            className="generate-button"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Plan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIPage;