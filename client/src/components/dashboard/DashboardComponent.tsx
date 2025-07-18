import { useState, useEffect } from "react";
import {
  Menu,
  X,
  // Home,
  Settings,
  Bell,
  User,
  // ChevronLeft,
  // ChevronRight,
  Power,
  // Sun,
  // Moon,
  Upload,
  LayoutDashboard,
} from "lucide-react";
import SettingsContent from "./SettingsContent";
import HomeContent from "./HomeContent";
import ProfileUpload from "./ProfileUpload";
import { AuthContextType } from "../../types/user";
import { useAuth } from "../../hooks/useAuth";
import UploadDocument from "./UploadDocument";
import { useNavigate } from "react-router-dom";
// import Earnings from "./NotificationInterface";
import NotificationInterface from "./NotificationInterface";
import NotificationFilter from "./NotificationFilter";

// import ProfileUpdate from "./ProfileUpload";

const DashboardComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  // const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuth() as AuthContextType;
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

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
    { icon: LayoutDashboard, label: "Dashboard", key: "dashboard" },
    // { icon: User, label: "Projects", key: "project" },
    // { icon: User, label: "Applications", key: "application" },
    // { icon: User, label: "Message", key: "message" },
    { icon: User, label: "Notification", key: "notification" },

    { icon: Settings, label: "Settings", key: "setting" },

    { icon: Upload, label: " Profile", key: "profile" },
    { icon: Upload, label: " Uploads", key: "upload" },
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
      // alert("Logged out successfully!");
      logout();
    }
  };

  const handleMenuClick = (key: string) => {
    setActiveSection(key);
    if (isMobile) {
      setSidebarOpen(false); // Close sidebar on mobile after selection
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <HomeContent />;
      case "upload":
        return <UploadDocument />;
      case "notification":
        return <NotificationInterface />;
      case "profile":
        return <ProfileUpload />;
      case "setting":
        return <SettingsContent />;
      default:
        return <HomeContent />;
    }
  };

  return (
    <div className={`flex h-screen  bg-gray-50`}>
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
            : `${sidebarCollapsed ? "w-20" : "w-64"}`
        }
      `}
      >
        <div className="flex flex-col h-full bg-gradient-to-b from-[#552EA4] to-[#201437]">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4">
            {/* <div
              className={`flex items-center w-full justify-center space-x-3 ${
                sidebarCollapsed && !isMobile ? "justify-center" : ""
              }`}
            >
              {(!sidebarCollapsed || isMobile) && (
                <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center mt-10 mx-auto">
                  <User className="w-10 h-10 text-[#552EA4]" />
                </div>
              )}
            </div> */}

            {/* Desktop collapse button */}
            {/* {!isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-lg  hover:bg-opacity-20 transition-colors"
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-white" />
                ) : (
                  <ChevronLeft className="w-5 h-5 text-white" />
                )}
              </button>
            )} */}

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
          <nav className="flex-1 px-2 lg:px-4  py-6 space-y-2 text-white">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.key;
              return (
                <button
                  key={index}
                  onClick={() => handleMenuClick(item.key)}
                  className={`
                    w-full flex gap-3 items-center justify-center lg:px-3 py-2 rounded-lg  text-[#5A399D]  text-center font-black text-base border hover:bg-transparent hover:text-white hover:border border-white  transition-all duration-200
                    ${
                      isActive
                        ? " bg-transparent text-white"
                        : "text-[text-[#5A399D]]  bg-white"
                    }
                    ${sidebarCollapsed && !isMobile ? "justify-center" : ""}
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      !sidebarCollapsed || isMobile ? "" : ""
                    }`}
                  />
                  {(!sidebarCollapsed || isMobile) && <span>{item.label}</span>}
                </button>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex gap-3 items-center justify-center px-3 py-1 rounded-lg  bg-white text-[#5A399D]  text-center font-black text-base border hover:bg-transparent hover:text-white hover:border border-white transition-all duration-300 mt-8"
            >
              <Power
                className={`w-5 h-5 ${
                  !sidebarCollapsed || isMobile ? "mr-3" : ""
                }`}
              />
              {(!sidebarCollapsed || isMobile) && <span>Logout</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-md border-b border-[#201437] py-2 h-16">
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
              <div className="relative">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                  onClick={() => setShowNotifications((prev) => !prev)}
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 z-50 w-96">
                    <NotificationFilter />
                  </div>
                )}
              </div>

              {/* Dark mode toggle */}
              {/* <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-gray-600" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button> */}

              {/* Profile */}
              <button className="border-2 border-[#552EA4] rounded-full hover:bg-gray-100 w-[40px] h-[40px] flex items-center justify-center transition-colors">
                <User className="w-6 h-6 text-[#552EA4]" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardComponent;
