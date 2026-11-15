import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Heart,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Send
} from 'lucide-react';
import { CalendarPicker, getKolkataToday } from './CalendarPicker';
import { LilyFlower } from '../bouquet/LilyFlower';
import { RoseFlower } from '../bouquet/RoseFlower';
import { Sunflower } from '../bouquet/Sunflower';
import { fireRomanticConfetti, fireFlowerPetalShower } from '../../utils/confetti';
import { soundManager } from '../../utils/audio';

const TIME_OPTIONS = ['11:00 AM', '2:00 PM', '5:00 PM', '7:00 PM'];

const ACTIVITY_OPTIONS = [
  { id: 'Coffee and Conversations', label: 'Coffee and Conversations', icon: '☕' },
  { id: 'Sunset Walk', label: 'Sunset Walk', icon: '🌅' },
  { id: 'Movie Date', label: 'Movie Date', icon: '🎬' },
  { id: 'Pizza and Random Talks', label: 'Pizza and Random Talks', icon: '🍕' },
  { id: 'Surprise Me', label: 'Surprise Me', icon: '✨' }
];

// Helper to generate UUID client-side for idempotency
function generateIdempotencyKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `key-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

// Format YYYY-MM-DD to human friendly string
function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(d);
}

export const DateBookingInterface = ({ initialActivity = 'Sunset Walk', onReset }) => {
  // Booking Form State
  const [selectedDate, setSelectedDate] = useState('2026-11-21');
  const [selectedTime, setSelectedTime] = useState('5:00 PM');
  const [selectedActivity, setSelectedActivity] = useState(initialActivity || 'Coffee and Conversations');
  const [honeypot, setHoneypot] = useState('');
  const [idempotencyKey] = useState(() => generateIdempotencyKey());

  // Request & Response State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  // Sync initialActivity if passed
  useEffect(() => {
    if (initialActivity) {
      const match = ACTIVITY_OPTIONS.find((a) => a.id === initialActivity || a.id.startsWith(initialActivity));
      if (match) setSelectedActivity(match.id);
    }
  }, [initialActivity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate minimum date on client
    const today = getKolkataToday();
    if (!selectedDate) {
      setErrorMessage('Please pick a date from the calendar.');
      return;
    }
    if (selectedDate < '2026-11-21') {
      setErrorMessage('Dates before November 21, 2026 are not available.');
      return;
    }
    if (selectedDate < today) {
      setErrorMessage('Dates in the past cannot be booked.');
      return;
    }

    setIsLoading(true);
    soundManager.playSparkle();

    try {
      const response = await fetch('/api/book-date', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': idempotencyKey
        },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          activity: selectedActivity,
          idempotencyKey: idempotencyKey,
          honeypot: honeypot
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to schedule our date right now. Please try again.');
      }

      // Success!
      setBookingSuccessData(result);
      soundManager.playSparkle();
      fireRomanticConfetti();
      fireFlowerPetalShower();
    } catch (err) {
      console.error('Booking submission error:', err);
      setErrorMessage(err.message || 'Something went wrong while confirming. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // SUCCESS PAGE VIEW
  if (bookingSuccessData) {
    const { booking, notification } = bookingSuccessData;
    const smsDispatched = notification?.status === 'submitted';

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative z-20 w-full max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl glass-panel-glow border-2 border-dustypink-400 shadow-[0_0_60px_rgba(244,114,182,0.35)] text-center my-8"
      >
        {/* Animated Celebration Flowers */}
        <div className="relative w-44 h-44 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-dustypink-400/20 rounded-full blur-2xl animate-pulse" />
          <div className="absolute -top-2 left-2 w-28 h-28 transform -rotate-12 animate-float-slow">
            <Sunflower />
          </div>
          <div className="absolute -top-2 right-2 w-28 h-28 transform rotate-12 animate-float-medium">
            <RoseFlower />
          </div>
          <div className="relative z-10 w-32 h-32 scale-110">
            <LilyFlower />
          </div>
        </div>

        {/* Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight"
        >
          YAY! IT'S A DATE! ♡
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-handwriting text-3xl sm:text-4xl text-dustypink-300 font-bold mb-6"
        >
          "YOU JUST MADE MY DAY!"
        </motion.p>

        {/* Confirmed Details Ticket Card */}
        <div className="parchment-card rounded-2xl p-6 sm:p-7 text-left border border-amber-900/20 shadow-xl relative my-6">
          <div className="flex items-center justify-between border-b border-amber-900/15 pb-2 mb-4">
            <span className="font-mono text-xs font-bold text-amber-900 uppercase tracking-wider">
              OFFICIAL DATE RESERVATION
            </span>
            <span className="font-mono text-xs font-bold text-rose-800">
              {booking?.reference || 'DATE-CONFIRMED'}
            </span>
          </div>

          <div className="space-y-3 font-serif">
            <div className="flex items-start gap-3">
              <CalendarIcon className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide block">Selected Date</span>
                <span className="text-stone-900 font-bold text-base sm:text-lg">
                  {booking?.formattedDate || formatDisplayDate(selectedDate)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide block">Selected Time</span>
                <span className="text-stone-900 font-bold text-base sm:text-lg">
                  {booking?.time || selectedTime} (IST)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-rose-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-stone-500 uppercase tracking-wide block">Chosen Adventure</span>
                <span className="text-stone-900 font-bold text-base sm:text-lg">
                  {booking?.activity || selectedActivity}
                </span>
              </div>
            </div>
          </div>

          {/* Multi-Channel Notification Indicators (SMS & Email) */}
          <div className="mt-5 pt-3 border-t border-amber-900/15 space-y-2 text-xs">
            {/* SMS Row */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-600 italic">
                <Send className="w-3.5 h-3.5 text-rose-600" />
                SMS Alert to phone:
              </span>
              {smsDispatched ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-medium text-[11px]">
                  <CheckCircle2 className="w-3 h-3" />
                  Dispatched via MSG91
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium text-[11px]">
                  <AlertCircle className="w-3 h-3" />
                  SMS pending setup
                </span>
              )}
            </div>

            {/* Email Row */}
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-600 italic">
                <Heart className="w-3.5 h-3.5 text-purple-600 fill-purple-200" />
                Email Alert to inbox:
              </span>
              {notification?.email === 'submitted' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 font-medium text-[11px]">
                  <CheckCircle2 className="w-3 h-3" />
                  Sent to Email 💌
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-700 font-medium text-[11px]">
                  <AlertCircle className="w-3 h-3" />
                  Email optional / pending setup
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Change / Revisit Action */}
        <button
          onClick={() => {
            setBookingSuccessData(null);
            if (onReset) onReset();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Need to modify details?</span>
        </button>
      </motion.div>
    );
  }

  // BOOKING FORM VIEW
  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-6 sm:p-10 rounded-3xl border border-dustypink-400/30 shadow-2xl relative overflow-hidden"
      >
        {/* Soft Ambient Accents */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-dustypink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-lavender-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-twilight-900/80 border border-dustypink-400/25 text-dustypink-300 text-xs font-medium tracking-wide mb-3 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-dustypink-400" />
            <span>Invitation Booking</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
            So... shall we make this happen? <span className="text-rose-400 font-sans not-italic text-3xl sm:text-4xl inline-block drop-shadow-[0_0_12px_rgba(244,114,182,0.9)]">♡</span>
          </h3>

          <p className="font-light text-stone-300 text-sm sm:text-base max-w-lg mx-auto">
            "I'd really love to spend some time with you."
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Honeypot Spam Trap (Hidden from genuine visitors) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_hp">Leave this empty</label>
            <input
              type="text"
              id="website_hp"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* 1. Date Selection (Custom Calendar Picker) */}
          <div>
            <label className="block text-xs font-mono font-bold tracking-wider uppercase text-dustypink-300 mb-3 text-center sm:text-left">
              1. Choose a Date (Available from Nov 21, 2026 onwards)
            </label>
            <CalendarPicker
              selectedDate={selectedDate}
              onSelectDate={(newDate) => {
                setSelectedDate(newDate);
                setErrorMessage(null);
              }}
              minDate="2026-11-21"
            />
          </div>

          {/* 2. Time Selection (4 Allowed Times) */}
          <div>
            <label className="block text-xs font-mono font-bold tracking-wider uppercase text-dustypink-300 mb-3 text-center sm:text-left">
              2. Select a Time (IST)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TIME_OPTIONS.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-dustypink-500 to-rose-500 text-white border-dustypink-300 shadow-md scale-102 font-bold'
                        : 'glass-panel border-white/10 text-stone-300 hover:border-dustypink-400/40 hover:text-white'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Activity Selection */}
          <div>
            <label className="block text-xs font-mono font-bold tracking-wider uppercase text-dustypink-300 mb-3 text-center sm:text-left">
              3. Select Our Adventure
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ACTIVITY_OPTIONS.map((activity) => {
                const isSelected = selectedActivity === activity.id;
                return (
                  <button
                    key={activity.id}
                    type="button"
                    onClick={() => setSelectedActivity(activity.id)}
                    className={`p-3.5 rounded-xl text-left transition-all duration-200 border flex items-center gap-3 ${
                      isSelected
                        ? 'glass-panel-glow border-dustypink-400 text-white ring-1 ring-dustypink-400 shadow-md font-semibold'
                        : 'glass-panel border-white/10 text-stone-300 hover:border-dustypink-400/40 hover:text-white'
                    }`}
                  >
                    <span className="text-xl p-1.5 rounded-lg bg-white/5 border border-white/10">
                      {activity.icon}
                    </span>
                    <span className="text-xs sm:text-sm">{activity.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Confirmation Summary Box */}
          <div className="parchment-card rounded-2xl p-5 border border-amber-900/20 shadow-md">
            <div className="flex items-center justify-between border-b border-amber-900/15 pb-2 mb-3">
              <span className="font-mono text-[11px] font-bold text-amber-900 uppercase">
                CONFIRMATION SUMMARY
              </span>
              <span className="text-xs font-serif italic text-stone-500">Ready to lock in</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-stone-900 font-serif">
              <div>
                <span className="text-[11px] text-stone-500 block">Date</span>
                <strong className="text-sm">{formatDisplayDate(selectedDate)}</strong>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block">Time</span>
                <strong className="text-sm">{selectedTime}</strong>
              </div>
              <div>
                <span className="text-[11px] text-stone-500 block">Activity</span>
                <strong className="text-sm">{selectedActivity}</strong>
              </div>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading || !selectedDate}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-dustypink-500 via-rose-500 to-peach-500 text-white font-serif font-bold text-base sm:text-lg shadow-[0_0_35px_rgba(244,114,182,0.6)] hover:shadow-[0_0_50px_rgba(244,114,182,0.85)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Locking in our date...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
                  <span>CONFIRM OUR DATE ♡</span>
                </>
              )}
            </button>

            {/* Privacy notice */}
            <p className="text-[11px] text-stone-400 font-serif italic text-center flex items-center justify-center gap-1.5 mt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-dustypink-400 inline" />
              <span>
                Booking details are saved securely and send an instant SMS confirmation to my personal phone.
              </span>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
