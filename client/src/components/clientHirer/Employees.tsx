import React, { useState, useEffect, useCallback } from "react";
import { MessageSquare } from "lucide-react";
import axios from "../../services/axiosInstance";
import { AxiosError } from "axios";

export interface InvoiceRecord {
  id: string;
  createdAt: string;
  freelancerId: string;
  projectId: string;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/applications");
      setApplicants(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "Failed to fetch applicants.");
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  const pendingApplicants = applicants.filter(
    (applicant) => applicant.status === "pending"
  );

  // Action handlers (to be implemented)
  const handleViewProfile = (applicantId: string) => {
    // TODO: Implement view profile logic
    console.log("View profile for:", applicantId);
  };

  const handleDecline = async (applicantId: string, status: string) => {
    setApplicants((prev) => prev.filter((app) => app.id !== applicantId));
    const res = await axios.put(`/applications/${applicantId}`, { status });
    console.log(res);
  };

  const handleApprove = async (applicantId: string, status: string) => {
    // setApplicants((prev) => prev.filter((app) => app.id !== applicantId));
    const res = await axios.put(`/applications/${applicantId}`, { status });
    console.log(res);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Pending Applicants
        </h2>
      </div>

      {loading && (
        <div className="p-6 text-center text-gray-500">
          Loading applicants...
        </div>
      )}
      {error && <div className="p-6 text-center text-red-500">{error}</div>}

      {!loading && !error && pendingApplicants.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No applicants found.
        </div>
      )}

      {/* Table */}
      {!loading && !error && pendingApplicants.length > 0 && (
        <div className="">
          <table className="">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skill
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingApplicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {generateAvatar(applicant.freelancer.fullname)}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {applicant.freelancer.fullname}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {applicant.freelancer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {applicant.freelancer.freelancerProfile.profession}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Array.isArray(
                      applicant.freelancer.freelancerProfile.skills
                    )
                      ? applicant.freelancer.freelancerProfile.skills.join(", ")
                      : applicant.freelancer.freelancerProfile.skills}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewProfile(applicant.id)}
                        className="bg-[#5A399D] text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center space-x-1"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <a href="http://localhost:5173/users/ef637f0b-cff1-4b5a-a6ad-3b71c80f28b8">
                          <span>View Profile</span>
                        </a>
                      </button>
                      <button
                        onClick={() => handleDecline(applicant.id, "rejected")}
                        className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        Decline
                      </button>

                      <button
                        onClick={() => handleApprove(applicant.id, "approved")}
                        className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        Approve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Employees;
