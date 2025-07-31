const BidSubmitLoader = () => {
  return (
    <div className="bg-[#E1DEE8]/30 max-md:px-3 left-0 fixed top-0 py-10 z-30  h-screen w-screen">
      <div className="w-fit text-center mt-28 mx-auto bg-white px-8 py-6 rounded-2xl">
        <div className="mb-9 w-fit mx-auto">
          <img src="/dashboard/spinner.png" alt="" className="animate-spin" />
        </div>
        <p className="text-xl text-[#09080D]">Submitting</p>
      </div>
    </div>
  );
};

export default BidSubmitLoader;
