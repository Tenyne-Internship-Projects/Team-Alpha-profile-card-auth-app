import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import axios from "../../services/axiosInstance";
import { AxiosError } from "axios";

interface FormData {
  projectTitle: string;
  description: string;
  requirements: string;
  responsibilities: string[];
  category: string;
  deadline: string;
  budget: string;
  experienceLevel: string;
}

const EditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    // getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      projectTitle: "",
      description: "",
      requirements: "",
      responsibilities: [],
      category: "",
      deadline: "",
      budget: "",
      experienceLevel: "Entry",
    },
  });

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      setFetchLoading(true);
      try {
        const response = await axios.get(`/projects/${id}`);
        const project = response.data;

        // Set form values
        setValue("projectTitle", project.title || "");
        setValue("description", project.description || "");
        setValue("requirements", project.requirements || "");
        setValue("category", project.category || "");
        setValue("deadline", project.deadline || "");
        setValue("budget", project.budget || "");
        setValue("experienceLevel", project.experienceLevel || "Entry");

        // Set responsibilities
        if (
          project.responsibilities &&
          Array.isArray(project.responsibilities)
        ) {
          setResponsibilities(project.responsibilities);
          setValue("responsibilities", project.responsibilities);
        }
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message || "Failed to fetch project");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProject();
  }, [id, setValue]);

  // Keep responsibilities in sync with react-hook-form
  const addResponsibility = () => {
    const trimmed = input.trim();
    if (trimmed && !responsibilities.includes(trimmed)) {
      const updated = [...responsibilities, trimmed];
      setResponsibilities(updated);
      setValue("responsibilities", updated);
    }
    setInput("");
  };

  const removeResponsibility = (responsibility: string) => {
    const updated = responsibilities.filter((r) => r !== responsibility);
    setResponsibilities(updated);
    setValue("responsibilities", updated);
  };

  const onSubmit = async (data: FormData) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const formattedData = {
        ...data,
        responsibilities: JSON.stringify(data.responsibilities),
      };

      const response = await axios.put(`/projects/${id}`, formattedData);

      if (response.status === 200) {
        alert("Project updated successfully!");
        navigate("/client/dashboard"); // Navigate back to dashboard
      }
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate("/client/dashboard")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
          <p className="text-gray-600">Update your project details</p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("projectTitle", { required: true })}
                type="text"
                placeholder="e.g. UI Design for Mobile App"
                className="w-full px-4 py-3 placeholder-[#6F757E] border border-[#6F757E] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              {errors.projectTitle && (
                <span className="text-red-500 text-xs">
                  Project Title is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                placeholder="Brief + key details; support markdown or rich text"
                className="w-full px-4 py-3 placeholder-[#6F757E] border border-[#6F757E] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              />
              {errors.description && (
                <span className="text-red-500 text-xs">
                  Description is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("requirements", { required: true })}
                rows={4}
                placeholder="Brief + key details; support markdown or rich text"
                className="w-full px-4 placeholder-[#6F757E] py-3 border border-[#6F757E] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
              />
              {errors.requirements && (
                <span className="text-red-500 text-xs">
                  Requirements are required
                </span>
              )}
            </div>

            {/* Responsibilities */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Responsibilities <span className="text-red-500">*</span>
              </label>
              <input type="hidden" {...register("responsibilities")} />

              <div className="p-4 border border-[#CEC4E2] shadow-xl rounded-lg">
                <div className="flex gap-2 border border-[#4A008F1A]">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addResponsibility();
                      }
                    }}
                    placeholder="Type Responsibilities"
                    className="flex-1 px-3 py-2 placeholder-[#6F757E] border border-[#6F757E] shadow-lg rounded"
                  />
                  <button
                    type="button"
                    onClick={addResponsibility}
                    className="bg-[#5A399D] text-white px-7 py-2 rounded hover:bg-[#5A399D]/90"
                  >
                    Add Responsibilities
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {responsibilities.map((responsibility, idx) => (
                    <div
                      key={idx}
                      className="bg-[#5A399D] text-white text-sm px-3 py-1 rounded-sm flex items-center gap-2"
                    >
                      <span>{responsibility}</span>
                      <button
                        type="button"
                        onClick={() => removeResponsibility(responsibility)}
                        className="text-white font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Job Locations <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("category", { required: true })}
                  className="w-full px-4 py-3 placeholder-[#6F757E] border border-[#6F757E] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none bg-white"
                >
                  <option value="">Select location</option>
                  <option value="remote">Remote</option>
                  <option value="on-site">On-site</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {errors.category && (
                <span className="text-red-500 text-xs">
                  Category is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Experience Level <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {["Entry", "Intermediate", "Expert"].map((level) => (
                  <label key={level} className="flex items-center">
                    <input
                      type="radio"
                      value={level}
                      {...register("experienceLevel", { required: true })}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
              {errors.experienceLevel && (
                <span className="text-red-500 text-xs">
                  Experience Level is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                {...register("deadline", { required: true })}
                type="date"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              {errors.deadline && (
                <span className="text-red-500 text-xs">
                  Deadline is required
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Budget <span className="text-red-500">*</span>
              </label>
              <input
                {...register("budget", { required: true })}
                type="text"
                placeholder="Input Amount"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              {errors.budget && (
                <span className="text-red-500 text-xs">Budget is required</span>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate("/client/dashboard")}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#5A399D] text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
