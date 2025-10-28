
import React from 'react';
import { UserIcon, BotIcon } from './icons/StatusIcons';
import { CloseIcon } from './icons/CloseIcon';

interface DashboardPanelProps {
  onClose: () => void;
}

const DashboardPanel: React.FC<DashboardPanelProps> = ({ onClose }) => {
  const users = [
    { id: 'USER-001', name: 'Ahmed Mahmoud', lastMessage: 'Thank you!', status: 'active' },
    { id: 'USER-002', name: 'Fatima Ali', lastMessage: 'Can I get help?', status: 'active' },
    { id: 'BOT-001', name: 'Help Bot', lastMessage: 'Of course, how can I help?', status: 'bot' },
    { id: 'USER-003', name: 'Khalid Saeed', lastMessage: 'Product information', status: 'inactive' },
    { id: 'USER-004', name: 'Noura Hassan', lastMessage: 'Problem solved', status: 'inactive' },
  ];

  return (
    <div dir="ltr" className="h-full bg-white rounded-r-xl shadow-sm border-l border-gray-200 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <h1 id="dashboard-title" className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button 
          onClick={onClose} 
          className="p-1 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100"
          aria-label="Close dashboard"
        >
          <CloseIcon />
        </button>
      </div>
      <p className="text-gray-500 mb-6">Users Overview</p>
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="font-semibold text-gray-600 p-3 border-b border-gray-200">User</th>
              <th className="font-semibold text-gray-600 p-3 border-b border-gray-200">Last Message</th>
              <th className="font-semibold text-gray-600 p-3 border-b border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      {user.status === 'bot' ? <BotIcon /> : <UserIcon />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3 border-b border-gray-200 text-gray-500 max-w-[120px] truncate">{user.lastMessage}</td>
                <td className="p-3 border-b border-gray-200">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'bot' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors">
            View All Users
        </button>
      </div>
    </div>
  );
};

export default DashboardPanel;
