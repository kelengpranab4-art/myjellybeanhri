import React from 'react';

export const Sunflower = ({ className = '', isHovered = false, isSelected = false }) => {
  // Generate radial petals for authentic sunflower look
  const petalCount = 20;
  const innerPetalCount = 18;

  return (
    <div
      className={`relative transition-all duration-500 ease-out ${
        isHovered ? 'scale-105 filter drop-shadow-[0_0_22px_rgba(251,191,36,0.85)]' : ''
      } ${isSelected ? 'scale-110 filter drop-shadow-[0_0_32px_rgba(245,158,11,0.95)]' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-700"
      >
        <defs>
          <linearGradient id="sunPetalGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          <linearGradient id="sunPetalGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#b45309" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>

          <radialGradient id="sunSeedCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1c0c04" />
            <stop offset="40%" stopColor="#3d1a08" />
            <stop offset="75%" stopColor="#57240c" />
            <stop offset="90%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="140" cy="140" r="100" fill="url(#sunPetalGrad1)" opacity="0.15" />

        {/* Outer Ring of Petals */}
        <g id="outer-petals">
          {Array.from({ length: petalCount }).map((_, i) => {
            const angle = (i * 360) / petalCount;
            return (
              <path
                key={`outer-${i}`}
                d="M 140 140 C 132 100, 126 40, 140 15 C 154 40, 148 100, 140 140 Z"
                fill="url(#sunPetalGrad1)"
                stroke="#d97706"
                strokeWidth="0.6"
                transform={`rotate(${angle} 140 140)`}
              />
            );
          })}
        </g>

        {/* Inner Staggered Ring of Petals */}
        <g id="inner-petals">
          {Array.from({ length: innerPetalCount }).map((_, i) => {
            const angle = (i * 360) / innerPetalCount + 10;
            return (
              <path
                key={`inner-${i}`}
                d="M 140 140 C 134 110, 130 55, 140 32 C 150 55, 146 110, 140 140 Z"
                fill="url(#sunPetalGrad2)"
                stroke="#b45309"
                strokeWidth="0.5"
                transform={`rotate(${angle} 140 140)`}
              />
            );
          })}
        </g>

        {/* Seed Center Base */}
        <circle cx="140" cy="140" r="54" fill="url(#sunSeedCenter)" stroke="#78350f" strokeWidth="2" />

        {/* Textured Seed Pattern (Spiral rings) */}
        <g fill="#ca8a04" opacity="0.7">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = 46;
            const x = 140 + Math.cos((angle * Math.PI) / 180) * rad;
            const y = 140 + Math.sin((angle * Math.PI) / 180) * rad;
            return <circle key={`seed-rim-${i}`} cx={x} cy={y} r="2" fill="#eab308" />;
          })}
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i * 360) / 18 + 15;
            const rad = 34;
            const x = 140 + Math.cos((angle * Math.PI) / 180) * rad;
            const y = 140 + Math.sin((angle * Math.PI) / 180) * rad;
            return <circle key={`seed-mid-${i}`} cx={x} cy={y} r="1.8" fill="#ca8a04" />;
          })}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12 + 8;
            const rad = 20;
            const x = 140 + Math.cos((angle * Math.PI) / 180) * rad;
            const y = 140 + Math.sin((angle * Math.PI) / 180) * rad;
            return <circle key={`seed-inner-${i}`} cx={x} cy={y} r="1.6" fill="#a16207" />;
          })}
        </g>

        {/* Center Seed Floret Center */}
        <circle cx="140" cy="140" r="8" fill="#1c0c04" />
      </svg>
    </div>
  );
};
