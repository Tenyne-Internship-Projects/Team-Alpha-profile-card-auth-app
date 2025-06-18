import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

import axios, { AxiosError } from "axios";
import { AuthContextType } from "../../types/user";
import { apiUrl } from "../../services/axiosInstance";

type Step = "resume" | "profile";

interface FormData {
  avatar: FileList;
  documents: FileList;
}

const UploadDocument: React.FC = () => {
  const [step, setStep] = useState<Step>("resume");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });
  const { user } = useAuth() as AuthContextType;

  const watchedResume = watch("documents");
  const watchedProfile = watch("avatar");

  useEffect(() => {
    if (step === "profile" && watchedProfile?.[0]) {
      const url = URL.createObjectURL(watchedProfile[0]);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [watchedProfile, step]);

  // const handleNext = () => {
  //   if (watchedResume?.[0]) {
  //     setStep("profile");
  //   }
  // };

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("documents", data.documents[0]);
    formData.append("avatar", data.avatar[0]);

    try {
      console.log("Sending files:", {
        resume: data.documents[0]?.name,
        profile: data.avatar[0]?.name,
      });

      const response = await axios.post(
        `${apiUrl}/profile/uploads-files/${user?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", response.data);
      alert("All files uploaded!");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Upload error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert(
        error.response?.data?.message || "Upload failed. Please try again."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      {/* Top step indicator */}
      <div className="flex justify-center gap-4 mb-6">
        {["resume", "profile"].map((item) => (
          <div
            key={item}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              step === item
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {item === "resume" ? "Resume Upload" : "Profile Upload"}
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === "resume" && (
          <>
            <label className="block">
              <input
                type="file"
                {...register("documents", {
                  required: "Resume is required",
                  validate: (files) =>
                    ["application/pdf", "application/msword"].includes(
                      files?.[0]?.type
                    ) || "Only PDF/DOC allowed",
                })}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <div className="cursor-pointer bg-purple-600 text-white p-3 rounded-lg text-center">
                {watchedResume?.[0] ? watchedResume[0].name : "Upload Resume"}
              </div>
            </label>
            {errors.documents && (
              <p className="text-red-500 text-sm">{errors.documents.message}</p>
            )}
          </>
        )}

        {step === "profile" && (
          <>
            <label className="block">
              <input
                type="file"
                {...register("avatar", {
                  required: "Profile image is required",
                  validate: (files) =>
                    files?.[0]?.type.startsWith("image/") ||
                    "Only images allowed",
                })}
                accept="image/*"
                className="hidden"
              />
              <div className="cursor-pointer bg-purple-600 text-white p-3 rounded-lg text-center">
                {watchedProfile?.[0]
                  ? watchedProfile[0].name
                  : "Upload Profile Picture"}
              </div>
            </label>
            {errors.avatar && (
              <p className="text-red-500 text-sm">{errors.avatar.message}</p>
            )}

            {previewUrl && (
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto my-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </>
        )}

        <button
          type="button"
          className="w-full bg-purple-600 text-white p-3 rounded-lg font-medium"
          onClick={() => setStep("profile")}
          // disabled={!watchedResume?.length}
        >
          Next
        </button>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={() => setStep("resume")}
            className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg"
          >
            Previous
          </button>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-lg font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadDocument;
