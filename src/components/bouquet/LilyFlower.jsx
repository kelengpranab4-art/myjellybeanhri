import React from 'react';

export const LilyFlower = ({ className = '', isHovered = false, isSelected = false }) => {
  return (
    <div
      className={`relative transition-all duration-500 ease-out ${
        isHovered ? 'scale-105 filter drop-shadow-[0_0_20px_rgba(244,114,182,0.8)]' : ''
      } ${isSelected ? 'scale-110 filter drop-shadow-[0_0_30px_rgba(251,113,133,0.95)]' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-700"
      >
        <defs>
          {/* Petal Gradients */}
          <linearGradient id="lilyPetalGrad1" x1="0%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#831843" />
            <stop offset="25%" stopColor="#be185d" />
            <stop offset="65%" stopColor="#f472b6" />
            <stop offset="90%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#fff1f2" />
          </linearGradient>

          <linearGradient id="lilyPetalGrad2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#9d174d" />
            <stop offset="30%" stopColor="#db2777" />
            <stop offset="70%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#fce7f3" />
          </linearGradient>

          <linearGradient id="lilyCenterThroat" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="60%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#365314" />
          </linearGradient>

          <filter id="lilyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Back Glow */}
        <circle cx="160" cy="160" r="110" fill="url(#lilyPetalGrad1)" opacity="0.12" />

        {/* Outer/Back Petals */}
        <g id="back-petals" opacity="0.95">
          {/* Top Petal */}
          <path
            d="M 160 160 C 145 110, 125 50, 160 10 C 195 50, 175 110, 160 160 Z"
            fill="url(#lilyPetalGrad1)"
            stroke="#fda4af"
            strokeWidth="0.8"
          />
          {/* Bottom Left Petal */}
          <path
            d="M 160 160 C 115 170, 50 205, 20 235 C 45 255, 115 220, 160 160 Z"
            fill="url(#lilyPetalGrad2)"
            stroke="#fda4af"
            strokeWidth="0.8"
          />
          {/* Bottom Right Petal */}
          <path
            d="M 160 160 C 205 170, 270 205, 300 235 C 275 255, 205 220, 160 160 Z"
            fill="url(#lilyPetalGrad1)"
            stroke="#fda4af"
            strokeWidth="0.8"
          />
        </g>

        {/* Mid Petals with reflex curves */}
        <g id="mid-petals">
          {/* Top Left Petal */}
          <path
            d="M 160 160 C 120 130, 45 100, 25 60 C 65 65, 125 120, 160 160 Z"
            fill="url(#lilyPetalGrad2)"
            stroke="#fbcfe8"
            strokeWidth="1"
          />
          {/* Top Right Petal */}
          <path
            d="M 160 160 C 200 130, 275 100, 295 60 C 255 65, 195 120, 160 160 Z"
            fill="url(#lilyPetalGrad1)"
            stroke="#fbcfe8"
            strokeWidth="1"
          />
          {/* Bottom Central Petal */}
          <path
            d="M 160 160 C 145 210, 140 280, 160 310 C 180 280, 175 210, 160 160 Z"
            fill="url(#lilyPetalGrad2)"
            stroke="#fbcfe8"
            strokeWidth="1"
          />
        </g>

        {/* Inner Throat Radiance */}
        <ellipse cx="160" cy="160" rx="35" ry="35" fill="url(#lilyCenterThroat)" opacity="0.85" />

        {/* Botanical Freckles / Papillae on Petals */}
        <g fill="#831843" opacity="0.75">
          <circle cx="156" cy="130" r="1.5" />
          <circle cx="164" cy="125" r="1.2" />
          <circle cx="152" cy="115" r="1.4" />
          <circle cx="168" cy="110" r="1.3" />
          <circle cx="158" cy="98" r="1" />
          
          <circle cx="135" cy="150" r="1.5" />
          <circle cx="120" cy="142" r="1.3" />
          <circle cx="108" cy="135" r="1.2" />
          <circle cx="95" cy="120" r="1.4" />
          
          <circle cx="185" cy="150" r="1.5" />
          <circle cx="200" cy="142" r="1.3" />
          <circle cx="212" cy="135" r="1.2" />
          <circle cx="225" cy="120" r="1.4" />
          
          <circle cx="145" cy="178" r="1.4" />
          <circle cx="130" cy="190" r="1.2" />
          <circle cx="175" cy="178" r="1.4" />
          <circle cx="190" cy="190" r="1.2" />
          <circle cx="160" cy="205" r="1.3" />
        </g>

        {/* Stamens & Pistil */}
        <g stroke="#bef264" strokeWidth="2.5" strokeLinecap="round">
          {/* Stamen 1 */}
          <path d="M 160 160 Q 140 135 125 105" />
          {/* Stamen 2 */}
          <path d="M 160 160 Q 155 125 150 90" />
          {/* Stamen 3 */}
          <path d="M 160 160 Q 170 125 178 95" />
          {/* Stamen 4 */}
          <path d="M 160 160 Q 185 140 205 115" />
          {/* Stamen 5 */}
          <path d="M 160 160 Q 135 170 110 185" />
          {/* Central Pistil (green) */}
          <path d="M 160 160 Q 160 140 160 98" stroke="#4ade80" strokeWidth="3.2" />
        </g>

        {/* Anthers (Golden pollen pods) */}
        <g fill="#b45309" stroke="#78350f" strokeWidth="0.8">
          <ellipse cx="123" cy="103" rx="5" ry="2.8" transform="rotate(-30 123 103)" />
          <ellipse cx="148" cy="88" rx="5" ry="2.8" transform="rotate(-10 148 88)" />
          <ellipse cx="180" cy="93" rx="5" ry="2.8" transform="rotate(25 180 93)" />
          <ellipse cx="207" cy="113" rx="5" ry="2.8" transform="rotate(45 207 113)" />
          <ellipse cx="108" cy="187" rx="5" ry="2.8" transform="rotate(-50 108 187)" />
          {/* Stigma Head */}
          <circle cx="160" cy="96" r="4.2" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
        </g>

        {/* Central Core Shimmer */}
        <circle cx="160" cy="160" r="8" fill="#fef08a" opacity="0.8" />
      </svg>
    </div>
  );
};
