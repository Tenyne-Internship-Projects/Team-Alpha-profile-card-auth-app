import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axiosInstance";
import { useAuth } from "../../hooks/useAuth";
import type { AuthContextType } from "../../types/user";

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
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await axios.post("/login", data);
      login(res.data.token); // Save token in localStorage and context
      navigate("/dashboard");
    } catch (err: any) {
      alert("❌ " + (err.response?.data?.message || "Invalid credentials."));
    }
  };

  return (
    <div className="grid h-screen max-lg:pt-16 bg-gray-100 lg:bg-purple-950 md:flex justify-between">
      <div className="text-center lg:w-1/2 grid place-content-center">
        <h3 className="h3 lg:text-white">Login into your Account</h3>
        <p className="p1 mt-3 lg:text-white">Sign In and start freelancing</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col justify-center lg:w-1/2  pt-10 px-5 rounded-l-[40px] max-lg:rounded-t-[40px] shadow-md w-full h-full md:w-[80%] max-lg:mx-auto space-y-4"
      >
        <div className="space-y-4 w-[70%]  mx-auto">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-2"
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
              className="w-full border rounded-lg px-4 py-2 pr-12"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2.5 right-3 text-sm text-purple-700"
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
        </div>

        <div className="pt-4 w-[70%]  mx-auto">
          <button type="submit" className="btn w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm mt-4 text-center text-black/70">
            Don’t have an account?{" "}
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
