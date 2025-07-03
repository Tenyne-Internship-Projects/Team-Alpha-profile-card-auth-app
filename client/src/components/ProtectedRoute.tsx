import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
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

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (
    user === null ||
    (allowedRoles && !allowedRoles.includes(user.role as UserRole))
  ) {
    return (
      <div>
        <Navigate to="/login" />
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
