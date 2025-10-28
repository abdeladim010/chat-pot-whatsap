
import React, { useState } from 'react';
import DashboardPanel from './components/DashboardPanel';
import ChatPanel from './components/ChatPanel';

const App: React.FC = () => {
  const [isDashboardVisible, setIsDashboardVisible] = useState(false);

  const toggleDashboard = () => {
    setIsDashboardVisible(prev => !prev);
  };

  return (
    <div className="h-screen bg-gray-50 font-sans text-gray-800 relative overflow-hidden">
      {/* Chat panel now takes up the full view */}
      <div className="h-full">
        <ChatPanel onToggleDashboard={toggleDashboard} />
      </div>

      {/* Backdrop, shown when dashboard is visible */}
      {isDashboardVisible && (
        <div
          onClick={toggleDashboard}
          className="fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity"
          aria-hidden="true"
        ></div>
      )}

      {/* Dashboard as a sliding overlay */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-full max-w-md transform transition-transform duration-300 ease-in-out ${
          isDashboardVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-title"
      >
        <DashboardPanel onClose={toggleDashboard} />
      </div>
    </div>
  );
};

export default App;
