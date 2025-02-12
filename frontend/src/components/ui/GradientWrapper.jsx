import React from "react";

function GradientWrapper({ children }) {
  return (
    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

export default GradientWrapper;
