const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const generateStudyPlan = async (prompt) => {
  try {
    const formattedPrompt = `Create a structured study schedule for ${prompt}. Format the response as time slots and activities only, starting from 7:00 AM until 9:30 PM. Example format:
7:00 AM
Morning Routine
8:00 AM
Study Topic 1`;

    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: formattedPrompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    return parseGeminiResponse(text);
  } catch (error) {
    console.error('Failed to generate study plan:', error);
    return getDefaultSchedule();
  }
};

const parseGeminiResponse = (response) => {
  try {
    // Remove any headers or extra text
    const cleanedResponse = response.replace(/^(Study Schedule|Your Study Schedule|Study Plan):/i, '').trim();
    
    // Split into lines and filter empty lines
    const lines = cleanedResponse.split('\n')
      .filter(line => line.trim())
      .filter(line => !line.match(/^(Study Schedule|Your Study Schedule|Study Plan)/i));
    
    const schedule = [];
    
    for (let i = 0; i < lines.length; i += 2) {
      if (lines[i] && lines[i + 1]) {
        // Validate time format
        if (lines[i].match(/^\d{1,2}:\d{2}\s*(AM|PM)/i)) {
          schedule.push({
            time: lines[i].trim(),
            activity: lines[i + 1].trim()
          });
        }
      }
    }

    // Return formatted schedule
    return {
      schedule: schedule.length > 0 ? schedule : getDefaultSchedule().schedule
    };
  } catch (error) {
    console.error('Error parsing response:', error);
    return getDefaultSchedule();
  }
};

const getDefaultSchedule = () => ({
  schedule: [
    { time: '7:00 AM', activity: 'Wake up & Morning Routine' },
    { time: '8:00 AM', activity: 'Study Subject 1 (Deep Work)' },
    { time: '10:00 AM', activity: 'Short Break' },
    { time: '10:30 AM', activity: 'Study Subject 2' },
    { time: '12:30 PM', activity: 'Lunch Break' },
    { time: '2:00 PM', activity: 'Light Reading/Revision' },
    { time: '4:00 PM', activity: 'Practice Problems' },
    { time: '6:00 PM', activity: 'Tea/Small Break' },
    { time: '7:00 PM', activity: 'Recap Important Topics' },
    { time: '8:00 PM', activity: 'Dinner & Relaxation' },
    { time: '9:30 PM', activity: 'Quick Review + Plan for Next Day' }
  ]
});