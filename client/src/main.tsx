import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

// Page imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyPage from "./pages/Verify";
import UserDetails from "./pages/UserDetail";
import RegisterWelcome from "./pages/RegisterWelcome";
import NotFound from "./pages/NotFound";
import FreelancePage from "./pages/FreelancePage";
import DashboardClient from "./components/clientHirer/Dashboard";

// Component imports
import ProtectedRoute from "./components/ProtectedRoute";

// Error Boundary Component
import { ErrorBoundary } from "react-error-boundary";

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

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
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
            <Route path="/email-verification" element={<VerifyPage />} />
            <Route path="/proceed-to-email" element={<VerifyEmail />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/jobs-listed" element={<FreelancePage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job-list-dashboard"
              element={
                <ProtectedRoute>
                  <DashboardClient />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for 404 - MUST be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
