import { AxiosError } from "axios";
import { Asterisk } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../services/axiosInstance";
import SubmissionBidModal from "../modal/freelancerModal/SubmissionBidModal";
import BidSubmitLoader from "../skeletonLoader/freelancerLoader/BidSubmitLoader";
import toast from "react-hot-toast";

interface ISubmitBidForm {
  profile: string;
  price: number;
  timeLine: string;
  proposal: string;
  // terms: boolean;
}

interface IsubmitForm {
  bidModal: boolean;
  selectedProjectId?: string;
  setBidModalClose: () => void;
  onClose?: () => void;
}

const MAX_PROPOSAL_LENGTH = 1000;

const SubmissionForm = ({
  bidModal,
  setBidModalClose,
  selectedProjectId,
}: // onClose,
IsubmitForm) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ISubmitBidForm>();
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const proposalValue = watch("proposal") || "";

  const SubmitBidForm = async (data: ISubmitBidForm) => {
    setLoading(true);

    try {
      const res = await axios.post(`/bid/${selectedProjectId}`, data);

      if (res.status === 201) {
        setSuccessModal(true);
        reset();
        toast.success("Bid submitted successfully!");
        console.log("successful");
      }
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.status === 409) {
        toast.error("You have already submitted a bid for this project.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccessModal(false);
    // if (onClose) onClose();
  };

  return bidModal === true ? (
    <div className="bg-[#E1DEE8]/30 max-md:px-3 left-0 fixed top-0 py-10 z-30  h-screen w-screen overflow-y-scroll">
      <div className="w-full">
        <div className="bg-white md:w-5/12 mx-auto p-6 rounded-2xl ">
          <div className="flex justify-between items-center mb-4">
            <div className="my-6">
              <h3 className="text-[#09080D] text-[28px] ">Submit Your Bid</h3>
              <p className="text-[#6F757E] text-[18px] mt-6">
                Website Redesign Project
              </p>
            </div>
            <button
              className="text-[#5A399D] text-2xl font-bold hover:text-[#3a256b]"
              onClick={() => setBidModalClose()}
              aria-label="Close modal"
              type="button"
            >
              ×
            </button>
          </div>
          <form
            onSubmit={handleSubmit(SubmitBidForm)}
            className=" border border-[#6F757E] grid gap-6 rounded-2xl p-4"
          >
            <div>
              <div className="relative w-fit">
                <label
                  htmlFor="profile"
                  className="text-sm w-fit font-medium  text-[#09080D]"
                >
                  Profile card Link
                </label>
                <Asterisk className="text-[#FF0000] w-3 absolute -right-3 top-0" />
              </div>
              <input
                {...register("profile", { required: true })}
                type="text"
                id="profile"
                className="my-2 border border-[#CEC4E2] py-3 px-5"
                placeholder="Enter your profile card link"
              />
              {errors.profile && (
                <p className="text-[#FF0000] text-xs">
                  Profile link is compulsory
                </p>
              )}
            </div>
            <div>
              <div className="relative w-fit">
                <label
                  htmlFor="price"
                  className="text-sm w-fit font-medium  text-[#09080D]"
                >
                  Your Bid Amount
                </label>
                <Asterisk className="text-[#FF0000] w-3 absolute -right-3 top-0" />
              </div>
              <input
                {...register("price", { required: true, valueAsNumber: true })}
                type="number"
                id="price"
                className="my-2 border border-[#CEC4E2] py-3 px-5"
                placeholder="Enter your bid amount"
              />
              <p className="text-[#6F757E] text-xs ">Project budget: $3000</p>
              {errors.price && (
                <p className="text-[#FF0000] text-xs">
                  Bid Price is compulsory
                </p>
              )}
            </div>
            <div>
              <div className="relative w-fit">
                <label
                  htmlFor="timeLine"
                  className="text-sm w-fit font-medium  text-[#09080D]"
                >
                  Completion Timeline
                </label>
                <Asterisk className="text-[#FF0000] w-3 absolute -right-3 top-0" />
              </div>
              <input
                type="text"
                id="timeLine"
                {...register("timeLine", { required: true })}
                placeholder="e.g. 2 weeks"
                className="my-2 border border-[#CEC4E2] py-3 px-5"
              />
              {errors.timeLine && (
                <p className="text-[#FF0000] text-xs">Timeline is compulsory</p>
              )}
            </div>
            <div>
              <div className="relative w-fit">
                <label
                  htmlFor="proposal"
                  className="text-sm w-fit font-medium  text-[#09080D]"
                >
                  Your Proposal
                </label>
                <Asterisk className="text-[#FF0000] w-3 absolute -right-3 top-0" />
              </div>
              <textarea
                {...register("proposal", {
                  required: true,
                  maxLength: MAX_PROPOSAL_LENGTH,
                })}
                id="proposal"
                className="w-full border rounded-2xl h-[170px] py-3 px-5"
                placeholder="Describe your approach and relevant experience..."
                maxLength={MAX_PROPOSAL_LENGTH}
              />
              <div className="flex justify-between items-center">
                <span className="text-[#6F757E] text-xs">
                  {proposalValue.length}/{MAX_PROPOSAL_LENGTH} characters
                </span>
                {errors.proposal && (
                  <p className="text-[#FF0000] text-xs">
                    Proposal is compulsory
                  </p>
                )}
              </div>
            </div>
            {/* <div className="flex items-center gap-5">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4"
                // {...register("terms", { required: true })}
              />
              <label htmlFor="terms" className="text-sm">
                I agree to the bidding <span>terms and conditions</span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-[#FF0000] text-xs">
                You must agree to the terms and conditions
              </p>
            )} */}
            <button
              type="submit"
              className="bg-[#5A399D] py-3 w-2/5  text-white font-medium rounded-lg"
            >
              Submit Bid
            </button>
          </form>
        </div>
      </div>
      {/* {successModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-40">
          <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center">
            <p className="text-lg font-semibold mb-4">
              Bid submitted successfully!
            </p>
            <button
              className="bg-[#5A399D] text-white px-6 py-2 rounded-lg"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
      <div className="relative">{loading && <BidSubmitLoader />}</div>
      <SubmissionBidModal
        setBidModalClose={setBidModalClose}
        handlesuccessModal={successModal}
        handleClose={handleClose}
      />
    </div>
  ) : null;
};

export default SubmissionForm;
