import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, ChevronDown } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const SecretLetter = ({ onProceedToDate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleEnvelope = () => {
    soundManager.playPaperRustle();
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        soundManager.playSparkle();
      }, 700);
    }
  };

  return (
    <section id="secret-letter" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-velvet-900/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-dustypink-600/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-twilight-900/80 border border-dustypink-400/20 text-dustypink-300 text-xs sm:text-sm font-medium tracking-wide mb-3 backdrop-blur-sm"
        >
          <Mail className="w-3.5 h-3.5 text-dustypink-400" />
          <span>Handwritten Letter</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3"
        >
          Something I've Been Meaning To Tell You...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone-300 text-sm sm:text-base leading-relaxed"
        >
          A quiet confession folded into an envelope.
          <span className="block text-dustypink-300/90 font-serif italic mt-1">
            Tap the wax seal to open.
          </span>
        </motion.p>
      </div>

      {/* 3D Envelope Container */}
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center">
        {/* The Envelope */}
        <div
          onClick={handleToggleEnvelope}
          className="relative w-[320px] sm:w-[460px] h-[220px] sm:h-[280px] cursor-pointer group select-none"
        >
          {/* Envelope Back Body */}
          <div className="absolute inset-0 bg-[#251532] rounded-2xl shadow-2xl border border-dustypink-400/20" />

          {/* Letter Peeking / Sliding Out */}
          <motion.div
            animate={{
              y: isOpen ? -180 : 0,
              scale: isOpen ? 1 : 0.95,
              opacity: isOpen ? 1 : 0.4
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute top-2 left-4 right-4 h-[200px] sm:h-[260px] parchment-card rounded-xl p-5 shadow-lg border border-amber-900/20 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between border-b border-amber-900/15 pb-1">
              <span className="font-serif text-xs italic text-stone-600">For Someone Truly Special</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>
            <p className="font-handwriting text-xl text-stone-800 line-clamp-3">
              "Honestly, I don't know exactly when it happened, but somewhere along the way..."
            </p>
            <div className="text-right text-[11px] font-serif text-stone-500 italic">
              — Click to read in full
            </div>
          </motion.div>

          {/* Envelope Pocket Front (Triangular side folds) */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              viewBox="0 0 460 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-md"
            >
              {/* Bottom pocket triangular flap */}
              <path
                d="M 0 280 L 230 140 L 460 280 Z"
                fill="#2c183b"
                stroke="#43245a"
                strokeWidth="1"
              />
              {/* Left fold */}
              <path
                d="M 0 0 L 230 140 L 0 280 Z"
                fill="#241331"
                stroke="#371c4a"
                strokeWidth="1"
              />
              {/* Right fold */}
              <path
                d="M 460 0 L 230 140 L 460 280 Z"
                fill="#241331"
                stroke="#371c4a"
                strokeWidth="1"
              />
            </svg>
          </div>

          {/* Envelope Top Flap (Opens / Flips up) */}
          <motion.div
            animate={{
              rotateX: isOpen ? 180 : 0
            }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut'
            }}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d'
            }}
            className="absolute top-0 left-0 right-0 h-[140px] z-30"
          >
            <svg
              viewBox="0 0 460 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M 0 0 L 230 140 L 460 0 Z"
                fill="#341b46"
                stroke="#4c2865"
                strokeWidth="1.2"
              />
            </svg>

            {/* Wax Seal placed on the point of top flap */}
            <div className="absolute top-[85px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full wax-seal flex items-center justify-center text-white font-serif font-bold text-xl shadow-2xl group-hover:scale-105 transition-transform">
              <span className="drop-shadow">♡</span>
            </div>
          </motion.div>
        </div>

        {/* Revealed Full Letter Sheet */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ delay: 0.4, type: 'spring', damping: 25, stiffness: 200 }}
              className="mt-12 w-full max-w-xl parchment-card rounded-2xl p-8 sm:p-10 border border-amber-900/25 shadow-2xl relative"
            >
              {/* Decorative Corner Embellishments */}
              <div className="text-center mb-6">
                <span className="text-amber-800 text-lg">✦ ❦ ✦</span>
                <p className="font-serif italic text-xs tracking-widest text-stone-600 uppercase mt-1">
                  Confidential & Tender
                </p>
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-6 font-handwriting text-2xl sm:text-3xl text-rose-950 font-semibold leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  "Honestly, I don't know exactly when it happened, but somewhere along the way, you became someone I look forward to talking to."
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  "I wanted to do something a little different instead of just saying it."
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  "So here's a little bouquet, a few words from my heart, and something I've been wanting to ask you."
                </motion.p>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-4 border-t border-amber-900/15 flex items-center justify-between">
                <div>
                  <span className="font-serif italic text-xs text-stone-600 block">Always yours in thought,</span>
                  <span className="font-script text-3xl text-rose-800 font-bold">Me ♡</span>
                </div>

                <button
                  onClick={() => {
                    soundManager.playSparkle();
                    onProceedToDate ? onProceedToDate() : document.getElementById('date-planner')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-100 text-xs sm:text-sm font-medium transition-colors shadow-md"
                >
                  <span>See What's Next</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
