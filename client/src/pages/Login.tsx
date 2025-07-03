import { Navigate } from "react-router-dom";
// import { LoginIn } from "../components/Onboarding/LoginIn";
import { useAuth } from "../hooks/useAuth";
import { AuthContextType } from "../types/user";
import { LoginIn } from "../components/Onboarding/LoginIn";

const Login = () => {
  const { user } = useAuth() as AuthContextType;

  if (!user) {
    return <LoginIn />;
  }

  // Redirect based on user role
  if (user.role === "freelancer") {
    return <Navigate to="/dashboard" />;
  } else {
    return <Navigate to="/job-list-dashboard" />;
  }
};

export default Login;
