import React from 'react';

const LogoSVG = ({ className = 'w-48 h-48' }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main chat bubble */}
      <path
        d="M100 20c-44.183 0-80 35.817-80 80 0 44.183 35.817 80 80 80 44.183 0 80-35.817 80-80 0-44.183-35.817-80-80-80z"
        fill="url(#logoGradient)"
        className="animate-pulse"
      />

      {/* Expression elements */}
      <g fill="white" filter="url(#glow)">
        {/* Left eye */}
        <circle cx="70" cy="90" r="12" className="animate-bounce">
          <animate
            attributeName="r"
            values="12;14;12"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Right eye */}
        <circle cx="130" cy="90" r="12" className="animate-bounce">
          <animate
            attributeName="r"
            values="12;14;12"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Smile */}
        <path
          d="M70 120 Q100 150 130 120"
          stroke="white"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        >
          <animate
            attributeName="d"
            values="M70 120 Q100 150 130 120;M70 120 Q100 160 130 120;M70 120 Q100 150 130 120"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        {/* Sparkles */}
        <circle cx="160" cy="60" r="4">
          <animate
            attributeName="opacity"
            values="1;0;1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="40" cy="60" r="4">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};

export default LogoSVG;
