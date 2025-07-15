import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../types/user";
// import ProfileDetail from "../home/ProfileDetail";
import axios from "../../services/axiosInstance";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

const Notification = [
  {
    title: "Payment made",
    time: "Just now",
  },
  {
    title: "Approved project",
    time: "Just now",
  },
  {
    title: "Rejected Application",
    time: "Just now",
  },
  {
    title: "Job alert",
    time: "Just now",
  },
];

interface IApplicationStat {
  applicationStats: {
    approved: number;
    pending: number;
    rejected: number;
    total: number;
  };
  projectStats: {
    completed: number;
    ongoing: number;
    cancelled: number;
  };
}

const HomeContent = () => {
  const user = useAuth() as AuthContextType;
  const [applicationStat, setApplicationStat] = useState<
    IApplicationStat | undefined
  >();

  const fetchMetrics = async () => {
    try {
      const res = await axios.get("/freelancer-dashboard/metrics-cards");
      setApplicationStat(res.data);
      console.log(res);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
    }
  };

  const fetchEarningsGraph = async () => {
    try {
      const res = await axios.get("/freelancer-dashboard/earnings-graph");
      console.log(res);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMetrics();
    fetchEarningsGraph();
  }, []);

  const MetricsCard = [
    {
      title: "Approved Application",
      no: (
        <div className="metric-value text-green-600 font-bold">
          {applicationStat?.applicationStats?.approved || 0}
        </div>
      ),
    },
    {
      title: "Completed Project",
      no: (
        <div className="metric-value text-blue-600 font-bold">
          {applicationStat?.projectStats?.completed || 0}
        </div>
      ),
    },
    {
      title: "Pending Application",
      no: (
        <div className="metric-value text-yellow-600 font-bold">
          {applicationStat?.applicationStats?.pending || 0}
        </div>
      ),
    },
    {
      title: "Ongoing Project",
      no: (
        <div>
          <div className="metric-value text-purple-600 font-bold">
            {applicationStat?.projectStats?.ongoing || 0}
          </div>
        </div>
      ),
    },
    {
      title: "Rejected Application",
      no: (
        <div className="metric-value text-red-600 font-bold">
          {applicationStat?.applicationStats?.rejected || 0}
        </div>
      ),
    },
    {
      title: "Canceled Project",
      no: (
        <div className="metric-value text-gray-600 font-bold">
          {applicationStat?.projectStats?.cancelled || 0}
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl  font-bold text-gray-900 mb-2">
          Welcome back, <p>{user?.user?.name}</p>
        </h1>
        <p className="text-gray-600">
          Profile Visibility: <span>+12%</span> this week
        </p>
      </div>

      <div className="flex gap-4">
        <div className="w-8/12">
          <div className="p-4 mb-5 shadow-2xl rounded-2xl flex justify-between gap-4 border-b-2 border-[#6F757E]">
            Total Number of Application
            <p>{applicationStat?.applicationStats.total}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {MetricsCard.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 shadow-2xl rounded-2xl flex gap-4 bg-white border-b-2 border-[#25CA13]"
              >
                <div>
                  <h4>{metric.title}</h4>
                  <p>{metric.no}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-4/12 bg-white rounded-2xl py-6 px-5">
          <h4>Notifications</h4>

          <div>
            {Notification.map((notify, idx) => {
              return (
                <div key={idx} className="flex justify-between">
                  <div className="flex gap-3">
                    <img src="" alt="" />
                    <div>
                      <h4>{notify.title}</h4>
                      <p>{notify.time}</p>
                    </div>
                  </div>
                  <img src="" alt="" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* <div>
        <ProfileDetail />
      </div> */}

      {/* {user && user.profile ? <ProfileDetail /> : <p>Loading profile...</p>} */}
    </div>
  );
};

export default HomeContent;
