import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/homePage";
import PublicLayout from "./layout/public/publicLayout";
import AdminLayout from "./layout/admin/adminLayout";
import Dashboard from "./pages/admin/dashboardPage";
import Account from "./pages/admin/accountPage";
import Login from "./pages/public/loginPage";
import ResetPassword from "./pages/public/resetPasswordPage";
import LogoutPage from "./pages/public/logoutPage";
import RequireAuth from "./pages/admin/requireAuth";
import { LOGIN_ROUTE } from "./constants/apiConstants";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* FrontOffice routes */}
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
        <Route path={`/${LOGIN_ROUTE}`} element={<Login />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* Admin routes */}
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
    </Router>
  );
}
