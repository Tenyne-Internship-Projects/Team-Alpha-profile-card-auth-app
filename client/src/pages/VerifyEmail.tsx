import { useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  // const getInboxLink = (email: string | null) => {
  //   return `mailto:${email}`; // fallback
  // };

  return (
    <div className="grid h-screen pt-5 lg:pt-16 bg-gray-100 lg:bg-purple-950 md:flex lg:justify-between">
      <div className="text-center lg:w-1/2 grid place-content-center">
        <h3 className="h3 lg:text-white">Login into your Account</h3>
        <p className="p1 mt-3 lg:text-white">Sign In and start freelancing</p>
      </div>

      <div className="bg-white  text-center flex flex-col justify-between lg:justify-center lg:w-1/2  py-10 px-5 lg:rounded-l-[40px] max-lg:rounded-t-[20px] shadow-md w-full h-full md:w-[80%] max-lg:mx-auto space-y-4">
        <div className="w-full lg:w-[70%] mx-auto">
          <img
            src="/onboarding/emailIcon.png"
            alt=""
            className="w-[104px] mx-auto"
          />
          <p className="text-gray-600">A verification link has been sent to:</p>
          <p className="font-semibold text-[#552EA4]">{email}</p>
        </div>

        <div className="w-full lg:w-[70%] mx-auto">
          <a
            href="https://mail.google.com/mail/u/{email}/#inbox"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full mt-4 px-4 py-2 bg-[#552EA4] text-white rounded hover:bg-[#552EA4]/60 transition"
          >
            Verify Email
          </a>

          <p className="text-sm text-gray-500 mt-2">
            Didn’t get the email? Check your spam folder or try again.
          </p>
        </div>
      </div>
    </div>
  );
}
