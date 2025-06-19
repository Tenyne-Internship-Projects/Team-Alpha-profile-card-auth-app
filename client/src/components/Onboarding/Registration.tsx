import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/axiosInstance";
// import toast from "react-hot-toast";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { FaStarOfLife } from "react-icons/fa6";

interface RegisterForm {
  fullname: string;
  email: string;
  password: string;
}

export default function Registration() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<RegisterForm>();

  const passwordValue = watch("password", "");

  const passwordValidations = {
    minLength: passwordValue.length >= 8,
    hasLowercase: /[a-z]/.test(passwordValue),
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
  };

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await axios.post("/auth/register", data);

      if (res.status === 201) {
        toast.success("Verify email");
        reset();
        navigate(`/proceed-to-email?email=${data.email}`);
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Registration error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      const errorMessage = error.response?.data?.message;

      toast.error("❌ " + errorMessage);
    }
  };

  return (
    <div className="grid h-screen max-md:pt-5  bg-gray-100 md:bg-purple-950 md:flex lg:justify-between">
      <div className="md:w-3/6 lg:w-1/2 grid place-content-center">
        <div className="md:w-[200px] lg:w-[300px] mx-auto">
          <h3 className="h3 md:text-white">Welcome to Freebio</h3>
          <p className="p1 mt-3 md:text-white lg:w-[70%] md:mt-8">
            Sign Up and start freelancing
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col max-md:pb-5 md:py-20 justify-between lg:justify-center md:w-3/6 lg:w-4/6  pt-10 px-5 md:rounded-l-[40px]  shadow-md w-full h-full  max-lg:mx-auto space-y-4"
      >
        <div className="space-y-3 w-full sm:w-[70%] md:w-[80%]  lg:w-[60%] gap-20  mx-auto">
          {/* Full Name */}
          <div className="w-full relative">
            <FaStarOfLife
              fontSize={10}
              className="text-red-600 absolute right-0 -top-2"
            />
            <input
              {...register("fullname", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.fullname && (
              <p className="text-sm text-red-600">{errors.fullname.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <FaStarOfLife
              fontSize={10}
              className="text-red-600 absolute right-0 -top-2"
            />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <FaStarOfLife
              fontSize={10}
              className="text-red-600 absolute right-0 -top-2"
            />
            <input
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
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}

            {/* Password Validation Indicators */}
            <div className="mt-2 space-y-1">
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
        </div>

        <div className="pt-4 w-full sm:w-[70%]y md:w-[80%]  lg:w-[60%]   mx-auto">
          <button
            type="submit"
            className="btn cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-sm mt-4 text-center  text-black/70">
            Already have an account?{" "}
            <span
              // onClick={() => navigate("/login")}
              className="text-[#552EA4] cursor-pointer underline"
            >
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
