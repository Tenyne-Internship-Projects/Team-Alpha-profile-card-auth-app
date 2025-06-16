import { useForm } from "react-hook-form";
import axiosInstance from "../../services/axiosInstance";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../types/user";

interface FormData {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  profession: string;
  specialization: string;
  location: string;
  bio: string;
  skills: string;
  linkedIn?: string;
  github?: string;
  phoneNumber: string;
  avatar: FileList;
  documents: FileList;
}

export default function ProfileForm() {
  const { user } = useAuth() as AuthContextType;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("gender", data.gender);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("profession", data.profession);
    formData.append("emial", data.email);
    formData.append("specialization", data.specialization);
    formData.append("location", data.location);
    formData.append("bio", data.bio);
    formData.append("skills", data.skills);
    formData.append("phoneNumber", data.phoneNumber);
    if (data.linkedIn) formData.append("linkedIn", data.linkedIn);
    if (data.github) formData.append("github", data.github);
    formData.append("avatar", data.avatar[0]);
    formData.append("documents", data.documents[0]); // assuming one doc for now

    try {
      const response = await axiosInstance.put(
        `/profile/${user?.id}`,
        formData
      );
      setMessage("Profile created successfully!");
      console.log(response.data);
    } catch (err) {
      setMessage("Failed to submit profile.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Profile</h2>

      {message && (
        <div className="mb-4 text-sm text-center text-white bg-purple-500 py-2 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.fullName && <p className="text-red-500 text-sm">Required</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Gender</label>
            <select
              {...register("gender", { required: true })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">Required</p>}
          </div>

          <div>
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">Required</p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1">Profession</label>
          <input
            type="text"
            {...register("profession", { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Specialization</label>
          <input
            type="text"
            {...register("specialization", { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Location</label>
          <input
            type="text"
            {...register("location", { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Bio</label>
          <textarea
            {...register("bio", { required: true })}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Skills (comma separated)</label>
          <input
            type="text"
            {...register("skills", { required: true })}
            placeholder="e.g. manual testing, postman"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phoneNumber", { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">LinkedIn (optional)</label>
          <input
            type="url"
            {...register("linkedIn")}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">GitHub (optional)</label>
          <input
            type="url"
            {...register("github")}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Avatar Image (required)</label>
          <input
            type="file"
            accept="image/*"
            {...register("avatar", { required: true })}
            className="w-full"
          />
          {errors.avatar && (
            <p className="text-red-500 text-sm">Avatar is required</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Document Upload (required)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("documents", { required: true })}
            className="w-full"
          />
          {errors.documents && (
            <p className="text-red-500 text-sm">Document is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Profile"}
        </button>
      </form>
    </div>
  );
}
