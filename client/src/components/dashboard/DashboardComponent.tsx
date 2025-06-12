import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  // Users,
  // BarChart3,
  Settings,
  Bell,
  // Sun,
  // Search,
  User,
  ChevronLeft,
  ChevronRight,
  // FileText,
  // Calendar,
  // Mail,
  Power,
  Upload,
  Sun,
} from "lucide-react";
import UploadDocument from "./UploadDocument";
import { useAuth } from "../../hooks/useAuth";
import type { AuthContextType } from "../../types/user";

const DashboardComponent = () => {
  const navigate = useNavigate();
  const { logout } = useAuth() as AuthContextType;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const menuItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Upload, label: "Upload pictures" },
    { icon: User, label: "Profile Details" },
    // { icon: FileText, label: "Saved Jobs" },
    // { icon: Calendar, label: "Calendar" },
    // { icon: Mail, label: "Messages" },
    { icon: Settings, label: "Settings" },
    // { icon: Power, label: "Logout" },
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative z-50 h-full bg-white shadow-lg transition-all duration-300 ease-in-out
        ${
          isMobile
            ? `${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64`
            : `${sidebarCollapsed ? "w-16" : "w-64"}`
        }
      `}
      >
        <div className="flex flex-col h-full  border-b border-[#552EA4] bg-[#552EA4]">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 ">
            <div
              className={`flex items-center w-full justify-center space-x-3 ${
                sidebarCollapsed && !isMobile ? "justify-center" : ""
              }`}
            >
              {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div> */}
              {(!sidebarCollapsed || isMobile) && (
                // <span className="text-xl font-bold text-gray-800">
                //   Dashboard
                // </span>
                <img
                  src="/dashboard/userImg.png"
                  alt=""
                  className="w-[80px] mt-10 mx-auto"
                />
              )}
            </div>

            {/* Desktop collapse button */}
            {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                )}
              </button>
            )}

            {/* Mobile close button */}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 mt-16 py-6 space-y-2 text-white">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href="#"
                  className={`
                    flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      item.active
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-white hover:bg-gray-50 hover:text-gray-900"
                    }
                    ${sidebarCollapsed && !isMobile ? "justify-center" : ""}
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      !sidebarCollapsed || isMobile ? "mr-3" : ""
                    }`}
                  />
                  {(!sidebarCollapsed || isMobile) && <span>{item.label}</span>}
                </a>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center px-3 py-3 rounded-lg text-sm font-medium text-white hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
            >
              <Power className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>

          {/* User Profile */}
          {/* <div className="p-4 border-t border-gray-200">
            <div
              className={`flex items-center ${
                sidebarCollapsed && !isMobile ? "justify-center" : "space-x-3"
              }`}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              {(!sidebarCollapsed || isMobile) && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">john@example.com</p>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-md border-b border-[#552EA4]  py-2 h-16">
          <div className="flex items-center justify-between h-full px-4">
            {/* Left side - Hamburger menu and title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <img src="/FreebioLogoDark.png" alt="" />
            </div>

            {/* Right side - Search and notifications */}
            <div className="flex items-center space-x-4">
              {/* Search bar - hidden on small screens */}
              {/* <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                />
              </div> */}

              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                {/* <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span> */}
              </button>

              {/* toggle */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Sun className="w-5 h-5 text-gray-600" />
                {/* <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span> */}
              </button>

              {/* Profile */}
              <button className="  border-2 border-[#201437] rounded-full hover:bg-gray-100 w-[40px] transition-colors">
                <img src="/dashboard/userImg.png" alt="" className="w-[50px]" />
                {/* <User className="w-5 h-5 text-gray-600" /> */}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">
                  Welcome to Dashboard
                </h2>
                <p className="text-gray-600">
                  This is your dashboard where you can manage your account and
                  view your data.
                </p>
              </div>
              <UploadDocument />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardComponent;
