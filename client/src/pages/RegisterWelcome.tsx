import { useNavigate } from "react-router-dom";

const RegisterWelcome = () => {
  const navigate = useNavigate();
  return (
    <div className="max-md:px-5 py-10 md:grid items-center justify-center h-screen place-content-center">
      <div className="w-11/12 mx-auto h-full flex flex-col justify-between">
        <div className="  md:flex   justify-between">
          <img
            src="/onboarding/freebiowelcomeimg.png"
            alt=""
            className="max-md:w-[153px] mx-auto"
          />
          <div className="md:w-[35%] max-md:text-center ">
            <h2 className="font-semibold text-3xl md:text-5xl leading-12 text-[#5A399D]">
              Freelance with ease
            </h2>
            <p className="font-normal text-[14px] md:text-lg md:mt-5 text-[#5A399D]">
              Freelancing gets better with Freebio. Time to share
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="text-[#723EDA] font-semibold text-base bg-gradient-to-r from-white to-[#e1d9f0] py-3 w-full md:mt-16 cursor-pointer rounded-xl"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default RegisterWelcome;
