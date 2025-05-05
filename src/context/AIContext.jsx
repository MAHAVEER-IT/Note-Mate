import React, { createContext, useContext, useState } from 'react';
import { generateStudyPlan } from '../services/geminiService';

const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [studyPlan, setStudyPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePlan = async (prompt) => {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await generateStudyPlan(prompt);
      setStudyPlan(plan);
    } catch (err) {
      setError(err.message);
      console.error('Failed to generate study plan:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const setExistingPlan = (schedule) => {
    setStudyPlan({ schedule });
    setError(null);
    setIsLoading(false);
  };

  return (
    <AIContext.Provider value={{ 
      studyPlan, 
      isLoading, 
      error,
      generateStudyPlan: generatePlan,
      setExistingPlan 
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);