import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

/**
 * Page de déconnexion. Supprime les tokens d'authentification et redirige vers la page d'accueil.
 * Utilisée pour permettre aux utilisateurs de se déconnecter proprement de l'application.
 */
export default function LogoutPage() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/", { replace: true });
  }, [logout]);

  return null;
}
