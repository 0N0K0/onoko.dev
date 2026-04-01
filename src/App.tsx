import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/homePage";
import PublicLayout from "./layout/public/publicLayout";
import AdminLayout from "./layout/admin/adminLayout";
import Dashboard from "./pages/admin/dashboardPage";
import Account from "./pages/admin/accountPage";
import Login from "./pages/auth/loginPage";
import RequestResetPassword from "./pages/auth/requestResetPasswordPage";
import ResetPassword from "./pages/auth/resetPasswordPage";
import LogoutPage from "./pages/auth/logoutPage";
import RequireAuth from "./pages/admin/requireAuth";
import { LOGIN_ROUTE } from "./constants/apiConstants";
import { AuthProvider } from "./context/AuthContext";
import Categories from "./pages/admin/categoriesPage";
import { GlobalStyles, useTheme } from "@mui/material";

export default function App() {
  const theme = useTheme();
  return (
    <>
      <GlobalStyles
        styles={{
          "::-webkit-scrollbar": {
            width: "16px",
            height: "16px",
            background: theme.palette.background.paper,
          },
          "::-webkit-scrollbar-thumb": {
            background: theme.palette.divider,
            borderRadius: "8px",
            border: `4px solid ${theme.palette.background.paper}`,
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.text.secondary,
          },
        }}
      />
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
                      <Route path="/categories" element={<Categories />} />
                    </Routes>
                  </AdminLayout>
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}
