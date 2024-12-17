import React from 'react';
import LogoSVG from './LogoSVG';

const Logo = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <LogoSVG className="w-32 h-32" />
      <div className="text-center">
        <h1 className="text-3xl font-extrabold">
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            feelo
          </span>
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            chat
          </span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Let your expressions talk</p>
      </div>
    </div>
  );
};

export default Logo;
