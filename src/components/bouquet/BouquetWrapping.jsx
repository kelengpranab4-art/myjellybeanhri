import React from 'react';

export const BouquetWrapping = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 460 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
      >
        <defs>
          {/* Translucent Frosted Pink Paper Gradients */}
          <linearGradient id="wrapGradBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#ec4899" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#db2777" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9d174d" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="wrapGradLeftFold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.65" />
            <stop offset="35%" stopColor="#f472b6" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#db2777" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#831843" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="wrapGradRightFold" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fce7f3" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#f472b6" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#be185d" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#831843" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="25%" stopColor="#fb7185" />
            <stop offset="60%" stopColor="#f43f5e" />
            <stop offset="85%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>

          <linearGradient id="ribbonHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Stems bundle visible through translucent wrap */}
        <g stroke="#365314" strokeWidth="6" strokeLinecap="round" opacity="0.65">
          <line x1="210" y1="120" x2="218" y2="440" />
          <line x1="230" y1="110" x2="228" y2="445" />
          <line x1="250" y1="130" x2="238" y2="440" />
          <line x1="190" y1="130" x2="212" y2="435" />
          <line x1="270" y1="140" x2="242" y2="430" />
        </g>

        {/* Back Wrapping Flare */}
        <path
          d="M 50 160 C 110 80, 350 80, 410 160 L 265 440 C 245 460, 215 460, 195 440 Z"
          fill="url(#wrapGradBack)"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.2"
        />

        {/* Front Left Angled Wrap Fold */}
        <path
          d="M 60 170 C 110 190, 180 230, 230 330 L 195 440 C 185 435, 175 380, 150 310 C 110 240, 70 200, 60 170 Z"
          fill="url(#wrapGradLeftFold)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1"
        />

        {/* Front Right Angled Wrap Fold Overlapping */}
        <path
          d="M 400 170 C 350 190, 280 230, 230 330 L 265 440 C 275 435, 285 380, 310 310 C 350 240, 390 200, 400 170 Z"
          fill="url(#wrapGradRightFold)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1"
        />

        {/* Central Lapel Soft Shadow */}
        <path
          d="M 230 330 L 265 440 L 195 440 Z"
          fill="#4c0519"
          opacity="0.3"
        />

        {/* Elegant Pink Satin Ribbon Knot & Tails */}
        {/* Ribbon Left Tail */}
        <path
          d="M 215 350 C 190 380, 180 430, 175 470 C 185 460, 205 420, 222 365 Z"
          fill="url(#ribbonGrad)"
          stroke="#9f1239"
          strokeWidth="0.8"
        />
        <path
          d="M 215 350 C 190 380, 180 430, 175 470"
          stroke="url(#ribbonHighlight)"
          strokeWidth="2"
        />

        {/* Ribbon Right Tail */}
        <path
          d="M 245 350 C 270 380, 280 430, 290 475 C 278 460, 258 420, 238 365 Z"
          fill="url(#ribbonGrad)"
          stroke="#9f1239"
          strokeWidth="0.8"
        />
        <path
          d="M 245 350 C 270 380, 280 430, 290 475"
          stroke="url(#ribbonHighlight)"
          strokeWidth="2"
        />

        {/* Left Bow Loop */}
        <path
          d="M 230 350 C 170 320, 160 370, 230 355 Z"
          fill="url(#ribbonGrad)"
          stroke="#be123c"
          strokeWidth="1"
        />
        <path
          d="M 225 350 C 180 330, 170 365, 225 353"
          stroke="#fff1f2"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Right Bow Loop */}
        <path
          d="M 230 350 C 290 320, 300 370, 230 355 Z"
          fill="url(#ribbonGrad)"
          stroke="#be123c"
          strokeWidth="1"
        />
        <path
          d="M 235 350 C 280 330, 290 365, 235 353"
          stroke="#fff1f2"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Central Ribbon Knot */}
        <ellipse cx="230" cy="350" rx="14" ry="11" fill="url(#ribbonGrad)" stroke="#9f1239" strokeWidth="1" />
        <ellipse cx="228" cy="348" rx="8" ry="5" fill="#fda4af" opacity="0.8" />
      </svg>
    </div>
  );
};
