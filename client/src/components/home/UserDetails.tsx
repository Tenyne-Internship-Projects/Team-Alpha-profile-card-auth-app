import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../services/axiosInstance";
import { IUserProfile } from "../../types/user";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<IUserProfile | null>(null);

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
  }, [id]);

  if (!user || !user) return <div className="p-6 text-white">Loading...</div>;

  const profile = user;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black text-white rounded-xl shadow-md">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        ← Back
      </Link>

      <div className="flex items-center gap-6">
        <img
          src={profile.avatarUrl || "https://via.placeholder.com/150"}
          alt={profile.fullName}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.fullName}</h1>
          <p className="text-gray-400">
            {profile.profession} - {profile.specialization}
          </p>
          <p className="text-sm text-gray-500">{profile.location}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <p>
          <strong>Bio:</strong> {profile.bio || "N/A"}
        </p>
        <p>
          <strong>Skills:</strong> {profile.skills?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {profile.phoneNumber}
        </p>
        <p>
          <strong>Email:</strong> {profile.primaryEmail}
        </p>
        <p>
          <strong>Gender:</strong> {profile.gender}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {new Date(profile.dateOfBirth).toLocaleDateString()}
        </p>
        <p>
          <strong>Available for Work:</strong>{" "}
          {profile.isAvailable ? "Yes" : "No"}
        </p>
        <p>
          <strong>Salary Expectation:</strong>{" "}
          {profile.salaryExpectation ? `$${profile.salaryExpectation}` : "N/A"}
        </p>
        <p>
          <strong>LinkedIn:</strong>{" "}
          {profile.linkedIn ? (
            <a
              href={profile.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              {profile.linkedIn}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>GitHub:</strong>{" "}
          {profile.github ? (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              {profile.github}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Documents:</strong>{" "}
          {profile.documents && profile.documents.length > 0 ? (
            <ul className="list-disc list-inside">
              {profile.documents.map((doc, idx) => (
                <li key={idx}>
                  <a
                    href={doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400"
                  >
                    View Document {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            "No documents uploaded"
          )}
        </p>
      </div>
    </div>
  );
}
