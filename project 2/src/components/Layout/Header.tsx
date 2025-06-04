import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 z-30 fixed w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
            <div className="hidden lg:flex ml-8">
              <h1 className="text-2xl font-semibold text-gray-800">FinanceAI</h1>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative mx-4 lg:mx-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={18} className="text-gray-400" />
              </span>
              <input
                className="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 py-2 border-gray-300 bg-gray-100 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                type="text"
                placeholder="Search financial data..."
              />
            </div>
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500">
              <Bell size={20} />
            </button>
            <div className="ml-3 relative">
              <div className="flex items-center">
                <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                    <User size={18} />
                  </div>
                </button>
                <span className="hidden md:flex ml-2 text-sm font-medium text-gray-700">
                  Alex Morgan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;