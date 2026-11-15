// Server-side Request Validation & Timezone Utilities
// Strict security: Never trust client input

const ALLOWED_ACTIVITIES = [
  'Coffee and Conversations',
  'Sunset Walk',
  'Movie Date',
  'Pizza and Random Talks',
  'Surprise Me'
];

const ALLOWED_TIMES = {
  '11:00': '11:00 AM',
  '14:00': '2:00 PM',
  '17:00': '5:00 PM',
  '19:00': '7:00 PM',
  '11:00 AM': '11:00 AM',
  '2:00 PM': '2:00 PM',
  '5:00 PM': '5:00 PM',
  '7:00 PM': '7:00 PM'
};

const DEFAULT_TIMEZONE = 'Asia/Kolkata';
const DEFAULT_MIN_DATE = '2026-11-21';

/**
 * Gets current date string (YYYY-MM-DD) in Asia/Kolkata
 */
export function getNowInKolkata(timezone = DEFAULT_TIMEZONE) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(new Date()); // Outputs YYYY-MM-DD
}

/**
 * Format YYYY-MM-DD into human readable date: e.g. "23 November 2026"
 */
export function formatDisplayDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const dateObj = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObj);
}

/**
 * Validates request payload against security and business rules
 */
export function validateBookingRequest(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request format: Body must be a JSON object.' };
  }

  const { date, time, activity, idempotencyKey, honeypot } = body;

  // 1. Honeypot check (anti-bot trap)
  if (honeypot && String(honeypot).trim() !== '') {
    return { valid: false, error: 'Spam detected.', isSpam: true };
  }

  // 2. Idempotency Key validation
  if (!idempotencyKey || typeof idempotencyKey !== 'string') {
    return { valid: false, error: 'Missing or invalid idempotencyKey.' };
  }
  const cleanKey = idempotencyKey.trim();
  if (cleanKey.length < 8 || cleanKey.length > 128 || !/^[\w-]+$/.test(cleanKey)) {
    return { valid: false, error: 'idempotencyKey must be 8-128 alphanumeric characters or hyphens.' };
  }

  // 3. Date format validation (YYYY-MM-DD)
  if (!date || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { valid: false, error: 'Date must be in YYYY-MM-DD format.' };
  }

  const [year, month, day] = date.split('-').map(Number);
  const parsedDate = new Date(Date.UTC(year, month - 1, day));
  if (
    parsedDate.getUTCFullYear() !== year ||
    parsedDate.getUTCMonth() !== month - 1 ||
    parsedDate.getUTCDate() !== day
  ) {
    return { valid: false, error: 'Invalid calendar date.' };
  }

  // 4. Date range checks (Asia/Kolkata timezone)
  const minDateStr = process.env.DATE_MINIMUM || DEFAULT_MIN_DATE;
  const todayInKolkata = getNowInKolkata(process.env.APP_TIMEZONE || DEFAULT_TIMEZONE);

  if (date < minDateStr) {
    return { valid: false, error: `Date cannot be earlier than ${formatDisplayDate(minDateStr)}.` };
  }

  if (date < todayInKolkata) {
    return { valid: false, error: 'Date cannot be in the past.' };
  }

  // 5. Time validation
  if (!time || typeof time !== 'string' || !ALLOWED_TIMES[time.trim()]) {
    return {
      valid: false,
      error: 'Invalid time selected. Must be one of: 11:00 AM, 2:00 PM, 5:00 PM, or 7:00 PM.'
    };
  }
  const normalizedTime = ALLOWED_TIMES[time.trim()];

  // 6. Activity validation
  if (!activity || typeof activity !== 'string' || !ALLOWED_ACTIVITIES.includes(activity.trim())) {
    return {
      valid: false,
      error: `Invalid activity selected. Allowed: ${ALLOWED_ACTIVITIES.join(', ')}`
    };
  }
  const normalizedActivity = activity.trim();

  return {
    valid: true,
    data: {
      date,
      formattedDate: formatDisplayDate(date),
      time: normalizedTime,
      activity: normalizedActivity,
      idempotencyKey: cleanKey
    }
  };
}
