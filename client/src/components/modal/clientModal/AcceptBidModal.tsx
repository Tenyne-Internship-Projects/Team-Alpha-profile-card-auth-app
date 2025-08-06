import { AxiosError } from "axios";
import axios from "../../../services/axiosInstance";
import AcceptanceSuccessModal from "./AcceptanceSuccessModal";
import { Dot, X } from "lucide-react";

import AcceptBidLoader from "../../skeletonLoader/clientLoader/AcceptBidLoader";
import { useEffect, useState } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import { InvoiceRecord } from "../../clientHirer/Employees";

interface IAcceptBidModal {
  AcceptModal: boolean;
  setAcceptModal: () => void;
  applicants: InvoiceRecord[];
}

const generateAvatar = (name: string) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-teal-500",
  ];
  const colorIndex = name.length % colors.length;
  return (
    <div
      className={`w-10 h-10 rounded-full ${colors[colorIndex]} flex items-center justify-center text-white font-medium text-sm`}
    >
      {initials}
    </div>
  );
};

const AcceptBidModal = ({
  AcceptModal,
  setAcceptModal,
  applicants,
}: IAcceptBidModal) => {
  const [loader, setLoader] = useState(false);
  const [acceptSuccess, setAccessSuccess] = useState(true);

  const handleAcceptBid = async () => {
    setLoader(true);
    try {
      const res = await axios.post("/bid");
      console.log(res);
    } catch (error) {
      const err = error as AxiosError;
      console.error(err);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    handleAcceptBid();
  }, []);

  return (
    <div>
      {AcceptModal && (
        <div className="fixed z-50 bg-[#E1DEE8]/60 w-screen overflow-y-auto min-h-screen left-0 top-0 grid place-content-center">
          <div className="bg-white rounded-2xl overflow-y-auto p-4 w-full md:w-[400px] max-h-[90vh] custom-scrollbar">
            <div className="my-4 flex justify-between items-center">
              <h4 className="text-[#09080D] text-2xl">Accept This Bid?</h4>
              <button
                type="button"
                className="cursor-pointer"
                onClick={setAcceptModal}
              >
                <X />
              </button>
            </div>

            <div>
              {applicants.map((bidders) => {
                return (
                  <div key={bidders.id}>
                    <div className="border rounded-2xl p-4 border-[#6F757E] bg-[#E1DEE8]">
                      <div className="flex gap-4 mb-5">
                        <div>{generateAvatar(bidders.freelancer.fullname)}</div>
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
                        <p>
                          {" "}
                          {/* Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Doloremque magnam sequi dolorem, laboriosam,
                          dolor repudiandae ea sint esse nihil officiis
                          perspiciatis? Earum asperiores tenetur eaque unde
                          iste! Culpa, ut eum. Lorem ipsum dolor, sit amet
                          consectetur adipisicing elit. Voluptate non nam,
                          mollitia deserunt assumenda provident. Fuga enim autem
                          vero inventore libero optio perferendis est
                          exercitationem commodi. Libero sapiente exercitationem
                          ex illo fuga qui obcaecati, explicabo facere dolor
                          labore beatae rem. */}
                          {bidders.proposal}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#FF8E291A]/90 my-4 text-sm text-[#000000] px-4 py-5">
              <div className="flex gap-4  items-center">
                <LuTriangleAlert />
                <p> Important Notice</p>
              </div>
              <ul>
                <li className="flex gap-1 items-center">
                  {" "}
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
              className="w-full bg-[#5A399D] cursor-pointer py-3 rounded-lg text-white text-sm font-medium"
            >
              Accept Bid
            </button>
            <button
              type="button"
              onClick={setAcceptModal}
              className="bg-[#CEC4E2] cursor-pointer w-full rounded-lg mt-4 border border-[#5A399D] text-black py-3"
            >
              Cancel
            </button>
          </div>
          <div>
            {acceptSuccess && (
              <AcceptanceSuccessModal
                setAcceptSuccess={() => setAccessSuccess(false)}
              />
            )}
          </div>
          <div>{loader && <AcceptBidLoader />}</div>
        </div>
      )}
    </div>
  );
};

export default AcceptBidModal;
