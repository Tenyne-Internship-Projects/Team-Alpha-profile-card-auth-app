import {
  Users,
  Clock,
  Briefcase,
  FileText,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { AxiosError } from "axios";

export interface InvoiceRecord {
  id: string;
  createdAt: string;
  freelancerId: string;
  projectId: string;
  message: string | null;
  status: string;
  freelancer: {
    id: string;
    fullname: string;
    email: string;
    freelancerProfile: {
      [key: string]: string[];
    };
  };
  project: {
    id: string;
    title: string;
    description: string;
    budget: number;
    progressStatus: string;
    tags: string[];
  };
}

//

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  textColor?: string;
  iconBg?: string;
  iconColor?: string;
}

interface PurpleCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  gradient?: string;
}

const DashboardCards = () => {
  const [applicants, setApplicants] = useState<InvoiceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/applications");
      setApplicants(response.data.data);
      console.log(response.data);
    } catch (err) {
      const error = err as AxiosError;
      setError(error.message || "Failed to fetch applicants.");
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplicants();
    // pendingApplicants()
  }, [fetchApplicants]);

  const totalApplicant = applicants.length;

  const pendingApplicants = applicants.filter(
    (applicant) => applicant.status === "pending"
  );

  const numberOfPendingApplicants = pendingApplicants.length;

  const ongoingProject = applicants.filter(
    (applicant) => applicant.project.progressStatus === "ongoing"
  );

  const numberOfOngoingProject = ongoingProject.length;

  const approvedApplicants = applicants.filter(
    (applicant) => applicant.status === "approved"
  );

  const numberOfApprovedApplicants = approvedApplicants.length;

  const rejectedApplicants = applicants.filter(
    (applicant) => applicant.status === "rejected"
  );

  const numberOfRejectedApplicants = rejectedApplicants.length;

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    className = "bg-white",
    textColor = "text-gray-700",
    iconBg = "bg-gray-100",
    iconColor = "text-gray-600",
  }) => (
    <div
      className={`${className} rounded-lg p-6 shadow-sm border border-gray-200 relative overflow-hidden`}
    >
      <p>
        {loading} {error}
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor} mb-1`}>{title}</p>
          <p className={`text-2xl font-bold ${textColor}`}>
            {value.toLocaleString()}
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
    gradient = "",
  }) => (
    <div
      className={`bg-[${gradient}] rounded-lg p-6 shadow-sm  relative overflow-hidden`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-purple-100 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">
            {value.toLocaleString()}
          </p>
        </div>
        <div className="border-2 border-white bg-opacity-20 p-3 rounded-full">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className=" bg-transparent ">
      <div className="">
        {/* Top Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            title="Approved Project"
            value={numberOfApprovedApplicants}
            icon={CheckCircle}
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />

          <StatCard
            title="Ongoing Project"
            value={numberOfOngoingProject}
            icon={Briefcase}
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />

          {/* <MaxHugCard
            title=""
            subtitle="Active Project"
            value={stats.maxHugValue}
            icon={Briefcase}
          /> */}

          <StatCard
            title="Rejected Project"
            value={numberOfRejectedApplicants}
            icon={FileText}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
        </div>

        {/* Archive Projects Row */}
        <div className="grid grid-cols-1 mb-6">
          <StatCard
            title="Archive Project"
            value={totalApplicant}
            icon={Calendar}
            iconBg="bg-gray-100"
            iconColor="text-gray-600"
          />
        </div>

        {/* Bottom Row - 2 Purple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PurpleCard
            title="Total Freelancers"
            value={totalApplicant}
            icon={Users}
            gradient="#5A399D"
          />

          <PurpleCard
            title="Pending Application"
            value={numberOfPendingApplicants}
            icon={Clock}
            gradient="#46aec5"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
