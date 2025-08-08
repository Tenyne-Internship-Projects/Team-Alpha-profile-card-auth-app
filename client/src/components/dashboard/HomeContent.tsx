import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../types/user";
import axios from "../../services/axiosInstance";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import EarningsChart from "./Chart";
import NotificationFilter from "./NotificationFilter";

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

interface IPayment {
  completed: {
    count: number;
    totalBudget: string;
  };

  pending: {
    count: number;
    totalBudget: string;
  };
}

interface MonthlyEarning {
  month: string;
  total: number;
}

const HomeContent = () => {
  const user = useAuth() as AuthContextType;
  const [applicationStat, setApplicationStat] = useState<
    IApplicationStat | undefined
  >();
  const [paymentTotal, setPaymentTotal] = useState<IPayment>();
  const [monthlyEarnings, setMonthlyEarnings] = useState<MonthlyEarning[]>([]);

  const fetchMetrics = async () => {
    try {
      const res = await axios.get("/freelancer-dashboard/metrics-cards");
      setApplicationStat(res.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
    }
  };

  const paymentMetrics = async () => {
    try {
      const res = await axios.get("/freelancer-dashboard/payment-status");
      // setApplicationStat(res.data);

      setPaymentTotal(res.data.payments);
      console.log(paymentTotal);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
    }
  };

  const fetchEarningsGraph = async () => {
    try {
      const res = await axios.get("/freelancer-dashboard/earnings-graph");
      setMonthlyEarnings(res.data.monthlyEarnings || []);
      console.log("payment", res);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
    }
  };

  useEffect(() => {
    paymentMetrics();
    fetchMetrics();
    fetchEarningsGraph();
  }, []);

  const PaymentCard = [
    {
      title: "Complete Payment",
      no: (
        <div className="metric-value text-[#09080D] text-xl font-regular">
          {paymentTotal?.completed.totalBudget}
        </div>
      ),
      img: "/clientDashboard/cpaymentIcon.png",
      color: "#25CA13",
    },
    {
      title: "Pending Payment",
      no: (
        <div className="metric-value text-[#09080D] text-xl font-regular">
          {paymentTotal?.pending.totalBudget}
        </div>
      ),
      img: "/clientDashboard/ppaymentIcon.png",
      color: "#FF0000",
    },
  ];

  const MetricsCard = [
    {
      title: "Approved Application",
      no: (
        <div className="metric-value text-[#09080D] text-xl font-regular">
          {applicationStat?.applicationStats?.approved || 0}
        </div>
      ),
      img: "/clientDashboard/totalIcon.png",
      color: "#25CA13",
    },
    {
      title: "Completed Project",
      no: (
        <div className="metric-value text-[#09080D] text-xl font-regular">
          {applicationStat?.projectStats?.completed || 0}
        </div>
      ),
      img: "/clientDashboard/completeIcon.png",
      color: "#25CA13",
    },
    {
      title: "Pending Bid",
      no: (
        <div className="metric-value text-[#09080D] text-xl font-regular">
          {applicationStat?.applicationStats?.pending || 0}
        </div>
      ),
      img: "/clientDashboard/pendingIcon.png",
      color: "#5500F4",
    },
    {
      title: "Ongoing Project",
      no: (
        <div>
          <div className="metric-value text-[#09080D] text-xl font-regular">
            {applicationStat?.projectStats?.ongoing || 0}
          </div>
        </div>
      ),
      img: "/clientDashboard/ongoingIcon.png",
      color: "#5500F4",
    },
    {
      title: "Rejected Application",
      no: (
        <div className="metric-value text-[#09080D] text-xl font-regular">
          {applicationStat?.applicationStats?.rejected || 0}
        </div>
      ),
      img: "/clientDashboard/rejectedIcon.png",
      color: "#FF0000",
    },
    {
      title: "Canceled Project",
      no: (
        <div className="metric-value text-[#09080D] text-xl font-regular">
          {applicationStat?.projectStats?.cancelled || 0}
        </div>
      ),
      img: "/clientDashboard/canceledIcon.png",
      color: "#FF0000",
    },
  ];

  // console.log(user.user?.fullname);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl  font-bold text-gray-900 mb-2">
          Welcome back, <p>{user?.user?.fullname}</p>
        </h1>
        {/* <p className="text-gray-600">
          Profile Visibility: <span>+12%</span> this week
        </p> */}
      </div>

      <div className="flex max-md:flex-col gap-4">
        <div className="w-full md:w-8/12">
          <div className="p-4 mb-5 shadow-2xl rounded-2xl flex justify-between gap-4 border-b-2 border-[#6F757E]">
            Total Number of Application
            <p>{applicationStat?.applicationStats.total}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {MetricsCard.map((metric, idx) => (
              <div
                key={idx}
                className={`p-4  shadow-2xl rounded-2xl flex gap-4 bg-white  border-b-2  `}
                style={{ borderColor: metric.color }}
              >
                <img src={metric.img} alt="" />
                <div>
                  <h4 className="text-[#6F757E] text-sm font-medium">
                    {metric.title}
                  </h4>
                  <p>{metric.no}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="w-full md:w-4/12 bg-white rounded-2xl mb-4 py-6 px-5">
          <h4 className="text-black font-medium mb-3 text-sm">Notifications</h4>

          <div className="grid gap-2">
            {Notification.map((notify, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-between border border-[#CEC4E2] rounded-xl p-2"
                >
                  <div className="flex gap-3">
                    <img
                      src={notify.img}
                      alt={notify.title}
                      className="w-[24px] h-[24px]"
                    />
                    <div>
                      <h4 className="text-sm text-black">{notify.title}</h4>
                      <p className="text-xs text-black/40">{notify.time}</p>
                    </div>
                  </div>
                  <img
                    src="/clientDashboard/notifyMessage.png"
                    alt=""
                    className="w-[11px] h-[11px]"
                  />
                </div>
              );
            })}
          </div>

          <Link to="" className="border-b text-[#6F757E] text-sm mt-4">
            View all notification
          </Link>
        </div> */}
        <div className="md:w-4/12">
          <NotificationFilter />
        </div>
      </div>

      {/* <div>
        <ProfileDetail />
      </div> */}

      {/* {user && user.profile ? <ProfileDetail /> : <p>Loading profile...</p>} */}

      <div className="flex gap-4 max-md:flex-col mt-6">
        <div className="md:w-4/12">
          <div
            className={`p-6  shadow-2xl rounded-2xl flex gap-4 bg-white  border-b-2  `}
          >
            {/* <img src={metric.img} alt="" /> */}
            <div className="">
              <h4 className="text-[#000000] text-xl font-medium">
                Earning Summary
              </h4>
              <p>
                Current earnings :{" "}
                {(
                  Number(paymentTotal?.pending?.totalBudget || 0) +
                  Number(paymentTotal?.completed?.totalBudget || 0)
                ).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="grid mt-4 gap-4">
            {PaymentCard.map((metric, idx) => (
              <div
                key={idx}
                className={`p-6  shadow-2xl rounded-2xl flex items-center gap-4 bg-white  border-b-2  `}
                style={{ borderColor: metric.color }}
              >
                <img src={metric.img} alt="" className="w-[64px] h-[64px]" />
                <div>
                  <h4 className="text-[#09080D] text-sm font-medium">
                    {metric.title}
                  </h4>
                  <p className="text-[#6F757E] text-sm mt-2">{metric.no}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-8/12">
          <EarningsChart monthlyEarnings={monthlyEarnings} />
        </div>
        {/* <div className="w-3/12"></div> */}
      </div>
    </div>
  );
};

export default HomeContent;
