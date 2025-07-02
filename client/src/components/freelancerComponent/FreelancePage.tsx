import { useState } from "react";
import {
  Search,
  Bell,
  Sun,
  Heart,
  // MessageSquare,
  ChevronDown,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  // MapPin,
  // Briefcase,
  Upload,
} from "lucide-react";
import { FaList } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import { AiOutlineDislike } from "react-icons/ai";

interface Job {
  id: string;
  title: string;
  duration: string;
  salary: string;
  postedDays: number;
  description: string;
  tags: string[];
  saved: boolean;
}

const JobBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBudget, setSelectedBudget] = useState([0, 100000]);
  const [selectedDeadline, setSelectedDeadline] = useState("1 Week");
  const [selectedExperience, setSelectedExperience] = useState("Entry Level");
  const [sortBy, setSortBy] = useState("Relevance");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [filterDropdown, setFilterDropdown] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Creative UI/UX Designer",
      duration: "2 Week",
      salary: "$ 50-100k",
      postedDays: 2,
      description:
        "We are looking for someone who is an expert in UI/UX Development to join us. You will be a natural at understanding human-computer interaction design (HCID)...........",
      tags: ["Entry Level", "Figma", "Urgent"],
      saved: false,
    },
    {
      id: "2",
      title: "Creative UI/UX Designer",
      duration: "2 Week",
      salary: "$ 50-100k",
      postedDays: 2,
      description:
        "We are looking for someone who is an expert in UI/UX Development to join us. You will be a natural at understanding human-computer interaction design (HCID)...........",
      tags: ["Entry Level", "Figma", "Urgent"],
      saved: false,
    },
    {
      id: "3",
      title: "Creative UI/UX Designer",
      duration: "2 Week",
      salary: "$ 50-100k",
      postedDays: 2,
      description:
        "We are looking for someone who is an expert in UI/UX Development to join us. You will be a natural at understanding human-computer interaction design (HCID)...........",
      tags: ["Entry Level", "Figma", "Urgent"],
      saved: false,
    },
    {
      id: "4",
      title: "Creative UI/UX Designer",
      duration: "2 Week",
      salary: "$ 50-100k",
      postedDays: 2,
      description:
        "We are looking for someone who is an expert in UI/UX Development to join us. You will be a natural at understanding human-computer interaction design (HCID)...........",
      tags: ["Entry Level", "Figma", "Urgent"],
      saved: false,
    },
  ]);

  const toggleSaveJob = (jobId: string) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, saved: !job.saved } : job
      )
    );
  };

  const handleSubscribe = () => {
    if (email) {
      alert("Subscribed successfully!");
      setEmail("");
      setShowEmailForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E1DEE8]">
      {/* Header */}
      <header className="bg-transparent shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 ">
            <div className="flex items-center">
              <img src="/freebioLogo.png" alt="logo" className=" h-[50px]" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Sun className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <img
                  src="/api/placeholder/32/32"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          {/* <h1 className="text-4xl font-light text-gray-900 mb-4">
            Find your{" "}
            <span className="text-purple-600 font-medium">new job today</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Thousands of jobs in the computer, engineering and technology
            sectors are waiting for you.
          </p> */}

          {/* Search Bar */}
          <div className="flex mx-auto mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-7 w-7" />
              <input
                type="text"
                placeholder="What position are you looking for ?"
                className="w-full pl-12 pr-4 py-4 text-gray-700 bg-white border border-gray-300 rounded-none rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="bg-[#5A399D] text-[14px] text-white px-8 py-4 rounded-r-lg hover:bg-[#5A399D]/60 transition-colors font-medium">
              Search Jobs
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${filterDropdown === true && "w-64 flex-shrink-0"}`}>
            <div
              className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
                filterDropdown === true
                  ? "bg-white rounded-lg shadow-sm border border-gray-200"
                  : "h-[70px]"
              }`}
            >
              <button
                type="button"
                onClick={() => setFilterDropdown((prev) => !prev)}
              >
                <div className="flex items-center w-fit mx-auto justify-between mb-6">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    <p
                      className={`${
                        filterDropdown === true ? "block" : "hidden"
                      } text-[#5A399D] text-2xl`}
                    >
                      Filters
                    </p>
                  </h3>
                  <ChevronDown className="h-6 w-6 ml-5 text-[#5A399D]" />
                </div>
              </button>

              {/* Budget Filter */}
              <div>
                {filterDropdown === true ? (
                  <div>
                    <div className="mb-8">
                      <h4 className="font-medium text-gray-900 mb-4">Budget</h4>
                      <div className="space-y-4">
                        <div className="text-center">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
                            $10
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            type="range"
                            min="0"
                            max="100000"
                            value={selectedBudget[0]}
                            onChange={(e) =>
                              setSelectedBudget([
                                parseInt(e.target.value),
                                selectedBudget[1],
                              ])
                            }
                            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>
                            $0
                            <br />
                            Min.
                          </span>
                          <span>
                            $100,000
                            <br />
                            Max.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Deadline Filter */}
                    <div className="mb-8">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Deadline
                      </h4>
                      <div className="space-y-3">
                        {["1 Week", "3 Week", "1 Month", "3 Month"].map(
                          (deadline) => (
                            <label key={deadline} className="flex items-center">
                              <input
                                type="radio"
                                name="deadline"
                                value={deadline}
                                checked={selectedDeadline === deadline}
                                onChange={(e) =>
                                  setSelectedDeadline(e.target.value)
                                }
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                              />
                              <span className="ml-3 text-gray-700">
                                {deadline}
                              </span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    {/* Experience Level Filter */}
                    <div className="mb-8">
                      <h4 className="font-medium text-gray-900 mb-4">
                        Experience level
                      </h4>
                      <div className="space-y-3">
                        {[
                          { label: "Entry Level", count: "(119)" },
                          { label: "Intermediate", count: "(2,098)" },
                          { label: "Expert", count: "(1,171)" },
                        ].map((level) => (
                          <label
                            key={level.label}
                            className="flex items-center"
                          >
                            <input
                              type="radio"
                              name="experience"
                              value={level.label}
                              checked={selectedExperience === level.label}
                              onChange={(e) =>
                                setSelectedExperience(e.target.value)
                              }
                              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                            />
                            <span className="ml-3 text-gray-700">
                              {level.label}{" "}
                              <span className="text-gray-500">
                                {level.count}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-purple-100 text-purple-700 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors font-medium">
                      Apply Filter
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-white rounded-lg pt-6 shadow-2xl">
            {/* Sort and View Options */}
            <div className="flex justify-between items-center mb-6 px-6">
              <div className="grid grid-cols-2 place-content-center p-[5px]  gap-2 shadow-md bg-[#CEC4E2] border border-[#E1DEE8] rounded-sm">
                <button className=" bg-white p-[2px] text-[#5A399D]">
                  <FaList className="w-4 h-4" />
                </button>
                <button className=" ">
                  <IoGridOutline className="w-4 h-4 text-[#A8A9B3] font-bold" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center text-[12px] text-[#5A399D] hover:text-[#5A399D]/70">
                  <Heart className="h-5 w-5 font-bold mr-5" />
                  Saved Job
                </button>
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white border-b border-gray-400 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[12px] font-medium text-[#000000]">
                      {job.title}
                    </h3>
                    <div className="flex  items-center space-x-2">
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-full ${
                          job.saved
                            ? "text-red-500"
                            : "text-[#5A399D] hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            job.saved ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <button className="p-2 text-[#5A399D] hover:text-[#5A399D]/70 rounded-full">
                        <AiOutlineDislike className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                      <div className="flex text-sm font-semibold items-center">
                        <Clock className="h-4 w-4 text-[#5A399D] mr-1" />
                        <p className="text-[#050F24]">{job.duration}</p>
                      </div>
                      <div className="flex text-sm font-semibold items-center">
                        <DollarSign className="h-4 w-4 text-[#5A399D] mr-1" />
                        <p className="text-[#050F24]">{job.salary}</p>
                      </div>
                      <div className="flex text-sm font-semibold items-center">
                        <Calendar className="h-4 w-4 text-[#5A399D] mr-1" />
                        <p className="text-[#050F24]">
                          {job.postedDays} days ago.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={` bg-[#CEC4E2] h-6 text-[#09080D] px-2 py-[2px] font-normal rounded-md text-xs  
                        //  {
                        //    tag === "Entry Leve"
                        //      ? "bg-blue-100 text-blue-800"
                        //      : tag === "Figm"
                        //      ? "bg-green-100 text-green-800"
                        //      : tag === "Urgen"
                        //      ? "bg-orange-100 text-orange-800"
                        //      : "bg-gray-100 text-gray-800"
                        //  }
                          `}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[#6F757E] font-normal text-sm mb-4 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="flex items-center space-x-2 mb-5">
              <span className="text-[#000000] text-sm font-bold">Sort by:</span>
              <select
                className="border border-gray-300 font-semibold py-[5px] px-[10px] bg-white rounded  text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Relevance</option>
                <option>Date Posted</option>
                <option>Salary</option>
              </select>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Email me for jobs</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Ut esse eiusmod aute. Sit enim labore dolore. Aute ea fugiat
                commodo ea foes.
              </p>

              {!showEmailForm ? (
                <button
                  onClick={() => setShowEmailForm(true)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Subscribe
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="name@mail.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    onClick={handleSubscribe}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">
                  Get notified faster
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Quis eiusmod deserunt cillum laboris magna cupidatat esse labore
                irure quis cupidatat in.
              </p>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #7c3aed;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style> */}
    </div>
  );
};

export default JobBoard;
