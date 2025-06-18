import { useForm } from "react-hook-form";
// import axios from "../../services/axiosInstance";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../types/user";
import axios, { AxiosError } from "axios";
import { apiUrl } from "../../services/axiosInstance";
// import SkillsForm from "../ui/SkillField";

interface FormData {
  fullname: string;
  gender: string;
  dateOfBirth: string;
  primaryEmail: string;
  profession: string;
  specialization: string;
  location: string;
  bio: string;
  skills: string[];
  linkedIn: string;
  github: string;
  phoneNumber: string;
}

export default function ProfileForm() {
  const { user } = useAuth() as AuthContextType;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      skills: [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmitProfile = async (data: FormData) => {
    setLoading(true);
    setMessage("");

    try {
      // Convert skills array to JSON array string
      const formattedData = {
        ...data,
        skills: JSON.stringify(data.skills),
      };

      console.log("Submitting data:", formattedData);
      const response = await axios.put(`${apiUrl}/${user?.id}`, formattedData);
      console.log("Response:", response.data);
      setMessage("Profile updated successfully");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Error details:", error.response?.data);
      setMessage(error.response?.data?.message || "Failed to submit profile.");
    } finally {
      setLoading(false);
    }
  };

  const [input, setInput] = useState("");
  const skills = watch("skills");

  const addSkill = () => {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) return;

    const updated = [...skills, trimmed];
    setValue("skills", updated);
    setInput("");
  };

  const removeSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    setValue("skills", updated);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Profile</h2>

      {message && (
        <div className="mb-4 text-sm text-center text-white bg-purple-500 py-2 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            {...register("fullname", { required: true })}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.fullname && <p className="text-red-500 text-sm">Required</p>}
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
              {...register("dateOfBirth")}
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
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("primaryEmail", { required: true })}
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
            {...register("bio", {
              required: true,
              minLength: {
                value: 50,
                message: "Minimum of 50 words",
              },
              maxLength: {
                value: 500,
                message: "Maximum of 500 words",
              },
            })}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
          {errors.bio && (
            <p className="text-sm text-red-600">{errors.bio.message}</p>
          )}
        </div>

        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
          <h2 className="text-xl font-bold mb-4">Enter Your Skills</h2>
          <input type="hidden" {...register("skills")} />

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Type a skill"
              className="flex-1 px-3 py-2 border rounded"
            />
            <button
              type="button"
              onClick={addSkill}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
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
