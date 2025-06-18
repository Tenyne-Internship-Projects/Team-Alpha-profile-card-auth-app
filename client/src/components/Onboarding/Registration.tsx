import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axiosInstance";
// import toast from "react-hot-toast";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

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
      // console.log("Attempting registration with:", {
      //   ...data,
      //   password: "***",
      // });
      const res = await axios.post("/auth/register", data);
      // console.log("Registration response:", res.data);
      // console.log(res.data.token);
      console.log(res.data.token);
      // if (res.data.token) {
      register(res.data.token);

      //   // toast.success(
      //   //   "✅ Registration successful. Please check your email to verify your account."
      //   // );
      reset();
      navigate(`/proceed-to-email?email=${data.email}`);
      // } else {
      //   throw new Error("No token received from server");
      // }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Registration error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      const errorMessage = error.response?.data?.message;
      // "Registration failed. Please try again.";
      toast.error("❌ " + errorMessage);
    }
  };

  return (
    <div className="grid h-screen max-md:pt-5  bg-gray-100 lg:bg-purple-950 md:flex lg:justify-between">
      <div className="text-center lg:w-1/2 grid place-content-center">
        <h3 className="h3 lg:text-white">Welcome to Freebio</h3>
        <p className="p1 mt-3 lg:text-white">Sign Up and start freelancing</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white flex flex-col justify-between lg:justify-center lg:w-4/6  py-10 px-5 lg:rounded-l-[40px] max-lg:rounded-t-[20px] shadow-md w-full h-full md:w-[80%] max-lg:mx-auto space-y-4"
      >
        <div className="space-y-4 lg:w-[60%]  lg:mx-auto">
          {/* Full Name */}
          <div className="w-full">
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
          <div>
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
          <div>
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

          {/* Confirm Password */}
          {/* <div>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div> */}

          {/* Terms & Conditions */}
          {/* <div className=" flex gap-5">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must agree to the terms and conditions",
              })}
              className="mt-1 w-fit"
            />
            <label className="text-sm text-black">
              I agree to the{" "}
              <span className="underline cursor-pointer text-purple-700">
                terms and conditions
              </span>
            </label>
          </div> */}
          {/* {errors.terms && (
            <p className="text-sm text-red-600">{errors.terms.message}</p>
          )} */}
        </div>

        <div className="pt-4 w-full  lg:w-[60%]  mx-auto">
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
              onClick={() => navigate("/login")}
              className="text-[#552EA4] cursor-pointer underline"
            >
              <a href="/login">Login</a>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
