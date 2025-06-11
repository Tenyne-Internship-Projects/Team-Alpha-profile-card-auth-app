const Welcoming = () => {
  return (
    <div className="section grid items-center justify-center h-screen place-content-center">
      <div className="md:flex  justify-between">
        <img
          src="/onboarding/freebioWelcoming
          
          img.png"
          alt=""
          className="max-md:w-[153px] mx-auto"
        />
        <div className="md:w-[35%] max-md:text-center max-md:mt-10">
          <h2 className="font-semibold text-3xl md:text-6xl leading-16 text-[#5A399D]">
            Freelance with ease
          </h2>
          <p className="font-normal text-[14px] md:text-lg md:mt-10 text-[#5A399D]">
            Freelancing gets better with Freebio. Time to share
          </p>
        </div>
      </div>

      <a href="/register">
        <button className="text-[#723EDA] font-semibold text-base bg-gradient-to-r from-white to-[#e1d9f0] py-3 w-full mt-16 cursor-pointer rounded-xl">
          Get Started
        </button>
      </a>
    </div>
  );
};

export default Welcoming;
