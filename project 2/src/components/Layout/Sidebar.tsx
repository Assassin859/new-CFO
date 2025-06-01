import React from 'react';
import { 
  LayoutDashboard, 
  BarChart4, 
  TrendingUp, 
  FileText, 
  Users, 
  Settings, 
  MessageSquare,
  CreditCard,
  AlertCircle
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

interface NavItem {
  name: string;
  icon: React.ReactNode;
  current: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigation: NavItem[] = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, current: true },
    { name: 'Financial Intelligence', icon: <BarChart4 size={20} />, current: false },
    { name: 'Cash Flow', icon: <TrendingUp size={20} />, current: false },
    { name: 'Strategy', icon: <MessageSquare size={20} />, current: false },
    { name: 'Expenses', icon: <CreditCard size={20} />, current: false },
    { name: 'Competitors', icon: <Users size={20} />, current: false },
    { name: 'Reports', icon: <FileText size={20} />, current: false },
    { name: 'Alerts', icon: <AlertCircle size={20} />, current: false },
  ];

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-700">FinanceAI</h1>
      </div>
      <div className="overflow-y-auto h-full pb-20">
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`group flex items-center px-3 py-3 rounded-md text-sm font-medium ${
                  item.current
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className={`mr-3 ${item.current ? 'text-indigo-700' : 'text-gray-500 group-hover:text-gray-600'}`}>
                  {item.icon}
                </span>
                {item.name}
              </a>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200">
            <a
              href="#"
              className="group flex items-center px-3 py-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              <span className="mr-3 text-gray-500 group-hover:text-gray-600">
                <Settings size={20} />
              </span>
              Settings
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;