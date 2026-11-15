-- ====================================================================
-- MIGRATION: 02_add_email_notifications.sql
-- ADD EMAIL NOTIFICATION TRACKING COLUMNS
-- ====================================================================

ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS email_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS email_message_id TEXT,
ADD COLUMN IF NOT EXISTS email_error TEXT;

CREATE INDEX IF NOT EXISTS idx_bookings_email_status ON public.bookings (email_status);
