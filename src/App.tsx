import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/homePage";
import PublicLayout from "./layout/public/publicLayout";
import AdminLayout from "./layout/admin/adminLayout";
import Dashboard from "./pages/admin/dashboardPage";
import Account from "./pages/admin/accountPage";
import Login from "./pages/public/loginPage";
import RequestResetPassword from "./pages/public/requestResetPasswordPage";
import ResetPassword from "./pages/public/resetPasswordPage";
import LogoutPage from "./pages/public/logoutPage";
import RequireAuth from "./pages/admin/requireAuth";
import { LOGIN_ROUTE } from "./constants/apiConstants";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Routes publiques */}
          <Route
            path="/*"
            element={
              <PublicLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </PublicLayout>
            }
          />

          {/* Routes d'authentification */}
          <Route path={`/${LOGIN_ROUTE}`} element={<Login />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route
            path="/request-reset-password"
            element={<RequestResetPassword />}
          />
          <Route
            path="/request-reset-password"
            element={<RequestResetPassword />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Routes admin */}
          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <AdminLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/account" element={<Account />} />
                  </Routes>
                </AdminLayout>
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
