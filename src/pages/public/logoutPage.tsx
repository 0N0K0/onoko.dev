import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
