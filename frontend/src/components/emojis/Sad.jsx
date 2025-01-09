import React from 'react';

const Sad = ({ width = 40, height = 40 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    height={height} 
    width={width} 
    aria-label="Sad face icon"
  >
    <defs>
      <style>
        {`
          .sad-brown { fill: #864e20; }
          .sad-yellow { fill: #f9df41; }
          .sad-gold { fill: #e7c930; }
        `}
      </style>
    </defs>
    <rect x="1" y="1" width="22" height="22" rx="7.656" className="sad-yellow" />
    <path className="sad-brown" d="M7.055 7.313A1.747 1.747 0 1 0 8.8 9.059a1.747 1.747 0 0 0-1.745-1.746zM16.958 7.313A1.747 1.747 0 1 0 18.7 9.059a1.747 1.747 0 0 0-1.742-1.746z" />
    <path className="sad-gold" d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z" />
    <path className="sad-brown" d="M16.6 13.851a8.62 8.62 0 0 0-4.6-1.27 8.62 8.62 0 0 0-4.6 1.27s-.451.274-.169-.273 1.867-.93 1.882-1.133a4.862 4.862 0 0 1 5.782 0c.015.2 1.6.586 1.882 1.133s-.177.273-.177.273z" />
    <path className="sad-gold" d="M14.422 14.955a4.793 4.793 0 0 0-4.844 0c-.424.228-.476-.164.352-.657a4.093 4.093 0 0 1 2.07-.656 4.093 4.093 0 0 1 2.07.656c.83.493.776.885.352.657z" />
  </svg>
);

export default Sad;
