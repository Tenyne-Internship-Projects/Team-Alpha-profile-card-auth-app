import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-cover  bg-no-repeat bg-[url('/freebioHeroImg.png')]">
      {/* Dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-[#191830B0] z-0"></div>

      <div className="relative z-10 px-4 sm:px-8 md:px-16 lg:px-24 py-8 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <img src="/FreebioLogoDark.png" alt="Freebio Logo" className="h-10" />
          <div className="hidden lg:flex gap-4">
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
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mt-10 md:mt-28">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-6">
            Freebio is a purpose-built platform connecting exceptional
            freelancers with ambitious clients.
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-8">
            Our mission is to empower clients to achieve their goals by
            accessing a network of skilled, vetted, and passionate freelancers.
          </p>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-lg md:text-xl font-bold px-6 py-3 cursor-pointer bg-[#723EDA] border-b-4 rounded-xl border-[#FFE01ACC] hover:bg-[#5a2fc0] transition"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
