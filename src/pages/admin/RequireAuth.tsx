import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

/**
 * Composant de protection des routes de l'espace admin. Redirige vers la page de login si l'utilisateur n'est pas authentifié.
 * Vérifie le token à chaque navigation pour assurer la sécurité.
 */
export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const { isAuthenticated, loading, checkAuth } = useAuth();

  // Vérifie l'authentification à chaque changement de route pour s'assurer que l'utilisateur est toujours authentifié.
  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  if (loading) return null;
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
