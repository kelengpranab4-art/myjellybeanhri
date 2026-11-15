import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Calculate Asia/Kolkata current date
export function getKolkataToday() {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    return formatter.format(new Date()); // YYYY-MM-DD
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

export const CalendarPicker = ({
  selectedDate,
  onSelectDate,
  minDate = '2026-11-21'
}) => {
  // Start view on November 2026 (or the selected date's month)
  const initialYear = selectedDate ? parseInt(selectedDate.split('-')[0], 10) : 2026;
  const initialMonth = selectedDate ? parseInt(selectedDate.split('-')[1], 10) - 1 : 10; // 10 is November (0-indexed)

  const [currentYear, setCurrentYear] = useState(initialYear);
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const todayKolkata = getKolkataToday();

  // Navigation handlers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Generate days in month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Check if a date string is disabled
  const isDateDisabled = (dateStr) => {
    if (dateStr < minDate) return true;
    if (dateStr < todayKolkata) return true;
    return false;
  };

  return (
    <div className="w-full max-w-sm mx-auto glass-panel p-4 sm:p-5 rounded-2xl border border-dustypink-400/25 shadow-xl select-none">
      {/* Month & Year Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 font-serif font-bold text-base sm:text-lg text-white">
          <CalendarIcon className="w-4 h-4 text-dustypink-400 inline" />
          <span>{MONTH_NAMES[currentMonth]} {currentYear}</span>
        </div>

        <button
          type="button"
          onClick={handleNextMonth}
          className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="text-[11px] font-mono font-medium text-stone-400 uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Leading empty spaces */}
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} className="h-9 w-9" />
        ))}

        {/* Days of current month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const dayNum = i + 1;
          const monthStr = String(currentMonth + 1).padStart(2, '0');
          const dayStr = String(dayNum).padStart(2, '0');
          const fullDateStr = `${currentYear}-${monthStr}-${dayStr}`;

          const disabled = isDateDisabled(fullDateStr);
          const isSelected = selectedDate === fullDateStr;

          return (
            <button
              key={fullDateStr}
              type="button"
              disabled={disabled}
              onClick={() => onSelectDate(fullDateStr)}
              className={`h-9 w-9 mx-auto rounded-full text-xs font-medium flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-gradient-to-tr from-dustypink-500 to-rose-500 text-white shadow-lg ring-2 ring-dustypink-300 font-bold scale-105'
                  : disabled
                  ? 'text-stone-600 cursor-not-allowed opacity-40'
                  : 'text-stone-200 hover:bg-white/15 hover:text-white hover:scale-105 cursor-pointer'
              }`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>

      {/* Minimum date constraint helper */}
      <div className="mt-3 pt-2 border-t border-white/5 text-[11px] text-stone-400 font-serif italic text-center">
        Available from November 21, 2026 onwards (IST)
      </div>
    </div>
  );
};
