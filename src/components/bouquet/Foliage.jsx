import React from 'react';

export const Foliage = ({ className = '' }) => {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="leafGradDeep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4d7c0f" />
            <stop offset="60%" stopColor="#365314" />
            <stop offset="100%" stopColor="#14532d" />
          </linearGradient>

          <linearGradient id="leafGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          <linearGradient id="eucalyptusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a7f3d0" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#065f46" />
          </linearGradient>
        </defs>

        {/* Left Side Eucalyptus Branch */}
        <g id="eucalyptus-left">
          <path
            d="M 230 350 C 180 280, 110 230, 70 150"
            stroke="#065f46"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Round eucalyptus coin leaves */}
          <ellipse cx="80" cy="160" rx="20" ry="14" fill="url(#eucalyptusGrad)" transform="rotate(-30 80 160)" opacity="0.85" />
          <ellipse cx="110" cy="190" rx="22" ry="16" fill="url(#eucalyptusGrad)" transform="rotate(20 110 190)" opacity="0.9" />
          <ellipse cx="130" cy="235" rx="24" ry="17" fill="url(#eucalyptusGrad)" transform="rotate(-15 130 235)" opacity="0.9" />
          <ellipse cx="165" cy="275" rx="26" ry="18" fill="url(#eucalyptusGrad)" transform="rotate(25 165 275)" opacity="0.9" />
        </g>

        {/* Right Side Fern & Leaves */}
        <g id="foliage-right">
          <path
            d="M 250 350 C 310 270, 370 210, 420 140"
            stroke="#14532d"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Elongated pointed leaves */}
          <path
            d="M 420 140 C 440 120, 410 90, 390 120 C 385 130, 400 135, 420 140 Z"
            fill="url(#leafGradLight)"
            opacity="0.9"
          />
          <path
            d="M 380 170 C 410 160, 400 130, 365 150 Z"
            fill="url(#leafGradDeep)"
            opacity="0.9"
          />
          <path
            d="M 340 210 C 380 200, 375 165, 325 190 Z"
            fill="url(#leafGradLight)"
            opacity="0.9"
          />
          <path
            d="M 305 255 C 345 250, 340 215, 290 235 Z"
            fill="url(#leafGradDeep)"
            opacity="0.9"
          />
        </g>

        {/* Top Center Fern Sprig */}
        <g id="top-fern" opacity="0.75">
          <path
            d="M 250 250 C 250 160, 245 90, 240 40"
            stroke="#15803d"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="235" cy="55" rx="10" ry="5" fill="url(#leafGradLight)" transform="rotate(-25 235 55)" />
          <ellipse cx="248" cy="65" rx="10" ry="5" fill="url(#leafGradDeep)" transform="rotate(25 248 65)" />
          <ellipse cx="236" cy="85" rx="12" ry="6" fill="url(#leafGradLight)" transform="rotate(-30 236 85)" />
          <ellipse cx="252" cy="98" rx="12" ry="6" fill="url(#leafGradDeep)" transform="rotate(30 252 98)" />
        </g>
      </svg>
    </div>
  );
};
