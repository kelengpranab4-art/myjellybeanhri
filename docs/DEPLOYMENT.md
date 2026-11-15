# Deployment & Infrastructure Guide

This guide details the step-by-step process for provisioning the **Supabase Database**, deploying the full application to **Vercel**, and configuring production environment variables.

---

## 1. Supabase PostgreSQL Database Setup

1. Create a free project at [supabase.com](https://supabase.com/).
2. Select your closest region (e.g., `South Asia (Mumbai)` for optimal latency to Indian users).
3. Once the database is ready:
   - Navigate to the **SQL Editor** in the left sidebar.
   - Click **New Query**.
   - Open and copy the contents of [supabase/migrations/01_create_booking_tables.sql](file:///Users/pranabkeleng/Documents/Hrishi/supabase/migrations/01_create_booking_tables.sql).
   - Paste into the SQL editor and click **Run**.
4. Verify the created tables:
   - Go to **Table Editor** to confirm `bookings`, `notification_outbox`, and `rate_limits` are created.
5. Retrieve your API credentials:
   - Navigate to **Project Settings** > **API**.
   - Copy **Project URL** (`https://xyz.supabase.co`).
   - Copy **service_role secret key** (Reveal and copy secret — **never share or use in frontend**).

---

## 2. Vercel Deployment Setup

The project uses React + Vite for the frontend and Vercel Serverless Functions in `/api/book-date.js` for the backend.

### Option A: Deploy via Vercel GitHub Integration (Recommended)
1. Push your repository to GitHub.
2. Log into [vercel.com](https://vercel.com/) and click **Add New** > **Project**.
3. Import your GitHub repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Build and Output Settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Expand **Environment Variables** and add all variables listed below.
7. Click **Deploy**.

### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

---

## 3. Required Environment Variables in Vercel

Under **Project Settings** > **Environment Variables** in Vercel, configure:

| Variable Name | Description | Example / Note |
|---|---|---|
| `MSG91_AUTH_KEY` | Your MSG91 Authkey | `442838Ay...` |
| `MSG91_TEMPLATE_ID` | Approved Flow / Template ID | `67375a22d6fc...` |
| `MSG91_SENDER_ID` | Approved 6-char Sender ID | `HRISHI` or `DTPASS` |
| `MSG91_RECIPIENT_NUMBER` | Your Indian phone number | `91XXXXXXXXXX` (with 91 prefix) |
| `MSG91_MOCK` | Set `false` for live SMS, `true` for test | `false` |
| `SUPABASE_URL` | Your Supabase Project URL | `https://xxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key with write permissions | `eyJh...` |
| `APP_TIMEZONE` | Timezone for business logic | `Asia/Kolkata` |
| `DATE_MINIMUM` | Earliest booking date allowed | `2026-11-21` |

### Email Notification Configuration (Deliver alerts to your inbox)

| Variable Name | Description | Example / Note |
|---|---|---|
| `NOTIFICATION_EMAIL` | Your personal email address for date alerts | `your_email@gmail.com` |
| `RESEND_API_KEY` | (Option A) Resend API Key from resend.com | `re_123456789...` |
| `NOTIFICATION_EMAIL_FROM` | Sender address | `"A Little Something For You <onboarding@resend.dev>"` |
| `SMTP_HOST` | (Option B) SMTP Host (e.g. `smtp.gmail.com`) | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP Port | `465` |
| `SMTP_USER` | SMTP Username / Gmail address | `your_email@gmail.com` |
| `SMTP_PASS` | SMTP Password / Gmail 16-digit App Password | `xxxx xxxx xxxx xxxx` |
| `EMAIL_MOCK` | Set `false` for live emails, `true` for test | `false` |

> ⚠️ **CRITICAL SECURITY NOTE**:  
> None of these variables should be prefixed with `VITE_`. Vercel automatically exposes variables prefixed with `VITE_` to the public client browser bundle. All date confirmation, SMS, and email notification logic runs exclusively on the server in `api/book-date.js`.

---

## 4. End-to-End Verification Checklist

1. **Access Site**: Open your live Vercel URL.
2. **Interact with Bouquet**: Tap all 5 flowers to discover each message.
3. **Scroll to Climax**: Navigate to *"Would you go on a date with me? ♡"*.
4. **Click "YES! ♡"**: The date booking interface opens with the twilight calendar.
5. **Select Date & Time**:
   - Dates before November 21, 2026 are disabled.
   - Choose e.g. November 23, 2026, 5:00 PM, and activity *"Coffee and Conversations"*.
6. **Submit**: Click *"CONFIRM OUR DATE ♡"*.
7. **Verify**:
   - Celebration screen displays with confetti and petal bursts.
   - Check your Supabase `bookings` table: a new row with the booking record appears.
   - Check your Supabase `notification_outbox` table: the notification attempt is logged.
   - Check your personal phone: a confirmation SMS appears with date, time, activity, and reference ID!
