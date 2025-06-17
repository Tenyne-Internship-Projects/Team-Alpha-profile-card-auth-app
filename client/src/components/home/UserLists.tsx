// pages/UserList.tsx
import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";
import { IUserProfileFetch } from "../../types/user";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { Mail, Sparkles, User } from "lucide-react";

const UserList = () => {
  const [users, setUsers] = useState<IUserProfileFetch[]>([]);
  // const [userr, setUserr] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/profile");

        setUsers(response.data);
        // setUserr(response.data);
        console.log(response.data);
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

  // const profile = users;

  return (
    <div className="grid lg:grid-cols-3 lg:px-24">
      {/* <h1>Testing user List</h1> */}
      {users.map((user) => {
        return (
          <div className=" " key={user.id}>
            <div className=" flex items-center justify-center p-4">
              <div className="relative  ">
                {/* Main card */}
                <div className="relative  rounded-3xl shadow-2xl overflow-hidden border border-white/50 transform hover:scale-105 transition-all duration-500">
                  {/* Header gradient */}
                  <div className="h-28 bg-gradient-to-r from-[#5A399D] via-[#6B46C1] to-[#7C3AED] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                    <div className="absolute top-4 right-4">
                      <Sparkles className="w-6 h-6 text-white/70 animate-pulse" />
                    </div>
                  </div>

                  {/* Profile image placeholder */}
                  <div className="">
                    <div className="relative -mt-16 flex justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#5A399D] to-[#7C3AED] rounded-full border-4 border-white shadow-lg flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                        <User className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 pb-6 pt-4 space-y-4">
                      {/* Name and profession */}
                      <div className="text-center space-y-1">
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
                          {user.fullname}
                        </h2>
                        <p className="text-[#5A399D] font-semibold text-lg">
                          {/* {user.profile.gender} */}
                        </p>
                        <p className="text-gray-600 text-sm font-medium">
                          {/* {profileData.specialization} */}
                        </p>
                      </div>

                      {/* Bio */}
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100">
                        <p className="text-gray-700 text-sm leading-relaxed text-center italic">
                          {/* "{profileData.bio}" */}
                        </p>
                      </div>

                      {/* Details grid */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center space-x-3 group">
                          <div className="w-8 h-8 bg-[#5A399D]/10 rounded-lg flex items-center justify-center group-hover:bg-[#5A399D]/20 transition-colors">
                            <Mail className="w-4 h-4 text-[#5A399D]" />
                          </div>
                          <span className="text-gray-700 text-sm font-medium truncate">
                            {user.email}
                          </span>
                        </div>

                        {/* <div className="flex items-center space-x-3 group">
                          <div className="w-8 h-8 bg-[#5A399D]/10 rounded-lg flex items-center justify-center group-hover:bg-[#5A399D]/20 transition-colors">
                            <MapPin className="w-4 h-4 text-[#5A399D]" />
                          </div>
                          <span className="text-gray-700 text-sm font-medium">
                            {user.profile.bio}
                          </span>
                        </div> */}
                      </div>

                      {/* Action button */}
                      <div className="pt-4">
                        <Link to={`/users/${user.id}`}>
                          <button className="w-full bg-gradient-to-r from-[#5A399D] to-[#7C3AED] text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-[#4C2B85] hover:to-[#6B46C1]">
                            View more
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default UserList;
