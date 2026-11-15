import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart, Camera } from 'lucide-react';
import { MEMORIES_DATA } from '../data/memories';
import { soundManager } from '../utils/audio';

export const MemoryGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleOpenPhoto = (photo) => {
    soundManager.playSparkle();
    setSelectedPhoto(photo);
  };

  return (
    <section id="our-moments" className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Twilight Ambient Backdrop */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-velvet-800/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-dustypink-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-twilight-900/80 border border-dustypink-400/20 text-dustypink-300 text-xs sm:text-sm font-medium tracking-wide mb-3 backdrop-blur-sm"
        >
          <Camera className="w-3.5 h-3.5 text-dustypink-400" />
          <span>Polaroid Scrapbook</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3"
        >
          Our Little Moments
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone-300 text-sm sm:text-base leading-relaxed"
        >
          Glimpses of places, light, and memories that remind me of our world.
          <span className="block text-dustypink-300/90 font-serif italic mt-1">
            Click any Polaroid snapshot to view it up close.
          </span>
        </motion.p>
      </div>

      {/* Polaroid Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-4">
        {MEMORIES_DATA.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{ rotate: photo.rotation }}
            whileHover={{
              rotate: 0,
              scale: 1.04,
              zIndex: 30,
              transition: { duration: 0.3 }
            }}
            onClick={() => handleOpenPhoto(photo)}
            className="group relative cursor-pointer"
          >
            {/* Washi Tape Strip on Top */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 rounded-sm shadow-sm backdrop-blur-sm z-20 pointer-events-none transform -rotate-1"
              style={{ backgroundColor: photo.tapeColor }}
            />

            {/* Polaroid Frame */}
            <div className="bg-[#fcfaf7] p-4 sm:p-5 pb-7 sm:pb-9 rounded-sm shadow-xl group-hover:shadow-2xl transition-all duration-300 border border-stone-200/80">
              {/* Photo Box */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900 rounded-sm mb-4">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Handwritten Caption & Date */}
              <div className="text-center px-2">
                <p className="font-handwriting text-2xl sm:text-3xl text-stone-900 font-semibold leading-tight">
                  {photo.caption}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2 text-stone-500 font-serif italic text-xs">
                  <span>{photo.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="absolute inset-0 bg-twilight-950/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 max-w-xl w-full bg-[#fcfaf7] p-5 sm:p-7 pb-8 sm:pb-10 rounded shadow-2xl border border-stone-200"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close Polaroid"
                className="absolute top-4 right-4 p-2 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-200/50 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900 rounded mb-5 shadow-inner">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center px-4">
                <p className="font-handwriting text-3xl sm:text-4xl text-stone-900 font-bold mb-1">
                  {selectedPhoto.caption}
                </p>
                <p className="font-serif italic text-sm text-stone-500">
                  {selectedPhoto.title} — {selectedPhoto.date}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
