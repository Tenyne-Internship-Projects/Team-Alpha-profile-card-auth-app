import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import VerifyPage from "./pages/Verify";
import UserDetails from "./pages/UserDetail";
import RegisterWelcome from "./pages/RegisterWelcome";
import NotFound from "./pages/NotFound";
import FreelancePage from "./pages/FreelancePage";
import DashboardClient from "./components/clientHirer/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<RegisterWelcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/email-verification" element={<VerifyPage />} />
          <Route path="/proceed-to-email" element={<VerifyEmail />} />
          <Route path="/users/:id" element={<UserDetails />} />

          {/* Catch ALL invalid routes */}
          <Route path="*" element={<NotFound />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Freelance page  */}
          <Route path="/jobs-listed" element={<FreelancePage />} />
          <Route path="/job-list-dashboard" element={<DashboardClient />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
