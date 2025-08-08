import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  // DollarSign,
  // Tag,
  ChevronDown,
  ChevronUp,
  X,
  // Bell,
  // Sun,
  Heart,
} from "lucide-react";
import axios from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";
import SubmissionForm from "../components/forms/SubmissionForm";
import { AuthContextType } from "../types/user";
import GenerateAvatar from "../components/ui/GenerateAvatar";

// Types based on your data structure
interface ClientProfile {
  id: string;
  userId: string;
  companyName: string;
  companyWebsite: string;
  companyIndustry: string;
}

interface Client {
  id: string;
  email: string;
  fullname: string;
  role: string;
  clientProfile: ClientProfile;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  location: string;
  requirement: string;
  responsibilities: string[];
  status: string;
  tags: string[];
  clientId: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  Client: Client;
}

interface FilterState {
  search: string;
  minBudget: string;
  maxBudget: string;
  startDate: string;
  endDate: string;
  tags: string[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
  budgetRange: string;
}

const budgetRanges = [
  { label: "Any", value: "any", min: null, max: null },
  { label: "$0 - $999", value: "0-999", min: 0, max: 999 },
  { label: "$1000 - $4999", value: "1000-4999", min: 1000, max: 4999 },
  { label: "$5000 - $9999", value: "5000-9999", min: 5000, max: 9999 },
  { label: "$10000+", value: "10000+", min: 10000, max: null },
];

const JobListing = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const user = useAuth() as AuthContextType;
  // const [applicationText, setApplicationText] = useState("");
  // const [jobs, setJobs] = useState(false);
  const navigate = useNavigate();
  // const user = useAuth();
  const [likedProjects, setLikedProjects] = useState<{ [id: string]: boolean }>(
    {}
  );

  // Available tags (you can make this dynamic by fetching from API)
  // const availableTags = [
  //   "Food",
  //   "Reservation",
  //   "Delivery",
  //   "API",
  //   "Backend",
  //   "Database",
  //   "CRM",
  //   "Salesforce",
  //   "Chat",
  //   "Mobile",
  // ];

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    minBudget: "",
    maxBudget: "",
    startDate: "",
    endDate: "",
    tags: [],
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 5,
    budgetRange: "any",
  });

  // Fetch projects from API
  const fetchProjects = async (queryParams: FilterState) => {
    setLoading(true);
    setError(null);

    try {
      // Build query string
      const params = new URLSearchParams();

      if (queryParams.search) params.append("search", queryParams.search);
      if (queryParams.minBudget)
        params.append("minBudget", queryParams.minBudget);
      if (queryParams.maxBudget)
        params.append("maxBudget", queryParams.maxBudget);
      if (queryParams.startDate)
        params.append("startDate", queryParams.startDate);
      if (queryParams.endDate) params.append("endDate", queryParams.endDate);
      if (queryParams.tags.length > 0)
        params.append("tags", queryParams.tags.join(","));
      if (queryParams.sortBy) params.append("sortBy", queryParams.sortBy);
      if (queryParams.sortOrder)
        params.append("sortOrder", queryParams.sortOrder);
      params.append("page", queryParams.page.toString());
      params.append("limit", queryParams.limit.toString());

      const url = `/project?${params.toString()}`;
      const response = await axios.get(url);
      console.log(response);

      // Adjust this if your API response shape is different
      setProjects(response.data.data || response.data.projects || []);
      setTotalProjects(
        response.data.pagination?.totalProjects ||
          response.data.totalProjects ||
          (response.data.data ? response.data.data.length : 0)
      );
      setTotalPages(
        response.data.pagination?.totalPages || response.data.totalPages || 1
      );
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "Failed to fetch projects. Please try again.");
      setProjects([]);
      setTotalProjects(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // HANDLE NUMBER OF BIDS
  // const bidsProject = async (projectId: string) => {
  //   try {
  //     const res = await axios.get(`/bid/${projectId}`);
  //     console.log(res);
  //   } catch {
  //     console.error(error);
  //   }
  // };

  // FAVOURITE

  const toggleFavorite = async (projectId: string, isFavorite: boolean) => {
    try {
      if (!isFavorite) {
        // Add to favorites
        await axios.post(`/favorites/${projectId}`);
      } else {
        // Remove from favorites
        await axios.delete(`/api/favorites/${projectId}`);
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  // Fetch projects when filters change
  useEffect(() => {
    fetchProjects(filters);
    // bidsProject;
  }, [filters]);

  // const handleFilterChange = (key: keyof FilterState, value: any) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     [key]: value,
  //     page: key !== "page" ? 1 : value, // Reset to page 1 when other filters change
  //   }));
  // };
  const handleFilterChange = (
    key: keyof FilterState,
    value: string | number | boolean | string[]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key === "page" ? Number(value) : 1, // Ensure it's a number
    }));
  };

  // const handleTagToggle = (tag: string) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     tags: prev.tags.includes(tag)
  //       ? prev.tags.filter((t) => t !== tag)
  //       : [...prev.tags, tag],
  //     page: 1,
  //   }));
  // };

  const clearFilters = () => {
    setFilters({
      search: "",
      minBudget: "",
      maxBudget: "",
      startDate: "",
      endDate: "",
      tags: [],
      sortBy: "createdAt",
      sortOrder: "desc",
      page: 1,
      limit: 5,
      budgetRange: "any",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatBudget = (budget: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(budget);
  };

  const getBudgetRange = (rangeValue: string) => {
    const found = budgetRanges.find((r) => r.value === rangeValue);
    return found
      ? { min: found.min, max: found.max }
      : { min: null, max: null };
  };

  const filteredProjects = projects.filter((project) => {
    const { min, max } = getBudgetRange(filters.budgetRange);
    if (min !== null && project.budget < min) return false;
    if (max !== null && project.budget > max) return false;
    // ...other filter conditions
    return true;
  });

  const ProjectCard = ({
    project,
    onClick,
  }: {
    project: Project;
    onClick: (project: Project) => void;
  }) => (
    <div
      className="bg-white    border-b border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(project)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {project.title}
          </h3>
        </div>
        {user?.user?.role === "freelancer" && (
          <button
            onClick={async () => {
              await toggleFavorite(project.id, likedProjects[project.id]);
              setLikedProjects((prev) => ({
                ...prev,
                [project.id]: !prev[project.id],
              }));
            }}
            className={`p-2 rounded-full ${
              likedProjects[project.id]
                ? "text-red-500"
                : "text-[#5A399D] hover:text-red-500"
            }`}
          >
            <Heart
              className={`h-5 w-5 ${
                likedProjects[project.id] ? "fill-current" : ""
              }`}
            />
          </button>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#6F757E]  ">
            {formatBudget(project.budget)}
          </span>
          <span className="text-xs text-[#6F757E]">📍 {project.location}</span>
        </div>

        <div className="flex items-center text-xs text-[#050F24]">
          <Calendar className="w-4 h-4 mr-1" />
          Deadline: {project.deadline || formatDate(project.deadline)}
        </div>

        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-[#CEC4E2] rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* <div className="border-t pt-3 mt-3">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Client:</span>
            <span className="ml-1">{project.Client.fullname}</span>
            <span className="mx-2">•</span>
            <span>{project.Client.clientProfile.companyName}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{project.requirement}</p>
        </div> */}
      </div>
      <p className="text-[#6F757E] text-xs my-3">
        {project.description.split(" ").slice(0, 20).join(" ")}
        {project.description.split(" ").length > 20 && "..."}
      </p>
    </div>
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    handleFilterChange("page", newPage);
  };

  // const handleApplicationSubmit = async () => {
  //   if (!applicationText.trim() || !selectedProject) {
  //     alert("Please enter your profile link and select a project.");
  //     return;
  //   }
  //   try {
  //     await axios.post(`/applications/apply/${selectedProject.id}`, {
  //       profileLink: applicationText,
  //     });
  //     alert("Application submitted!");
  //     setShowApplyModal(false);
  //     setApplicationText("");
  //   } catch (error: unknown) {
  //     const err = error as AxiosError;
  //     alert(
  //       (err.response?.data as { message?: string })?.message ||
  //         "Failed to submit application. Please try again."
  //     );
  //   }
  // };

  //

  // MAIN PAGE SECTION
  const bidModalClose = () => {
    setShowApplyModal(false);
  };

  return (
    <div className="min-h-screen relative bg-[#E1DEE8] p-5 md:px-10">
      <SubmissionForm
        bidModal={showApplyModal}
        setBidModalClose={bidModalClose}
        selectedTitle={selectedProject?.title}
        selectedProjectId={selectedProject?.id}
      />
      <div className="">
        {/* Header */}
        <header className="bg-transparent mb-10">
          <div className="md:max-w-7xl mx-auto  sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 ">
              <div className="flex items-center">
                <img src="/freebioLogo.png" alt="logo" className=" h-[50px]" />
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `${
                        user?.user?.role === "freelancer"
                          ? "/dashboard"
                          : "/job-list-dashboard"
                      }`
                    )
                  }
                  className="text-lg md:text-xl font-bold px-6 py-2 cursor-pointer bg-[#723EDA] border-b-2 rounded-xl border-[#FFE01ACC] hover:bg-[#5a2fc0] transition"
                >
                  Dashboard
                </button>
                {/* <button type="button">Dashboard</button> */}
                {/* <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Sun className="h-5 w-5" />
                </button> */}
                <div>
                  {/* <img
                    src="/api/placeholder/32/32"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  /> */}
                  {GenerateAvatar(user.user?.fullname ?? "User")}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Search and Filter Controls */}
        <div className="">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            {/* <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by title, description, or tags..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div> */}

            {/* Search Bar */}
            <div className="flex w-full mx-auto mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-7 w-7" />
                <input
                  type="text"
                  placeholder="What position are you looking for ?"
                  className="w-full pl-12 pr-4 py-4 outline-none text-gray-700 bg-white border border-gray-300 rounded-none rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>
              <button className="bg-[#5A399D] text-[14px] text-white px-8 py-4 rounded-r-lg hover:bg-[#5A399D]/60 transition-colors font-medium">
                Search Jobs
              </button>
            </div>
          </div>

          {/* FILTER AND PROJECT PAGE */}

          <div className="flex max-md:flex-col gap-10">
            {/* FILTER PAGE */}
            <div className="bg-white h-fit rounded-lg py-6 px-4 w-[200px]">
              {/* Filter Toggle */}
              <div className="flex flex-col justify-between items-center">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {showFilters ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {(filters.search ||
                  filters.minBudget ||
                  filters.maxBudget ||
                  filters.startDate ||
                  filters.endDate ||
                  filters.tags.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="grid  gap-4 pt-4 ">
                  {/* Budget Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {/* <DollarSign className="inline w-4 h-4 mr-1" /> */}
                      Budget
                    </label>
                    <div className="grid gap-2">
                      {budgetRanges.map((range) => (
                        <label
                          key={range.value}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
                            border border-transparent
                            ${
                              filters.budgetRange === range.value
                                ? "bg-blue-100 border-blue-400 ring-2 ring-blue-200"
                                : "hover:bg-gray-100"
                            }
                          `}
                          tabIndex={0}
                        >
                          <input
                            type="radio"
                            name="budgetRange"
                            value={range.value}
                            checked={filters.budgetRange === range.value}
                            onChange={() =>
                              handleFilterChange("budgetRange", range.value)
                            }
                            className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
                          />
                          <span
                            className={`text-sm font-medium ${
                              filters.budgetRange === range.value
                                ? "text-blue-700"
                                : "text-gray-700"
                            }`}
                          >
                            {range.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Deadline Range
                    </label>
                    <div className="flex flex-col gap-2">
                      <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) =>
                          handleFilterChange("startDate", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) =>
                          handleFilterChange("endDate", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Sort Options */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <div className="flex flex-col gap-2">
                      <select
                        value={filters.sortBy}
                        onChange={(e) =>
                          handleFilterChange("sortBy", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="createdAt">Created Date</option>
                        <option value="deadline">Deadline</option>
                        <option value="budget">Budget</option>
                        <option value="title">Title</option>
                      </select>
                      <select
                        value={filters.sortOrder}
                        onChange={(e) =>
                          handleFilterChange(
                            "sortOrder",
                            e.target.value as "asc" | "desc"
                          )
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                      </select>
                    </div>
                  </div> */}

                  {/* Tags Filter */}
                  {/* <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Tag className="inline w-4 h-4 mr-1" />
                      Filter by Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            filters.tags.includes(tag)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div> */}
                </div>
              )}
            </div>

            {/* PROJECT PART */}

            <div className="relative ">
              <div className="w-[200px] absolute mr-0 right-10">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <div className="flex  gap-2">
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="createdAt">Created Date</option>
                    <option value="deadline">Deadline</option>
                    <option value="budget">Budget</option>
                    <option value="title">Title</option>
                  </select>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) =>
                      handleFilterChange(
                        "sortOrder",
                        e.target.value as "asc" | "desc"
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
              {/* Results Summary */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-gray-600">
                  Showing {(filters.page - 1) * filters.limit + 1} -{" "}
                  {Math.min(filters.page * filters.limit, totalProjects)} of{" "}
                  {totalProjects} projects
                </div>
              </div>

              <div>
                {/* Loading State */}
                {loading && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading projects...</p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                {/* Toggle View Mode */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-1 rounded ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-1 rounded ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Grid
                  </button>
                </div>

                {/* Projects Grid */}
                <div className="flex flex-col lg:flex-row gap-6 ">
                  {/* Cards List/Grid */}
                  <div
                    className={
                      viewMode === "grid"
                        ? "w-full lg:w-2/3  grid grid-cols-1 md:grid-cols-2 gap-6"
                        : "w-full lg:w-2/3 flex flex-col bg-white  gap-6"
                    }
                  >
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={setSelectedProject}
                      />
                    ))}
                  </div>

                  {/* Details Panel */}
                  <div className="w-full  lg:w-3/5">
                    {selectedProject ? (
                      <div className="bg-white max-md:absolute rounded-2xl shadow-2xl p-3 sticky top-4 border border-gray-100 transition-all duration-300">
                        <button
                          className="mb-4 ml-auto block text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => setSelectedProject(null)}
                          title="Close"
                        >
                          <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-[500] text-[#000000] mb-1">
                          {selectedProject.title}
                        </h2>

                        {/* company name */}
                        <div className="mb-4">
                          <span className=" text-[#6F757E] text-xs font-[400] ">
                            {/* {selectedProject.Client.fullname}  */}
                            {selectedProject.Client.clientProfile.companyName ||
                              "Fill profile details"}{" "}
                          </span>
                        </div>

                        <div className=" flex items-center">
                          {/* Budget */}
                          <div className="flex items-center">
                            <div className="flex flex-col gap-2 ">
                              <span className="font-medium text-[0.8em] text-[#050F24]">
                                Budget
                              </span>
                              <span className="text-gray-600 font-bold text-xs">
                                {formatBudget(selectedProject.budget)}
                              </span>
                            </div>

                            <p className="h-8 w-[2px] bg-[#CEC4E2] mx-3"></p>
                          </div>

                          {/* Deadline */}
                          <div className="flex items-center">
                            <div className="flex flex-col  gap-2 ">
                              <span className="font-medium text-[0.8em] text-[#050F24]">
                                Deadline
                              </span>
                              <span className="text-gray-600 text-xs">
                                {selectedProject.deadline}
                              </span>
                            </div>

                            <p className="h-8 w-[2px] bg-[#CEC4E2] mx-3"></p>
                          </div>

                          {/* Location */}
                          <div className="flex items-center">
                            <div className="flex flex-col  gap-2 ">
                              <span className="font-medium text-[0.8em] text-[#000]">
                                Location
                              </span>
                              <span className="text-gray-600 text-xs">
                                {selectedProject.location}
                              </span>
                            </div>

                            <p className="h-8 w-[2px] bg-[#CEC4E2] mx-3"></p>
                          </div>

                          {/* Bids */}
                          <div className="flex items-center">
                            <div className="flex flex-col  gap-2 ">
                              <span className="font-medium text-[0.8em] text-[#050F24]">
                                Bids
                              </span>
                              <span className=" text-gray-600 px-2 py-1 rounded-full text-xs">
                                {/* {selectedProject.bidsCount || 0} */} 0
                              </span>
                            </div>

                            <p className="h-8 w-[2px] bg-[#CEC4E2] mx-3"></p>
                          </div>

                          {/* Average Bid */}
                          {/* <div className="flex flex-col  gap-2">
                            <span className="font-medium text-[0.8em] text-[#050F24]">
                              Budget
                            </span>
                            <span className="text-gray-600 font-bold text-xs">
                              {selectedProject.budget}
                            </span>
                          </div> */}
                        </div>

                        {/* Bid Button  */}
                        <div
                          className="flex justify-between mt-3
                         items-center py-4 border-y border-[#E1E1E1] "
                        >
                          <div className="w-3/5">
                            {user?.user?.role === "freelancer" && (
                              <button
                                className=" w-fit px-4 py-3  bg-[#5A399D]  text-white rounded-lg font-semibold shadow-lg hover:from-[#4a2e8e] hover:to-purple-700 transition-all duration-300"
                                onClick={() => setShowApplyModal(true)}
                              >
                                Submit Bid
                              </button>
                            )}
                          </div>
                          <div>
                            {user?.user?.role === "freelancer" && (
                              <button
                                onClick={async () => {
                                  await toggleFavorite(
                                    selectedProject.id,
                                    likedProjects[selectedProject.id]
                                  );
                                  setLikedProjects((prev) => ({
                                    ...prev,
                                    [selectedProject.id]:
                                      !prev[selectedProject.id],
                                  }));
                                }}
                                className={`p-2 rounded-full ${
                                  likedProjects[selectedProject.id]
                                    ? "text-red-500"
                                    : "text-[#5A399D] hover:text-red-500"
                                }`}
                              >
                                <Heart
                                  className={`h-5 w-5 ${
                                    likedProjects[selectedProject.id]
                                      ? "fill-current"
                                      : ""
                                  }`}
                                />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="mb-4 mt-3">
                          {/* <span className="font-semibold text-gray-600">
                            Tags:
                          </span> */}
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedProject.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-2 bg-[#CEC4E2] rounded-[0.5em] text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Job description */}
                        <div className="flex flex-col  px-2">
                          <h4 className="font-medium text-sm  text-[#050F24]">
                            Full Job Description
                          </h4>
                          <p className="mb-4 text-[#6F757E] text-sm">
                            {selectedProject.description}
                          </p>
                        </div>

                        <div className="mb-4 px-2">
                          <h4 className="font-medium text-sm  text-[#050F24]">
                            Responsibilities
                          </h4>
                          {selectedProject.responsibilities?.length > 0 ? (
                            <ul
                              className="grid gap-2 w-full
                            "
                            >
                              {selectedProject.responsibilities.map(
                                (resp, index) => (
                                  <li
                                    key={index}
                                    className="  flex gap-2 items-start text-[#6F757E] rounded-full text-xs font-medium"
                                  >
                                    {/* <p className="w-fit"> */}
                                    <span className="w-2 h-[6px] mt-1 rounded-full bg-gray-500"></span>
                                    {/* </p> */}
                                    <p className="text-[#6F757E]">{resp}</p>
                                  </li>
                                )
                              )}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500">
                              No responsibilities listed.
                            </p>
                          )}
                        </div>

                        <div className="mb-4 px-2">
                          <h4 className="font-medium text-sm  text-[#050F24]">
                            Requirements
                          </h4>
                          <p className="mb-4 text-[#6F757E] text-sm">
                            {selectedProject.requirement}
                          </p>
                        </div>

                        {/* <button className="mt-6 w-3/5 rounded-lg py-3 bg-purple-300 border border-purple-600 text-[#000]">
                          Report
                        </button> */}
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-400 text-center border border-gray-100">
                        <p>Select a project to see details</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* No Results */}
                {!loading && !error && filteredProjects.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      No projects found matching your criteria.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Bar - Modern Design */}
        {true && (
          <div className="flex flex-col bg-white md:flex-row justify-between items-center border-t border-gray-200 pt-4 mt-8 gap-4">
            {/* Results Summary */}
            <div className="text-gray-600 text-sm">
              Showing {(filters.page - 1) * filters.limit + 1} -{" "}
              {Math.min(filters.page * filters.limit, totalProjects)} of{" "}
              {totalProjects} projects
            </div>

            {/* Display Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Display</span>
              <select
                value={filters.limit}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange("limit", parseInt(e.target.value))
                }
                className="border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-purple-500"
              >
                {[5, 10, 20, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-lg">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page === 1}
                className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded ${
                    filters.page === i + 1
                      ? "bg-[#5A399D] text-white font-bold"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= totalPages}
                className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#A8A9B3B2] bg-opacity-50">
            <div className="bg-[#CEC4E2] rounded-lg shadow-lg max-w-md w-full p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowApplyModal(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-xl font-bold mb-4">
                Upload your Profile Link
              </h3>
              <label htmlFor="" className="mb-2">
                Enter your profile link
              </label>
              <input
                className="w-full border bg-white rounded-lg p-2 mb-4"
                placeholder="Enter your profile link"
                value={applicationText}
                onChange={(e) => setApplicationText(e.target.value)}
              />
              <button
                className=" bg-[#5A399D] py-2 px-3 rounded-lg w-fit text-white  hover:bg-[#5A399D]/70"
                onClick={handleApplicationSubmit}
                // onClick={() => alert("submitted")}
              >
                Submit
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default JobListing;
