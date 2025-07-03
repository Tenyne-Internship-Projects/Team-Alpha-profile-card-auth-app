import React, { useState } from "react";
import { MessageSquare } from "lucide-react";

interface Applicant {
  id: number;
  name: string;
  email: string;
  role: string;
  skills: string;
  experience: string;
  status: string;
}

const Employees: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([
    {
      id: 1,
      name: "Floyd Miles",
      email: "floyd.miles@example.com",
      role: "Backend Developer",
      skills: "JavaScript, MongoDB",
      experience: "5+",
      status: "pending",
    },
    {
      id: 2,
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      role: "Frontend Developer",
      skills: "React, TypeScript",
      experience: "3+",
      status: "pending",
    },
    {
      id: 3,
      name: "Floyd Miles",
      email: "floyd.miles2@example.com",
      role: "Business Analyst",
      skills: "Python, PostgreSQL",
      experience: "4+",
      status: "pending",
    },
    {
      id: 4,
      name: "Floyd Miles",
      email: "floyd.miles3@example.com",
      role: "Financial Analyst",
      skills: "Python, PostgreSQL",
      experience: "3+",
      status: "pending",
    },
    {
      id: 5,
      name: "Floyd Miles",
      email: "floyd.miles4@example.com",
      role: "Engineering Lead (Backend)",
      skills: "Not given",
      experience: "5+",
      status: "pending",
    },
    {
      id: 6,
      name: "Floyd Miles",
      email: "floyd.miles5@example.com",
      role: "Engineering Lead (Backend)",
      skills: "Not given",
      experience: "5+",
      status: "pending",
    },
    {
      id: 7,
      name: "Floyd Miles",
      email: "floyd.miles6@example.com",
      role: "Product Executive",
      skills: "Python, PostgreSQL",
      experience: "4+",
      status: "pending",
    },
    {
      id: 8,
      name: "Floyd Miles",
      email: "floyd.miles7@example.com",
      role: "Head of Operations",
      skills: "Python, PostgreSQL",
      experience: "5+",
      status: "pending",
    },
    {
      id: 9,
      name: "Floyd Miles",
      email: "floyd.miles8@example.com",
      role: "Head of Content Operations",
      skills: "Python, PostgreSQL",
      experience: "5+",
      status: "pending",
    },
    {
      id: 10,
      name: "Floyd Miles",
      email: "floyd.miles9@example.com",
      role: "Head of Content Operations",
      skills: "Python, PostgreSQL",
      experience: "5+",
      status: "pending",
    },
  ]);

  const handleViewProfile = (applicantId: number) => {
    console.log("View profile for:", applicantId);
  };

  const handleDecline = (applicantId: number) => {
    setApplicants(applicants.filter((app) => app.id !== applicantId));
  };

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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Pending Applicant
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action Button
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applicants.map((applicant) => (
              <tr
                key={applicant.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {generateAvatar(applicant.name)}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {applicant.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {applicant.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{applicant.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {applicant.skills}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {applicant.experience}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleViewProfile(applicant.id)}
                      className="bg-purple-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors flex items-center space-x-1"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>
                    <button
                      onClick={() => handleDecline(applicant.id)}
                      className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-100 transition-colors"
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

      {/* Pagination or Footer (Optional) */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {applicants.length} pending applicants
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
