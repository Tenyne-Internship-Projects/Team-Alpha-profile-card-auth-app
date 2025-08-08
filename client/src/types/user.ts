// Types
export interface User {
  id: string;
  email: string;
  name: string;
  fullname?: string;
  role?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  profile: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  // refreshToken: string | null;
  // isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => Promise<void>;
  register: (token: string, userData: User) => Promise<void>;
  logout: () => void;
  // refreshAuthToken: () => Promise<void>;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  // confirmPassword: string;
  // acceptTerms?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
  message: string;
}

export interface IUserProfile {
  id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  avatarUrl: string;
  bio: string;
  dateOfBirth: string;
  documents: string[];
  // fullName: string;
  gender: string;
  github: string | null;
  // id: string;
  isAvailable: boolean;
  linkedIn: string | null;
  location: string;
  phoneNumber: string;
  primaryEmail: string;
  profession: string;
  salaryExpectation: number | null;
  skills: string[];
  specialization: string;
  updatedAt: string;
  userId: string;
}

export interface IUserProfileFetch {
  id: string;
  fullname: string;
  email: string;
  password: string;
  createdAt: string;
  profile: {
    avatarUrl: string;
    bio: string;
    dateOfBirth: string;
    documents: string[];
    fullName: string;
    gender: string;
    github: string | null;
    id: string;
    isAvailable: boolean;
    linkedIn: string | null;
    location: string;
    phoneNumber: string;
    primaryEmail: string;
    profession: string;
    salaryExpectation: number | null;
    skills: string[];
    specialization: string;
    updatedAt: string;
    userId: string;
  };
}
