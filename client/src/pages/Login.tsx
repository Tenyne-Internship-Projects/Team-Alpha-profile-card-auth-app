import { Navigate } from "react-router-dom";
// import { LoginIn } from "../components/Onboarding/LoginIn";
import { useAuth } from "../hooks/useAuth";
import { AuthContextType } from "../types/user";

const Login = () => {
  const { user } = useAuth() as AuthContextType;
  return user?.role === "freelancer" ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/job-list-dashboard" />
  );
};

export default Login;
