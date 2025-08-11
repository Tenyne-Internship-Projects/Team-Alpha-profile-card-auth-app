import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/axiosInstance";
import { useAuth } from "../../hooks/useAuth";
import type { AuthContextType } from "../../types/user";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { FaStarOfLife } from "react-icons/fa6";

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
      const token = res.data.accessToken;
      const role = res.data.user.role;
      // console.log(res);

      login(token, res.data.user); // Pass both token and user data
      if (role === "freelancer") {
        navigate("/dashboard");
      } else if (res.data.user.role === "client") {
        navigate("/job-list-dashboard");
      } else {
        navigate("/");
      }

      toast.success("Successfully logged in");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      const errorMessage =
        error.response?.data?.message || "Invalid credentials.";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="grid h-screen max-md:pt-5  bg-gray-100 md:bg-purple-950 md:flex lg:justify-between">
      <div className="md:w-3/6 lg:w-1/2 grid place-content-center">
        <div className="md:w-[200px] lg:w-[300px] mx-auto">
          <h3 className="h3 lg:text-white">Login into your Account</h3>
          <p className="p1 mt-3 md:text-white lg:w-[70%] md:mt-8">
            Sign In and start freelancing
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col max-md:pb-5 md:py-20 justify-between lg:justify-center md:w-3/6 lg:w-4/6  pt-10 px-5 md:rounded-l-[40px]  shadow-md w-full h-full  max-lg:mx-auto space-y-4"
      >
        <div className="space-y-3 w-full sm:w-[70%] md:w-[80%]  lg:w-[60%] gap-20  mx-auto">
          {/* Email */}
          <div className="relative">
            <FaStarOfLife
              fontSize={8}
              className="text-red-600 absolute right-2 top-1"
            />
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
            <FaStarOfLife
              fontSize={8}
              className="text-red-600 absolute right-2 top-1"
            />
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
              className="absolute top-3 right-4 text-[12px] text-purple-700"
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
                href=""
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

        <div className="pt-4 w-full sm:w-[70%] md:w-[80%]  lg:w-[60%]   mx-auto">
          <button
            type="submit"
            className="btn w-full cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm mt-4 text-center text-black/70">
            Don&apos;t have an account?{" "}
            <span
              // onClick={() => navigate("/register")}
              className="text-[#552EA4] cursor-pointer underline"
            >
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};
