import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTogglePlay = () => {
    const active = soundManager.toggleMusic();
    setIsPlaying(active);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (isMuted) setIsMuted(false);
    soundManager.setVolume(newVol);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      soundManager.setVolume(volume);
    } else {
      setIsMuted(true);
      soundManager.setVolume(0);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div className="relative flex items-center">
        {/* Expanded Controls Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="mr-3 glass-panel p-3 rounded-2xl border border-dustypink-400/30 shadow-2xl flex items-center gap-3 backdrop-blur-xl"
            >
              {/* Volume Button */}
              <button
                onClick={handleToggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume Slider"
                className="w-20 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-dustypink-400"
              />

              {/* Track Name */}
              <div className="hidden sm:block text-[11px] font-serif italic text-stone-300 max-w-[120px] truncate">
                Twilight Reverie
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Audio Pill */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 p-2 pr-3.5 glass-panel-glow rounded-full border border-dustypink-400/40 shadow-xl cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Play/Pause Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTogglePlay();
            }}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-dustypink-500 to-rose-500 flex items-center justify-center text-white shadow-md hover:scale-105 active:scale-95 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            )}
          </button>

          {/* Equalizer Indicator & Label */}
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4 w-4">
                <span className="w-1 bg-dustypink-400 rounded-full animate-bar-1" />
                <span className="w-1 bg-rose-400 rounded-full animate-bar-2" />
                <span className="w-1 bg-lavender-400 rounded-full animate-bar-3" />
                <span className="w-1 bg-peach-400 rounded-full animate-bar-4" />
              </div>
            ) : (
              <Music className="w-4 h-4 text-stone-400" />
            )}

            <span className="text-xs font-serif italic text-stone-200 select-none">
              {isPlaying ? 'Music Playing' : 'Play Music'}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
