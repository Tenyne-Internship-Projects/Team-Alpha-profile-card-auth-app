import { Navigate } from "react-router-dom";

const DashboardRedirect = () => {
  return <Navigate to="/job-list-dashboard" replace />;
};

export default DashboardRedirect;
