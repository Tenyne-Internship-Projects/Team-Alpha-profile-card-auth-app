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

          <Route path="/verify-email" element={<VerifyPage />} />
          <Route path="/proceed-to-email" element={<VerifyEmail />} />
          <Route path="/users/:id" element={<UserDetails />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
