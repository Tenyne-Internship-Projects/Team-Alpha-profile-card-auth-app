import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { ErrorBoundary } from "react-error-boundary";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyPage from "./pages/EmailVerification";
import UserDetails from "./pages/UserDetail";
import RegisterWelcome from "./pages/RegisterWelcome";
import NotFound from "./pages/NotFound";
// import FreelancePage from "./pages/FreelancePage";
import DashboardLayout from "./components/clientHirer/DashboardLayout";
// import EditProject from "./components/clientHirer/EditProject";

// Client Pages
import DashboardPage from "./pages/clientPages/DashboardPage";
import ProjectsPage from "./pages/clientPages/ProjectsPage";
import ProfilePage from "./pages/clientPages/ProfilePage";
import EmployeesPage from "./pages/clientPages/EmployeesPage";
import AddProjectPage from "./pages/clientPages/AddProjectPage";
// import DashboardRedirect from "./pages/clientPages/DashboardRedirect";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import JobListing from "./pages/JobListing";
import EditProjectPage from "./pages/clientPages/EditProjectPage";
import DashboardFreelancerLayout from "./components/freelancerComponent/DashboardFreelancerLayout";
import HomePage from "./pages/freelancerPages/HomePage";
import UploadsPage from "./pages/freelancerPages/UploadsPage";
import NotificationsPage from "./pages/freelancerPages/NotificationsPage";
import ProfilePageFreelancer from "./pages/freelancerPages/ProfilePage";
import SettingsPage from "./pages/freelancerPages/SettingsPage";

// Error fallback
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reload page
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/get-started" element={<RegisterWelcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/email-verification/:code" element={<VerifyPage />} />
            <Route path="/proceed-to-email" element={<VerifyEmail />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/jobs-listed" element={<JobListing />} />

            {/* Protected: Freelancer Dashboard with nested routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["freelancer"]}>
                  <DashboardFreelancerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="uploads" element={<UploadsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="profile" element={<ProfilePageFreelancer />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Protected: Client Dashboard with nested routes */}
            <Route
              path="/job-list-dashboard"
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="edit-project" element={<EditProjectPage />} />
              <Route path="add-project" element={<AddProjectPage />} />
            </Route>

            {/* Protected: Edit Project */}
            {/* <Route
              path="/edit-project/:id"
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <EditProject />
                </ProtectedRoute>
              }
            /> */}

            {/* Redirect old dashboard route */}
            <Route
              path="/dashboard-client"
              element={<Navigate to="/job-list-dashboard" replace />}
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
