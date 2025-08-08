import {
  // Users,
  // Clock,
  Briefcase,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Archive,
  FolderOpen,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { AxiosError } from "axios";

interface ProjectMetrics {
  active: number;
  archived: number;
  cancelled: number;
  closed: number;
  completed: number;
  draft: number;
  ongoing: number;
  open: number;
  total: number;
}

interface StatCardProps {
  title: string;
  value?: number; // Made optional
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  textColor?: string;
  iconBg?: string;
  iconColor?: string;
  isLoading?: boolean;
}

interface PurpleCardProps {
  title: string;
  value?: number; // Made optional
  icon: React.ComponentType<{ className?: string }>;
  gradient?: string;
  isLoading?: boolean;
}

const DashboardCards = () => {
  // Fixed: Changed to single object instead of array
  const [metrics, setMetrics] = useState<ProjectMetrics>({
    active: 0,
    archived: 0,
    cancelled: 0,
    closed: 0,
    completed: 0,
    draft: 0,
    ongoing: 0,
    open: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(true); // Changed default to true
  const [error, setError] = useState<string | null>(null);

  const fetchProjectMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/client-metrics/project-metrics");

      // Assuming the API returns the metrics object directly
      if (response.data) {
        setMetrics(response.data.data.counts);
      } else {
        throw new Error("No data received from API");
      }

      console.log("Project Metrics:", response.data);
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage = error.message || "Failed to fetch project metrics.";
      setError(errorMessage);
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjectMetrics();
  }, [fetchProjectMetrics]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse bg-gray-200 rounded h-6 w-16"></div>
  );

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    className = "bg-white",
    textColor = "text-gray-700",
    iconBg = "bg-gray-100",
    iconColor = "text-gray-600",
    isLoading = false,
  }) => (
    <div
      className={`${className} rounded-lg p-6 w-full shadow-sm border border-gray-200 relative overflow-hidden hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor} mb-1`}>{title}</p>
          <p className={`text-2xl font-bold ${textColor}`}>
            {isLoading ? <LoadingSkeleton /> : (value || 0).toLocaleString()}
          </p>
        </div>
        <div className={`${iconBg} p-3 rounded-full`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );

  const PurpleCard: React.FC<PurpleCardProps> = ({
    title,
    value,
    icon: Icon,
    gradient = "#5A399D",
    isLoading = false,
  }) => (
    <div
      className="rounded-lg p-6 shadow-sm relative overflow-hidden hover:shadow-md transition-shadow duration-200"
      style={{ backgroundColor: gradient }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-purple-100 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">
            {isLoading ? (
              <div className="animate-pulse bg-purple-200 bg-opacity-30 rounded h-8 w-16"></div>
            ) : (
              (value || 0).toLocaleString()
            )}
          </p>
        </div>
        <div className="border-2 border-white bg-white bg-opacity-20 p-3 rounded-full">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  // Error display component
  const ErrorDisplay = () => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <XCircle className="w-5 h-5 text-red-500 mr-2" />
        <p className="text-red-700 font-medium">Error loading metrics</p>
      </div>
      <p className="text-red-600 text-sm mt-1">{error}</p>
      <button
        onClick={fetchProjectMetrics}
        className="mt-2 px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  // console.log("test metrics", metrics?.data.count.ongoing);

  return (
    <div className="bg-transparent w-full">
      <div className="w-full">
        {/* Error Display */}
        {error && <ErrorDisplay />}

        {/* Top Row - Project Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            title="Active Projects"
            value={metrics.active}
            icon={CheckCircle}
            iconBg="bg-green-100"
            iconColor="text-green-600"
            isLoading={loading}
          />

          <StatCard
            title="Ongoing Projects"
            value={metrics.ongoing}
            icon={Briefcase}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            isLoading={loading}
          />

          <StatCard
            title="Completed Projects"
            value={metrics.completed}
            icon={CheckCircle}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
            isLoading={loading}
          />
        </div>

        {/* Middle Row - Draft and Open Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <StatCard
            title="Draft Projects"
            value={metrics.draft}
            icon={FileText}
            iconBg="bg-yellow-100"
            iconColor="text-yellow-600"
            isLoading={loading}
          />

          <StatCard
            title="Open Projects"
            value={metrics.open}
            icon={FolderOpen}
            iconBg="bg-indigo-100"
            iconColor="text-indigo-600"
            isLoading={loading}
          />
        </div>

        {/* Archive and Cancelled Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <StatCard
            title="Archived Projects"
            value={metrics.archived}
            icon={Archive}
            iconBg="bg-gray-100"
            iconColor="text-gray-600"
            isLoading={loading}
          />

          <StatCard
            title="Cancelled Projects"
            value={metrics.cancelled}
            icon={XCircle}
            iconBg="bg-red-100"
            iconColor="text-red-600"
            isLoading={loading}
          />
        </div>

        {/* Bottom Row - Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PurpleCard
            title="Total Projects"
            value={metrics.total}
            icon={Briefcase}
            gradient="#5A399D"
            isLoading={loading}
          />

          <PurpleCard
            title="Closed Projects"
            value={metrics.closed}
            icon={Calendar}
            gradient="#46aec5"
            isLoading={loading}
          />
        </div>

        {/* Summary Statistics */}
        {/* {!loading && !error && (
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Project Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {metrics.total > 0
                    ? ((metrics.completed / metrics.total) * 100).toFixed(1)
                    : "0.0"}
                  %
                </p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {(metrics.ongoing || 0) + (metrics.active || 0)}
                </p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">
                  {(metrics.draft || 0) + (metrics.open || 0)}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {(metrics.archived || 0) + (metrics.cancelled || 0)}
                </p>
                <p className="text-sm text-gray-600">Inactive</p>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DashboardCards;
