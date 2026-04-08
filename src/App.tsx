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
import { CategoryProvider } from "./context/CategoryContext";
import Stacks from "./pages/admin/stackPage";
import Coworkers from "./pages/admin/coworkerPage";
import Roles from "./pages/admin/rolePage";
import { RoleProvider } from "./context/RoleContext";
// import Projects from "./pages/admin/project/projectsPages";
// import ProjectForm from "./pages/admin/project/projectFormPage";
// import { ProjectProvider } from "./context/ProjectContext";
import { MediaProvider } from "./context/MediaContext";
import Media from "./pages/admin/mediaPage";

export default function App() {
  const theme = useTheme();
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
          },
          "::-webkit-scrollbar-corner": {
            background: theme.palette.background.paper,
          },
        }}
      />
      <Router>
        <AuthProvider>
          <MediaProvider>
            <CategoryProvider>
              <RoleProvider>
                {/* <ProjectProvider> */}
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
                            <Route
                              path="/categories"
                              element={<Categories />}
                            />
                            <Route path="/stacks" element={<Stacks />} />
                            <Route path="/roles" element={<Roles />} />
                            <Route path="/coworkers" element={<Coworkers />} />
                            <Route path="/medias" element={<Media />} />
                            {/* <Route path="/projects" element={<Projects />} />
                              <Route
                                path="/project"
                                element={<ProjectForm />}
                              /> */}
                          </Routes>
                        </AdminLayout>
                      </RequireAuth>
                    }
                  />
                </Routes>
                {/* </ProjectProvider> */}
              </RoleProvider>
            </CategoryProvider>
          </MediaProvider>
        </AuthProvider>
      </Router>
    </>
  );
}
