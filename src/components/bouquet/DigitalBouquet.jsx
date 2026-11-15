import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown, CheckCircle2 } from 'lucide-react';
import { FLOWERS_DATA } from '../../data/flowers';
import { LilyFlower } from './LilyFlower';
import { Sunflower } from './Sunflower';
import { RoseFlower } from './RoseFlower';
import { LavenderFlower } from './LavenderFlower';
import { DaisyFlower } from './DaisyFlower';
import { BouquetWrapping } from './BouquetWrapping';
import { BouquetTag } from './BouquetTag';
import { Foliage } from './Foliage';
import { FlowerMessageModal } from './FlowerMessageModal';
import { soundManager } from '../../utils/audio';

export const DigitalBouquet = ({ onNavigateNext }) => {
  const [hoveredFlowerId, setHoveredFlowerId] = useState(null);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [discoveredFlowers, setDiscoveredFlowers] = useState(new Set());
  const [showSpecialTagModal, setShowSpecialTagModal] = useState(false);
  const [sparkleCoords, setSparkleCoords] = useState([]);

  const handleFlowerHover = (id) => {
    setHoveredFlowerId(id);
  };

  const handleFlowerLeave = () => {
    setHoveredFlowerId(null);
  };

  const handleFlowerClick = (flower, event) => {
    // Sound & sparkle
    soundManager.playSparkle();

    // Trigger local sparkle bursts
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const newSparkles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x,
        y,
        dx: (Math.random() - 0.5) * 60,
        dy: (Math.random() - 0.5) * 60
      }));
      setSparkleCoords((prev) => [...prev, ...newSparkles]);
      setTimeout(() => {
        setSparkleCoords([]);
      }, 1000);
    }

    setSelectedFlower(flower);

    // Track discovery
    setDiscoveredFlowers((prev) => {
      const next = new Set(prev);
      next.add(flower.id);
      return next;
    });
  };

  const allDiscovered = discoveredFlowers.size === FLOWERS_DATA.length;

  return (
    <section id="the-bouquet" className="relative min-h-screen py-20 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dustypink-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[450px] h-[450px] bg-lavender-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-twilight-900/80 border border-dustypink-400/20 text-dustypink-300 text-xs sm:text-sm font-medium tracking-wide mb-3 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-dustypink-400 animate-pulse" />
          <span>Interactive Arrangement</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3"
        >
          A Bouquet For You ♡
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-stone-300 text-sm sm:text-base leading-relaxed"
        >
          I assembled these flowers because each one reminded me of something true about you.
          <span className="block text-dustypink-300/90 font-serif italic mt-1">
            Tap or click any flower to reveal its secret message.
          </span>
        </motion.p>

        {/* Discovery Counter Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-4 inline-flex items-center gap-3 px-5 py-2 rounded-full glass-panel border border-dustypink-400/25 shadow-lg"
        >
          <div className="flex items-center gap-1.5">
            {FLOWERS_DATA.map((flower) => {
              const isFound = discoveredFlowers.has(flower.id);
              return (
                <div
                  key={`dot-${flower.id}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                    isFound
                      ? 'bg-dustypink-400 ring-2 ring-dustypink-300 shadow-[0_0_8px_#f472b6]'
                      : 'bg-stone-700/60 border border-stone-600'
                  }`}
                  title={`${flower.name}: ${isFound ? 'Discovered' : 'Undiscovered'}`}
                />
              );
            })}
          </div>

          <span className="text-xs sm:text-sm font-medium text-stone-200">
            Flowers discovered:{' '}
            <strong className="text-dustypink-300 font-semibold">
              {discoveredFlowers.size}/{FLOWERS_DATA.length}
            </strong>
          </span>

          {allDiscovered && (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
          )}
        </motion.div>
      </div>

      {/* Main Interactive Bouquet Showcase Canvas */}
      <div className="relative w-full max-w-4xl h-[560px] sm:h-[680px] md:h-[740px] flex items-center justify-center select-none">
        {/* Swaying Bouquet Base Wrapper */}
        <motion.div
          animate={{
            rotate: [-1, 1, -1],
            y: [-4, 4, -4]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="relative w-[340px] sm:w-[480px] md:w-[560px] h-[520px] sm:h-[640px] md:h-[700px] flex items-center justify-center"
        >
          {/* Layer 0: Background Foliage */}
          <div className="absolute inset-0 z-0">
            <Foliage className="w-full h-full" />
          </div>

          {/* Layer 1: Translucent Wrapping Paper (Back & Stems) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[85%] h-[72%] z-10 pointer-events-none">
            <BouquetWrapping className="w-full h-full" />
          </div>

          {/* Layer 2: Flower Arranged Components with Hotspots */}
          {/* Flower 4: LAVENDER (Top-Center Sprig) */}
          <div
            onClick={(e) => handleFlowerClick(FLOWERS_DATA[3], e)}
            onMouseEnter={() => handleFlowerHover('lavender')}
            onMouseLeave={handleFlowerLeave}
            className="absolute top-[3%] left-[50%] -translate-x-1/2 w-[180px] sm:w-[220px] md:w-[260px] h-[260px] sm:h-[320px] md:h-[360px] z-20 cursor-pointer group"
          >
            <LavenderFlower
              isHovered={hoveredFlowerId === 'lavender'}
              isSelected={selectedFlower?.id === 'lavender'}
            />
            {/* Interactive Pulse Dot on unrevealed */}
            {!discoveredFlowers.has('lavender') && (
              <span className="absolute top-[28%] left-[50%] -translate-x-1/2 w-4 h-4 rounded-full bg-lavender-400/80 animate-ping pointer-events-none" />
            )}
          </div>

          {/* Flower 2: SUNFLOWER (Top-Left) */}
          <div
            onClick={(e) => handleFlowerClick(FLOWERS_DATA[1], e)}
            onMouseEnter={() => handleFlowerHover('sunflower')}
            onMouseLeave={handleFlowerLeave}
            className="absolute top-[16%] left-[8%] sm:left-[12%] w-[170px] sm:w-[220px] md:w-[260px] h-[170px] sm:h-[220px] md:h-[260px] z-25 cursor-pointer group"
          >
            <Sunflower
              isHovered={hoveredFlowerId === 'sunflower'}
              isSelected={selectedFlower?.id === 'sunflower'}
            />
            {!discoveredFlowers.has('sunflower') && (
              <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400/80 animate-ping pointer-events-none" />
            )}
          </div>

          {/* Flower 3: RED ROSE (Top-Right) */}
          <div
            onClick={(e) => handleFlowerClick(FLOWERS_DATA[2], e)}
            onMouseEnter={() => handleFlowerHover('red-rose')}
            onMouseLeave={handleFlowerLeave}
            className="absolute top-[18%] right-[8%] sm:right-[12%] w-[165px] sm:w-[215px] md:w-[255px] h-[165px] sm:h-[215px] md:h-[255px] z-25 cursor-pointer group"
          >
            <RoseFlower
              isHovered={hoveredFlowerId === 'red-rose'}
              isSelected={selectedFlower?.id === 'red-rose'}
            />
            {!discoveredFlowers.has('red-rose') && (
              <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-rose-400/80 animate-ping pointer-events-none" />
            )}
          </div>

          {/* Flower 5: WHITE DAISY (Mid-Left Foreground) */}
          <div
            onClick={(e) => handleFlowerClick(FLOWERS_DATA[4], e)}
            onMouseEnter={() => handleFlowerHover('white-daisy')}
            onMouseLeave={handleFlowerLeave}
            className="absolute top-[42%] left-[16%] sm:left-[22%] w-[140px] sm:w-[175px] md:w-[205px] h-[140px] sm:h-[175px] md:h-[205px] z-30 cursor-pointer group"
          >
            <DaisyFlower
              isHovered={hoveredFlowerId === 'white-daisy'}
              isSelected={selectedFlower?.id === 'white-daisy'}
            />
            {!discoveredFlowers.has('white-daisy') && (
              <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-yellow-200/90 animate-ping pointer-events-none" />
            )}
          </div>

          {/* Flower 1: PINK LILY (The Grand Centerpiece) */}
          <div
            onClick={(e) => handleFlowerClick(FLOWERS_DATA[0], e)}
            onMouseEnter={() => handleFlowerHover('pink-lily')}
            onMouseLeave={handleFlowerLeave}
            className="absolute top-[28%] left-[50%] -translate-x-1/2 w-[220px] sm:w-[290px] md:w-[340px] h-[220px] sm:h-[290px] md:h-[340px] z-35 cursor-pointer group"
          >
            <LilyFlower
              isHovered={hoveredFlowerId === 'pink-lily'}
              isSelected={selectedFlower?.id === 'pink-lily'}
            />
            {!discoveredFlowers.has('pink-lily') && (
              <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-dustypink-400/90 animate-ping pointer-events-none" />
            )}
          </div>

          {/* Layer 3: Hanging Gift Tag attached to Ribbon */}
          <div className="absolute bottom-[16%] right-[18%] sm:right-[22%] w-[90px] sm:w-[115px] h-[100px] sm:h-[130px] z-40">
            <BouquetTag onClick={() => setShowSpecialTagModal(true)} />
          </div>

          {/* Floating Hover Indicator Badge */}
          {hoveredFlowerId && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            >
              <div className="glass-panel px-4 py-2 rounded-full border border-dustypink-400/30 shadow-xl flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-dustypink-400 animate-spin" />
                <span className="text-xs sm:text-sm font-serif font-bold text-white tracking-wider">
                  {FLOWERS_DATA.find((f) => f.id === hoveredFlowerId)?.name}
                </span>
                <span className="text-[11px] text-dustypink-200 italic">
                  — click to reveal message
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Discovered All 5 Flowers Milestone Celebration Box */}
      {allDiscovered && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="relative z-20 mt-8 max-w-xl mx-auto p-6 sm:p-8 rounded-2xl glass-panel-glow border border-dustypink-400/40 text-center shadow-2xl"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-dustypink-500/20 flex items-center justify-center mb-4 text-dustypink-300">
            <Heart className="w-6 h-6 fill-dustypink-400 text-dustypink-400 animate-pulse" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            You Found All 5 Flowers!
          </h3>

          <p className="font-handwriting text-2xl sm:text-3xl text-dustypink-200 mb-6">
            "Well, that's five reasons. I could probably find a hundred more. ♡"
          </p>

          <button
            onClick={() => {
              soundManager.playSparkle();
              onNavigateNext ? onNavigateNext('little-notes') : document.getElementById('little-notes')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-dustypink-500 via-rose-500 to-lavender-500 text-white font-medium shadow-lg hover:shadow-dustypink-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>There's one more thing...</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </motion.div>
      )}

      {/* Flower Message Modal */}
      <FlowerMessageModal
        flower={selectedFlower}
        isOpen={!!selectedFlower}
        onClose={() => setSelectedFlower(null)}
        discoveredCount={discoveredFlowers.size}
        totalCount={FLOWERS_DATA.length}
      />

      {/* Special Gift Tag Modal */}
      {showSpecialTagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-twilight-950/80 backdrop-blur-md"
            onClick={() => setShowSpecialTagModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="parchment-card relative z-10 max-w-sm w-full p-6 rounded-2xl text-center shadow-2xl border border-amber-900/20"
          >
            <span className="text-2xl text-amber-800">❦</span>
            <h4 className="font-serif text-2xl font-bold text-stone-900 mt-2 mb-1">
              A Bouquet For You ♡
            </h4>
            <p className="font-handwriting text-2xl text-stone-800 my-4">
              "Hand-picked with care, thoughts, and warmth just for you."
            </p>
            <button
              onClick={() => setShowSpecialTagModal(false)}
              className="mt-2 px-4 py-1.5 text-xs rounded-lg bg-stone-900 text-stone-100"
            >
              Close Tag
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};
