import React, { useState } from 'react';
import { useAI } from '../../context/AIContext';
import { Calendar } from 'lucide-react';
import './AIPage.css';

const AIPage = () => {
  const { generateStudyPlan, studyPlan, isLoading, error } = useAI();
  const [prompt, setPrompt] = useState('');

  const handleGeneratePlan = () => {
    generateStudyPlan(prompt || 'Give me a study plan for tomorrow');
  };

  return (
    <div className="ai-page">
      <div className="ai-input-section">
        <input
          type="text"
          placeholder="Ask for a study plan (e.g., 'Give me a study plan for tomorrow')"
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
          <h2>Your Study Schedule</h2>
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
    </div>
  );
};

export default AIPage;