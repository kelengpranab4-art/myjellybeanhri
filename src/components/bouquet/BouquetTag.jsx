import React from 'react';

export const BouquetTag = ({ className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer transition-transform duration-500 ease-out hover:rotate-6 hover:scale-105 ${className}`}
      title="A Bouquet For You ♡"
    >
      <svg
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <linearGradient id="tagPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdfaf3" />
            <stop offset="70%" stopColor="#f4ebdc" />
            <stop offset="100%" stopColor="#e8dabf" />
          </linearGradient>

          <filter id="tagShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Twine String from Ribbon Knot */}
        <path
          d="M 50 0 C 45 35, 75 45, 80 70"
          stroke="#b45309"
          strokeWidth="1.8"
          strokeDasharray="3 2"
          strokeLinecap="round"
        />

        {/* Tag Body */}
        <g transform="rotate(8 80 110)">
          {/* Tag Outline */}
          <path
            d="M 60 70 L 100 70 L 125 95 L 125 155 C 125 160, 120 165, 115 165 L 45 165 C 40 165, 35 160, 35 155 L 35 95 Z"
            fill="url(#tagPaperGrad)"
            stroke="#d4c39c"
            strokeWidth="1.5"
          />

          {/* Inner Dashed Border */}
          <path
            d="M 63 75 L 97 75 L 118 96 L 118 152 C 118 155, 115 158, 112 158 L 48 158 C 45 158, 42 155, 42 152 L 42 96 Z"
            fill="none"
            stroke="#d4c39c"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />

          {/* Reinforcement Eyelet Hole */}
          <circle cx="80" cy="85" r="5" fill="#fdfaf3" stroke="#b45309" strokeWidth="1.8" />
          <circle cx="80" cy="85" r="2.5" fill="#2b1646" />

          {/* Tag Text */}
          <text
            x="80"
            y="114"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="10"
            fontWeight="600"
            letterSpacing="0.05em"
            fill="#5c4d36"
          >
            A Bouquet
          </text>

          <text
            x="80"
            y="128"
            textAnchor="middle"
            fontFamily="'Dancing Script', cursive"
            fontSize="13"
            fontWeight="700"
            fill="#be123c"
          >
            For You ♡
          </text>

          {/* Little Floral Filigree */}
          <text
            x="80"
            y="146"
            textAnchor="middle"
            fontSize="9"
            fill="#d97706"
          >
            ✧ ❦ ✧
          </text>
        </g>
      </svg>
    </div>
  );
};
