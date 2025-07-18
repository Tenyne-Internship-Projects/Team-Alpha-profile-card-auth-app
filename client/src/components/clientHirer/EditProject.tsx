import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
// import { useAuth } from "../../hooks/useAuth";
// import { AuthContextType } from "../../types/user";
import axios from "../../services/axiosInstance";

interface FormData {
  title: string;
  description: string;
  responsibilities: string[];
  location: string;
  deadline: string;
  budget: number;
  // experienceLevel: string;
  tags: string[];
  requirement: string;
}

const EditProjects = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skillinput, setSkillInput] = useState("");
  const [responsibilityinput, setResponsibilityInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  // const { user } = useAuth() as AuthContextType;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // const [experienceLevel, setExperienceLevel] = useState("Entry");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    // watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      requirement: "",
      responsibilities: [],
      location: "",
      // deadline: Date,
      // budget: "",
      // experienceLevel: "Entry",
      tags: [],
    },
  });

  // Load project data from sessionStorage
  useEffect(() => {
    const projectData = sessionStorage.getItem("editProjectData");
    if (projectData && id) {
      try {
        const project = JSON.parse(projectData);

        // Populate form with project data
        setValue("title", project.title);
        setValue("description", project.description);
        setValue("requirement", project.requirement);
        setValue("location", project.location);
        setValue("budget", project.budget);
        setValue(
          "deadline",
          new Date(project.deadline).toISOString().split("T")[0]
        );

        // Set skills and responsibilities
        setSkills(project.tags || []);
        setResponsibilities(project.responsibilities || []);
        setValue("tags", project.tags || []);
        setValue("responsibilities", project.responsibilities || []);

        setLoading(false);
      } catch (error) {
        console.error("Error parsing project data:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [id, setValue]);

  // Keep skills in sync with react-hook-form
  const addSkill = () => {
    const trimmed = skillinput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const updated = [...skills, trimmed];
      setSkills(updated);
      setValue("tags", updated);
    }
    setSkillInput("");
  };

  const addResponsibility = () => {
    const trimmed = responsibilityinput.trim();
    if (trimmed && !responsibilities.includes(trimmed)) {
      const updated = [...responsibilities, trimmed];
      setResponsibilities(updated);
      setValue("responsibilities", updated);
    }
    setResponsibilityInput("");
  };

  const removeSkill = (skill: string) => {
    const updated = skills.filter((s) => s !== skill);
    setSkills(updated);
    setValue("tags", updated);
  };

  const removeResponsibility = (skill: string) => {
    const updated = responsibilities.filter((s) => s !== skill);
    setResponsibilities(updated);
    setValue("responsibilities", updated);
  };

  const steps = [
    { number: 1, title: "Project Basics", active: currentStep === 1 },
    { number: 2, title: "Requirements & Budgets", active: currentStep === 2 },
    { number: 3, title: "Review", active: currentStep === 3 },
  ];

  const onSubmit = async (data: FormData) => {
    const formattedData = {
      title: data.title,
      description: data.description,
      budget: Number(data.budget),
      tags: data.tags, // or data.skills if that's your field
      deadline: new Date(data.deadline).toISOString(),
      responsibilities: data.responsibilities, // if needed by backend
      requirement: data.requirement, // if needed by backend
      location: data.location, // if needed by backend
    };
    console.log(formattedData);
    try {
      const response = await axios.put(`/project/update/${id}`, formattedData);
      console.log(response);
      if (response.status === 200) {
        alert("Project updated successfully!");
        // Clear sessionStorage and navigate back to projects
        sessionStorage.removeItem("editProjectData");
        navigate("/job-list-dashboard/projects");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project. Please try again.");
    }
  };

  const renderStepIndicator = () => (
    <div className="w-52 h-[300px] bg-white rounded-lg py-5 px-6 shadow-sm border border-[#CEC4E2] flex flex-col justify-center">
      {steps.map((step, idx) => {
        const isActive = currentStep === step.number;
        const isLast = idx === steps.length - 1;
        return (
          <div
            key={step.number}
            className="flex flex-col items-center mb-6 last:mb-0 relative w-full"
          >
            <div className="flex items-center w-full">
              <div
                className={`relative z-10 w-5 h-5 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                  isActive
                    ? "bg-[#5A399D] border-[#5A399D] text-white"
                    : "bg-[#CEC4E2] border-[#CEC4E2] text-[#CEC4E2]"
                }`}
              >
                {/* Dot */}
              </div>
              <span
                className={`ml-4 text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-[#5A399D]" : "text-[#CEC4E2]"
                }`}
              >
                {step.title}
              </span>
            </div>
            {/* Vertical and horizontal bar below dot, only if not last step */}
            {!isLast && (
              <div className="flex  flex-col items-center w-full">
                <div
                  className={`h-16 absolute left-2  w-[3px]  mb-0.5 transition-colors duration-200 ${
                    isActive ? "bg-[#5A399D]" : "bg-[#CEC4E2]"
                  }`}
                ></div>
                <div className="h-16 w-[3px]  transition-colors duration-200"></div>
                {/* Centered short horizontal bar directly under the dot */}
                {/* <div
                  className={`w-8 h-[3px] rounded mx-auto transition-colors duration-200 ${
                    isActive ? "bg-[#5A399D]" : "bg-[#CEC4E2]"
                  }`}
                ></div> */}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderProjectBasics = () => (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex-2 ml-6">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentStep(2);
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="e.g. UI Design for Mobile App"
            className="w-full px-4 py-3 placeholder-[#6F757E] border border-[#6F757E] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
          {errors.title && (
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
            {...register("requirement", { required: true })}
            rows={4}
            placeholder="Brief + key details; support markdown or rich text"
            className="w-full px-4 placeholder-[#6F757E] py-3 border border-[#6F757E] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
          />
          {errors.requirement && (
            <span className="text-red-500 text-xs">
              Description is required
            </span>
          )}
        </div>

        {/* Responsibilities */}

        <div className="">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Responsibilities <span className="text-red-500">*</span>
          </label>
          <input type="hidden" {...register("responsibilities")} />

          <div className="p-4 border border-[#CEC4E2] shadow-xl rounded-lg">
            <div className="flex gap-2 border border-[#4A008F1A]">
              <input
                type="text"
                value={responsibilityinput}
                onChange={(e) => setResponsibilityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addResponsibility();
                  }
                }}
                placeholder="Type Responsibilities"
                className="flex-1 px-3 py-2  placeholder-[#6F757E] border border-[#6F757E] shadow-lg rounded"
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
              {responsibilities.map((responsibilities, idx) => (
                <div
                  key={idx}
                  className="bg-[#5A399D] text-white text-sm px-3 py-1 rounded-sm flex items-center gap-2"
                >
                  <span>{responsibilities}</span>
                  <button
                    type="button"
                    onClick={() => removeResponsibility(responsibilities)}
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
              {...register("location", { required: true })}
              className="w-full px-4 py-3 placeholder-[#6F757E] border border-[#6F757E] rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="">
                Brief + key details; support markdown or rich text
              </option>
              <option value="remote">Remote </option>
              <option value="on-site">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          {errors.location && (
            <span className="text-red-500 text-xs">Category is required</span>
          )}
        </div>

        <div className="  ">
          {/* <h2 className="text-xl font-bold mb-4">Enter Your Skills</h2> */}
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Skills (Tags) <span className="text-red-500">*</span>
          </label>
          <input type="hidden" {...register("tags")} />
          <div className="p-4 border border-[#CEC4E2] shadow-xl rounded-lg">
            <div className="flex gap-2 border border-[#4A008F1A]">
              <input
                type="text"
                value={skillinput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Type a skill"
                className="flex-1 px-3 py-2  placeholder-[#6F757E] border border-[#6F757E] shadow-lg rounded"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-[#5A399D] text-white px-7 py-2 rounded hover:bg-[#5A399D]/90"
              >
                Add Skills
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-[#5A399D] text-white text-sm px-3 py-1 rounded-sm flex items-center gap-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-white font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            // onClick={() => setCurrentStep(1)}
            type="submit"
            className="px-8 py-3 bg-[#5A399D] text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );

  const renderRequirements = () => (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex-1 ml-6">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setCurrentStep(3);
        }}
      >
        {/* <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Experience Level <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {["Entry", "Intermediate", "Expert"].map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  value={level}
                  checked={experienceLevel === level}
                  onChange={(e) => {
                    setExperienceLevel(e.target.value);
                    setValue("experienceLevel", e.target.value);
                  }}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Deadline <span className="text-red-500">*</span>
          </label>
          <input
            {...register("deadline", { required: true })}
            type="date"
            placeholder="Input Date"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
          {errors.deadline && (
            <span className="text-red-500 text-xs">Deadline is required</span>
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
            onClick={() => setCurrentStep(1)}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );

  const renderReview = () => {
    const values = getValues();
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex-1 ml-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Project Title</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {values.title}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {values.description}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Responsibilities</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {values.responsibilities}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Category</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {values.location}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Tags (Skills)</h4>
            <div className="flex flex-wrap gap-2">
              {values.tags.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* <div>
            <h4 className="font-medium text-gray-900 mb-2">Experience Level</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {values.experienceLevel}
            </p>
          </div> */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Deadline</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {
                values.deadline
                // ? new Date(values.deadline).toLocaleDateString()
                // : ""
              }
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Budget</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {values.budget}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => setCurrentStep(2)}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          {/* <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Save as Draft
          </button> */}
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Update Project
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen rounded-3xl bg-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-3xl bg-white p-6">
      <div className="">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => {
              sessionStorage.removeItem("editProjectData");
              navigate("/job-list-dashboard/projects");
            }}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronDown className="w-4 h-4 mr-1 rotate-90" />
            Back to Projects
          </button>
        </div>

        <div className="flex items-start">
          {renderStepIndicator()}
          {currentStep === 1 && renderProjectBasics()}
          {currentStep === 2 && renderRequirements()}
          {currentStep === 3 && renderReview()}
        </div>
      </div>
    </div>
  );
};

export default EditProjects;
