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
    progressStatus: string;
  };
}

const Employees: React.FC = () => {
  const [applicants, setApplicants] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptModal, setAcceptModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] =
    useState<InvoiceRecord | null>(null);

  // Option 1: Fetch with query parameters (Recommended)
  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Add query parameter to filter on backend
      const response = await axios.get("/bid", {
        params: {
          projectStatus: "pending", // or progressStatus: "pending"
          // You can also add other filters here
          // status: "pending", // for application status if needed
        },
      });

      setApplicants(response.data.data);
      console.log("Filtered applicants:", response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
      setError(error.message || "Failed to fetch applicants.");
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Option 2: Alternative endpoint approach
  // const fetchPendingApplicants = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     // Use a dedicated endpoint for pending applications
  //     const response = await axios.get("/bid/pending");
  //     setApplicants(response.data.data);
  //     console.log("Pending applicants:", response.data.data);
  //   } catch (err) {
  //     const error = err as AxiosError;
  //     console.error(error);
  //     setError(error.message || "Failed to fetch pending applicants.");
  //     setApplicants([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // Option 3: Multiple filter parameters
  // const fetchFilteredApplicants = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get("/bid", {
  //       params: {
  //         projectStatus: "pending",
  //         applicationStatus: "pending", // if you also want to filter by application status
  //         limit: 50, // optional: limit results
  //         page: 1, // optional: for pagination
  //       }
  //     });

  //     setApplicants(response.data.data);
  //     console.log("Filtered applicants:", response.data.data);
  //   } catch (err) {
  //     const error = err as AxiosError;
  //     console.error(error);
  //     setError(error.message || "Failed to fetch applicants.");
  //     setApplicants([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    fetchApplicants();
    // fetchPendingApplicants(); // Alternative
    // fetchFilteredApplicants(); // Alternative with multiple filters
  }, [fetchApplicants]);

  const handleDecline = async (applicantId: string, status: string) => {
    try {
      // Update the API endpoint to match your backend
      await axios.put(`/applications/${applicantId}`, { status }); // Changed from /bid/ to /applications/

      // Remove from local state
      setApplicants((prev) => prev.filter((app) => app.id !== applicantId));

      console.log(`Application ${applicantId} declined with status: ${status}`);
    } catch (err) {
      console.error("Failed to decline application:", err);
      // Optionally show user-friendly error message
      setError("Failed to decline application. Please try again.");
    }
  };

  const handleAccept = (applicant: InvoiceRecord) => {
    setSelectedApplicant(applicant);
    setAcceptModal(true);
  };

  // Callback to refresh data after bid acceptance
  const handleBidAccepted = useCallback((acceptedApplicantId: string) => {
    // Remove accepted applicant and refresh data
    setApplicants((prev) =>
      prev.filter((app) => app.id !== acceptedApplicantId)
    );

    // Optionally refetch all data to ensure consistency
    // fetchApplicants();
  }, []);

  // Since we're filtering on backend, we don't need frontend filtering
  // const actualApplicant = applicants; // All applicants are already pending

  // Group applicants by project (all should already be pending from backend)
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

  // Loading state
  if (loading) {
    return (
      <div className="rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5A399D] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading pending applications...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-lg font-semibold">Error Loading Applications</p>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchApplicants}
            className="bg-[#5A399D] text-white px-4 py-2 rounded-md hover:bg-[#5A399D]/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!loading && !error && applicants.length === 0) {
    return (
      <div className="rounded-lg shadow-sm border border-gray-200">
        <div className="p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-lg font-semibold text-gray-600">
              No Pending Applications
            </p>
          </div>
          <p className="text-gray-500 mb-4">
            There are no pending applications for your projects at the moment.
          </p>
          <button
            onClick={fetchApplicants}
            className="bg-[#5A399D] text-white px-4 py-2 rounded-md hover:bg-[#5A399D]/90 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg  md:w-[950px] relative shadow-sm border border-gray-200">
      {/* Header with summary */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h1 className="text-xl font-semibold text-gray-900">
          Pending Applications
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {applicants.length} pending application
          {applicants.length !== 1 ? "s" : ""} across{" "}
          {Object.keys(applicantsByProject).length} project
          {Object.keys(applicantsByProject).length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-8 ">
        {Object.values(applicantsByProject).map(
          ({ project, applicants: projectApplicants }) => (
            <div key={project.id} className="bg-white">
              {/* Project Header */}
              <div className="px-6 pt-4 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {project.title}
                    </h2>
                    <div className="flex items-center mt-2">
                      <p className="text-[#6F757E] text-xs">
                        <span className="text-sm font-medium text-[#09080D]">
                          {projectApplicants.length}
                        </span>{" "}
                        New bid{projectApplicants.length !== 1 ? "s" : ""}{" "}
                        received
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
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {project.progressStatus}
                    </span>
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
                        Bid Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#050F24] uppercase tracking-wider">
                        Timeline
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
                            {bidder.timeLine || "Not specified"}
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
                              className="border border-[#FF0000] cursor-pointer bg-white px-4 py-2 rounded-md text-[#FF0000] text-sm font-medium hover:bg-red-50 transition-colors"
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
          onBidAccepted={handleBidAccepted}
        />
      )}
    </div>
  );
};

export default Employees;
