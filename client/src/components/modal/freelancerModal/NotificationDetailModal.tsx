interface INotificationDetailModal {
  setOpenDropdownId: () => void;
}

const NotificationDetailModal = ({
  setOpenDropdownId,
}: INotificationDetailModal) => {
  return (
    <div className="bg-[#E1DEE8]/80  max-md:px-3 left-0 fixed top-0 py-10 z-50 h-screen w-screen">
      <div className="w-[400px] mx-auto">
        <div className="rounded-t-2xl bg-[#5A399D] text-center text-4xl p-4">
          <h3 className="text-white">Bid Accepted!</h3>
        </div>
        <div className="bg-white px-6 py-6">
          <div className="border rounded-lg border-[#A8A9B3] p-2 py-4 mb-6">
            <h4 className="text-xl text-[#09080D]">Project Details</h4>
            <ul className="">
              <li className="flex mt-4 pb-2 border-b border-[#A8A9B3] justify-between items-center">
                <span className="text-[#6F757E] text-xs font-medium">
                  Project title
                </span>{" "}
                <p className="text-[#09080D] text-sm font-medium">
                  Website Redesign Project
                </p>
              </li>
              <li className="flex mt-4 pb-2 border-b border-[#A8A9B3] justify-between items-center">
                <span className="text-[#6F757E] text-xs font-medium">
                  Your bid
                </span>{" "}
                <p className="text-[#09080D] text-sm font-medium">$ 4000</p>
              </li>
              <li className="flex mt-4 pb-2 border-b border-[#A8A9B3] justify-between items-center">
                <span className="text-[#6F757E] text-xs font-medium">
                  Timeline
                </span>{" "}
                <p className="text-[#09080D] text-sm font-medium">4-5 weeks</p>
              </li>
              <li className="flex mt-4 justify-between items-center">
                <span className="text-[#6F757E] text-xs font-medium">
                  Client
                </span>{" "}
                <p className="text-[#09080D] text-sm font-medium">
                  Olivia Ventures
                </p>
              </li>
            </ul>
          </div>

          <ul
            className="text-[#09080D] space-y-4 text-sm mb-4
          "
          >
            <li className="flex items-center gap-4">
              {" "}
              <img
                src="/successfullIcon.png"
                alt="successfull"
                className="w-4"
              />
              Contact your client within 24 hours
            </li>
            <li className="flex items-center gap-4">
              {" "}
              <img
                src="/successfullIcon.png"
                alt="successfull"
                className="w-4"
              />
              Begin work according to your proposed timeline
            </li>
            <li className="flex items-center gap-4">
              {" "}
              <img
                src="/successfullIcon.png"
                alt="successfull"
                className="w-4"
              />
              You&apos;ll be paid when the project is completed
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpenDropdownId()}
            className="bg-[#5A399D] cursor-pointer font-medium text-sm py-3 w-full rounded-lg text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailModal;
