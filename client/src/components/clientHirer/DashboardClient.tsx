import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  // Settings,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  // CirclePlus,
  Power,
  Sun,
  Moon,
  Users,
  Upload,
  Search,
} from "lucide-react";
// import SettingsContent from "../dashboard/SettingsContent";
// import HomeContent from "../dashboard/HomeContent";
// import ProfileUpload from "../dashboard/ProfileUpload";
import { AuthContextType } from "../../types/user";
import { useAuth } from "../../hooks/useAuth";
// import UploadDocument from "../dashboard/UploadDocument";
import ClientHome from "./ClientHome";
import ClientProject from "./ClientProject";
import Employees from "./Employees";
import AddProjects from "./AddProjects";

// import ProfileUpdate from "./ProfileUpload";

const DashboardClient = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuth() as AuthContextType;
  const [searchQuery, setSearchQuery] = useState("");

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
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: LayoutGrid, label: "Projects", key: "projects" },
    { icon: Users, label: "Employees", key: "employees" },
    { icon: Upload, label: "Add Project", key: "addprojects" },
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
        return <ClientHome />;
      case "projects":
        return <ClientProject />;
      case "employees":
        return <Employees />;
      case "addprojects":
        return <AddProjects />;
      default:
        return <ClientHome />;
    }
  };

  return (
    <div className="bg-[#E1DEE8] overflow-hidden min-h-screen w-full">
      {/* Top Navigation Bar */}
      <div className="fixed top-2 left-0 w-full   h-16 z-50 px-20 bg-[#E1DEE8]">
        <header className="mb-4">
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
        <div className="">
          <div className="flex mx-auto mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-7 w-7" />
              <input
                type="text"
                placeholder="What position are you looking for ?"
                className="w-full pl-12 pr-4 py-4 text-gray-700 bg-white border border-gray-300 rounded-none rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-[#5A399D] text-[14px] text-white px-8 py-4 rounded-r-lg hover:bg-[#5A399D]/60 transition-colors font-medium">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div
        className={`relative flex w-full h-[calc(100vh-2rem)] md:h-[calc(100vh-2rem)]  ${
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
                ? `fixed  left-0 h-screen w-64 z-50 bg-white rounded-t-[24px] shadow-lg transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } overflow-y-auto`
                : `fixed top-36 left-0 h-screen w-64 z-30 bg-white rounded-t-2xl shadow-lg transition-all duration-300 ease-in-out overflow-hidden`
            }
          `}
        >
          <div className="flex flex-col ">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 ">
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
            <nav className="flex-1 px-2 lg:px-4 space-y-4  mt-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={index}
                    onClick={() => handleMenuClick(item.key)}
                    className={`
                     flex gap-3   rounded-lg hover:bg-[#CEC4E2] p-4 w-fit   text-center font-semibold   transition-all duration-200
                    ${isActive ? "  bg-[#CEC4E2]" : "  bg-transparent"}
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
                className=" flex gap-2  rounded-lg hover:bg-[#CEC4E2] p-4 w-fit  transition-all duration-300 mt-4"
              >
                <Power
                  className={`w-5 h-5 text-[#5A399D] ${
                    !sidebarCollapsed || isMobile ? "mr-3" : ""
                  }`}
                />
                {(!sidebarCollapsed || isMobile) && (
                  <span className="text-[#2C3134]  font-semibold">Logout</span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className=" mt-36 pr-20">
          <div
            className={`flex-1 flex flex-col overflow-y-scroll  transition-all duration-300 ease-in-out
            ${!isMobile ? "ml-0 md:ml-64" : ""}
            h-screen min-h-0"
          }`}
          >
            {/* Main Content Area */}
            <main className="flex-1  rounded-2xl bg-transparent ml-5  ">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
