import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../services/axiosInstance";
import { AxiosError } from "axios";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { code } = useParams(); // grabs token from URL path
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const verify = async () => {
    try {
      const res = await axios.post(`/auth/verify-email/${code}`);
      if (res.status === 200) {
        navigate("/login");
        setStatus("success");
      }
      // .then(() => setStatus("success"))
      // .catch(() => setStatus("error"));
    } catch (err) {
      const error = err as AxiosError;
      console.error(error);
      // setStatus(error)
    }
  };

  useEffect(() => {
    verify();
  }, []);

  const handleResend = async () => {
    setResendStatus("sending");
    try {
      await axios.post("/auth/resend-verification");
      setResendStatus("sent");
    } catch {
      setResendStatus("error");
    }
  };

  return (
    <div className="text-center mt-20">
      {status === "loading" && <p>Verifying...</p>}
      {status === "success" && <p>Email verified successfully 🎉</p>}
      {status === "error" && (
        <>
          <p>Verification failed ⚠️</p>
          <div className="mt-4">
            <button
              onClick={handleResend}
              disabled={resendStatus === "sending" || resendStatus === "sent"}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {resendStatus === "sending"
                ? "Resending..."
                : resendStatus === "sent"
                ? "Email Sent!"
                : "Resend Email"}
            </button>
            {resendStatus === "error" && (
              <p className="text-red-600 mt-2">
                Failed to resend email. Please try again.
              </p>
            )}
            {resendStatus === "sent" && (
              <p className="text-green-600 mt-2">
                Verification email resent! Check your inbox.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
