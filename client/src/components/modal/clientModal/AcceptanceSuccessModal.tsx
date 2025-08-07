// import { useNavigate } from "react-router-dom";

import { X } from "lucide-react";

interface ISuccessModal {
  setAcceptSuccess: () => void;
}

const AcceptanceSuccessModal = ({ setAcceptSuccess }: ISuccessModal) => {
  return (
    // handlesuccessModal === true && (
    <div className="bg-[#E1DEE8]/30 max-md:px-3 left-0 fixed top-20 py-10 z-50  h-screen w-screen ">
      <div className="bg-white pb-10 relative p-4 border border-[#E5E7EB] md:w-2/5 mx-auto  rounded-lg grid gap-6 text-center">
        <button type="button" onClick={setAcceptSuccess}>
          <X className="w-6 h-6 cursor-pointer absolute right-5 text-[#5A399D]" />
        </button>
        <img
          src="/successfullIcon.png"
          alt="successfull"
          className="w-fit mx-auto mt-5"
        />
        <h3 className="text-[#111827] text-[28px] font-normal">
          Bid Accepted Successfully!
        </h3>
        <p className="text-sm text-[#4B5563] ">
          The freelancer will be notified immediately
        </p>
      </div>
    </div>
    // )
  );
};

export default AcceptanceSuccessModal;
