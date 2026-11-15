-- ====================================================================
-- MIGRATION: 01_create_booking_tables.sql
-- DATE BOOKING SYSTEM & NOTIFICATION OUTBOX FOR HRISHI
-- ====================================================================

-- Enable pgcrypto extension for gen_random_uuid if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL,
    activity TEXT NOT NULL,
    idempotency_key TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    notification_status TEXT NOT NULL DEFAULT 'pending',
    notification_message_id TEXT,
    notification_error TEXT,
    CONSTRAINT valid_notification_status CHECK (notification_status IN ('pending', 'submitted', 'failed', 'delivered'))
);

-- Index for idempotency lookups and date ordering
CREATE INDEX IF NOT EXISTS idx_bookings_idempotency_key ON public.bookings (idempotency_key);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings (created_at DESC);

-- 2. NOTIFICATION OUTBOX TABLE
CREATE TABLE IF NOT EXISTS public.notification_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending',
    attempt_count INTEGER NOT NULL DEFAULT 0,
    provider_response JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT valid_outbox_status CHECK (status IN ('pending', 'submitted', 'failed', 'delivered')),
    CONSTRAINT uq_notification_outbox_booking UNIQUE (booking_id)
);

CREATE INDEX IF NOT EXISTS idx_notification_outbox_status ON public.notification_outbox (status);

-- 3. PERSISTENT RATE LIMITING TABLE
CREATE TABLE IF NOT EXISTS public.rate_limits (
    ip TEXT PRIMARY KEY,
    request_count INTEGER NOT NULL DEFAULT 1,
    window_start TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. ATOMIC RPC FUNCTION: CREATE BOOKING WITH OUTBOX
-- Ensures safe booking creation and notification outbox record in a single transaction
CREATE OR REPLACE FUNCTION public.create_booking_with_outbox(
    p_booking_date DATE,
    p_booking_time TEXT,
    p_activity TEXT,
    p_idempotency_key TEXT
)
RETURNS TABLE (
    booking_id UUID,
    is_duplicate BOOLEAN,
    existing_status TEXT
) AS $$
DECLARE
    v_existing_id UUID;
    v_existing_status TEXT;
    v_new_id UUID;
BEGIN
    -- Check if idempotency key already exists
    SELECT id, notification_status INTO v_existing_id, v_existing_status
    FROM public.bookings
    WHERE idempotency_key = p_idempotency_key;

    IF FOUND THEN
        RETURN QUERY SELECT v_existing_id, TRUE, v_existing_status;
        RETURN;
    END IF;

    -- Create new booking
    INSERT INTO public.bookings (
        booking_date,
        booking_time,
        activity,
        idempotency_key,
        notification_status
    )
    VALUES (
        p_booking_date,
        p_booking_time,
        p_activity,
        p_idempotency_key,
        'pending'
    )
    RETURNING id INTO v_new_id;

    -- Create corresponding outbox entry
    INSERT INTO public.notification_outbox (
        booking_id,
        status,
        attempt_count
    )
    VALUES (
        v_new_id,
        'pending',
        0
    );

    RETURN QUERY SELECT v_new_id, FALSE, 'pending'::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. ROW LEVEL SECURITY (RLS)
-- Lock down all direct public client access. Only service_role can read/write.
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_outbox ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Deny public anon access by default
DROP POLICY IF EXISTS "Deny public anon access to bookings" ON public.bookings;
CREATE POLICY "Deny public anon access to bookings" ON public.bookings
    FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Deny public anon access to outbox" ON public.notification_outbox;
CREATE POLICY "Deny public anon access to outbox" ON public.notification_outbox
    FOR ALL TO anon USING (false);

DROP POLICY IF EXISTS "Deny public anon access to rate_limits" ON public.rate_limits;
CREATE POLICY "Deny public anon access to rate_limits" ON public.rate_limits
    FOR ALL TO anon USING (false);
