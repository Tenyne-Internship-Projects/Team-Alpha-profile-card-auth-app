import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-[#552EA4]  h-screen flex items-center justify-center ">
      <div className="text-center space-y-6">
        <h2 className="text-white text-5xl">404 page</h2>
        <p>Page not found</p>
        <Link to="/" className=" text-purple-300 flex gap-5 items-center">
          Go to Homepage <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
