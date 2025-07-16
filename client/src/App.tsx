import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import DashboardClient from "./components/clientHirer/DashboardClient";
import EditProject from "./components/clientHirer/EditProject";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import JobListing from "./pages/JobListing";

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

            {/* Protected: Freelancer Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["freelancer"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected: Client Dashboard */}
            <Route
              path="/job-list-dashboard"
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <DashboardClient />
                </ProtectedRoute>
              }
            />

            {/* Protected: Edit Project */}
            <Route
              path="/edit-project/:id"
              element={
                <ProtectedRoute allowedRoles={["client"]}>
                  <EditProject />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
