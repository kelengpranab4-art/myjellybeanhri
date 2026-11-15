import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Stamp, RotateCw } from 'lucide-react';
import { NOTES_DATA } from '../data/notes';
import { soundManager } from '../utils/audio';

export const LittleNotes = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const handleToggleCard = (id) => {
    soundManager.playPaperRustle();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="little-notes" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-velvet-800/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-dustypink-600/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-twilight-900/80 border border-dustypink-400/20 text-dustypink-300 text-xs sm:text-sm font-medium tracking-wide mb-3 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-dustypink-400" />
          <span>Postcards From My Mind</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3"
        >
          Little Notes For You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone-300 text-sm sm:text-base leading-relaxed"
        >
          Just a few quiet thoughts that often cross my mind.
          <span className="block text-dustypink-300/90 font-serif italic mt-1">
            Click any stationery card to unseal its note.
          </span>
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2">
        {NOTES_DATA.map((note, index) => {
          const isFlipped = !!flippedCards[note.id];

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ rotate: note.rotation }}
              className="relative h-[280px] sm:h-[300px] cursor-pointer perspective-1000 group"
              onClick={() => handleToggleCard(note.id)}
            >
              <div
                className={`relative w-full h-full duration-700 transition-transform transform-style-preserve-3d ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* FRONT: Sealed Vintage Envelope / Postcard */}
                <div className="absolute inset-0 backface-hidden parchment-card rounded-2xl p-6 flex flex-col justify-between border border-amber-900/20 shadow-xl group-hover:shadow-2xl transition-shadow">
                  {/* Stamp & Airmail Marks */}
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-mono font-bold tracking-wider text-amber-900/60 uppercase">
                      {note.stamp}
                    </span>

                    <div className="w-10 h-12 border-2 border-dashed border-amber-900/30 rounded p-1 flex flex-col items-center justify-center text-[10px] text-amber-900/70 font-mono">
                      <span>POST</span>
                      <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600 my-0.5" />
                      <span>AIR</span>
                    </div>
                  </div>

                  {/* Center Wax Seal */}
                  <div className="my-auto flex flex-col items-center justify-center text-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg shadow-lg mb-3 wax-seal group-hover:scale-105 transition-transform"
                      style={{
                        background: `radial-gradient(circle at 35% 35%, ${note.waxColor}, #4c0519)`
                      }}
                    >
                      ❦
                    </div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg">
                      {note.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-serif italic mt-1">
                      Sealed with fond thoughts
                    </p>
                  </div>

                  {/* Bottom Tap Instruction */}
                  <div className="flex items-center justify-between pt-3 border-t border-amber-900/10 text-xs text-stone-500">
                    <span className="font-mono text-[11px]">PAR AVION</span>
                    <span className="flex items-center gap-1 font-serif italic text-rose-900 font-medium">
                      <RotateCw className="w-3 h-3" />
                      Click to flip
                    </span>
                  </div>
                </div>

                {/* BACK: Revealed Handwritten Letter Note */}
                <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] parchment-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-amber-900/25 shadow-2xl">
                  {/* Decorative Header */}
                  <div className="flex items-center justify-between border-b border-amber-900/15 pb-2">
                    <span className="text-xs font-serif italic text-amber-900/70">
                      {note.title}
                    </span>
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  </div>

                  {/* Main Personal Note Message */}
                  <div className="my-auto py-2">
                    <p className="font-handwriting text-2xl sm:text-3xl font-semibold text-rose-950 leading-relaxed text-center">
                      "{note.message}"
                    </p>
                    <p className="font-serif italic text-xs text-stone-600 text-center mt-3">
                      — {note.annotation}
                    </p>
                  </div>

                  {/* Bottom Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-amber-900/15 text-[11px] text-stone-500 font-serif">
                    <span>From my heart</span>
                    <span className="italic text-rose-800">Tap to flip back</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
