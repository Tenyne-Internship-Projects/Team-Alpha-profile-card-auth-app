import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axiosInstance";

export default function VerifyEmail() {
  const { token } = useParams(); // grabs token from URL path
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (token) {
      axios
        .post("/auth/verify-email", { token })
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    }
  }, [token]);

  return (
    <div className="text-center mt-20">
      {status === "loading" && <p>Verifying...</p>}
      {status === "success" && <p>Email verified successfully 🎉</p>}
      {status === "error" && <p>Verification failed ⚠️</p>}
    </div>
  );
}
