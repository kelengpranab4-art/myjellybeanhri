import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Check, Compass, ArrowRight, RotateCcw } from 'lucide-react';
import { DATES_DATA } from '../data/dates';
import { soundManager } from '../utils/audio';

export const DatePlanner = ({ onProceedToFinal }) => {
  const [selectedDateId, setSelectedDateId] = useState(null);

  const handleSelectDate = (id) => {
    soundManager.playSparkle();
    setSelectedDateId(id);
  };

  const selectedDate = DATES_DATA.find((d) => d.id === selectedDateId);

  return (
    <section id="date-planner" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-peach-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-lavender-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-twilight-900/80 border border-dustypink-400/20 text-dustypink-300 text-xs sm:text-sm font-medium tracking-wide mb-3 backdrop-blur-sm"
        >
          <Compass className="w-3.5 h-3.5 text-dustypink-400" />
          <span>Our Little Adventure</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3"
        >
          Imagine We Had A Little Date...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone-300 text-sm sm:text-base leading-relaxed"
        >
          "If you could choose, what would our little adventure look like?"
          <span className="block text-dustypink-300/90 font-serif italic mt-1">
            Pick whichever sounds most comfortable to you.
          </span>
        </motion.p>
      </div>

      {/* Date Options Grid */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {DATES_DATA.map((item, index) => {
          const isSelected = selectedDateId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => handleSelectDate(item.id)}
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                isSelected
                  ? 'glass-panel-glow border-dustypink-400 ring-2 ring-dustypink-400/40 shadow-glow-pink scale-[1.02]'
                  : 'glass-panel border-white/10 hover:border-dustypink-400/40 hover:scale-[1.01]'
              }`}
            >
              {/* Checkmark selection badge */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gradient-to-tr from-dustypink-500 to-rose-500 flex items-center justify-center text-white shadow-lg animate-scale-in">
                  <Check className="w-4 h-4 stroke-[2.5]" />
                </div>
              )}

              {/* Emoji Icon & Tagline */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                  {item.icon}
                </span>
                <div>
                  <span className="text-[11px] font-mono tracking-wider uppercase text-dustypink-300/90">
                    {item.tagline}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-white">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Detail on Selected or subtle hint */}
              <div className="pt-3 border-t border-white/10 text-xs text-dustypink-200/80 font-serif italic">
                {item.detail}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Confirmation & Next Step Card */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15 }}
            className="relative z-20 mt-12 max-w-xl mx-auto p-6 sm:p-8 rounded-2xl glass-panel-glow border border-dustypink-400/35 text-center shadow-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dustypink-500/20 text-dustypink-300 text-xs font-medium mb-3">
              <Heart className="w-3.5 h-3.5 fill-dustypink-400 text-dustypink-400" />
              <span>Adventure Selected</span>
            </div>

            <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              {selectedDate.title} {selectedDate.icon}
            </h4>

            <p className="font-handwriting text-2xl sm:text-3xl text-dustypink-200 mb-6">
              "I love that idea! It's noted for when the time comes. ✨"
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setSelectedDateId(null)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white/10 text-xs text-stone-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Change Choice</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playSparkle();
                  if (onProceedToFinal) {
                    onProceedToFinal(selectedDate?.title);
                  } else {
                    document.getElementById('final-date')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-dustypink-500 to-rose-500 text-white font-medium text-sm shadow-lg hover:shadow-dustypink-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>There's One Last Thing...</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
