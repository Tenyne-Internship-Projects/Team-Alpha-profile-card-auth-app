import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../services/axiosInstance";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export default function VerifyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) return;

      try {
        await axios.post("/verify-email", { token });
        setStatus("✅ Email verified! Redirecting to login...");
        toast.success("Email verified");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;

        const errorMessage =
          error.response?.data?.message || "Invalid credentials.";

        toast.error("❌ " + errorMessage);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Email Verification
        </h2>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  );
}
