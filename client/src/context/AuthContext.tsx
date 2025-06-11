import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type {
  AuthContextType,
  User,
  RegisterData,
  LoginCredentials,
} from "../types/user";
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
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ id: "", email: "", name: "" }); // Placeholder, should fetch user info
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    // Implement login logic
    credentials;
  };

  const register = async (userData: RegisterData) => {
    // Implement register logic
    userData;
    setIsLoading(true);
    setRefreshToken("666");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const refreshAuthToken = async () => {
    // Implement token refresh logic
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        refreshToken,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
