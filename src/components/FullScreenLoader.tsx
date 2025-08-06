import React from 'react';

interface FullScreenLoaderProps {
  isVisible: boolean;
}

export default function FullScreenLoader({ isVisible }: FullScreenLoaderProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm flex items-center justify-center">
      <div className="text-center">
        {/* Custom Loader Animation */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-transparent border-t-purple-600 rounded-full animate-spin animation-delay-150"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-lg font-semibold text-gray-700 mb-2">Loading</p>
        <p className="text-sm text-gray-500">Please wait...</p>
      </div>
    </div>
  );
}
