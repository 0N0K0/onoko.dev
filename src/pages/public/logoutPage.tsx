import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Page de déconnexion. Supprime les tokens d'authentification et redirige vers la page d'accueil.
 * Utilisée pour permettre aux utilisateurs de se déconnecter proprement de l'application.
 */
export default function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    // TODO: Ajouter ici la suppression de cookies si besoin
    navigate("/", { replace: true });
  }, [navigate]);
  return null;
}
