import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import {
  ResponsivePaper,
  ResponsiveStack,
} from "../../components/ResponsiveLayout";
import RootPaper from "../../layout/rootPaper";
import ResponsiveTitle from "../../components/responsiveTitle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ResponsiveBodyTypography from "../../components/responsiveBodyTypography";
import { useEffect } from "react";
import PasswordField from "../../components/passwordField";
import ResetPasswordLink from "../../components/resetPasswordLink";
import { useAuth } from "../../hooks/useAuth";

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
    <RootPaper
      sx={{
        alignItems: "center",
        justifyContent: "center !important",
      }}
    >
      <ResponsivePaper
        component="form"
        onSubmit={handleSubmit}
        paddingY={3}
        rowGap={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingX: 4,
          width: "calc((100% - 15 * 16px) / 12 * 4 + 5 * 16px)", // 4 columns + 3 gaps
        }}
        elevation={1}
      >
        {error && (
          <Snackbar
            open={true}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ mt: 10 }}
          >
            <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        )}
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
            onChange={(e) => setLogin(e.target.value)}
            autoComplete="username"
            disabled={loading}
            required
          />
          <PasswordField
            label="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            errorText={error}
            required
          />
        </ResponsiveStack>
        <ResponsiveStack rowGap={3} width="100%" alignItems="end">
          <ResponsiveStack
            direction="row"
            rowGap={2}
            columnGap={2}
            width="100%"
          >
            <Button
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
      </ResponsivePaper>
    </RootPaper>
  );
}
