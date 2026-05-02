const NVIDIA_API_KEY = import.meta.env.VITE_NVIDIA_API_KEY;
const API_URL = import.meta.env.DEV ? '/api/nvidia/chat/completions' : 'https://integrate.api.nvidia.com/v1/chat/completions';
const COOLDOWN_MS = 60_000;

let cooldownUntil = 0;

export class RateLimitError extends Error {
  constructor(message, schedule) {
    super(message);
    this.name = 'RateLimitError';
    this.schedule = schedule || getDefaultSchedule().schedule;
  }
}

export const generateStudyPlan = async (prompt) => {
  if (Date.now() < cooldownUntil) {
    throw new RateLimitError('Study plan requests are cooling down. Please wait a moment.');
  }

  try {
    const formattedPrompt = buildPrompt(prompt);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: 'google/gemma-3n-e2b-it',
        messages: [
          {
            role: 'user',
            content: formattedPrompt,
          },
        ],
        max_tokens: 512,
        temperature: 0.20,
        top_p: 0.70,
        frequency_penalty: 0.00,
        presence_penalty: 0.00,
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        cooldownUntil = Date.now() + COOLDOWN_MS;
        throw new RateLimitError('The study planner hit a rate limit. Try again in about a minute.');
      }
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;
    return parseNvidiaResponse(text);
  } catch (error) {
    console.error('Failed to generate study plan:', error);
    if (error instanceof RateLimitError) {
      throw error;
    }
    return getDefaultSchedule();
  }
};

const buildPrompt = (rawPrompt) => {
  const userPrompt = rawPrompt?.trim() || 'a balanced revision day covering two key subjects and project work';

  return [
    'You are an expert academic coach creating a personalised, sustainable study plan.',
    'Design a focused schedule that balances deep work, revision, short breaks, movement, and reflection.',
    'Always tailor the advice to the user request that follows.',
    '',
    `User request: ${userPrompt}`,
    '',
    'Constraints:',
    '- Cover at least 12 hours starting no earlier than 6:00 AM and finishing by 11:00 PM.',
    '- Use 12-hour time format with AM/PM and leading zero where applicable (e.g., 07:30 AM).',
    '- Keep blocks between 30 and 120 minutes and include short breaks as needed.',
    '- Ensure activities are actionable (e.g., “Practice calculus problems” instead of “Math”).',
    '',
    'Output instructions:',
    'Return JSON only, no prose or explanations.',
    'Follow this schema exactly:',
    '{',
    '  "schedule": [',
    '    { "time": "07:00 AM", "activity": "Morning routine and warm-up" }',
    '  ]',
    '}',
    '',
    'Include at least 8 schedule entries.'
  ].join('\n');
};

const parseNvidiaResponse = (response) => {
  try {
    const parsed = parseJsonSchedule(response);
    if (parsed?.schedule?.length) {
      return { schedule: sanitizeSchedule(parsed.schedule) };
    }

    // Fallback to legacy parsing if JSON extraction fails
    const cleanedResponse = response.replace(/^(Study Schedule|Your Study Schedule|Study Plan):/i, '').trim();

    const lines = cleanedResponse.split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .filter(line => !line.match(/^(Study Schedule|Your Study Schedule|Study Plan)/i));

    const schedule = [];

    for (let i = 0; i < lines.length; i += 2) {
      if (isValidTime(lines[i]) && lines[i + 1]) {
        schedule.push({
          time: normaliseTime(lines[i]),
          activity: lines[i + 1].trim()
        });
      }
    }

    return {
      schedule: schedule.length > 0 ? schedule : getDefaultSchedule().schedule
    };
  } catch (error) {
    console.error('Error parsing response:', error);
    return getDefaultSchedule();
  }
};

const parseJsonSchedule = (response) => {
  try {
    // Remove any markdown code blocks
    let cleaned = response.replace(/```json\n?|```\n?/gi, '').trim();
    
    // Extract JSON object - match from first { to last }
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    
    let jsonString = jsonMatch[0].trim();
    
    // Try to fix common issues with incomplete JSON
    if (!jsonString.includes('"schedule"')) {
      return null;
    }
    
    // Parse the JSON
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (error) {
    console.warn('JSON parsing failed:', error, 'Response:', response);
    return null;
  }
};

const sanitizeSchedule = (schedule) => (
  schedule
    .filter(item => item?.time && item?.activity)
    .map(item => ({
      time: normaliseTime(item.time),
      activity: String(item.activity).trim()
    }))
    .filter(item => isValidTime(item.time) && item.activity.length > 0)
);

const normaliseTime = (time) => {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return time.trim();

  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toUpperCase();

  hours = hours % 12; // convert 12 -> 0 for formatting
  const formattedHours = hours === 0 ? 12 : hours;
  return `${formattedHours.toString().padStart(2, '0')}:${minutes} ${period}`;
};

const isValidTime = (value) => /(0?[1-9]|1[0-2]):[0-5][0-9]\s*(AM|PM)/i.test(value?.trim?.() || '');

const getDefaultSchedule = () => ({
  schedule: [
    { time: '07:00 AM', activity: 'Wake up & Morning Routine' },
    { time: '08:00 AM', activity: 'Study Subject 1 (Deep Work)' },
    { time: '10:00 AM', activity: 'Short Break' },
    { time: '10:30 AM', activity: 'Study Subject 2' },
    { time: '12:30 PM', activity: 'Lunch Break' },
    { time: '02:00 PM', activity: 'Light Reading/Revision' },
    { time: '04:00 PM', activity: 'Practice Problems' },
    { time: '06:00 PM', activity: 'Tea/Small Break' },
    { time: '07:00 PM', activity: 'Recap Important Topics' },
    { time: '08:00 PM', activity: 'Dinner & Relaxation' },
    { time: '09:30 PM', activity: 'Quick Review + Plan for Next Day' }
  ]
});