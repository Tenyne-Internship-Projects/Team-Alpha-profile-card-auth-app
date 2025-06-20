import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative max-h-screen bg-cover  bg-no-repeat bg-[url('/freebioHeroImg.png')]">
      {/* Dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/70  z-0"></div>

      <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 py-8 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <img src="/FreebioLogoDark.png" alt="Freebio Logo" className="h-10" />
          <div className="hidden lg:flex gap-4 ">
            <button
              onClick={() => navigate("/login")}
              className="border border-white rounded-xl cursor-pointer py-2 px-6 hover:bg-white hover:text-[#5A399D] transition"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-lg md:text-xl font-bold px-6 py-2 cursor-pointer bg-[#723EDA] border-b-4 rounded-xl border-[#FFE01ACC] hover:bg-[#5a2fc0] transition"
            >
              Sign up
            </button>
          </div>

          <div className="md:hidden">
            <button
              className="text-white border p-1 w-[35px] focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

            <div
              className={`${
                menuOpen ? "block" : "hidden"
              } md:flex space-x-4 md:space-x-6 md:items-center w-full md:w-auto mt-3 md:mt-0`}
            >
              <div className="absolute bg-white py-2 px-2 rounded-2xl shadow-2xl z-30 right-5">
                <button
                  onClick={() => navigate("/login")}
                  className="border border-[#723EDA] text-[#723EDA] mr-5 rounded-xl cursor-pointer py-1 px-3 hover:bg-white hover:text-[#5A399D] transition"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-lg md:text-xl font-bold px-3 py-1 cursor-pointer bg-[#723EDA] border-b-4 rounded-xl border-[#FFE01ACC] hover:bg-[#5a2fc0] transition"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl pt-28 md:pt-32 md:mt-28 md:w-9/12">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold leading-tight mb-6">
            Freebio is a purpose-built platform connecting exceptional
            freelancers with ambitious clients.
          </h2>
          <p className="text-lg sm:text-lg md:text-xl font-medium mb-8">
            Our mission is to empower clients to achieve their goals by
            accessing a network of skilled, vetted, and passionate freelancers.
          </p>

          <button
            type="button"
            onClick={() => navigate("/get-started")}
            className="text-lg md:text-xl font-bold px-6 py-2 cursor-pointer bg-[#723EDA] border-b-4 rounded-xl border-[#FFE01ACC] hover:bg-[#5a2fc0] transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
