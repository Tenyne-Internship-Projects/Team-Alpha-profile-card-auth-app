import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/axiosInstance";
import { IUserProfileFetch } from "../../types/user";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import {
  Check,
  Instagram,
  Mail,
  MessageCircle,
  Share,
  Twitter,
} from "lucide-react";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<IUserProfileFetch | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/profile/${id}`);
        setUser(response.data);

        toast.success("User loaded successfully");
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
          axiosError.response?.data?.message || "Failed to fetch user";
        toast.error("❌ " + errorMessage);
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user || !user) return <div className="p-6 text-white">Loading...</div>;

  const profile = user;
  console.log(profile);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6">
          {/* Welcome Text */}
          <div className="text-center mb-4">
            <p className="text-[#5A399D] font-medium text-sm mb-1">Welcome</p>
            <h1 className="text-2xl font-bold text-[#5A399D] mb-1">
              <p>picture</p>
              
              <img
                src={profile.profile.avatarUrl}
                alt={profile.profile.fullName}
              />
              {user.fullname}
            </h1>
            {/* <p className="text-gray-600 text-sm">{userData.title}</p> */}

            {/* Verified Badge */}
            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center bg-[#5A399D] text-white px-3 py-1 rounded-full text-xs">
                <Check className="w-3 h-3 mr-1" />
                Verified
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <button className="bg-[#5A399D] text-white px-4 py-2 rounded-lg text-sm font-medium flex-1">
              HIRE ME
            </button>
            <button className="bg-[#5A399D] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
              <Share className="w-4 h-4" />
              SHARE
            </button>
            <button className="bg-[#5A399D] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              MESSAGES
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            {/* Bio Section */}
            <div className="mb-6">
              <button className="bg-[#5A399D] text-white px-4 py-2 rounded-lg text-sm font-medium mb-4">
                BIO SUMMARY
              </button>
              <p className="text-gray-700 text-lg leading-relaxed">
                {user.profile.bio}
              </p>
            </div>

            {/* Skills Section */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium">
                  SKILLS
                </button>
                <div className="flex gap-5 mt-10">
                  {profile.profile.skills.map((skill) => {
                    return (
                      <div className="bg-purple-900 py-1 px-5 text-white rounded-lg">
                        {skill}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* <div className="flex flex-wrap gap-2 justify-center">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`${getSkillBgColor(
                      skill.category
                    )} text-white px-3 py-1 rounded text-xs font-medium`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div> */}
            </div>

            {/* Contact Section */}
            <div className="text-center">
              <h3 className="font-bold text-lg text-gray-800 mb-3">
                CONTACT ME
              </h3>

              {/* Email */}
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-[#5A399D] mr-2" />
                <span className="text-[#5A399D] text-sm">
                  {profile.profile.primaryEmail}
                </span>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Social Media</h4>
                <div className="flex justify-center gap-4">
                  <div className="w-8 h-8 bg-[#5A399D] rounded-lg flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-[#5A399D] rounded-lg flex items-center justify-center">
                    <Twitter className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-[#5A399D] rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-md">
    //   <Link to="/" className="text-blue-500 underline mb-4 inline-block">
    //     ← Back
    //   </Link>

    //   <div className="flex items-center gap-6">
    //     <img
    //       // src={profile.profile.avatarUrl}
    //       // alt={user.fullname}
    //       className="w-32 h-32 rounded-full object-cover"
    //     />
    //     <div>
    //       <h1 className="text-2xl font-bold">{profile.fullname}</h1>
    //       <p className="text-gray-400">
    //         {profile.profile.profession} - {profile.profile.specialization}
    //       </p>
    //       <p className="text-sm text-gray-500">{profile.profile.location}</p>
    //     </div>
    //   </div>

    //   <div className="mt-6 space-y-2">
    //     <p>
    //       <strong>Bio:</strong> {profile.profile.bio || "N/A"}
    //     </p>
    //     <p>
    //       <strong>Skills:</strong> {profile.profile.skills?.join(", ") || "N/A"}
    //     </p>
    //     <p>
    //       <strong>Phone:</strong> {profile.profile.phoneNumber}
    //     </p>
    //     <p>
    //       <strong>Email:</strong> {profile.profile.primaryEmail}
    //     </p>
    //     <p>
    //       <strong>Gender:</strong> {profile.profile.gender}
    //     </p>

    //     <p>
    //       <strong>Available for Work:</strong>{" "}
    //       {profile.profile.isAvailable ? "Yes" : "No"}
    //     </p>
    //     <p>
    //       <strong>Salary Expectation:</strong>{" "}
    //       {profile.profile.salaryExpectation
    //         ? `$${profile.profile.salaryExpectation}`
    //         : "N/A"}
    //     </p>
    //     <p>
    //       <strong>LinkedIn:</strong>{" "}
    //       {profile.profile.linkedIn ? (
    //         <a
    //           href={profile.profile.linkedIn}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-blue-400"
    //         >
    //           {profile.profile.linkedIn}
    //         </a>
    //       ) : (
    //         "N/A"
    //       )}
    //     </p>
    //     <p>
    //       <strong>GitHub:</strong>{" "}
    //       {profile.profile.github ? (
    //         <a
    //           href={profile.profile.github}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-blue-400"
    //         >
    //           {profile.profile.github}
    //         </a>
    //       ) : (
    //         "N/A"
    //       )}
    //     </p>
    //     <p>
    //       <strong>Documents:</strong>{" "}
    //       {profile.profile.documents && profile.profile.documents.length > 0 ? (
    //         <ul className="list-disc list-inside">
    //           {profile.profile.documents.map((doc, idx) => (
    //             <li key={idx}>
    //               <a
    //                 href={doc}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="text-blue-400"
    //               >
    //                 View Document {idx + 1}
    //               </a>
    //             </li>
    //           ))}
    //         </ul>
    //       ) : (
    //         "No documents uploaded"
    //       )}
    //     </p>
    //   </div>
    // </div>
  );
}
