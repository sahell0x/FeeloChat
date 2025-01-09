import React from 'react';

const Surprised = ({ width = 40, height = 40 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    height={height} 
    width={width} 
    aria-label="Surprised face icon"
  >
    <defs>
      <style>
        {`
          .surprised-white { fill: #fff; }
          .surprised-brown { fill: #864e20; }
          .surprised-gold { fill: #e7c930; }
        `}
      </style>
    </defs>
    <rect x="1" y="1" width="22" height="22" rx="7.656" style={{ fill: '#f8de40' }} />
    <path className="surprised-white" d="M7.055 7.313A1.747 1.747 0 1 0 8.8 9.059a1.747 1.747 0 0 0-1.745-1.746z" />
    <path className="surprised-brown" d="M7.055 8.51a.55.55 0 1 0 .549.549.549.549 0 0 0-.549-.549z" />
    <path className="surprised-white" d="M16.958 7.313A1.747 1.747 0 1 0 18.7 9.059a1.747 1.747 0 0 0-1.742-1.746z" />
    <path className="surprised-gold" d="M23 13.938a14.688 14.688 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" />
    <path className="surprised-brown" d="M16.957 8.51a.55.55 0 1 0 .55.549.55.55 0 0 0-.55-.549z" />
    <ellipse className="surprised-brown" cx="12" cy="13.375" rx="5.479" ry=".297" />
    <ellipse className="surprised-gold" cx="12" cy="14.646" rx="1.969" ry=".229" />
  </svg>
);

export default Surprised;
