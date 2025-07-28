import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Settings,
  Bell,
  User,
  Power,
  Upload,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../types/user";

const DashboardFreelancerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { logout } = useAuth() as AuthContextType;
  const navigate = useNavigate();

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
    { icon: LayoutDashboard, label: "Dashboard", key: "home" },
    { icon: Upload, label: "Uploads", key: "uploads" },
    { icon: Bell, label: "Notifications", key: "notifications" },
    { icon: User, label: "Profile", key: "profile" },
    { icon: Settings, label: "Settings", key: "settings" },
  ];

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  const handleMenuClick = (key: string) => {
    navigate(`/dashboard/${key === "home" ? "" : key}`);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div className="flex bg-[#E1DEE8] min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-24 h-full bg-gradient-to-b  from-[#552EA4]  to-[#201437] rounded-2xl p-6 text-white w-64 transition-all duration-300 z-40 ${
          sidebarCollapsed ? "w-20" : "w-64"
        } ${sidebarOpen ? "block" : "hidden md:block"}`}
      >
        <div className="flex items-center justify-between p-4 max-md:border-b max-md:border-gray-800">
          {/* <span className="font-bold text-lg">Freelancer</span> */}
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X />
          </button>
          {/* <button
            className="hidden md:block"
            onClick={() => setSidebarCollapsed(true)}
            
          >
            <X />
          </button> */}
        </div>
        <nav className="grid gap-5 w-full">
          {menuItems.map((item) => (
            <div key={item.key} className="w-full">
              <button
                className=" w-full"
                onClick={() => handleMenuClick(item.key)}
              >
                <div className="flex gap-2 items-center p-2 text-[#5A399D] rounded-sm hover:text-white bg-white border border-white hover:bg-transparent">
                  <item.icon className="" />
                  <span>{item.label}</span>
                </div>
              </button>
            </div>
          ))}
        </nav>
        <button
          className="flex items-center w-full px-4 py-2 mt-8 text-red-400 hover:bg-gray-800 transition-colors"
          onClick={handleLogout}
        >
          <Power className="mr-3" /> Logout
        </button>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Navbar */}
        <header className="fixed top-0 right-0 left-0   flex items-center justify-between px-6 pt-4 bg-[#E1DEE8] z-30">
          <button
            className="md:hidden text-blue-900"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu />
          </button>
          <img
            src="/freebioLogo.png"
            alt="Freebio Logo"
            className="w-[150px] h-[57px]"
          />
          {/* <h1 className="text-xl font-semibold">Freelancer Dashboard</h1> */}
          <div className="flex items-center gap-10">
            <Bell className="text-black font-black w-7 h-10" />
            <div className="flex items-center gap-4">
              <div className="rounded-full  bg-white p-2">
                <img
                  src="/avatarfreebio.png"
                  alt=""
                  className="w-[43px] h-[43px]"
                />
              </div>
              <div className="flex items-center gap-4">
                <p className=" text-sm">Profile Name</p>{" "}
                <ChevronDown className="w-[20px] h-[16px]" />{" "}
              </div>
            </div>
          </div>
        </header>
        {/* Page Content */}
        <main className="flex-1 p-6 bg-[#E1DEE8] mt-[70px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardFreelancerLayout;
