import React, { useState } from 'react';
import { useAI } from '../../context/AIContext';
import { Sparkles } from 'lucide-react';
import './AIPage.css';

const AIPage = () => {
  const { generateStudyPlan, studyPlan, isLoading, error } = useAI();
  const [prompt, setPrompt] = useState('');

  const handleGeneratePlan = async () => {
    await generateStudyPlan(prompt || 'Give me a study plan for today');
  };

  return (
    <div className="ai-page">
      {/* Input Section */}
      <div className="ai-input-container">
        <div className="ai-input-wrapper">
          <input
            type="text"
            placeholder="What would you like to study today?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleGeneratePlan()}
            className="ai-input"
            disabled={isLoading}
          />
          <button
            onClick={handleGeneratePlan}
            className="ai-generate-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="ai-spinner"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="ai-error">
          <p>{error}</p>
        </div>
      )}

      {/* Study Plan Results */}
      {studyPlan && !error && !isLoading && (
        <div className="ai-results">
          <h2>Your Study Plan</h2>
          <div className="ai-plan-list">
            {studyPlan.schedule.map((item, index) => (
              <div key={index} className="ai-plan-item">
                <div className="ai-plan-time">{item.time}</div>
                <div className="ai-plan-activity">{item.activity}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="ai-loading">
          <div className="ai-spinner-large"></div>
          <p>Creating your study plan...</p>
        </div>
      )}
    </div>
  );
};

export default AIPage;
