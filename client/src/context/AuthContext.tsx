import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type {
  AuthContextType,
  User,
  // RegisterData,
  // LoginCredentials,
} from "../types/user";
// import axios from "axios";
// import axiosInstance from "../services/axiosInstance";
// import axios from "../services/axiosInstance";
// import type { IFreelancerProfile } from "../types/profile";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // const [refreshToken, setRefreshToken] = useState<string | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ id: "", email: "", name: "" }); // Placeholder, should fetch user info
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuthenticated(true);
    // You might want to fetch user info here using the token
    setUser({ id: "", email: "", name: "" }); // Placeholder, should fetch user info
  };

  const register = async (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuthenticated(true);
    // You might want to fetch user info here using the token
    setUser({ id: "", email: "", name: "" }); // Placeholder, should fetch user info
    // try {
    //   setIsLoading(true);
    //   const response = await axios.post("/register", userData);
    //   const { token } = response.data;

    //    Store token and update auth state
    //   localStorage.setItem("token", token);
    //   setToken(token);
    //   setIsAuthenticated(true);
    //   setUser({ id: "", email: "", name: "" });  Placeholder, should fetch user info

    //   return response.data;
    // } catch (error: any) {
    //   console.error(
    //     "Registration error:",
    //     error.response?.data || error.message
    //   );
    //   throw error;
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // const refreshAuthToken = async () => {
  //    Implement token refresh logic
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        // refreshToken,
        // isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        // refreshAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
