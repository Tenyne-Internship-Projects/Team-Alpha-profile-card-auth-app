import { useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const getInboxLink = (email: string | null) => {
    return `mailto:${email}`; // fallback
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Check Your Email
        </h2>
        <p className="text-gray-600">A verification link has been sent to:</p>
        <p className="font-semibold text-blue-600">{email}</p>

        <a
          href={getInboxLink(email)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Open Email Inbox
        </a>

        <p className="text-sm text-gray-500 mt-2">
          Didn’t get the email? Check your spam folder or try again.
        </p>
      </div>
    </div>
  );
}
