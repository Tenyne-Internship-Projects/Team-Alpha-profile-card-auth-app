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
        `${apiUrl}/profile/freelancer-uploads/${user?.id}`,
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
            className={`px-4 py-2 rounded-lg shadow-xl text-sm font-semibold ${
              step === item
                ? "bg-[#5A399D] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {item === "resume" ? " Upload Resume" : " Upload Picture"}
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
              <div className="cursor-pointer bg-[#5A399D] shadow-xl text-white p-3 rounded-lg text-center">
                {watchedResume?.[0]
                  ? watchedResume[0].name
                  : "CHOOSE RESUME UPLOAD"}
              </div>
            </label>
            {errors.documents && (
              <p className="text-red-500 text-sm">{errors.documents.message}</p>
            )}
            <button
              type="button"
              className="w-full bg-[#5A399D] cursor-pointer text-white p-3 shadowxl rounded-lg font-semibold"
              onClick={() => setStep("profile")}
              // disabled={!watchedResume?.length}
            >
              NEXT
            </button>
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
              <div className="cursor-pointer bg-[#5A399D] text-gray-100 p-3 rounded-lg text-center">
                {watchedProfile?.[0]
                  ? watchedProfile[0].name
                  : "CHOOSE PROFILE IMAGE UPLOAD"}
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
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep("resume")}
                className="w-full border border-[#5A399D] cursor-pointer text-[#5A399D] font-semibold p-3 rounded-lg"
              >
                PREVIOUS
              </button>
              <button
                type="submit"
                className="w-full bg-[#5A399D] text-white cursor-pointer p-3 rounded-lg font-semibold"
              >
                UPLOAD
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UploadDocument;
