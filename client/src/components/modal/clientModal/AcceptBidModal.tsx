import { AxiosError } from "axios";
import axios from "../../../services/axiosInstance";
import AcceptanceSuccessModal from "./AcceptanceSuccessModal";
import { Dot, X } from "lucide-react";

import AcceptBidLoader from "../../skeletonLoader/clientLoader/AcceptBidLoader";
import { useState } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import { InvoiceRecord } from "../../clientHirer/Employees";
import GenerateAvatar from "../../ui/GenerateAvatar";

interface IAcceptBidModal {
  AcceptModal: boolean;
  setAcceptModal: () => void;
  applicants: InvoiceRecord[];
  onBidAccepted?: (acceptedApplicantId: string) => void; // Callback to refresh parent data
}

const AcceptBidModal = ({
  AcceptModal,
  setAcceptModal,
  applicants,
}: // onBidAccepted,
IAcceptBidModal) => {
  const [loader, setLoader] = useState(false);
  const [acceptSuccess, setAcceptSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAcceptBid = async ({
    applicantId,
    status,
  }: {
    applicantId: string;
    status: string;
  }) => {
    setLoader(true);
    setError(null);

    try {
      const response = await axios.put(`/bid/${applicantId}`, {
        status,
      });

      if (response.status === 200) {
        setAcceptSuccess(true);
        // Call the callback to refresh parent component data
        // if (onBidAccepted) {
        //   onBidAccepted(applicantId);
        // }
        console.log("Bid accepted successfully:", response.data);
      }
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error("Error accepting bid:", err);

      // Handle different error scenarios
      if (err.response) {
        // Server responded with error status
        const statusCode = err.response.status;
        const errorMessage =
          err.response.data?.message || "Failed to accept bid";

        switch (statusCode) {
          case 400:
            setError("Invalid request. Please check the application details.");
            break;
          case 401:
            setError("You are not authorized to perform this action.");
            break;
          case 404:
            setError("Application not found.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError(errorMessage);
        }
      } else if (err.request) {
        // Network error
        setError("Network error. Please check your connection and try again.");
      } else {
        // Other error
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoader(false);
    }
  };

  const handleRejectOtherBids = async (acceptedApplicantId: string) => {
    // After accepting a bid, reject all other bids
    const otherApplicants = applicants.filter(
      (app) => app.id !== acceptedApplicantId
    );

    try {
      const rejectPromises = otherApplicants.map((applicant) =>
        axios.put(`/applications/${applicant.id}`, { status: "rejected" })
      );

      await Promise.all(rejectPromises);
      console.log("Other bids rejected successfully");
    } catch (error) {
      console.error("Error rejecting other bids:", error);
      // You might want to show a warning that other bids couldn't be rejected
    }
  };

  const handleAcceptAndRejectOthers = async (applicantId: string) => {
    // First accept the selected bid
    await handleAcceptBid({ applicantId, status: "approved" });

    // Then reject all other bids (this happens automatically according to your notice)
    // But you might want to handle it manually for consistency
    if (applicants.length > 1) {
      await handleRejectOtherBids(applicantId);
    }
  };

  const closeModal = () => {
    setError(null);
    setAcceptModal();
  };

  return (
    <div>
      {AcceptModal && (
        <div className="fixed z-50 bg-[#E1DEE8]/10 w-screen overflow-y-auto min-h-screen left-0 top-0 grid place-content-center">
          <div className="bg-white rounded-2xl overflow-y-auto p-4 w-full md:w-[400px] max-h-[90vh] custom-scrollbar">
            <div className="my-4 flex justify-between items-center">
              <h4 className="text-[#09080D] text-2xl">Accept This Bid?</h4>
              <button
                type="button"
                className="cursor-pointer"
                onClick={closeModal}
              >
                <X />
              </button>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              {applicants.map((bidders) => {
                return (
                  <div key={bidders.id}>
                    <div className="border rounded-2xl p-4 border-[#6F757E] bg-[#E1DEE8]">
                      <div className="flex gap-4 mb-5">
                        <div>{GenerateAvatar(bidders.freelancer.fullname)}</div>
                        <div>
                          <p className="text-sm font-medium text-[#09080D]">
                            {bidders.freelancer.fullname}
                          </p>
                          <p className="text-[#6F757E] font-normal text-xs">
                            Senior Interaction Designer
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <h5 className="text-xs font-normal text-[#6F757E]">
                          Bid Amount:
                        </h5>{" "}
                        <p className="font-medium text-xs text-[#09080D]">
                          ${bidders.price}
                        </p>
                      </div>
                      <div className="flex gap-4 items-center">
                        <h5 className="text-xs font-normal text-[#6F757E]">
                          Timeline:
                        </h5>{" "}
                        <p className="font-medium text-xs text-[#09080D]">
                          {bidders.timeLine}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-normal my-4 text-[#6F757E]">
                        Proposal Details:
                      </h4>
                      <div className="border h-[200px] overflow-y-scroll custom-scrollbar border-[#A8A9B3] rounded-2xl p-4">
                        <p>{bidders.proposal}</p>
                      </div>
                    </div>

                    <div className="bg-[#FF8E291A]/90 my-4 text-sm text-[#000000] px-4 py-5">
                      <div className="flex gap-4 items-center">
                        <LuTriangleAlert />
                        <p>Important Notice</p>
                      </div>
                      <ul>
                        <li className="flex gap-1 items-center">
                          <Dot />
                          This will automatically decline all other bids
                        </li>
                        <li className="flex gap-1 items-center">
                          <Dot />
                          The freelancer will be notified immediately
                        </li>
                        <li className="flex gap-1 items-center">
                          <Dot />
                          You can discuss project details via messaging
                        </li>
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAcceptAndRejectOthers(bidders.id)}
                      disabled={loader}
                      className={`w-full ${
                        loader
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-[#5A399D] cursor-pointer hover:bg-[#4a2d82]"
                      } py-3 rounded-lg text-white text-sm font-medium transition-colors`}
                    >
                      {loader ? "Accepting..." : "Accept Bid"}
                    </button>

                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={loader}
                      className={`${
                        loader
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer hover:bg-[#b8a8d4]"
                      } bg-[#CEC4E2] w-full rounded-lg mt-4 border border-[#5A399D] text-black py-3 transition-colors`}
                    >
                      Cancel
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Success Modal */}
          {acceptSuccess && (
            <AcceptanceSuccessModal
              setAcceptSuccess={() => {
                setAcceptSuccess(false);
                closeModal(); // Close the main modal when success modal closes
              }}
            />
          )}

          {/* Loading Overlay */}
          {loader && <AcceptBidLoader />}
        </div>
      )}
    </div>
  );
};

export default AcceptBidModal;
