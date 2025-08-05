import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Power,
  Sun,
  Moon,
  Users,
  Upload,
  // Search,
} from "lucide-react";
import { AuthContextType } from "../../types/user";
import { useAuth } from "../../hooks/useAuth";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuth() as AuthContextType;
  const navigate = useNavigate();
  const location = useLocation();

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
    {
      icon: Home,
      label: "Dashboard",
      key: "dashboard",
      path: "/job-list-dashboard",
    },
    {
      icon: LayoutGrid,
      label: "Projects",
      key: "projects",
      path: "/job-list-dashboard/projects",
    },
    {
      icon: LayoutGrid,
      label: "Profile",
      key: "profile",
      path: "/job-list-dashboard/profile",
    },
    {
      icon: Users,
      label: "Employees",
      key: "employees",
      path: "/job-list-dashboard/employees",
    },
    {
      icon: Upload,
      label: "Add Project",
      key: "addprojects",
      path: "/job-list-dashboard/add-project",
    },
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const getActiveSection = () => {
    const currentPath = location.pathname;
    const menuItem = menuItems.find((item) => item.path === currentPath);
    return menuItem ? menuItem.key : "dashboard";
  };

  return (
    <div className="bg-[#E1DEE8] overflow-y-scroll min-h-screen w-full">
      {/* Top Navigation Bar */}
      <div className="fixed pt-2 top-0 left-0 w-full h-16 z-50 lg:px-20 bg-[#E1DEE8]">
        <header className="bg-[#E1DEE8]">
          <div className="flex items-center justify-between h-full px-4">
            {/* Left side - Hamburger menu and title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div className="text-xl font-bold text-[#552EA4]">
                <img src="/freebioLogo.png" alt="" className="h-[50px]" />
              </div>
            </div>

            {/* Right side - Search and notifications */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => navigate("/jobs-listed")}
                className="text-lg md:text-xl font-bold px-6 py-2 cursor-pointer bg-[#723EDA] border-b-2 rounded-xl border-[#FFE01ACC] hover:bg-[#5a2fc0] transition"
              >
                Job Listing
              </button>
              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Profile */}
              <button className="border-2 border-[#552EA4] rounded-full hover:bg-gray-100 w-[40px] h-[40px] flex items-center justify-center transition-colors">
                <User className="w-6 h-6 text-[#552EA4]" />
              </button>
            </div>
          </div>
        </header>

        {/* Search bar section */}
        {/* <div className="flex items-center justify-between px-4 py-2">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 pl-10 pr-4 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#552EA4] focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <div
        className={`relative flex h-[calc(100vh-2rem)] md:h-[calc(100vh-2rem)] ${
          darkMode ? "dark" : ""
        }`}
      >
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
            ${
              isMobile
                ? `fixed left-0 h-screen w-56 z-50 bg-white rounded-t-[24px] shadow-lg transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } overflow-y-auto`
                : `fixed top-28 left-0 h-screen w-52 z-30 bg-white rounded-t-2xl shadow-lg transition-all duration-300 ease-in-out overflow-hidden`
            }
          `}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4">
              {/* Desktop collapse button */}
              {!isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="p-1 rounded-lg hover:bg-opacity-20 transition-colors"
                >
                  {sidebarCollapsed ? (
                    <ChevronRight className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 text-white" />
                  )}
                </button>
              )}

              {/* Mobile close button */}
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              )}
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-4 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = getActiveSection() === item.key;
                return (
                  <button
                    key={index}
                    onClick={() => handleMenuClick(item.path)}
                    className={`
                     flex gap-3 rounded-lg hover:bg-[#CEC4E2] p-3 w-fit text-center font-semibold transition-all duration-200
                    ${isActive ? "bg-[#CEC4E2]" : "bg-transparent"}
                    ${sidebarCollapsed && !isMobile ? "justify-center" : ""}
                  `}
                  >
                    <Icon
                      className={`w-6 h-6 text-[#5A399D] ${
                        !sidebarCollapsed || isMobile ? "" : ""
                      }`}
                    />
                    {(!sidebarCollapsed || isMobile) && (
                      <span className="text-[#2C3134]">{item.label}</span>
                    )}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={handleLogout}
                className="flex gap-2 rounded-lg hover:bg-[#CEC4E2] p-4 w-fit transition-all duration-300 mt-4"
              >
                <Power
                  className={`w-5 h-5 text-[#5A399D] ${
                    !sidebarCollapsed || isMobile ? "mr-3" : ""
                  }`}
                />
                {(!sidebarCollapsed || isMobile) && (
                  <span className="text-[#2C3134] font-semibold">Logout</span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pr-10 mt-8">
          <div
            className={`w-10/12 transition-all duration-300 ease-in-out
            ${!isMobile ? "ml-0 md:ml-56" : ""}
            h-screen min-h-0"`}
          >
            {/* Main Content Area */}
            <main className="bg-transparent mt-20 rounded-2xl ml-5">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
