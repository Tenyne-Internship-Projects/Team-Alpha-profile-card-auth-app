import { useState, ChangeEvent, DragEvent } from "react";
import { ChevronDown, Upload, X } from "lucide-react";

const AddProjects = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "VS Code",
    "Webflow",
    "Figma",
  ]);
  const [selectedTools, setSelectedTools] = useState<string[]>([
    "VS Code",
    "Webflow",
    "Figma",
  ]);
  const [experienceLevel, setExperienceLevel] = useState("Entry");
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    projectTitle: "",
    description: "",
    responsibilities: "",
    category: "",
    deadline: "",
    budget: "",
  });

  const steps = [
    { number: 1, title: "Project Basics", active: currentStep === 1 },
    { number: 2, title: "Requirements", active: currentStep === 2 },
    { number: 3, title: "Media", active: currentStep === 3 },
    { number: 4, title: "Review", active: currentStep === 4 },
  ];

  const availableTags = ["Adobe Illustrator", "Notion", "Trello"];
  const availableTools = ["Adobe Illustrator", "Notion", "Trello"];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleToolSelect = (tool: string) => {
    if (!selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleToolRemove = (tool: string) => {
    setSelectedTools(selectedTools.filter((t) => t !== tool));
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...files]);
    }
  };

  const onSubmit = async () => {
    const finalData = {
      ...formData,
      tags: selectedTags,
      tools: selectedTools,
      experienceLevel,
      media: uploadedFiles,
    };

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Project created successfully:", result);
        alert("Project created successfully!");
      } else {
        throw new Error("Failed to create project");
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    }
  };

  const renderStepIndicator = () => (
    <div className="w-32 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className="flex items-center mb-6 last:mb-0 relative"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step.active
                ? "bg-purple-600 text-white"
                : currentStep > step.number
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step.number}
          </div>
          <span
            className={`ml-3 text-sm font-medium ${
              step.active ? "text-purple-600" : "text-gray-400"
            }`}
          >
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className="absolute left-4 top-8 w-px h-6 bg-gray-200"></div>
          )}
        </div>
      ))}
    </div>
  );

  const renderProjectBasics = () => (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex-1 ml-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleInputChange}
            type="text"
            placeholder="e.g. UI Design for Mobile App"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Brief + key details; support markdown or rich text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Responsibilities <span className="text-red-500">*</span>
          </label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleInputChange}
            rows={4}
            placeholder="Brief + key details; support markdown or rich text"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="">
                Brief + key details; support markdown or rich text
              </option>
              <option value="ui-design">UI Design</option>
              <option value="web-development">Web Development</option>
              <option value="mobile-app">Mobile App</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Tags (Skills) <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-600 text-white"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-2 hover:bg-purple-700 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="bg-gray-50 rounded p-2 space-y-1">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagSelect(tag)}
                  className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  {tag}
                </button>
              ))}
            </div>
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
          type="button"
          onClick={() => setCurrentStep(2)}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderRequirements = () => (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex-1 ml-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Experience Level <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {["Entry", "Intermediate", "Expert"].map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  name="experienceLevel"
                  value={level}
                  checked={experienceLevel === level}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Tools Preferred <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedTools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-600 text-white"
                >
                  {tool}
                  <button
                    type="button"
                    onClick={() => handleToolRemove(tool)}
                    className="ml-2 hover:bg-purple-700 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="bg-gray-50 rounded p-2 space-y-1">
              {availableTools.map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => handleToolSelect(tool)}
                  className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Deadline <span className="text-red-500">*</span>
          </label>
          <input
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            type="date"
            placeholder="Input Date"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Budget <span className="text-red-500">*</span>
          </label>
          <input
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            type="text"
            placeholder="Input Amount"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          />
        </div>
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
          type="button"
          onClick={() => setCurrentStep(3)}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderMedia = () => (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex-1 ml-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-4">
            Media
          </label>
          <div
            className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive
                ? "border-purple-400 bg-purple-50"
                : "border-gray-300 bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Drop your image here or{" "}
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-700 underline"
                  onClick={() => {
                    const fileInput = document.getElementById(
                      "file-input"
                    ) as HTMLInputElement;
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                >
                  Browse
                </button>
              </p>
              <p className="text-sm text-gray-500">Supports: JPG, JPEG, PNG</p>
            </div>
            <input
              id="file-input"
              type="file"
              multiple
              accept=".jpg,.jpeg,.png"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setUploadedFiles((files) =>
                        files.filter((_, i) => i !== index)
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
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
        <button
          type="button"
          onClick={() => setCurrentStep(4)}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderReview = () => {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex-1 ml-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-400 rounded"></div>
            <div className="w-2 h-8 bg-green-400 rounded ml-1"></div>
            <div className="w-2 h-8 bg-red-400 rounded ml-1"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Tenyne Inc.</h3>
            <p className="text-gray-600">Creative UI/UX Designer</p>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-sm text-gray-500">Deadline</span>
              <span className="text-sm font-medium">3 Weeks</span>
            </div>
            <div className="flex space-x-2 mt-2">
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                Entry Level
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                Figma
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                Urgent
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Full job description
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              We are looking to hire someone who is an expert in UI/UX
              Development to join us. You will be a natural at understanding
              human-computer interaction design (HCID), gathering user
              requirements, designing graphic elements, coming up with elegant
              solutions to improve our applications using our frontend
              technology stacks (with HTML5, CSS, JS/TS).
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Responsibilities</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                • Gather and evaluate user requirements in collaboration with
                product managers and engineers
              </li>
              <li>
                • Illustrate design ideas using storyboards, process flows and
                sitemaps
              </li>
              <li>
                • Come up with UI and UX strategies based on our target goals
              </li>
              <li>
                • Translate user requirements or user stories into UI flows that
                capture and realize use cases with why-framing user experience
                Using an appropriate design tool (Adobe *, Figma, Visio, etc.)
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Requirements and Skills
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                • No specific educational standing or certification/Award is
                required for this role.
              </li>
              <li>
                • Proven work experience as a UI/UX Designer or similar role
              </li>
              <li>
                • Experience as a frontend developer (using a frontend framework
                such as Angular, ReactJS, Vue, etc.) or considerable knowledge
                of the field.
              </li>
              <li>
                • Considerable knowledge of JavaScript and understanding of
                SOLID design principles (plugins, node packages, etc.). Having a
                portfolio that demonstrates this is a plus.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Budget</h4>
            <p className="text-sm text-gray-700">500,000.00 - 1,000,000.00</p>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0">
          {/* Step Indicator Sidebar */}
          <div className="w-full lg:w-1/4 flex-shrink-0 mb-4 lg:mb-0">
            {renderStepIndicator()}
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 flex-1">
            <div className="min-h-[60vh]">
              {currentStep === 1 && (
                <div className="h-full">{renderProjectBasics()}</div>
              )}
              {currentStep === 2 && (
                <div className="h-full">{renderRequirements()}</div>
              )}
              {currentStep === 3 && (
                <div className="h-full">{renderMedia()}</div>
              )}
              {currentStep === 4 && (
                <div className="h-full">{renderReview()}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProjects;
