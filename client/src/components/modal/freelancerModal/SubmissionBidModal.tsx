// import { useNavigate } from "react-router-dom";

interface ISuccessModal {
  handlesuccessModal: boolean;
  handleClose: () => void;
  setBidModalClose: () => void;
}

const SubmissionBidModal = ({
  handleClose,
  setBidModalClose,
  handlesuccessModal,
}: ISuccessModal) => {
  // const navigate = useNavigate();

  const handleButton = () => {
    // navigate("/jobs-listed");
    handleClose();
    setBidModalClose();
  };
  return (
    handlesuccessModal === true && (
      <div className="bg-[#E1DEE8]/30 max-md:px-3 left-0 fixed top-0 py-10 z-50  h-screen w-screen ">
        <div className="bg-white p-4 border border-[#E5E7EB] md:w-2/5 mx-auto  rounded-lg grid gap-6 text-center">
          <img
            src="/successfullIcon.png"
            alt="successfull"
            className="w-fit mx-auto"
          />
          <h3 className="text-[#111827] text-[28px] font-normal">
            Bid Submitted Successfully
          </h3>
          <p className="text-sm text-[#4B5563] ">
            Thank you for submitting your bid for the Website Redesign Project.
            The client will review your proposal and get back to you soon.
          </p>

          <button
            type="button"
            onClick={handleButton}
            className="bg-[#5A399D] w-3/5 mx-auto rounded-lg text-white text-sm font-medium py-2"
          >
            View All Projects
          </button>
        </div>
      </div>
    )
  );
};

export default SubmissionBidModal;
