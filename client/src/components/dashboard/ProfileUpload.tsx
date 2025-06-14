import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios, { AxiosError } from "axios";
import type { IFreelancerProfile } from "../../types/profile";

interface ErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

interface FormData {
  fullName: string;
  gender: string;
  age: number;
  dateOfBirth: string;
  profession: string;
  specialization: string;
  location: string;
  bio?: string;
  skills: string;
  avatarUrl?: FileList;
  documents: FileList;
  linkedIn?: string;
  github?: string;
  primaryEmail: string;
  phoneNumber: string;
  salaryExpectation?: number;
}

const ProfileUpload = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const avatarFile = watch("avatarUrl");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => formData.append(key, file));
        } else if (value !== undefined) {
          formData.append(key, String(value));
        }
      });

      const response = await axios.post<IFreelancerProfile>(
        "/profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error("Profile submission error:", axiosError);

      if (axiosError.response?.data) {
        setError(
          axiosError.response.data.message ||
            "Failed to submit profile. Please try again."
        );
      } else if (axiosError.request) {
        setError(
          "No response from server. Please check your internet connection."
        );
      } else {
        setError("An error occurred while submitting your profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-6 text-green-600 font-medium">
        Profile successfully submitted!
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl mt-5 p-6 border rounded-2xl shadow-lg bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Your Profile
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8">Step {step}/3</p>

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form
          id="profile-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {step === 1 && (
            <div className="space-y-6">
              <p className="text-sm text-gray-500 mb-2">Step 1/3</p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    {...register("gender", { required: "Gender is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    {...register("age", {
                      required: "Age is required",
                      min: {
                        value: 18,
                        message: "You must be at least 18 years old",
                      },
                      max: { value: 100, message: "Please enter a valid age" },
                    })}
                    placeholder="Enter your age"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.age.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth", {
                      required: "Date of birth is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <p className="text-sm text-gray-500 mb-2">Step 2/3</p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="profession"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Profession
                  </label>
                  <input
                    id="profession"
                    {...register("profession", {
                      required: "Profession is required",
                    })}
                    placeholder="Enter your profession"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {errors.profession && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.profession.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="specialization"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Specialization
                  </label>
                  <input
                    id="specialization"
                    {...register("specialization", {
                      required: "Specialization is required",
                    })}
                    placeholder="Enter your specialization"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {errors.specialization && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.specialization.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    {...register("location", {
                      required: "Location is required",
                    })}
                    placeholder="Enter your location"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    {...register("bio")}
                    placeholder="Tell us about yourself"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Skills
                  </label>
                  <input
                    id="skills"
                    {...register("skills", { required: "Skills are required" })}
                    placeholder="Enter your skills (comma-separated)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {errors.skills && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.skills.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <p className="text-sm text-gray-500 mb-2">Step 3/3</p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="avatarUrl"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Profile Picture
                  </label>
                  <div className="mt-1 flex items-center space-x-4">
                    <input
                      id="avatarUrl"
                      type="file"
                      {...register("avatarUrl")}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {avatarFile?.[0] && (
                      <img
                        src={URL.createObjectURL(avatarFile[0])}
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="documents"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Documents
                  </label>
                  <input
                    id="documents"
                    type="file"
                    multiple
                    {...register("documents", {
                      required: "At least one document is required",
                    })}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {errors.documents && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.documents.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="linkedIn"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    LinkedIn Profile
                  </label>
                  <input
                    id="linkedIn"
                    {...register("linkedIn")}
                    placeholder="Enter your LinkedIn profile URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="github"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    GitHub Profile
                  </label>
                  <input
                    id="github"
                    {...register("github")}
                    placeholder="Enter your GitHub profile URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="primaryEmail"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Primary Email
                  </label>
                  <input
                    id="primaryEmail"
                    type="email"
                    {...register("primaryEmail", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {errors.primaryEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.primaryEmail.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phoneNumber"
                    {...register("phoneNumber", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="salaryExpectation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Salary Expectation
                  </label>
                  <input
                    id="salaryExpectation"
                    type="number"
                    {...register("salaryExpectation")}
                    placeholder="Enter your expected salary"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}
        </form>

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
            >
              Previous
            </button>
          )}

          {step < 3 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors ml-auto"
            >
              Next
            </button>
          )}

          {step === 3 && (
            <button
              type="submit"
              form="profile-form"
              disabled={loading}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ml-auto ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUpload;
