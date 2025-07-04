import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axiosInstance";

export default function VerifyEmail() {
  const { code } = useParams(); // grabs token from URL path
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (code) {
      axios
        .post(`/auth/verify-email/${code}`)
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    }
  }, [code]);

  return (
    <div className="text-center mt-20">
      {status === "loading" && <p>Verifying...</p>}
      {status === "success" && <p>Email verified successfully 🎉</p>}
      {status === "error" && <p>Verification failed ⚠️</p>}
    </div>
  );
}
