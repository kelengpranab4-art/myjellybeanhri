import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Flower2, RotateCcw } from 'lucide-react';
import { fireRomanticConfetti, fireFlowerPetalShower } from '../utils/confetti';
import { soundManager } from '../utils/audio';
import { DateBookingInterface } from './booking/DateBookingInterface';

export const FinalQuestion = ({ initialActivity = 'Sunset Walk' }) => {
  const [response, setResponse] = useState(null); // 'yes' | 'maybe' | 'think' | null

  const handleYes = () => {
    soundManager.playSparkle();
    fireRomanticConfetti();
    fireFlowerPetalShower();
    setResponse('yes');
  };

  const handleMaybe = () => {
    soundManager.playChime(587.33, 1.5); // D5
    setResponse('maybe');
  };

  const handleThink = () => {
    soundManager.playChime(523.25, 1.8); // C5
    setResponse('think');
  };

  const handleReset = () => {
    setResponse(null);
  };

  return (
    <section
      id="final-date"
      className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Sunset Twilight Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-rose-900/30 via-dustypink-700/20 to-lavender-700/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-peach-500/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center w-full">
        {/* Glowing Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-twilight-900/90 border border-dustypink-400/30 text-dustypink-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-dustypink-400 animate-spin" />
          <span>The Climax</span>
        </motion.div>

        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif italic text-xl sm:text-2xl text-dustypink-300 mb-2"
        >
          There's One Last Thing...
        </motion.p>

        {/* The Main Question */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow-[0_0_25px_rgba(244,114,182,0.4)]"
        >
          Would you go on a date with me?{' '}
          <span className="text-rose-400 font-sans not-italic text-4xl sm:text-6xl md:text-7xl inline-block drop-shadow-[0_0_15px_rgba(244,114,182,0.9)]">
            ♡
          </span>
        </motion.h2>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-stone-300 text-base sm:text-xl font-light max-w-lg mx-auto leading-relaxed mb-12"
        >
          "I'd really love to spend some time with you."
        </motion.p>

        {/* Interaction Buttons (Shown when no response selected yet) */}
        {!response && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-xl"
          >
            {/* YES Button */}
            <button
              onClick={handleYes}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-dustypink-500 via-rose-500 to-peach-500 text-white font-serif font-bold text-lg sm:text-xl shadow-[0_0_35px_rgba(244,114,182,0.6)] hover:shadow-[0_0_50px_rgba(244,114,182,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
              <span>YES! ♡</span>
            </button>

            {/* Maybe Button */}
            <button
              onClick={handleMaybe}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-panel border border-white/20 text-stone-200 hover:text-white hover:border-dustypink-400/50 hover:bg-white/10 transition-all text-base font-serif"
            >
              <span>Maybe? 👀</span>
            </button>

            {/* Let Me Think Button */}
            <button
              onClick={handleThink}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-panel border border-white/20 text-stone-200 hover:text-white hover:border-dustypink-400/50 hover:bg-white/10 transition-all text-base font-serif"
            >
              <span>Let me think 💌</span>
            </button>
          </motion.div>
        )}

        {/* Dynamic Response Views */}
        <AnimatePresence mode="wait">
          {/* YES: REVEALS DATE BOOKING INTERFACE */}
          {response === 'yes' && (
            <motion.div
              key="response-yes"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full mt-4"
            >
              <DateBookingInterface
                initialActivity={initialActivity}
                onReset={handleReset}
              />
            </motion.div>
          )}

          {/* MAYBE VIEW */}
          {response === 'maybe' && (
            <motion.div
              key="response-maybe"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-6 w-full max-w-lg p-8 rounded-3xl glass-panel border border-dustypink-400/30 text-center shadow-xl"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 mb-4">
                <Flower2 className="w-6 h-6" />
              </div>

              <p className="font-handwriting text-2xl sm:text-3xl text-dustypink-200 leading-relaxed mb-6 font-semibold">
                "That's okay. I'll save you a flower while you think about it. ♡"
              </p>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Change Answer</span>
              </button>
            </motion.div>
          )}

          {/* LET ME THINK VIEW */}
          {response === 'think' && (
            <motion.div
              key="response-think"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-6 w-full max-w-lg p-8 rounded-3xl glass-panel border border-lavender-400/30 text-center shadow-xl"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-lavender-400/20 flex items-center justify-center text-lavender-300 mb-4">
                <Heart className="w-6 h-6" />
              </div>

              <p className="font-handwriting text-2xl sm:text-3xl text-lavender-200 leading-relaxed mb-6 font-semibold">
                "No pressure at all. Take your time. The flowers aren't going anywhere. 🌷"
              </p>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Change Answer</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
