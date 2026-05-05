import { apiClient } from './apiClient';

const COOLDOWN_MS = 30_000;
let cooldownUntil = 0;

// ─── Helpers ────────────────────────────────────────────────────────────────

const isValidTime = (value) =>
  /(0?[1-9]|1[0-2]):[0-5][0-9]\s*(AM|PM)/i.test(value?.trim?.() ?? '');

const normaliseTime = (time) => {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return time.trim();

  const hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toUpperCase();

  return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
};

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
    { time: '09:30 PM', activity: 'Quick Review + Plan for Next Day' },
  ],
});

// ─── Prompt builder ──────────────────────────────────────────────────────────

const buildPrompt = (userPrompt) => {
  return [
    `Generate a study schedule for: ${userPrompt}`,
    '',
    'Requirements:',
    '- Cover at least 12 hours starting no earlier than 6:00 AM and finishing by 11:00 PM.',
    '- Use 12-hour time format with AM/PM and a leading zero where applicable (e.g., 07:30 AM).',
    '- Keep blocks between 30 and 120 minutes and include short breaks as needed.',
    '- Ensure activities are actionable (e.g., "Practice calculus problems" instead of "Math").',
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
    'Include at least 8 schedule entries.',
  ].join('\n');
};

// ─── Parsers ─────────────────────────────────────────────────────────────────

const sanitizeSchedule = (schedule) =>
  schedule
    .filter((item) => item?.time && item?.activity)
    .map((item) => ({
      time: normaliseTime(item.time),
      activity: String(item.activity).trim(),
    }))
    .filter((item) => isValidTime(item.time) && item.activity.length > 0);

const parseJsonSchedule = (response) => {
  try {
    if (response && typeof response === 'object') {
      return response;
    }

    const cleaned = response.replace(/```json\n?|```\n?/gi, '').trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const jsonString = jsonMatch[0].trim();
    if (!jsonString.includes('"schedule"')) return null;

    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('JSON parsing failed:', error, 'Response:', response);
    return null;
  }
};

const parseScheduleResponse = (response) => {
  try {
    if (response && typeof response === 'object') {
      const schedule = sanitizeSchedule(response.schedule ?? []);
      return { schedule: schedule.length ? schedule : getDefaultSchedule().schedule };
    }

    const parsed = parseJsonSchedule(response);
    if (parsed?.schedule?.length) {
      return { schedule: sanitizeSchedule(parsed.schedule) };
    }

    // Fallback: legacy line-pair parsing
    const cleanedResponse = response
      .replace(/^(Study Schedule|Your Study Schedule|Study Plan):/i, '')
      .trim();

    const lines = cleanedResponse
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => !line.match(/^(Study Schedule|Your Study Schedule|Study Plan)/i));

    const schedule = [];
    for (let i = 0; i < lines.length; i += 2) {
      if (isValidTime(lines[i]) && lines[i + 1]) {
        schedule.push({
          time: normaliseTime(lines[i]),
          activity: lines[i + 1].trim(),
        });
      }
    }

    return {
      schedule: schedule.length > 0 ? schedule : getDefaultSchedule().schedule,
    };
  } catch (error) {
    console.error('Error parsing response:', error);
    return getDefaultSchedule();
  }
};

// ─── Public API ───────────────────────────────────────────────────────────────

export class RateLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RateLimitError';
    this.schedule = getDefaultSchedule().schedule;
  }
}

export const generateStudyPlan = async (prompt) => {
  if (Date.now() < cooldownUntil) {
    throw new RateLimitError('Study plan requests are cooling down. Please wait a moment.');
  }

  try {
    const response = await apiClient.post('/ai/chat/completions', {
      prompt: buildPrompt(
        prompt ?? 'a balanced revision day covering two key subjects and project work'
      ),
    });

    return parseScheduleResponse(response.data);
  } catch (error) {
    console.error('Failed to generate study plan:', error);

    if (error.response?.status === 429) {
      cooldownUntil = Date.now() + COOLDOWN_MS;
      throw new RateLimitError(
        error.response?.data?.message ??
          'The study planner is processing requests. Please wait a moment and try again.'
      );
    }

    if (error instanceof RateLimitError) throw error;

    throw new Error(error.response?.data?.message ?? 'Failed to generate study plan');
  }
};