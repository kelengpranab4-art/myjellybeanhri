// Vercel Serverless Function: POST /api/book-date
// Production-Ready Date Booking & Multi-Channel Notification Dispatcher (MSG91 SMS + Email)

import { validateBookingRequest } from './lib/validation.js';
import { checkRateLimit } from './lib/rate-limit.js';
import { getSupabaseAdmin, createBookingRecord, updateNotificationRecord } from './lib/supabase.js';
import { sendDateNotificationSMS } from './lib/msg91.js';
import { sendDateNotificationEmail } from './lib/email.js';

export default async function handler(req, res) {
  // 1. CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Idempotency-Key');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. HTTP Method Check
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Use POST.'
    });
  }

  // 3. Client IP extraction & Rate Limiting
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : req.headers['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';

  const supabase = getSupabaseAdmin();
  const rateLimitResult = await checkRateLimit(clientIp, supabase);

  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      success: false,
      error: 'Too many booking attempts. Please wait a few moments before trying again.'
    });
  }

  // 4. Request Validation & Honeypot Check
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        success: false,
        error: 'Invalid JSON payload.'
      });
    }
  }

  const validation = validateBookingRequest(body);
  if (!validation.valid) {
    // If honeypot caught a bot, return 400 safely
    if (validation.isSpam) {
      return res.status(400).json({ success: false, error: 'Request rejected.' });
    }
    return res.status(400).json({
      success: false,
      error: validation.error
    });
  }

  const { date, formattedDate, time, activity, idempotencyKey } = validation.data;

  try {
    // 5. Database Booking Creation (with idempotency check)
    const bookingResult = await createBookingRecord({
      booking_date: date,
      booking_time: time,
      activity: activity,
      idempotency_key: idempotencyKey
    });

    const bookingId = bookingResult.bookingId;
    const shortRef = `DATE-${String(bookingId).substring(0, 8).toUpperCase()}`;

    // 6. Handle Duplicate Idempotent Request
    if (bookingResult.isDuplicate) {
      return res.status(200).json({
        success: true,
        isDuplicate: true,
        booking: {
          id: bookingId,
          reference: shortRef,
          date,
          formattedDate,
          time,
          activity
        },
        notification: {
          status: bookingResult.status || 'submitted',
          sms: bookingResult.status || 'submitted',
          email: 'submitted'
        },
        message: "You've already confirmed this date! Looking forward to it! ♡"
      });
    }

    // 7. Dispatch Multi-Channel Notifications (SMS + Email in parallel)
    const [smsResultSettled, emailResultSettled] = await Promise.allSettled([
      sendDateNotificationSMS({
        formattedDate,
        time,
        activity,
        bookingReference: shortRef
      }),
      sendDateNotificationEmail({
        formattedDate,
        time,
        activity,
        bookingReference: shortRef
      })
    ]);

    const smsResult = smsResultSettled.status === 'fulfilled'
      ? smsResultSettled.value
      : { success: false, status: 'failed', error: smsResultSettled.reason?.message };

    const emailResult = emailResultSettled.status === 'fulfilled'
      ? emailResultSettled.value
      : { success: false, status: 'failed', error: emailResultSettled.reason?.message };

    // 8. Update notification status in database
    await updateNotificationRecord({
      bookingId,
      status: smsResult.status,
      messageId: smsResult.messageId || null,
      errorDetails: smsResult.error || null,
      providerResponse: smsResult.providerResponse,
      emailStatus: emailResult.status,
      emailMessageId: emailResult.messageId || null,
      emailError: emailResult.error || null
    });

    // 9. Safe Client Response
    return res.status(200).json({
      success: true,
      booking: {
        id: bookingId,
        reference: shortRef,
        date,
        formattedDate,
        time,
        activity
      },
      notification: {
        status: smsResult.status,
        sms: smsResult.status,
        email: emailResult.status
      },
      message: "It's official! Your date has been scheduled. ♡"
    });
  } catch (err) {
    console.error('Unhandled booking error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while scheduling your date. Please try again.'
    });
  }
}
