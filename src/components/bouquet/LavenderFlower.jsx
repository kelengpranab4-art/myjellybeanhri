import React from 'react';

export const LavenderFlower = ({ className = '', isHovered = false, isSelected = false }) => {
  // Tier positions for lavender florets along a stem
  const florets = [
    { y: 35, spread: 8, count: 4, size: 7 },
    { y: 55, spread: 12, count: 5, size: 8 },
    { y: 78, spread: 14, count: 6, size: 9 },
    { y: 104, spread: 16, count: 6, size: 9 },
    { y: 130, spread: 18, count: 6, size: 10 },
    { y: 158, spread: 17, count: 5, size: 9 },
    { y: 186, spread: 14, count: 4, size: 8 },
  ];

  return (
    <div
      className={`relative transition-all duration-500 ease-out ${
        isHovered ? 'scale-105 filter drop-shadow-[0_0_22px_rgba(167,139,250,0.85)]' : ''
      } ${isSelected ? 'scale-110 filter drop-shadow-[0_0_32px_rgba(192,132,252,0.95)]' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 200 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-700"
      >
        <defs>
          <linearGradient id="lavenderFloretGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="45%" stopColor="#a855f7" />
            <stop offset="85%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          <linearGradient id="lavenderLightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="60%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>

          <linearGradient id="lavenderStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84cc16" />
            <stop offset="60%" stopColor="#4d7c0f" />
            <stop offset="100%" stopColor="#365314" />
          </linearGradient>
        </defs>

        {/* Soft Ambient Lavender Aura */}
        <ellipse cx="100" cy="110" rx="45" ry="90" fill="#a855f7" opacity="0.16" />

        {/* Stem 1: Left Secondary Stem */}
        <path
          d="M 65 310 C 65 240, 50 170, 48 100"
          stroke="url(#lavenderStemGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Left Secondary Florets */}
        <g opacity="0.85">
          {[110, 130, 150, 172, 195].map((y, idx) => (
            <g key={`left-floret-${idx}`}>
              <ellipse cx="44" cy={y} rx="5" ry="3.5" fill="url(#lavenderFloretGrad)" transform={`rotate(-25 44 ${y})`} />
              <ellipse cx="53" cy={y - 2} rx="5" ry="3.5" fill="url(#lavenderLightGrad)" transform={`rotate(25 53 ${y - 2})`} />
              <circle cx="48.5" cy={y - 4} r="2.8" fill="#e9d5ff" />
            </g>
          ))}
          <ellipse cx="48" cy="94" rx="4" ry="7" fill="url(#lavenderLightGrad)" />
        </g>

        {/* Stem 2: Right Secondary Stem */}
        <path
          d="M 135 310 C 135 240, 150 170, 152 105"
          stroke="url(#lavenderStemGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Right Secondary Florets */}
        <g opacity="0.85">
          {[115, 136, 158, 180, 202].map((y, idx) => (
            <g key={`right-floret-${idx}`}>
              <ellipse cx="147" cy={y} rx="5" ry="3.5" fill="url(#lavenderFloretGrad)" transform={`rotate(-20 147 ${y})`} />
              <ellipse cx="157" cy={y - 2} rx="5" ry="3.5" fill="url(#lavenderLightGrad)" transform={`rotate(25 157 ${y - 2})`} />
              <circle cx="152" cy={y - 4} r="2.8" fill="#e9d5ff" />
            </g>
          ))}
          <ellipse cx="152" cy="98" rx="4" ry="7" fill="url(#lavenderLightGrad)" />
        </g>

        {/* Stem 3: Main Tall Center Stem */}
        <path
          d="M 100 310 C 100 220, 100 130, 100 20"
          stroke="url(#lavenderStemGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Main Center Florets Clusters */}
        <g id="center-florets">
          {florets.map((layer, lIdx) => (
            <g key={`layer-${lIdx}`}>
              {/* Petal beads forming the cluster */}
              <ellipse
                cx={100 - layer.spread}
                cy={layer.y}
                rx={layer.size * 0.7}
                ry={layer.size * 0.45}
                fill="url(#lavenderFloretGrad)"
                transform={`rotate(-35 ${100 - layer.spread} ${layer.y})`}
              />
              <ellipse
                cx={100 + layer.spread}
                cy={layer.y}
                rx={layer.size * 0.7}
                ry={layer.size * 0.45}
                fill="url(#lavenderLightGrad)"
                transform={`rotate(35 ${100 + layer.spread} ${layer.y})`}
              />
              <ellipse
                cx={100}
                cy={layer.y - 3}
                rx={layer.size * 0.55}
                ry={layer.size * 0.75}
                fill="url(#lavenderFloretGrad)"
              />
              {/* Soft highlight tip */}
              <circle cx={100} cy={layer.y - 5} r="2.2" fill="#f5f3ff" />
              <circle cx={100 - layer.spread * 0.7} cy={layer.y - 2} r="1.8" fill="#ede9fe" />
              <circle cx={100 + layer.spread * 0.7} cy={layer.y - 2} r="1.8" fill="#ede9fe" />
            </g>
          ))}
          {/* Top Bud Tip */}
          <ellipse cx="100" cy="18" rx="4.5" ry="9" fill="url(#lavenderLightGrad)" />
          <circle cx="100" cy="12" r="2.5" fill="#f5f3ff" />
        </g>
      </svg>
    </div>
  );
};
