import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { Link } from "react-router-dom";

interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string; // ISO 8601 date string
}

const NotificationFilter = () => {
  const [notificationData, setNotificationData] = useState<
    INotification[] | undefined
  >();
  // const [notifyData, setNotifyData] = useState();
  const fetchNotification = async () => {
    try {
      const res = await axios.get("/notifications");
      setNotificationData(res.data.notifications);
      console.log(res);
      // console.log(notificationData);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  // const Notification = [
  //   {
  //     img: "/clientDashboard/notifyPayIcon.png",
  //     title: <div>{notifyData}</div>,
  //     time: "Just now",
  //   },
  //   {
  //     title: "Approved project",
  //     time: "Just now",
  //     img: "/clientDashboard/notifyApprovIcon.png",
  //   },
  //   {
  //     title: "Rejected Application",
  //     time: "Just now",
  //     img: "/clientDashboard/notifyRejectIcon.png",
  //   },
  //   {
  //     title: "Job alert",
  //     time: "Just now",
  //     img: "/clientDashboard/jobalertIcon.png",
  //   },
  // ];

  return (
    <div>
      <div className="w-full md:w-4/12 bg-white rounded-2xl mb-4 py-6 px-5">
        <h4 className="text-black font-medium mb-3 text-sm">Notifications</h4>

        <div className="grid gap-2">
          {notificationData?.map((notify, idx) => {
            return (
              <div
                key={idx}
                className="flex justify-between border border-[#CEC4E2] rounded-xl p-2"
              >
                <div className="flex gap-3">
                  {/* <img
                    src={notify.img}
                    alt={notify.title}
                    className="w-[24px] h-[24px]"
                  /> */}
                  <div>
                    <h4 className="text-sm text-black">{notify.title}</h4>
                    {/* <p className="text-xs text-black/40">{notify.time}</p> */}
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
      </div>
    </div>
  );
};

export default NotificationFilter;
