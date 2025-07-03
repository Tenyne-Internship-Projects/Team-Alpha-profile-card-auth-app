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
  const { user } = useAuth() as AuthContextType;
  const navigate = useNavigate();

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
