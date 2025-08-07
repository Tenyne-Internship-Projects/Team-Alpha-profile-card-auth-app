import React, { useState, useEffect, useCallback } from "react";
import axios from "../../services/axiosInstance";
import { AxiosError } from "axios";
import AcceptBidModal from "../modal/clientModal/AcceptBidModal";
import GenerateAvatar from "../ui/GenerateAvatar";

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

const Employees: React.FC = () => {
  const [applicants, setApplicants] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptModal, setAcceptModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] =
    useState<InvoiceRecord | null>(null);

  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/bid");
      setApplicants(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
      setError(error.message || "Failed to fetch applicants.");
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  const handleDecline = async (applicantId: string, status: string) => {
    try {
      await axios.put(`/bid/${applicantId}`, { status });
      setApplicants((prev) => prev.filter((app) => app.id !== applicantId));
    } catch (err) {
      console.error("Failed to decline application:", err);
    }
  };

  const handleAccept = (applicant: InvoiceRecord) => {
    setSelectedApplicant(applicant);
    setAcceptModal(true);
  };

  // Group applicants by project
  const applicantsByProject = applicants.reduce((acc, applicant) => {
    const projectId = applicant.project.id;
    if (!acc[projectId]) {
      acc[projectId] = {
        project: applicant.project,
        applicants: [],
      };
    }
    acc[projectId].applicants.push(applicant);
    return acc;
  }, {} as Record<string, { project: InvoiceRecord["project"]; applicants: InvoiceRecord[] }>);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading applicants...</div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!loading && !error && applicants.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">No applicants found.</div>
    );
  }

  return (
    <div className="rounded-lg relative shadow-sm border border-gray-200">
      <div className="space-y-8">
        {Object.values(applicantsByProject).map(
          ({ project, applicants: projectApplicants }) => (
            <div key={project.id} className="bg-white">
              {/* Project Header */}
              <div className="px-6 pt-4 pb-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {project.title}
                </h2>
                <div className="flex items-center mt-2">
                  <p className="text-[#6F757E] text-xs">
                    <span className="text-sm font-medium text-[#09080D]">
                      {projectApplicants.length}
                    </span>{" "}
                    New bids received
                  </p>
                  <div className="w-[2.5px] h-5 bg-[#6F757E] mx-4"></div>
                  <div className="flex gap-4 items-center">
                    <h4 className="text-[#6F757E] text-xs">Budget:</h4>
                    <p className="text-sm font-medium text-[#09080D]">
                      ${project.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#050F24] uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#050F24] uppercase tracking-wider">
                        Proposal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#050F24] uppercase tracking-wider">
                        Bid
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#050F24] uppercase tracking-wider">
                        Projects Completed
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#050F24] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {projectApplicants.map((bidder) => (
                      <tr
                        key={bidder.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {GenerateAvatar(bidder.freelancer.fullname)}
                            <div>
                              <div className="text-sm font-medium text-[#09080D]">
                                {bidder.freelancer.fullname}
                              </div>
                              <div className="text-xs text-[#6F757E]">
                                {bidder.freelancer.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            <p className="truncate" title={bidder.proposal}>
                              {bidder.proposal
                                .split(" ")
                                .slice(0, 10)
                                .join(" ")}
                              {bidder.proposal.split(" ").length > 10 && "..."}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            ${bidder.price.toLocaleString()}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            12 {/* This should come from the data */}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleAccept(bidder)}
                              className="bg-[#5A399D] cursor-pointer px-4 py-2 rounded-md text-white text-sm font-medium hover:bg-[#5A399D]/90 transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleDecline(bidder.id, "rejected")
                              }
                              className="border border-[#FF0000] cursor-pointer bg-[#CEC4E2] px-4 py-2 rounded-md text-[#FF0000] text-sm font-medium hover:bg-[#CEC4E2]/80 transition-colors"
                            >
                              Decline
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>

      {/* Accept Bid Modal */}
      {selectedApplicant && (
        <AcceptBidModal
          AcceptModal={acceptModal}
          setAcceptModal={() => {
            setAcceptModal(false);
            setSelectedApplicant(null);
          }}
          applicants={[selectedApplicant]}
        />
      )}
    </div>
  );
};

export default Employees;
