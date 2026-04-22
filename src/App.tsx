import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/public/HomePage";
import PublicLayout from "./layout/public/PublicLayout";
import AdminLayout from "./layout/admin/AdminLayout";
import Dashboard from "./pages/admin/DashboardPage";
import Account from "./pages/admin/AccountPage";
import Login from "./pages/auth/LoginPage";
import RequestResetPassword from "./pages/auth/RequestResetPasswordPage";
import ResetPassword from "./pages/auth/ResetPasswordPage";
import LogoutPage from "./pages/auth/LogoutPage";
import RequireAuth from "./pages/admin/RequireAuth";
import { LOGIN_ROUTE } from "./constants/apiConstants";
import { AuthProvider } from "./context/AuthContext";
import Categories from "./pages/admin/CategoriesPage";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import Stacks from "./pages/admin/StackPage";
import Coworkers from "./pages/admin/CoworkerPage";
import Roles from "./pages/admin/RolePage";
import Media from "./pages/admin/MediaPage";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "./services/appolloClient";
import Projects from "./pages/admin/ProjectsPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import theme, { frontTheme } from "./theme/theme";
import AuthLayout from "./layout/auth/AuthLayout";

export default function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          "::-webkit-scrollbar": {
            width: "16px",
            height: "16px",
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            background: theme.palette.divider,
            borderRadius: "8px",
            border: `4px solid transparent`,
            backgroundClip: "content-box",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.text.secondary,
            backgroundClip: "content-box",
          },
          "::-webkit-scrollbar-corner": {
            background: "transparent",
          },
        }}
      />
      <Router>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
              <Routes>
                {/* Routes front (public + auth) — theme League Spartan */}
                <Route
                  element={
                    <ThemeProvider theme={frontTheme}>
                      <CssBaseline />
                      <Outlet />
                    </ThemeProvider>
                  }
                >
                  <Route
                    path="/"
                    element={
                      <PublicLayout>
                        <Home />
                      </PublicLayout>
                    }
                  />
                  <Route
                    path={`/${LOGIN_ROUTE}`}
                    element={
                      <AuthLayout>
                        <Login />
                      </AuthLayout>
                    }
                  />
                  <Route
                    path="/logout"
                    element={
                      <AuthLayout>
                        <LogoutPage />
                      </AuthLayout>
                    }
                  />
                  <Route
                    path="/request-reset-password"
                    element={
                      <AuthLayout>
                        <RequestResetPassword />
                      </AuthLayout>
                    }
                  />
                  <Route
                    path="/reset-password"
                    element={
                      <AuthLayout>
                        <ResetPassword />
                      </AuthLayout>
                    }
                  />
                </Route>

                {/* Routes admin */}
                <Route
                  path="/admin/*"
                  element={
                    <ThemeProvider theme={theme}>
                      <CssBaseline />
                      <RequireAuth>
                        <AdminLayout>
                          <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/account" element={<Account />} />
                            <Route
                              path="/categories"
                              element={<Categories />}
                            />
                            <Route path="/stacks" element={<Stacks />} />
                            <Route path="/roles" element={<Roles />} />
                            <Route path="/coworkers" element={<Coworkers />} />
                            <Route path="/medias" element={<Media />} />
                            <Route path="/projects" element={<Projects />} />
                          </Routes>
                        </AdminLayout>
                      </RequireAuth>
                    </ThemeProvider>
                  }
                />
              </Routes>
            </LocalizationProvider>
          </AuthProvider>
        </ApolloProvider>
      </Router>
    </>
  );
}
