import "./App.css";
import Homepage from "./pages/Homepage";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectManager from "./components/admin/ProjectManager";
import SkillManager from "./components/admin/SkillManager";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
//import WhatsAppButton from "./components/common/WhatsAppButton";
import { HelmetProvider } from "react-helmet-async";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/projects"
              element={
                <ProtectedRoute>
                  <ProjectManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/skills"
              element={
                <ProtectedRoute>
                  <SkillManager />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
