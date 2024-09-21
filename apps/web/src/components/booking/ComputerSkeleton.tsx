import React from 'react';

export const ComputerSkeleton: React.FC = () => (
  <div className="rounded-lg overflow-hidden shadow-md bg-gray-200 dark:bg-gray-700 animate-pulse">
    <div className="p-4 pb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  </div>
);