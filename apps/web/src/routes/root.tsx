import React from 'react';

const RootPage: React.FC = () => {
  return (
    <div className="mobile-layout">
      <main className="mobile-main">
        root page
      </main>

      <footer className="mobile-footer">
        {/* Add your footer content here */}
        <p>&copy; 2023 My App</p>
      </footer>
    </div>
  );
};

export default RootPage;
