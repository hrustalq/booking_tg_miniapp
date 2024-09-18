import React from 'react';
import { Outlet } from 'react-router-dom';
import { RootHeader } from './components/root-header';
import BottomNavigation from './components/bottom-navigation';

const Layout: React.FC = () => {
  return (
    <div className={`flex flex-col my-16 font-sans`}>
      <RootHeader title="Bananagun" />

      <main className={`p-4 flex flex-col`}>
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Layout;
