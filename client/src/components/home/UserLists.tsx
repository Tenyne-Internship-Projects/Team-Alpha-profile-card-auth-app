// pages/UserList.tsx
import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { IUserProfile } from "../../types/user";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const UserList = () => {
  const [users, setUsers] = useState<IUserProfile[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/profile");
        setUsers(response.data);
        // console.log(response.data);
        toast.success("Users loaded successfully");
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage =
          axiosError.response?.data?.message || "Failed to fetch users";
        toast.error("❌ " + errorMessage);
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <h1>Testing user List</h1>
      {users.map((user) => (
        <Link
          key={user.id}
          to={`/users/${user.id}`}
          className="bg-black shadow-md text-white rounded-xl p-4 hover:shadow-lg transition"
        >
          <p>check test</p>
          <h2 className="text-white">{user.fullname}</h2>
          <div className="flex items-center gap-4">
            {/* <img
              src={user.profile.avatarUrl}
              alt={user.fullname}
              className="w-16 h-16 rounded-full object-cover"
            /> */}
            <div className="bg-black">
              <h2 className="text-lg font-bold">{user.fullname}</h2>
              <p className="text-sm ">{user.email}</p>
              <p></p>
              {/* <p className="text-sm ">{user.profile.location}</p> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
