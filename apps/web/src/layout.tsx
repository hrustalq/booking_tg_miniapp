import React from 'react';
import { Outlet } from 'react-router-dom';
import { RootHeader } from './components/root-header';
import BottomNavigation from './components/bottom-navigation';
import { Toaster } from './components/ui/toaster';

const Layout: React.FC = () => {
  return (
    <div className={`flex flex-col my-16 font-sans`}>
      <RootHeader />

      <main className={`p-4 h-[calc(100vh-8rem)] flex flex-col`}>
        <Outlet />
        <Toaster />
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Layout;
