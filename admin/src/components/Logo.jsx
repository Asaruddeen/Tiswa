import React from 'react';

export default function Logo({ size = 'md', className = '', showText = true }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizes[size]} rounded-2xl bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-lg flex-shrink-0`}>
        <img 
          src="/favicon.svg" 
          alt="TISWA Logo" 
          className="w-3/4 h-3/4 object-contain filter brightness-0 invert"
        />
      </div>
      {showText && (
        <div>
          <span className={`font-bold text-gray-800 ${textSizes[size]}`}>
            TISWA
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-gray-500 block -mt-1">Admin Panel</span>
          )}
        </div>
      )}
    </div>
  );
}