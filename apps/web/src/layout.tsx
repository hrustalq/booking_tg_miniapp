import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import { RootHeader } from './components/root-header';
import BottomNavigation from './components/bottom-navigation';

const Layout: React.FC = () => {
  const { theme } = useTheme();

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'light':
        return 'bg-white text-gray-900';
      case 'system':
        return 'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white';
      default:
        return 'bg-white text-gray-900';
    }
  };

  return (
    <div className={`flex flex-col min-h-screen font-sans ${getThemeClasses()}`}>
      <RootHeader title="Bananagun" />

      <main className={`flex-grow p-4 mt-16 ${getThemeClasses()}`}>
        <Outlet />
      </main>

      <BottomNavigation />
      <footer className="p-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Bananagun</p>
      </footer>
    </div>
  );
};

export default Layout;
