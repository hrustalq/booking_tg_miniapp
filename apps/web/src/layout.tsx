import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="mobile-layout">
      <header className="mobile-header">
        {/* Add your header content here */}
        <h1>My App</h1>
      </header>

      <main className="mobile-main">
        <Outlet />
      </main>

      <footer className="mobile-footer">
        {/* Add your footer content here */}
        <p>&copy; 2023 My App</p>
      </footer>
    </div>
  );
};

export default Layout;
