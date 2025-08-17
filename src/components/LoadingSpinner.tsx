import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
        <div className="absolute inset-0 w-8 h-8 border-4 border-transparent rounded-full animate-pulse border-t-purple-400 animation-delay-150"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;