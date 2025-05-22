import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, Search, LayoutDashboard, Users, Calendar, Settings, Menu as MenuIcon } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Michael Brown confirmed his appointment', time: '5 min ago' },
    { id: 2, text: 'Follow-up reminder sent to Jennifer Davis', time: '1 hour ago' },
    { id: 3, text: 'Robert Wilson missed his appointment', time: '3 hours ago' }
  ];

  const mobileNavItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Reminders', path: '/reminders', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleProfileAction = (action: string) => {
    switch (action) {
      case 'profile':
        navigate('/settings');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'help':
        window.open('https://support.healthcareclinic.com', '_blank');
        break;
      case 'signout':
        // Implement sign out logic here
        navigate('/');
        break;
    }
    setIsProfileOpen(false);
  };

  const handleNotificationClick = (id: number) => {
    // Implement notification handling logic
    console.log(`Notification ${id} clicked`);
    setIsNotificationsOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <MenuIcon className="w-6 h-6" />
        </button>

        <div className="hidden md:flex-1 md:flex md:max-w-md">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              placeholder="Search patients, appointments..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <p className="text-sm text-gray-700">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-200">
                  <button 
                    className="block w-full text-center text-sm font-medium text-cyan-600 hover:text-cyan-700 px-4 py-2"
                    onClick={() => navigate('/notifications')}
                  >
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
            >
              <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white font-medium">
                JS
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                Dr. Smith
              </span>
              <ChevronDown className="hidden md:inline-block w-4 h-4 text-gray-500" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <button 
                    onClick={() => handleProfileAction('profile')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </button>
                  <button 
                    onClick={() => handleProfileAction('settings')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <button 
                    onClick={() => handleProfileAction('help')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Help & Support
                  </button>
                  <div className="border-t border-gray-100"></div>
                  <button 
                    onClick={() => handleProfileAction('signout')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 py-3 space-y-1">
            {mobileNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 text-base rounded-md ${
                    isActive 
                      ? 'bg-cyan-50 text-cyan-700 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;