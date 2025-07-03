import type { ReactNode } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../types/user";

type UserRole = "client" | "freelancer"; // Add more roles as needed

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: // allowedRoles,
ProtectedRouteProps) {
  const { logout, user } = useAuth() as AuthContextType;
  const navigate = useNavigate();
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      // alert("Logged out successfully!");
      logout();
    }
  };

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (
    user === null ||
    (allowedRoles && !allowedRoles.includes(user.role as UserRole))
  ) {
    return (
      <div>
        Permission denied
        <button type="button" onClick={() => navigate("/login")}>
          Go to Login
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className=" flex gap-3  rounded-lg hover:bg-[#CEC4E2] p-4 w-fit text-black font-black text-base transition-all duration-300 mt-8"
        >
          Logout
        </button>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // if (allowedRoles.includes(user.role as UserRole)) {
  //   return children;
  // }

  return children;
}
