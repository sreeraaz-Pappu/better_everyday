import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import Body from "./pages/Body";
import Diet from "./pages/Diet";
import Gym from "./pages/Gym";
import Tasks from "./pages/Tasks";
import HistoryPage from "./pages/HistoryPage";
import AiSummary from "./pages/AiSummary";
import SettingsPage from "./pages/SettingsPage";
import DesignPreview from "./pages/DesignPreview";

function RequireAuth({ children }) {
  const { session, loading } = useAuth();
  if (loading) return null;
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/design-preview" element={<DesignPreview />} />
          <Route
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/body" element={<Body />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/gym" element={<Gym />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/ai-summary" element={<AiSummary />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
