import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Mail, ChevronDown } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const Hero = ({ onEnter }) => {
  const handleEnterClick = () => {
    soundManager.playSparkle();
    if (onEnter) {
      onEnter();
    } else {
      document.getElementById('the-bouquet')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 overflow-hidden"
    >
      {/* Twilight Sunset Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-velvet-800/40 via-dustypink-600/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-peach-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Animated Envelope Teaser Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-panel-glow border border-dustypink-400/30 flex items-center justify-center shadow-xl animate-float-slow">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-dustypink-300 stroke-[1.5]" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px]">
              <Heart className="w-3 h-3 fill-white" />
            </span>
          </div>
          <span className="absolute inset-0 rounded-2xl bg-dustypink-400/20 blur-xl -z-10 animate-pulse" />
        </motion.div>

        {/* Delicate Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-twilight-900/60 border border-dustypink-400/20 text-dustypink-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-5 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-dustypink-400" />
          <span>A Dedicated Moment In Time</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.15]"
        >
          A Little Something{' '}
          <span className="font-script text-5xl sm:text-7xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-dustypink-300 via-rose-300 to-peach-300 block sm:inline font-normal mt-1 sm:mt-0">
            For You ♡
          </span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-stone-300 text-base sm:text-xl font-light max-w-xl mx-auto leading-relaxed mb-10"
        >
          "I made something a little different for you. Take your time exploring."
        </motion.p>

        {/* Enter Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-dustypink-500 via-rose-500 to-lavender-500 text-white font-medium text-base sm:text-lg shadow-[0_0_30px_-5px_rgba(244,114,182,0.5)] hover:shadow-[0_0_45px_-5px_rgba(244,114,182,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Enter My Little World ♡</span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>

        {/* Floating Mini Flower Vignettes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-14 flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-stone-400 font-serif italic"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-pink-400 inline-block shadow-[0_0_8px_#f472b6]" />
            Pink Lily
          </span>
          <span className="text-stone-600">✦</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shadow-[0_0_8px_#fbbf24]" />
            Sunflower
          </span>
          <span className="text-stone-600">✦</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block shadow-[0_0_8px_#f43f5e]" />
            Red Rose
          </span>
          <span className="text-stone-600">✦</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block shadow-[0_0_8px_#c084fc]" />
            Lavender
          </span>
        </motion.div>
      </div>
    </section>
  );
};
