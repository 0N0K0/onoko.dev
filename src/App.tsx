import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/public/homePage";
import PublicLayout from "./layout/public/publicLayout";
import AdminLayout from "./layout/admin/adminLayout";
import Dashboard from "./pages/admin/dashboardPage";

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
        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}
