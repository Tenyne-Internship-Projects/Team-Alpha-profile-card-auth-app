import type { ReactNode } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { AuthContextType } from "../types/user";

type UserRole = "client" | "freelancer"; // Add more roles as needed

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[]; // Made optional since you might want to protect routes without role restrictions
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { logout, user } = useAuth() as AuthContextType;
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  // Loading state - user data is being fetched
  if (user === undefined) {
    return (
      <div className="flex items-center bg-black justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if allowedRoles is provided
  if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
    return (
      <div className="flex bg-black items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <h2 className="font-bold text-lg mb-2">Permission Denied</h2>
            <p className="text-sm">
              You don&apos;t have permission to access this page. Your role:{" "}
              <span className="font-semibold">{user.role}</span>
            </p>
            <p className="text-sm mt-1">
              Required roles:{" "}
              <span className="font-semibold">{allowedRoles.join(", ")}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go to Login
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and has proper role access
  return <>{children}</>;
}
