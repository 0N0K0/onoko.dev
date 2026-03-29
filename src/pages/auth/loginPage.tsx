import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";
import ResponsiveTitle from "../../components/custom/responsiveTitle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PasswordField from "../../components/custom/passwordField";
import ResetPasswordLink from "../../components/resetPasswordLink";
import { useAuth } from "../../hooks/useAuth";
import CustomSnackbar from "../../components/custom/customSnackBar";
import AuthLayout from "../../layout/auth/authLayout";

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
    <AuthLayout component="form" onSubmit={handleSubmit}>
      {error && <CustomSnackbar open={true} message={error} severity="error" />}
      <ResponsiveTitle
        variant="h5"
        textAlign="center"
        component="h1"
        width="100%"
      >
        Accéder à l'espace Administrateur
      </ResponsiveTitle>
      <ResponsiveStack rowGap={3} width="100%">
        <TextField
          label="Identifiant"
          fullWidth
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
      <ResponsiveStack rowGap={3} width="100%" alignItems="end">
        <ResponsiveStack direction="row" rowGap={2} columnGap={2} width="100%">
          <Button
            variant="text"
            color="primary"
            fullWidth
            sx={{ textWrap: "nowrap" }}
            component={RouterLink}
            to="/"
            disabled={loading}
          >
            Revenir au site
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={loading || !login || !password}
          >
            {loading ? "Connexion..." : "Me connecter"}
          </Button>
        </ResponsiveStack>
        <ResetPasswordLink />
      </ResponsiveStack>
    </AuthLayout>
  );
}
