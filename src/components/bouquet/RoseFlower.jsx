import React from 'react';

export const RoseFlower = ({ className = '', isHovered = false, isSelected = false }) => {
  return (
    <div
      className={`relative transition-all duration-500 ease-out ${
        isHovered ? 'scale-105 filter drop-shadow-[0_0_24px_rgba(225,29,72,0.85)]' : ''
      } ${isSelected ? 'scale-110 filter drop-shadow-[0_0_35px_rgba(244,63,94,0.95)]' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-700"
      >
        <defs>
          <linearGradient id="roseDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4c0519" />
            <stop offset="40%" stopColor="#881337" />
            <stop offset="80%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>

          <linearGradient id="roseMediumGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#881337" />
            <stop offset="35%" stopColor="#be123c" />
            <stop offset="70%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>

          <linearGradient id="roseLightGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#be123c" />
            <stop offset="50%" stopColor="#e11d48" />
            <stop offset="85%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>

          <radialGradient id="roseShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4c0519" />
            <stop offset="70%" stopColor="#881337" />
            <stop offset="100%" stopColor="#9f1239" />
          </radialGradient>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="140" cy="140" r="100" fill="#be123c" opacity="0.15" />

        {/* Layer 1: Outermost Flared Petals */}
        <g id="outer-petals">
          {/* Bottom Outer Petal */}
          <path
            d="M 60 170 C 50 230, 230 230, 220 170 C 180 200, 100 200, 60 170 Z"
            fill="url(#roseDarkGrad)"
            stroke="#9f1239"
            strokeWidth="0.8"
          />
          {/* Left Flared Petal */}
          <path
            d="M 60 170 C 15 130, 30 60, 100 50 C 75 90, 85 140, 60 170 Z"
            fill="url(#roseDarkGrad)"
            stroke="#9f1239"
            strokeWidth="0.8"
          />
          {/* Right Flared Petal */}
          <path
            d="M 220 170 C 265 130, 250 60, 180 50 C 205 90, 195 140, 220 170 Z"
            fill="url(#roseDarkGrad)"
            stroke="#9f1239"
            strokeWidth="0.8"
          />
          {/* Top Petal */}
          <path
            d="M 100 50 C 115 20, 165 20, 180 50 C 150 40, 130 40, 100 50 Z"
            fill="url(#roseMediumGrad)"
            stroke="#be123c"
            strokeWidth="0.8"
          />
        </g>

        {/* Layer 2: Mid Overlapping Petals */}
        <g id="mid-petals">
          {/* Front Left Curled Petal */}
          <path
            d="M 70 145 C 65 190, 140 215, 175 185 C 130 195, 95 175, 70 145 Z"
            fill="url(#roseMediumGrad)"
            stroke="#fb7185"
            strokeWidth="0.8"
          />
          {/* Front Right Curled Petal */}
          <path
            d="M 210 145 C 215 190, 140 215, 105 185 C 150 195, 185 175, 210 145 Z"
            fill="url(#roseMediumGrad)"
            stroke="#fb7185"
            strokeWidth="0.8"
          />
          {/* Left Upper Shield Petal */}
          <path
            d="M 85 85 C 60 115, 75 160, 120 165 C 95 140, 95 105, 85 85 Z"
            fill="url(#roseMediumGrad)"
            stroke="#fb7185"
            strokeWidth="0.8"
          />
          {/* Right Upper Shield Petal */}
          <path
            d="M 195 85 C 220 115, 205 160, 160 165 C 185 140, 185 105, 195 85 Z"
            fill="url(#roseMediumGrad)"
            stroke="#fb7185"
            strokeWidth="0.8"
          />
        </g>

        {/* Layer 3: Inner Rose Cup / Swirl */}
        <g id="inner-cup">
          {/* Cup Base */}
          <path
            d="M 100 120 C 100 170, 180 170, 180 120 C 165 145, 115 145, 100 120 Z"
            fill="url(#roseLightGrad)"
            stroke="#fda4af"
            strokeWidth="1"
          />
          {/* Spiral Lip 1 */}
          <path
            d="M 110 110 C 110 80, 170 80, 170 110 C 155 95, 125 95, 110 110 Z"
            fill="url(#roseLightGrad)"
            stroke="#fda4af"
            strokeWidth="0.9"
          />
          {/* Center Spiral Core */}
          <path
            d="M 125 112 C 120 135, 160 135, 155 112 C 150 124, 130 124, 125 112 Z"
            fill="url(#roseDarkGrad)"
            stroke="#fda4af"
            strokeWidth="0.7"
          />
          {/* Deep Velvet Heart */}
          <ellipse cx="140" cy="115" rx="14" ry="10" fill="url(#roseShadow)" />
          {/* Tight inner swirl petal edge */}
          <path
            d="M 132 113 Q 140 106 148 114 Q 140 118 132 113"
            fill="#fda4af"
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  );
};
