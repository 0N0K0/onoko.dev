import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const { isAuthenticated, loading, checkAuth } = useAuth();
  useEffect(() => {
    // Vérifie le token à chaque navigation
    checkAuth();
    // eslint-disable-next-line
  }, [location.pathname]);
  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
