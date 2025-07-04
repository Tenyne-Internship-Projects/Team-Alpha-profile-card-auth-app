import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axiosInstance";

export default function VerifyEmail() {
  const { code } = useParams(); // grabs token from URL path
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  useEffect(() => {
    if (code) {
      axios
        .post(`/auth/verify-email/${code}`)
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    }
  }, [code]);

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
