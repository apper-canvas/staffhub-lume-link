import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

// Icon declarations
const UsersIcon = getIcon('Users');
const BarChart2Icon = getIcon('BarChart2');
const CalendarIcon = getIcon('Calendar');
const BellIcon = getIcon('Bell');
const UserIcon = getIcon('User');
const LogOutIcon = getIcon('LogOut');
const MenuIcon = getIcon('Menu');
const XIcon = getIcon('X');

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentNotifications] = useState(3);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDemoAction = () => {
    toast.success("Action performed successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
        <div className="flex items-center space-x-2">
          <img 
            src="https://source.unsplash.com/kn-UmDZQDjM/100x100" 
            alt="StaffHub Logo" 
            className="h-8 w-8 rounded-md"
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            StaffHub
          </h1>
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
        >
          {sidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed inset-0 z-50 md:relative md:z-0 ${sidebarOpen ? 'block' : 'hidden'} md:block bg-white dark:bg-surface-800 md:w-64 lg:w-72 border-r border-surface-200 dark:border-surface-700 flex-shrink-0 transition-all duration-200`}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 flex items-center space-x-3 border-b border-surface-200 dark:border-surface-700">
            <img 
              src="https://source.unsplash.com/kn-UmDZQDjM/100x100" 
              alt="StaffHub Logo" 
              className="h-10 w-10 rounded-md"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              StaffHub
            </h1>
            <button 
              onClick={toggleSidebar}
              className="ml-auto p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 md:hidden"
            >
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
            <div className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-4 pl-2">
              Main
            </div>
            {[
              { icon: <UsersIcon className="h-5 w-5" />, name: "Employees", active: true },
              { icon: <BarChart2Icon className="h-5 w-5" />, name: "Analytics" },
              { icon: <CalendarIcon className="h-5 w-5" />, name: "Attendance" }
            ].map((item, index) => (
              <button 
                key={index}
                onClick={handleDemoAction}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  item.active 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-surface-100 dark:hover:bg-surface-700"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {item.active && (
                  <div className="ml-auto w-1.5 h-5 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
            
            <div className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-4 mt-8 pl-2">
              Notifications
            </div>
            <button 
              onClick={handleDemoAction}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <BellIcon className="h-5 w-5" />
                <span>Alerts</span>
              </div>
              {currentNotifications > 0 && (
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-accent text-white text-xs font-medium">
                  {currentNotifications}
                </div>
              )}
            </button>
          </nav>
          
          {/* User Section */}
          <div className="p-4 border-t border-surface-200 dark:border-surface-700">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="https://source.unsplash.com/Tu1XKJtLMQ4/100x100" 
                  alt="User avatar" 
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-surface-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">Sarah Johnson</div>
                <div className="text-xs text-surface-500 truncate">HR Manager</div>
              </div>
              <button 
                onClick={handleDemoAction}
                className="p-1.5 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
              >
                <LogOutIcon className="h-5 w-5 text-surface-500" />
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="hidden md:flex justify-between items-center p-4 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-xl font-semibold">Employee Management</h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleDemoAction}
              className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 relative"
            >
              <BellIcon className="h-5 w-5" />
              {currentNotifications > 0 && (
                <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-accent text-white text-[10px] font-medium flex items-center justify-center">
                  {currentNotifications}
                </div>
              )}
            </button>
            <div className="flex items-center space-x-2">
              <img 
                src="https://source.unsplash.com/Tu1XKJtLMQ4/100x100" 
                alt="User avatar" 
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="font-medium">Sarah Johnson</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-surface-50 dark:bg-surface-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card mb-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Welcome, Sarah</h2>
                    <p className="text-surface-500">Manage your team and track progress</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button 
                      onClick={handleDemoAction}
                      className="btn btn-primary"
                    >
                      <UserIcon className="h-4 w-4" />
                      <span>Add Employee</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Total Employees", value: "124", change: "+4%", trend: "up" },
                    { label: "Active Projects", value: "12", change: "0%", trend: "neutral" },
                    { label: "Pending Reviews", value: "8", change: "-2%", trend: "down" },
                  ].map((stat, index) => (
                    <div key={index} className="neu-card flex flex-col">
                      <div className="text-surface-500 mb-1">{stat.label}</div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className={`text-sm ${
                        stat.trend === "up" ? "text-green-500" :
                        stat.trend === "down" ? "text-red-500" :
                        "text-surface-500"
                      }`}>
                        {stat.change} from last week
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <MainFeature />
            </motion.div>
          </div>
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}