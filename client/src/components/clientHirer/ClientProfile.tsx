import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../types/user";
import axios, { AxiosError } from "axios";
import { apiUrl } from "../../services/axiosInstance";

interface FormData {
  companyName: string;
  gender: string;
  companyAddress: string;
  isHiringFrequently: string;
  //   hiringCategories: string;
  //   specialization: string;
  //   location: string;
  //   bio: string;
  hiringCategories: string[];
  //   linkedIn: string;
  //   github: string;
  //   phoneNumber: string;
}

export default function ClientProfile() {
  const { user } = useAuth() as AuthContextType;
  const [step, setStep] = useState("step1");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,

    setValue,
  } = useForm<FormData>({
    defaultValues: {
      hiringCategories: [],
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
        hiringCategories: data.hiringCategories,
      };

      console.log("Submitting data:", formattedData);
      console.log(`${user}`);
      const response = await axios.put(
        `${apiUrl}/profile/client/${user?.id}`,
        formattedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
  const skills = watch("hiringCategories");

  const addSkill = () => {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) return;

    const updated = [...skills, trimmed];
    setValue("hiringCategories", updated);
    setInput("");
  };

  const removeSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    setValue("hiringCategories", updated);
  };

  return (
    <div className="w-[90%] md:w-2xl mx-auto p-6  rounded-lg">
      {message && (
        <div className="mb-4 text-sm text-center text-white bg-purple-500 py-2 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
        {step === "step1" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2  gap-4">
              <div>
                {/* <label className="block mb-1">Full Name</label> */}
                <input
                  type="text"
                  placeholder="Enter Company Name"
                  {...register("companyName", { required: true })}
                  className="w-full px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              <div>
                {/* <label className="block mb-1">Profession</label> */}
                <input
                  type="text"
                  placeholder="Company Address"
                  {...register("companyAddress", { required: true })}
                  className="w-full px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                {/* <label className="block mb-1">Gender</label> */}
                <select
                  {...register("isHiringFrequently", { required: true })}
                  className="w-full px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
                >
                  <option value="">Frequently Hiring</option>
                  <option value="true">true</option>
                  <option value="false">false</option>
                  {/* <option value="other">Other</option> */}
                </select>
                {errors.isHiringFrequently && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div>

              {/* <div>
                <label className="block mb-1">Date of Birth</label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className="w-full px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">Required</p>
                )}
              </div> */}
            </div>

            {/* <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                {...register("primaryEmail", { required: true })}
                className="w-full px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
              />
            </div> */}

            {/* <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder=""
                {...register("phoneNumber", { required: true })}
                className="w-full px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
              />
            </div> */}

            <div className="grid grid-cols-2 gap-4">
              {/* <div>
                <label className="block mb-1">Specialization</label>
                <input
                  type="text"
                  placeholder="Specialization"
                  {...register("specialization", { required: true })}
                  className="w-full px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
                />
              </div> */}

              {/* <div>
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Location"
                  {...register("location", { required: true })}
                  className="w-full px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
                />
              </div> */}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep("step")}
                className="py-2 px-5 w-fit text-[#5A399D] font-bold border rounded-md border-[#5A399D]"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={() => setStep("step2")}
                className="w-fit px-5 py-2 bg-[#5A399D] text-white font-semibold rounded-md hover:bg-purple-700 transition"
              >
                NEXT
              </button>
            </div>
          </div>
        )}

        {step === "step2" && (
          <div className="space-y-5">
            {/* <div>
              <label className="block mb-1">Bio</label>
              <textarea
                placeholder="Bio"
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
                className="w-full px-3 py-2 outline:none bg-[#5A399D] text-white shadow-2xl rounded"
              ></textarea>
              {errors.bio && (
                <p className="text-sm text-red-600">{errors.bio.message}</p>
              )}
            </div> */}
            <div className=" mx-auto p-3 md:p-6 bg-white shadow rounded">
              {/* <h2 className="text-xl font-bold mb-4">Enter Your Skills</h2> */}
              <input type="hidden" {...register("hiringCategories")} />

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
                  className="flex-1 px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-[#5A399D] text-white px-4 py-2 rounded hover:bg-[#5A399D]/90"
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

            {/* <div>
              <label className="block mb-1">LinkedIn (optional)</label>
              <input
                type="url"
                placeholder="LinkedIn (optional)"
                {...register("linkedIn")}
                className="w-full px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
              />
            </div> */}

            {/* <div>
              <label className="block mb-1">GitHub (optional)</label>
              <input
                type="url"
                placeholder="GitHub (optional)"
                {...register("github")}
                className="w-full px-3 py-2 bg-[#5A399D] text-white shadow-2xl rounded"
              />
            </div> */}

            <div className="flex justify-between text-base font-bold mt-5">
              <button
                type="button"
                onClick={() => setStep("step1")}
                className="py-2 px-5 w-fit text-[#5A399D] font-bold border rounded-md border-[#5A399D]"
              >
                PREVIOUS
              </button>

              <button
                type="submit"
                className="w-fit px-5 py-2 bg-[#5A399D] text-white font-semibold rounded-md hover:bg-[#5A399D]/90 transition"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Profile"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
