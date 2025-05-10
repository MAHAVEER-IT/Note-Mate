import React, { createContext, useContext, useState } from 'react';
import { generateStudyPlan } from '../services/geminiService';
import { updateSchedule as updateScheduleService } from '../services/aiScheduleService';

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

  const updateSchedule = async (id, scheduleData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedSchedule = await updateScheduleService(id, scheduleData);
      setStudyPlan({ schedule: updatedSchedule.schedule });
      return updatedSchedule;
    } catch (err) {
      setError(err.message);
      console.error('Failed to update schedule:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIContext.Provider value={{ 
      studyPlan, 
      isLoading, 
      error,
      generateStudyPlan: generatePlan,
      setExistingPlan,
      updateSchedule
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);