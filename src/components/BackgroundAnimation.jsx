// src/components/BackgroundAnimation.jsx
import React from 'react';

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Clean gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-red-50 to-white"></div>
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-red-200 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border-2 border-red-200 rounded-full"></div>
      </div>
      
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#f8f8f8_1px,transparent_1px),linear-gradient(#f8f8f8_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
    </div>
  );
};

export default BackgroundAnimation;