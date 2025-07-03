import {
  Users,
  Clock,
  Briefcase,
  FileText,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface Stats {
  approvedProjects: number;
  maxHugValue: number;
  openProjects: number;
  archiveProjects: number;
  totalFreelancers: number;
  pendingApplications: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  textColor?: string;
  iconBg?: string;
  iconColor?: string;
}

// interface MaxHugCardProps {
//   title: string;
//   subtitle: string;
//   value: number;
//   icon: React.ComponentType<{ className?: string }>;
// }

interface PurpleCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  gradient?: string;
}

const DashboardCards = () => {
  const stats: Stats = {
    approvedProjects: 1563,
    maxHugValue: 1563,
    openProjects: 1563,
    archiveProjects: 1563,
    totalFreelancers: 486,
    pendingApplications: 486,
  };

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

  //   const MaxHugCard: React.FC<MaxHugCardProps> = ({
  //     title,
  //     subtitle,
  //     value,
  //     icon: Icon,
  //   }) => (
  //     <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-6 shadow-sm text-white relative overflow-hidden">
  //       <div className="flex items-center justify-between">
  //         <div>
  //           <p className="text-sm font-medium text-blue-100 mb-1">{subtitle}</p>
  //           <p className="text-2xl font-bold text-white">
  //             {value.toLocaleString()}
  //           </p>
  //         </div>
  //         <div className="bg-white bg-opacity-20 p-3 rounded-full">
  //           <Icon className="w-6 h-6 text-white" />
  //         </div>
  //       </div>
  //       <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
  //         {title}
  //       </div>
  //     </div>
  //   );

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
      <div className="max-w-7xl mx-auto">
        {/* Top Row - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <StatCard
            title="Approved Project"
            value={stats.approvedProjects}
            icon={CheckCircle}
            iconBg="bg-green-100"
            iconColor="text-green-600"
          />

          <StatCard
            title="Active Project"
            value={stats.maxHugValue}
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
            title="Draft Project"
            value={stats.openProjects}
            icon={FileText}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
          />
        </div>

        {/* Archive Projects Row */}
        <div className="grid grid-cols-1 mb-6">
          <StatCard
            title="Archive Project"
            value={stats.archiveProjects}
            icon={Calendar}
            iconBg="bg-gray-100"
            iconColor="text-gray-600"
          />
        </div>

        {/* Bottom Row - 2 Purple Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PurpleCard
            title="Total Freelancers"
            value={stats.totalFreelancers}
            icon={Users}
            gradient="#5A399D"
          />

          <PurpleCard
            title="Pending Application"
            value={stats.pendingApplications}
            icon={Clock}
            gradient="#46aec5"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
