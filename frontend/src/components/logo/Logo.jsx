import React from 'react';
import LogoSVG from './LogoSVG';
import FeeloChat from './FeeloChat';

const Logo = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <LogoSVG className="w-32 h-32" />
      <div className="text-center">
       <FeeloChat></FeeloChat>
        <p className="text-sm text-gray-500 mt-1">Let your expressions talk</p>
      </div>
    </div>
  );
};

export default Logo;
