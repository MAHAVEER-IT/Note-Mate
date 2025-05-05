import React, { useState, useEffect } from 'react';
import { useAI } from '../../context/AIContext';
import { Calendar, History, X } from 'lucide-react';
import { saveSchedule, getSchedules } from '../../services/aiScheduleService';
import './AIPage.css';

const AIPage = () => {
  const { generateStudyPlan, studyPlan, isLoading, error, setExistingPlan } = useAI();
  const [prompt, setPrompt] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [scheduleHistory, setScheduleHistory] = useState([]);

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
    setPrompt(historicalSchedule.prompt);
    setExistingPlan(historicalSchedule.schedule);
    setShowHistory(false);
  };

  return (
    <div className="ai-page">
      <div className="ai-header">
        <button 
          className="history-button"
          onClick={() => setShowHistory(!showHistory)}
        >
          <History size={24} />
        </button>
      </div>

      <div className="ai-input-section">
        <input
          type="text"
          placeholder="Ask for a study plan..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="ai-input"
          disabled={isLoading}
        />
        <button 
          onClick={handleGeneratePlan}
          className="generate-button"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Plan'}
        </button>
      </div>

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
    </div>
  );
};

export default AIPage;