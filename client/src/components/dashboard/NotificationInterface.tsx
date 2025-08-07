import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { formatDistanceToNow } from "date-fns";
import NotificationDetailModal from "../modal/freelancerModal/NotificationDetailModal";

export interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string; // ISO 8601 date string
}

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
      console.error("Error deleting notification:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    // Optimistic update: remove from UI immediately
    setNotificationData((prev) => prev?.filter((n) => n.id !== id));
    try {
      await deleteNotification(id);
    } catch (error) {
      // Revert by refetching if delete fails
      await fetchNotification();
    }
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
                {/* {openDropdownId === notification.id && (
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
                )} */}
                <div>
                  {openDropdownId === notification.id && (
                    <NotificationDetailModal
                      notification={notification}
                      setOpenDropdownId={() => setOpenDropdownId(null)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationInterface;

// // hooks/useWebSocket.ts
// import { useEffect, useRef, useState, useCallback } from 'react';

// interface UseWebSocketOptions {
//   url: string;
//   protocols?: string | string[];
//   onOpen?: (event: Event) => void;
//   onMessage?: (event: MessageEvent) => void;
//   onError?: (event: Event) => void;
//   onClose?: (event: CloseEvent) => void;
//   shouldReconnect?: boolean;
//   reconnectAttempts?: number;
//   reconnectInterval?: number;
// }

// export const useWebSocket = (options: UseWebSocketOptions) => {
//   const {
//     url,
//     protocols,
//     onOpen,
//     onMessage,
//     onError,
//     onClose,
//     shouldReconnect = true,
//     reconnectAttempts = 5,
//     reconnectInterval = 3000,
//   } = options;

//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
//   const [readyState, setReadyState] = useState<number>(WebSocket.CONNECTING);
//   const reconnectTimeoutId = useRef<NodeJS.Timeout | null>(null);
//   const reconnectCount = useRef<number>(0);

//   const connect = useCallback(() => {
//     try {
//       const ws = new WebSocket(url, protocols);

//       ws.onopen = (event) => {
//         setReadyState(WebSocket.OPEN);
//         reconnectCount.current = 0;
//         onOpen?.(event);
//       };

//       ws.onmessage = (event) => {
//         setLastMessage(event);
//         onMessage?.(event);
//       };

//       ws.onerror = (event) => {
//         setReadyState(WebSocket.CLOSED);
//         onError?.(event);
//       };

//       ws.onclose = (event) => {
//         setReadyState(WebSocket.CLOSED);
//         onClose?.(event);

//         // Auto-reconnect logic
//         if (shouldReconnect && reconnectCount.current < reconnectAttempts) {
//           reconnectCount.current += 1;
//           reconnectTimeoutId.current = setTimeout(() => {
//             connect();
//           }, reconnectInterval);
//         }
//       };

//       setSocket(ws);
//     } catch (error) {
//       console.error('WebSocket connection error:', error);
//     }
//   }, [url, protocols, onOpen, onMessage, onError, onClose, shouldReconnect, reconnectAttempts, reconnectInterval]);

//   const sendMessage = useCallback((message: string | object) => {
//     if (socket && readyState === WebSocket.OPEN) {
//       const data = typeof message === 'string' ? message : JSON.stringify(message);
//       socket.send(data);
//     }
//   }, [socket, readyState]);

//   const disconnect = useCallback(() => {
//     if (reconnectTimeoutId.current) {
//       clearTimeout(reconnectTimeoutId.current);
//     }
//     if (socket) {
//       socket.close();
//     }
//   }, [socket]);

//   useEffect(() => {
//     connect();
//     return disconnect;
//   }, [connect, disconnect]);

//   return {
//     socket,
//     lastMessage,
//     readyState,
//     sendMessage,
//     disconnect,
//     connect,
//   };
// };

// // contexts/NotificationContext.tsx
// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import { useWebSocket } from '../hooks/useWebSocket';
// import axios from '../../services/axiosInstance';

// interface INotification {
//   id: string;
//   userId: string;
//   title: string;
//   message: string;
//   type: string;
//   read: boolean;
//   createdAt: string;
// }

// interface NotificationState {
//   notifications: INotification[];
//   unreadCount: number;
//   isConnected: boolean;
// }

// type NotificationAction =
//   | { type: 'SET_NOTIFICATIONS'; payload: INotification[] }
//   | { type: 'ADD_NOTIFICATION'; payload: INotification }
//   | { type: 'UPDATE_NOTIFICATION'; payload: { id: string; updates: Partial<INotification> } }
//   | { type: 'DELETE_NOTIFICATION'; payload: string }
//   | { type: 'MARK_AS_READ'; payload: string }
//   | { type: 'SET_CONNECTION_STATUS'; payload: boolean };

// const initialState: NotificationState = {
//   notifications: [],
//   unreadCount: 0,
//   isConnected: false,
// };

// const notificationReducer = (state: NotificationState, action: NotificationAction): NotificationState => {
//   switch (action.type) {
//     case 'SET_NOTIFICATIONS':
//       return {
//         ...state,
//         notifications: action.payload,
//         unreadCount: action.payload.filter(n => !n.read).length,
//       };
//     case 'ADD_NOTIFICATION':
//       const newNotifications = [action.payload, ...state.notifications];
//       return {
//         ...state,
//         notifications: newNotifications,
//         unreadCount: newNotifications.filter(n => !n.read).length,
//       };
//     case 'UPDATE_NOTIFICATION':
//       const updatedNotifications = state.notifications.map(n =>
//         n.id === action.payload.id ? { ...n, ...action.payload.updates } : n
//       );
//       return {
//         ...state,
//         notifications: updatedNotifications,
//         unreadCount: updatedNotifications.filter(n => !n.read).length,
//       };
//     case 'DELETE_NOTIFICATION':
//       const filteredNotifications = state.notifications.filter(n => n.id !== action.payload);
//       return {
//         ...state,
//         notifications: filteredNotifications,
//         unreadCount: filteredNotifications.filter(n => !n.read).length,
//       };
//     case 'MARK_AS_READ':
//       const readNotifications = state.notifications.map(n =>
//         n.id === action.payload ? { ...n, read: true } : n
//       );
//       return {
//         ...state,
//         notifications: readNotifications,
//         unreadCount: readNotifications.filter(n => !n.read).length,
//       };
//     case 'SET_CONNECTION_STATUS':
//       return {
//         ...state,
//         isConnected: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// interface NotificationContextType extends NotificationState {
//   markAsRead: (id: string) => Promise<void>;
//   deleteNotification: (id: string) => Promise<void>;
//   refetchNotifications: () => Promise<void>;
// }

// const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(notificationReducer, initialState);

//   // Get WebSocket URL from environment or use default
//   const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080/ws/notifications';

//   const { readyState, lastMessage } = useWebSocket({
//     url: wsUrl,
//     onOpen: () => {
//       console.log('WebSocket connected');
//       dispatch({ type: 'SET_CONNECTION_STATUS', payload: true });
//     },
//     onClose: () => {
//       console.log('WebSocket disconnected');
//       dispatch({ type: 'SET_CONNECTION_STATUS', payload: false });
//     },
//     onError: (error) => {
//       console.error('WebSocket error:', error);
//       dispatch({ type: 'SET_CONNECTION_STATUS', payload: false });
//     },
//     onMessage: (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         handleWebSocketMessage(data);
//       } catch (error) {
//         console.error('Error parsing WebSocket message:', error);
//       }
//     },
//     shouldReconnect: true,
//     reconnectAttempts: 5,
//     reconnectInterval: 3000,
//   });

//   const handleWebSocketMessage = (data: any) => {
//     switch (data.type) {
//       case 'NEW_NOTIFICATION':
//         dispatch({ type: 'ADD_NOTIFICATION', payload: data.notification });
//         // Show browser notification if permission granted
//         if (Notification.permission === 'granted') {
//           new Notification(data.notification.title, {
//             body: data.notification.message,
//             icon: '/favicon.ico', // Add your app icon
//           });
//         }
//         break;
//       case 'NOTIFICATION_READ':
//         dispatch({ type: 'MARK_AS_READ', payload: data.notificationId });
//         break;
//       case 'NOTIFICATION_DELETED':
//         dispatch({ type: 'DELETE_NOTIFICATION', payload: data.notificationId });
//         break;
//       default:
//         console.log('Unknown WebSocket message type:', data.type);
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get('/notifications');
//       dispatch({ type: 'SET_NOTIFICATIONS', payload: response.data.notifications });
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };

//   const markAsRead = async (id: string) => {
//     try {
//       await axios.put(`/notifications/${id}/read`);
//       dispatch({ type: 'MARK_AS_READ', payload: id });
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   };

//   const deleteNotification = async (id: string) => {
//     try {
//       await axios.delete(`/notifications/${id}`);
//       dispatch({ type: 'DELETE_NOTIFICATION', payload: id });
//     } catch (error) {
//       console.error('Error deleting notification:', error);
//     }
//   };

//   const refetchNotifications = async () => {
//     await fetchNotifications();
//   };

//   // Request notification permission on mount
//   useEffect(() => {
//     if (Notification.permission === 'default') {
//       Notification.requestPermission();
//     }
//     fetchNotifications();
//   }, []);

//   const contextValue: NotificationContextType = {
//     ...state,
//     markAsRead,
//     deleteNotification,
//     refetchNotifications,
//   };

//   return (
//     <NotificationContext.Provider value={contextValue}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = () => {
//   const context = useContext(NotificationContext);
//   if (context === undefined) {
//     throw new Error('useNotifications must be used within a NotificationProvider');
//   }
//   return context;
// };

// // components/NotificationInterface.tsx (Updated)
// import React, { useState } from "react";
// import { formatDistanceToNow } from "date-fns";
// import NotificationDetailModal from "../modal/freelancerModal/NotificationDetailModal";
// import { useNotifications } from "../contexts/NotificationContext";

// const NotificationInterface = () => {
//   const {
//     notifications,
//     unreadCount,
//     isConnected,
//     markAsRead,
//     deleteNotification
//   } = useNotifications();

//   const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
//   const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
//   const [selectAll, setSelectAll] = useState(false);

//   const handleToggleDropdown = async (id: string) => {
//     // Mark as read when opening dropdown
//     await markAsRead(id);
//     setOpenDropdownId(openDropdownId === id ? null : id);
//   };

//   const handleDelete = async (id: string) => {
//     await deleteNotification(id);
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedNotifications([]);
//     } else {
//       setSelectedNotifications(notifications.map(n => n.id));
//     }
//     setSelectAll(!selectAll);
//   };

//   const handleSelectNotification = (id: string) => {
//     setSelectedNotifications(prev =>
//       prev.includes(id)
//         ? prev.filter(nId => nId !== id)
//         : [...prev, id]
//     );
//   };

//   const handleBulkDelete = async () => {
//     try {
//       await Promise.all(selectedNotifications.map(id => deleteNotification(id)));
//       setSelectedNotifications([]);
//       setSelectAll(false);
//     } catch (error) {
//       console.error('Error in bulk delete:', error);
//     }
//   };

//   const handleBulkMarkAsRead = async () => {
//     try {
//       await Promise.all(selectedNotifications.map(id => markAsRead(id)));
//       setSelectedNotifications([]);
//       setSelectAll(false);
//     } catch (error) {
//       console.error('Error in bulk mark as read:', error);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//       <div className="px-6 py-4 border-b border-gray-200">
//         <div className="flex justify-between items-center">
//           <h2 className="text-lg font-semibold text-gray-900">
//             Notifications {unreadCount > 0 && (
//               <span className="ml-2 px-2 py-1 text-xs bg-red-500 text-white rounded-full">
//                 {unreadCount}
//               </span>
//             )}
//           </h2>
//           <div className="flex items-center gap-2">
//             <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
//             <span className="text-xs text-gray-500">
//               {isConnected ? 'Connected' : 'Disconnected'}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={selectAll}
//               onChange={handleSelectAll}
//               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
//             />
//             <span className="text-sm text-gray-600">Select all</span>
//           </div>

//           {selectedNotifications.length > 0 && (
//             <div className="flex gap-2">
//               <button
//                 onClick={handleBulkMarkAsRead}
//                 className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//               >
//                 Mark as Read ({selectedNotifications.length})
//               </button>
//               <button
//                 onClick={handleBulkDelete}
//                 className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//               >
//                 Delete ({selectedNotifications.length})
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="space-y-4">
//           {notifications.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No notifications yet
//             </div>
//           ) : (
//             notifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className={`relative flex items-center gap-4 p-3 rounded-lg transition-colors ${
//                   !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedNotifications.includes(notification.id)}
//                   onChange={() => handleSelectNotification(notification.id)}
//                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
//                 />

//                 <div className="flex-shrink-0">
//                   <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg font-semibold">
//                     {notification.type === 'bid' && '💼'}
//                     {notification.type === 'message' && '💬'}
//                     {notification.type === 'payment' && '💰'}
//                     {notification.type === 'system' && '⚙️'}
//                   </div>
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-start gap-2">
//                     <span className="text-sm font-medium text-gray-900">
//                       {notification.title}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-600 mt-1 line-clamp-2">
//                     {notification.message}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <span className="text-sm text-gray-500">
//                     {formatDistanceToNow(new Date(notification.createdAt), {
//                       addSuffix: true,
//                     })}
//                   </span>
//                   <span
//                     className={`${
//                       notification.read ? "text-[#5500F4]" : "text-[#FF0000]"
//                     } text-sm font-normal`}
//                   >
//                     {notification.read ? "Read" : "Unread"}
//                   </span>
//                   <button
//                     className="px-4 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
//                     onClick={() => handleDelete(notification.id)}
//                     type="button"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
//                     onClick={() => handleToggleDropdown(notification.id)}
//                     type="button"
//                   >
//                     Details
//                   </button>

//                   {openDropdownId === notification.id && (
//                     <NotificationDetailModal
//                       notification={notification}
//                       setOpenDropdownId={() => setOpenDropdownId(null)}
//                     />
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationInterface;
