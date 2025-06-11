const ProceedEmailVerify = () => {
  return (
    <div className="bg-gray-100 h-screen text-center">
      <div className="w-8/12 mx-auto">
        <div>
          <h3>Email Verification</h3>
          <p>An email will be sent to you click on the link</p>
        </div>

        <div className="bg-white rounded-[40px] py-24 h-full">
          <img src="/onboarding/emailIcon.png" alt="" className="w-[167px]" />
          <button className="btn">Verify Email</button>
        </div>
      </div>
    </div>
  );
};

export default ProceedEmailVerify;
