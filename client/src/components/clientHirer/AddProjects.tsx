import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Calendar,
  DollarSign,
  MapPin,
  Shield,
  Code,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react";
import axios from "../../services/axiosInstance";
import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../types/user";
import { AxiosError } from "axios";

interface FormData {
  title: string;
  description: string;
  budget: number;
  tags: string[];
  responsibilities: string[];
  location: string;
  deadline: string;
  requirement: string;
}

export default function FitnessTrackerForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth() as AuthContextType;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: "Fitness Tracker Backend",
      description: "REST API for tracking workouts and goals.",
      budget: 6000,
      tags: ["Fitness", "API", "Goals"],
      responsibilities: ["Backend", "Security", "Testing"],
      location: "Remote",
      deadline: "2025-07-31",
      requirement: "OAuth support and integration with smartwatches",
    },
    mode: "onChange",
  });

  const watchedTags = watch("tags");
  const watchedResponsibilities = watch("responsibilities");

  const predefinedTags = [
    "Fitness",
    "API",
    "Goals",
    "Health",
    "Tracking",
    "Mobile",
    "Web",
    "Analytics",
    "Social",
    "Nutrition",
    "Wearables",
    "IoT",
    "Machine Learning",
    "Real-time",
  ];

  const predefinedResponsibilities = [
    "Backend",
    "Security",
    "Testing",
    "Frontend",
    "Database",
    "DevOps",
    "Documentation",
    "API Design",
    "Mobile Development",
    "Data Analysis",
  ];

  const handleTagToggle = (tag: string) => {
    const currentTags = watchedTags || [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    setValue("tags", newTags);
  };

  const handleResponsibilityToggle = (responsibility: string) => {
    const currentResponsibilities = watchedResponsibilities || [];
    const newResponsibilities = currentResponsibilities.includes(responsibility)
      ? currentResponsibilities.filter((r) => r !== responsibility)
      : [...currentResponsibilities, responsibility];
    setValue("responsibilities", newResponsibilities);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const submissionData = {
        ...data,
        deadline: new Date(data.deadline).toISOString(),
        budget: Number(data.budget),
      };

      console.log(submissionData);

      // const token = localStorage.getItem("token");
      const response = await axios.post(
        `/project/create/${user?.id}`,
        submissionData
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      if (response.status === 201 || response.status === 200) {
        console.log("Project submitted successfully:", response.data);
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to submit project");
      }
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error submitting project:", err);
      console.error("Error details:", err.response?.data);
      console.error("Status:", err.response?.status);
      alert("Error submitting project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    reset({
      title: "Fitness Tracker Backend",
      description: "REST API for tracking workouts and goals.",
      budget: 6000,
      tags: ["Fitness", "API", "Goals"],
      responsibilities: ["Backend", "Security", "Testing"],
      location: "Remote",
      deadline: "2025-07-31",
      requirement: "OAuth support and integration with smartwatches",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Project Submitted!
            </h2>
            <p className="text-gray-600">
              Your fitness tracker backend project has been successfully
              submitted.
            </p>
          </div>
          <button
            onClick={resetForm}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Submit Another Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Project Submission
          </h1>
          <p className="text-gray-600">
            Create your fitness tracker backend project
          </p>
        </div> */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl shadow-2xl p-8 space-y-8"
        >
          {/* Title */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Target className="inline h-4 w-4 mr-2" />
              Project Title
            </label>
            <input
              {...register("title", {
                required: "Project title is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white"
              placeholder="Enter project title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
              placeholder="Describe your project..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Budget and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="inline h-4 w-4 mr-2" />
                Budget ($)
              </label>
              <input
                {...register("budget", {
                  required: "Budget is required",
                  min: {
                    value: 1,
                    message: "Budget must be greater than 0",
                  },
                  valueAsNumber: true,
                })}
                type="number"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white"
                placeholder="Enter budget"
              />
              {errors.budget && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.budget.message}
                </p>
              )}
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-2" />
                Location
              </label>
              <select
                {...register("location", {
                  required: "Location is required",
                })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white"
              >
                <option value="">Select location</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          {/* Deadline */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-2" />
              Deadline
            </label>
            <input
              {...register("deadline", {
                required: "Deadline is required",
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return (
                    selectedDate > today || "Deadline must be in the future"
                  );
                },
              })}
              type="date"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white"
            />
            {errors.deadline && (
              <p className="mt-1 text-sm text-red-600">
                {errors.deadline.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {predefinedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    watchedTags?.includes(tag)
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Responsibilities */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <Shield className="inline h-4 w-4 mr-2" />
              Responsibilities
            </label>
            <div className="flex flex-wrap gap-2">
              {predefinedResponsibilities.map((responsibility) => (
                <button
                  key={responsibility}
                  type="button"
                  onClick={() => handleResponsibilityToggle(responsibility)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    watchedResponsibilities?.includes(responsibility)
                      ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {responsibility}
                </button>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Code className="inline h-4 w-4 mr-2" />
              Special Requirements
            </label>
            <textarea
              {...register("requirement", {
                required: "Special requirements are required",
                minLength: {
                  value: 5,
                  message: "Requirements must be at least 5 characters",
                },
              })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
              placeholder="Any special requirements or integrations needed..."
            />
            {errors.requirement && (
              <p className="mt-1 text-sm text-red-600">
                {errors.requirement.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Submit Project
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
