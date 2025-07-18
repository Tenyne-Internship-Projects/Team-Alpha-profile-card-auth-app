import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { formatDistanceToNow } from "date-fns";

interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string; // ISO 8601 date string
}

// interface INotificationData {
//   Notification: INotification[];
// }

const NotificationInterface = () => {
  const [notificationData, setNotificationData] = useState<
    INotification[] | undefined
  >();
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const markAsRead = async (notificationId: string) => {
    try {
      await axios.put(`/notifications/${notificationId}/read`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleToggleDropdown = (id: string) => {
    // Mark as read when opening dropdown

    markAsRead(id);
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const deleteNotification = async (id: string) => {
    try {
      await axios.delete(`/notifications/${id}`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDelete = async (id: string) => {
    deleteNotification(id);
  };

  const fetchNotification = async () => {
    try {
      const res = await axios.get("/notifications");
      setNotificationData(res.data.notifications);
      console.log(notificationData);
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 ">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Notification</h2>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="text-sm text-gray-600">Select all</span>
        </div>

        <div className="space-y-4">
          {notificationData?.map((notification) => (
            <div
              key={notification.id}
              className="relative flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />

              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg font-semibold">
                  {/* {notification.companyLogo} */}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {/* {notification.company} */}
                  </span>
                  <span className="text-sm text-blue-600">
                    {notification.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <span
                  className={`${
                    notification.read === true
                      ? "text-[#5500F4]"
                      : "text-[#FF0000]"
                  } text-sm font-normal`}
                >
                  {notification.read === true ? "Read" : "Unread"}
                </span>
                <button
                  className="px-4 py-2  bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  onClick={() => handleDelete(notification.id)}
                  type="button"
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2  bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                  onClick={() => handleToggleDropdown(notification.id)}
                  type="button"
                >
                  Details
                </button>
                {openDropdownId === notification.id && (
                  <div className="absolute right-0 top-12 z-50 mt-2 w-64 bg-white rounded-lg border border-gray-200  shadow-lg p-4 text-gray-800">
                    <p className="font-semibold mb-2">Message</p>
                    <p>{notification.message}</p>
                    <button
                      className="mt-2 text-xs text-purple-600 hover:underline"
                      onClick={() => setOpenDropdownId(null)}
                      type="button"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationInterface;
