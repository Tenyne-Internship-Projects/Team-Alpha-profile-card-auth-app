import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axiosInstance";
import { useAuth } from "../../hooks/useAuth";
import type { AuthContextType } from "../../types/user";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export interface LoginForm {
  email: string;
  password: string;
}

export const LoginIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth() as AuthContextType;
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const passwordValue = watch("password", "");

  const passwordValidations = {
    minLength: passwordValue.length >= 8,
    hasLowercase: /[a-z]/.test(passwordValue),
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
  };

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post("/auth/login", data);
      login(res.data.token, res.data.user); // Pass both token and user data
      toast.success("Successfully logged in");
      navigate("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      const errorMessage =
        error.response?.data?.message || "Invalid credentials.";

      toast.error("❌ " + errorMessage);
    }
  };

  return (
    <div className="grid h-screen max-md:pt-5  bg-gray-100 lg:bg-purple-950 md:flex lg:justify-between">
      <div className="text-center lg:w-1/2 grid place-content-center">
        <h3 className="h3 lg:text-white">Login into your Account</h3>
        <p className="p1 mt-3 lg:text-white">Sign In and start freelancing</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col justify-between lg:justify-center lg:w-4/6  py-10 px-5 lg:rounded-l-[40px] max-lg:rounded-t-[20px] shadow-md w-full h-full md:w-[80%] max-lg:mx-auto space-y-4"
      >
        <div className="space-y-4 lg:w-[60%]  lg:mx-auto">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border  "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password with visibility toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full border "
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                validate: {
                  hasLowercase: (value) =>
                    /[a-z]/.test(value as string) ||
                    "Password must include a lowercase letter",
                  hasUppercase: (value) =>
                    /[A-Z]/.test(value as string) ||
                    "Password must include an uppercase letter",
                  hasNumber: (value) =>
                    /[0-9]/.test(value as string) ||
                    "Password must include a number letter",
                  hasSpecialChar: (value) =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value as string) ||
                    "Password must include a special letter",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-4 right-3 text-sm text-purple-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
            <div className="text-right mt-2">
              <a
                href="/forgot-password"
                className="text-sm text-purple-700 underline hover:text-purple-900"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Password Validation Indicators */}
          <div className="mt-2 space-y-1 ">
            <p
              className={`text-sm ${
                passwordValidations.minLength
                  ? "text-purple-600"
                  : "text-gray-400"
              }`}
            >
              • At least 8 characters
            </p>
            <p
              className={`text-sm ${
                passwordValidations.hasLowercase
                  ? "text-purple-600"
                  : "text-gray-400"
              }`}
            >
              • At least one lowercase letter
            </p>
            <p
              className={`text-sm ${
                passwordValidations.hasUppercase
                  ? "text-purple-600"
                  : "text-gray-400"
              }`}
            >
              • At least one uppercase letter
            </p>
            <p
              className={`text-sm ${
                passwordValidations.hasNumber
                  ? "text-purple-600"
                  : "text-gray-400"
              }`}
            >
              • At least one number
            </p>
            <p
              className={`text-sm ${
                passwordValidations.hasSpecialChar
                  ? "text-purple-600"
                  : "text-gray-400"
              }`}
            >
              • At least one special character
            </p>
          </div>
        </div>

        <div className="pt-4 w-full lg:w-[60%]  mx-auto">
          <button
            type="submit"
            className="btn w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm mt-4 text-center text-black/70">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-[#552EA4] cursor-pointer underline"
            >
              <a href="/register">Create Account</a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};
