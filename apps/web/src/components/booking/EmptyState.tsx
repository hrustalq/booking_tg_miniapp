import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => (
  <div className="flex flex-col items-center justify-center h-full py-12 text-gray-500 dark:text-gray-400">
    {icon}
    <p className="text-lg font-medium">{message}</p>
  </div>
);