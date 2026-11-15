import React from 'react';

export const DaisyFlower = ({ className = '', isHovered = false, isSelected = false }) => {
  const petalCount = 16;

  return (
    <div
      className={`relative transition-all duration-500 ease-out ${
        isHovered ? 'scale-105 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]' : ''
      } ${isSelected ? 'scale-110 filter drop-shadow-[0_0_30px_rgba(254,240,138,0.95)]' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-700"
      >
        <defs>
          <linearGradient id="daisyPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="25%" stopColor="#e2e8f0" />
            <stop offset="65%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <linearGradient id="daisyDiscGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#facc15" />
            <stop offset="75%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="120" cy="120" r="80" fill="#ffffff" opacity="0.15" />

        {/* Daisy Companion Bud / Secondary Small Bloom (Left angled) */}
        <g transform="translate(45, 60) scale(0.48)">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <path
                key={`bud-petal-${i}`}
                d="M 120 120 C 114 90, 110 40, 120 20 C 130 40, 126 90, 120 120 Z"
                fill="url(#daisyPetalGrad)"
                stroke="#cbd5e1"
                strokeWidth="0.8"
                transform={`rotate(${angle} 120 120)`}
              />
            );
          })}
          <circle cx="120" cy="120" r="26" fill="url(#daisyDiscGrad)" stroke="#a16207" strokeWidth="1" />
        </g>

        {/* Main Daisy Bloom Petals */}
        <g id="main-daisy-petals">
          {Array.from({ length: petalCount }).map((_, i) => {
            const angle = (i * 360) / petalCount;
            return (
              <path
                key={`main-petal-${i}`}
                d="M 120 120 C 112 85, 108 35, 120 12 C 132 35, 128 85, 120 120 Z"
                fill="url(#daisyPetalGrad)"
                stroke="#e2e8f0"
                strokeWidth="0.8"
                transform={`rotate(${angle} 120 120)`}
              />
            );
          })}
        </g>

        {/* Shadow under central disc */}
        <circle cx="120" cy="120" r="32" fill="#64748b" opacity="0.18" />

        {/* Central Golden-Yellow Disc */}
        <circle
          cx="120"
          cy="120"
          r="28"
          fill="url(#daisyDiscGrad)"
          stroke="#ca8a04"
          strokeWidth="1.2"
        />

        {/* Disc Texture Dots */}
        <g fill="#854d0e" opacity="0.65">
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            const x = 120 + Math.cos((angle * Math.PI) / 180) * 20;
            const y = 120 + Math.sin((angle * Math.PI) / 180) * 20;
            return <circle key={`dot-rim-${i}`} cx={x} cy={y} r="1.4" fill="#a16207" />;
          })}
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (i * 360) / 10 + 18;
            const x = 120 + Math.cos((angle * Math.PI) / 180) * 11;
            const y = 120 + Math.sin((angle * Math.PI) / 180) * 11;
            return <circle key={`dot-inner-${i}`} cx={x} cy={y} r="1.2" fill="#ca8a04" />;
          })}
          <circle cx="120" cy="120" r="4" fill="#713f12" />
        </g>
      </svg>
    </div>
  );
};
