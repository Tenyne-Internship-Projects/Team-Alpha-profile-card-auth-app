import { Navigate } from "react-router-dom";
import Registration from "../components/Onboarding/Registration";
import { useAuth } from "../hooks/useAuth";
import { AuthContextType } from "../types/user";

const Register = () => {
  const { user } = useAuth() as AuthContextType;
  return user ? <Navigate to="/dashboard" /> : <Registration />;
};

export default Register;
