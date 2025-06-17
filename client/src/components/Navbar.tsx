import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type NavbarProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <nav className="bg-white relative h-16 border-b shadow-sm px-4 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-orange-600">
          <img src="/FreebioLogoDark.png" alt="" />
        </Link>

        <div className="md:hidden">
          <button
            className="text-gray-600 w-[30px] focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } md:flex space-x-4 md:space-x-6 md:items-center w-full md:w-auto mt-3 md:mt-0`}
          >
            <div className="absolute bg-white py-5 px-10 rounded-2xl shadow-2xl z-30 right-5">
              <Link
                to="/"
                className="block text-gray-700 hover:text-orange-600"
              >
                Home
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-orange-600"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-gray-700 hover:text-orange-600"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="block text-gray-700 hover:text-orange-600"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-gray-700 hover:text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex gap-5 py-5 ">
          <Link to="/" className="block text-gray-700 hover:text-orange-600">
            Home
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-orange-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-700 hover:text-orange-600"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="block text-gray-700 hover:text-orange-600"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block text-gray-700 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
