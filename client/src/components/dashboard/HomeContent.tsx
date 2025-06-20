import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../types/user";
import ProfileDetail from "../home/ProfileDetail";

// Complete HomeContent component
const HomeContent = () => {
  const { user } = useAuth() as AuthContextType;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome {user?.name}
        </h1>
        <p className="text-gray-600"></p>
      </div>

      <div>{user?.profile && <ProfileDetail />}</div>
    </div>
  );
};

export default HomeContent;
