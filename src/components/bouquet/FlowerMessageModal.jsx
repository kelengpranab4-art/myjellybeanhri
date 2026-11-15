import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart } from 'lucide-react';

export const FlowerMessageModal = ({ flower, isOpen, onClose, discoveredCount, totalCount }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!flower) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-twilight-950/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg z-10"
          >
            {/* Vintage Parchment Card */}
            <div className="parchment-card rounded-2xl p-7 sm:p-9 shadow-2xl relative overflow-hidden border border-amber-900/20">
              {/* Corner Vintage Ornaments */}
              <div className="absolute top-3 left-3 text-amber-800/20 text-xl font-serif select-none pointer-events-none">
                ❧
              </div>
              <div className="absolute top-3 right-3 text-amber-800/20 text-xl font-serif select-none pointer-events-none">
                ☙
              </div>
              <div className="absolute bottom-3 left-3 text-amber-800/20 text-xl font-serif select-none pointer-events-none">
                ❧
              </div>
              <div className="absolute bottom-3 right-3 text-amber-800/20 text-xl font-serif select-none pointer-events-none">
                ☙
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close message"
                className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Flower Symbol & Discovery Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-900/10 text-amber-900 border border-amber-800/15">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  {flower.tag}
                </span>

                <span className="text-xs font-serif italic text-stone-500">
                  Discovery {discoveredCount} / {totalCount}
                </span>
              </div>

              {/* Flower Title Header */}
              <div className="text-center mb-6">
                <div
                  className="w-12 h-1 mx-auto rounded-full mb-3"
                  style={{ backgroundColor: flower.color }}
                />
                <h3 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-1">
                  {flower.name}
                </h3>
                <p className="text-xs sm:text-sm font-serif italic text-stone-600">
                  {flower.symbolism}
                </p>
              </div>

              {/* Hand-Written Personal Message */}
              <div className="relative my-6 px-4 py-6 bg-amber-50/60 rounded-xl border border-amber-900/10 text-center shadow-inner">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-rose-500/70 text-base">
                  ❦
                </span>
                <p className="font-handwriting text-2xl sm:text-3xl text-rose-950 leading-relaxed font-semibold">
                  "{flower.message}"
                </p>
              </div>

              {/* Footer Note & Wax Seal Accent */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-300/60">
                <div className="flex items-center gap-2 text-xs text-stone-600 font-serif italic">
                  <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600 inline" />
                  <span>A piece of my heart for you</span>
                </div>

                <button
                  onClick={onClose}
                  className="px-4 py-1.5 text-xs font-medium rounded-lg bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors shadow-sm"
                >
                  Keep Exploring
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
