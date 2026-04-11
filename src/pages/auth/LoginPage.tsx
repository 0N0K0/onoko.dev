import { TextField } from "@mui/material";
import { useState } from "react";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PasswordField from "../../components/custom/PasswordField";
import { useAuth } from "../../hooks/useAuth";
import SnackbarAlert from "../../components/custom/SnackbarAlert";
import AuthLayout from "../../layout/auth/AuthLayout";

/**
 * Page de connexion à l'espace admin.
 * Permet aux utilisateurs autorisés de se connecter pour accéder à l'administration du site.
 */
export default function Login() {
  const { login: loginContext, loading, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  // Redirige automatiquement vers l'espace admin si l'utilisateur est déjà authentifié, avec gestion du chargement et de la redirection.
  useEffect(() => {
    if (isAuthenticated) {
      setRedirecting(true);
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // Gère la soumission du formulaire de connexion, en appelant la fonction de login du contexte d'authentification et en gérant les erreurs éventuelles.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const ok = await loginContext(login, password);
      if (ok) {
        navigate("/admin");
      } else {
        setError("Échec de l'authentification");
      }
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
    }
  };

  if (loading || redirecting) return null;

  return (
    <AuthLayout
      title="Accéder à&nbsp;l'espace Administrateur"
      returnButton={{ to: "/", text: "Revenir au site", disabled: loading }}
      submitButton={{
        text: loading ? "Connexion..." : "Me connecter",
        disabled: loading || !login || !password,
      }}
      onSubmit={handleSubmit}
      hasResetPasswordLink
    >
      {error && <SnackbarAlert open={true} message={error} severity="error" />}
      <ResponsiveStack rowGap={3} width="100%">
        <TextField
          label="Identifiant"
          value={login}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLogin(e.target.value)
          }
          autoComplete="username"
          disabled={loading}
          required
        />
        <PasswordField
          label="Mot de passe"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          error={!!error}
          errorText={error}
          required
        />
      </ResponsiveStack>
    </AuthLayout>
  );
}
