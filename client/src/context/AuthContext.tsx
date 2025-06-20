import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type {
  AuthContextType,
  User,
  // RegisterData,
  // LoginCredentials,
} from "../types/user";
// import axios from "../services/axiosInstance";
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
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const register = async (token: string): Promise<void> => {
    // localStorage.setItem("token", token);
    // localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    // setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
