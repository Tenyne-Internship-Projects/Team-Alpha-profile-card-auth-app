import React, { useState, useEffect, useCallback } from "react";
// import { MessageSquare } from "lucide-react";
import axios from "../../services/axiosInstance";
import { AxiosError } from "axios";
import AcceptBidModal from "../modal/clientModal/AcceptBidModal";

export interface InvoiceRecord {
  id: string;
  createdAt: string;
  freelancerId: string;
  projectId: string;
  price: number;
  proposal: string;
  profile: string;
  timeLine: string;

  message: string | null;
  status: string;
  freelancer: {
    id: string;
    fullname: string;
    email: string;
    freelancerProfile: {
      // Define this if you have freelancer profile fields
      [key: string]: string[];
    };
  };
  project: {
    id: string;
    title: string;
    description: string;
    budget: number;
    tags: string[];
  };
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

const Employees: React.FC = () => {
  const [applicants, setApplicants] = useState<InvoiceRecord[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  const [acceptModal, setAcceptModal] = useState(false);

  const fetchApplicants = useCallback(async () => {
    // setLoading(true);
    // setError(null);
    try {
      const response = await axios.get("/bid");
      setApplicants(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
      // setError(error.message || "Failed to fetch applicants.");
      setApplicants([]);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  // const pendingApplicants = applicants.filter(
  //   (applicant) => applicant.status === "pending"
  // );

  // Action handlers (to be implemented)
  // const handleViewProfile = (applicantId: string) => {
  //   // TODO: Implement view profile logic
  //   console.log("View profile for:", applicantId);
  // };

  const handleDecline = async (applicantId: string, status: string) => {
    setApplicants((prev) => prev.filter((app) => app.id !== applicantId));
    const res = await axios.put(`/applications/${applicantId}`, { status });
    console.log(res);
  };

  // const handleApprove = async (applicantId: string, status: string) => {
  //   setAcceptModal(true);
  //   // setApplicants((prev) => prev.filter((app) => app.id !== applicantId));
  //   const res = await axios.put(`/applications/${applicantId}`, { status });
  //   console.log(res);
  // };

  const totalbid = applicants.length;

  // {
  //   loading && (
  //     <div className="p-6 text-center text-gray-500">Loading applicants...</div>
  //   );
  // }
  // {
  //   error && <div className="p-6 text-center text-red-500">{error}</div>;
  // }

  // {
  //   !loading && !error && applicants.length === 0 && (
  //     <div className="p-6 text-center text-gray-500">No applicants found.</div>
  //   );
  // }

  return (
    <div className="bg-white rounded-lg relative shadow-sm border border-gray-200">
      <AcceptBidModal
        AcceptModal={acceptModal}
        setAcceptModal={() => setAcceptModal(false)}
        applicants={applicants}
      />
      {/* Header */}
      <div>
        {applicants.map((applicant) => {
          return (
            <div key={applicant.id}>
              <div className="px-6 pt-4 pb-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {applicant.project.title}
                </h2>
                <div className="flex items-center mt-2">
                  <p className="text-[#6F757E] text-xs">
                    <span className="text-sm font-medium text-[#09080D]">
                      {totalbid}
                    </span>{" "}
                    Newly bids received{" "}
                  </p>
                  <p className="w-[2.5px] h-5 bg-[#6F757E] mx-4"></p>

                  <div className="flex gap-4 items-center">
                    <h4 className="text-[#6F757E] text-xs">Budget: </h4>{" "}
                    <p className="text-sm font-medium text-[#09080D]">
                      $ {applicant.project.budget}
                    </p>
                  </div>
                </div>
              </div>
              {/* table section  */}
              <div className="px-5">
                <table className="">
                  <thead className="text-[#050F24] font-medium text-xs">
                    <tr className=" ">
                      <th className=" py-3 text-left  uppercase tracking-wider">
                        Name
                      </th>
                      <th className="pl-7 py-3 text-left    uppercase tracking-wider">
                        Proposal
                      </th>
                      <th className=" pl-7 py-3 text-left  uppercase tracking-wider">
                        Bid
                      </th>
                      <th className="pl-7 py-3 text-left   uppercase tracking-wider">
                        Project Completed
                      </th>
                      <th className="pl-7 py-3 text-left  uppercase tracking-wider">
                        {/* Actions */}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr
                      key={applicant.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className=" py-2 whitespace-nowrap">
                        <div className="flex  gap-2">
                          {generateAvatar(applicant.freelancer.fullname)}
                          <div>
                            <div className="text-sm font-medium text-[#09080D]">
                              {applicant.freelancer.fullname}
                            </div>
                            <td className=" whitespace-nowrap text-xs text-[#6F757E]">
                              {applicant.freelancer.email}
                            </td>
                          </div>
                        </div>
                      </td>

                      <td className="pl-7 py-2 whitespace-nowrap text-sm text-gray-900">
                        {applicant.proposal.split(" ").slice(0, 10).join(" ")}
                        {applicant.proposal.split(" ").length > 10 && "..."}
                      </td>

                      <td className="pl-7 py-2 whitespace-nowrap text-sm text-gray-900">
                        ${applicant.price}
                      </td>

                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                        12
                      </td>

                      <td className="pl-7 py-2 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={
                              () =>
                                // handleApprove(applicant.id, "rejected")
                                setAcceptModal(true)
                              // alert("this is working")
                            }
                            className="bg-[#5A399D] cursor-pointer px-3 py-2 rounded-md text-white text-sm font-medium hover:bg-[#5A399D]/80 transition-colors"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              handleDecline(applicant.id, "approved")
                            }
                            className=" border border-[#FF0000] cursor-pointer bg-[#CEC4E2] px-3 py-2 rounded-md text-[#FF0000] text-sm font-medium hover:bg-[#5A399D]/80 transition-colors"
                          >
                            Decline
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Employees;

// {loading && (
//   <div className="p-6 text-center text-gray-500">
//     Loading applicants...
//   </div>
// )}
// {error && <div className="p-6 text-center text-red-500">{error}</div>}

// {!loading && !error && applicants.length === 0 && (
//   <div className="p-6 text-center text-gray-500">
//     No applicants found.
//   </div>
// )}

/* Table */
// {!loading && !error && applicants.length > 0 && (

// )}
