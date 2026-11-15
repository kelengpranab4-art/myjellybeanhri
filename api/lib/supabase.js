// Supabase Server-Side Database Service
// Strict security: Uses SUPABASE_SERVICE_ROLE_KEY exclusively on server

import { createClient } from '@supabase/supabase-js';

let supabaseInstance = null;

export function getSupabaseAdmin() {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  supabaseInstance = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  return supabaseInstance;
}

/**
 * Executes atomic booking and outbox creation.
 * If Supabase is not configured, provides a mock response during development/testing.
 */
export async function createBookingRecord({ booking_date, booking_time, activity, idempotency_key }) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    // Development fallback mock
    console.warn('⚠️ Supabase credentials not detected. Simulating booking creation.');
    const mockId = `mock-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    return {
      bookingId: mockId,
      isDuplicate: false,
      status: 'pending',
      isMock: true
    };
  }

  // First try atomic RPC
  try {
    const { data, error } = await supabase.rpc('create_booking_with_outbox', {
      p_booking_date: booking_date,
      p_booking_time: booking_time,
      p_activity: activity,
      p_idempotency_key: idempotency_key
    });

    if (error) {
      // If RPC is missing, fallback to direct table insert
      console.warn('RPC create_booking_with_outbox failed, attempting direct table insert:', error.message);
      return await directBookingInsert(supabase, { booking_date, booking_time, activity, idempotency_key });
    }

    const row = Array.isArray(data) ? data[0] : data;
    return {
      bookingId: row?.booking_id,
      isDuplicate: !!row?.is_duplicate,
      status: row?.existing_status || 'pending',
      isMock: false
    };
  } catch (rpcErr) {
    console.warn('RPC error, using direct table insert:', rpcErr.message);
    return await directBookingInsert(supabase, { booking_date, booking_time, activity, idempotency_key });
  }
}

/**
 * Direct table insert fallback if RPC is not installed yet
 */
async function directBookingInsert(supabase, { booking_date, booking_time, activity, idempotency_key }) {
  // Check for existing booking with same idempotency key
  const { data: existing } = await supabase
    .from('bookings')
    .select('id, notification_status')
    .eq('idempotency_key', idempotency_key)
    .single();

  if (existing) {
    return {
      bookingId: existing.id,
      isDuplicate: true,
      status: existing.notification_status,
      isMock: false
    };
  }

  // Insert booking
  const { data: newBooking, error: bookingErr } = await supabase
    .from('bookings')
    .insert({
      booking_date,
      booking_time,
      activity,
      idempotency_key,
      notification_status: 'pending'
    })
    .select('id')
    .single();

  if (bookingErr) {
    throw new Error(`Database insert failed: ${bookingErr.message}`);
  }

  // Insert outbox
  await supabase
    .from('notification_outbox')
    .insert({
      booking_id: newBooking.id,
      status: 'pending',
      attempt_count: 0
    });

  return {
    bookingId: newBooking.id,
    isDuplicate: false,
    status: 'pending',
    isMock: false
  };
}

/**
 * Updates booking and outbox notification status (SMS and Email)
 */
export async function updateNotificationRecord({
  bookingId,
  status,
  messageId = null,
  errorDetails = null,
  providerResponse = null,
  emailStatus = null,
  emailMessageId = null,
  emailError = null
}) {
  const supabase = getSupabaseAdmin();
  if (!supabase || !bookingId || String(bookingId).startsWith('mock-')) {
    return;
  }

  try {
    // Build update payload for bookings table
    const updatePayload = {
      notification_status: status,
      notification_message_id: messageId,
      notification_error: errorDetails ? JSON.stringify(errorDetails) : null
    };

    if (emailStatus) {
      updatePayload.email_status = emailStatus;
    }
    if (emailMessageId) {
      updatePayload.email_message_id = emailMessageId;
    }
    if (emailError) {
      updatePayload.email_error = JSON.stringify(emailError);
    }

    // Update bookings table
    await supabase
      .from('bookings')
      .update(updatePayload)
      .eq('id', bookingId);

    // Update notification_outbox table
    const { data: existingOutbox } = await supabase
      .from('notification_outbox')
      .select('attempt_count')
      .eq('booking_id', bookingId)
      .single();

    const currentAttempts = existingOutbox?.attempt_count || 0;

    await supabase
      .from('notification_outbox')
      .update({
        status,
        attempt_count: currentAttempts + 1,
        provider_response: {
          sms: providerResponse,
          email: { status: emailStatus, messageId: emailMessageId, error: emailError }
        },
        updated_at: new Date().toISOString()
      })
      .eq('booking_id', bookingId);
  } catch (err) {
    console.error('Failed to update notification records in database:', err.message);
  }
}
