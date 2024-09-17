import React from 'react';
import { TypographyH3 } from './typography';
import { useTheme } from '@/hooks/use-theme';
import { LuLoader } from 'react-icons/lu';

const LoadingFallback: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center justify-center w-full h-full min-h-screen max-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="text-center">
        <LuLoader className="animate-spin text-4xl mb-4 mx-auto" />
        <TypographyH3>Loading...</TypographyH3>
      </div>
    </div>
  );
}

export default LoadingFallback
