import React from 'react';

const Neutral = ({ width = 40, height = 40 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    height={height} 
    width={width} 
    aria-label="Neutral face icon"
  >
    <defs>
      <style>
        {`
          .neutral-brown { fill: #864e20; }
          .neutral-yellow { fill: #f8de40; }
          .neutral-gold { fill: #e7c930; }
        `}
      </style>
    </defs>
    <rect x="1" y="1" width="22" height="22" rx="7.656" className="neutral-yellow" />
    <path 
      className="neutral-brown" 
      d="M7.055 7.313A1.747 1.747 0 1 0 8.8 9.059a1.747 1.747 0 0 0-1.745-1.746zM16.958 7.313A1.747 1.747 0 1 0 18.7 9.059a1.747 1.747 0 0 0-1.742-1.746z" 
    />
    <path 
      className="neutral-brown" 
      d="M14 11.207a.32.32 0 0 0-.313.327 2.1 2.1 0 0 1-.5 1.33A1.593 1.593 0 0 1 12 13.3a1.6 1.6 0 0 1-1.187-.43 2.088 2.088 0 0 1-.5-1.334.32.32 0 1 0-.64-.012 2.712 2.712 0 0 0 .679 1.791 2.211 2.211 0 0 0 1.648.623 2.211 2.211 0 0 0 1.647-.626 2.718 2.718 0 0 0 .679-1.791.322.322 0 0 0-.326-.314z" 
    />
    <path 
      className="neutral-gold" 
      d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" 
    />
  </svg>
);

export default Neutral;
