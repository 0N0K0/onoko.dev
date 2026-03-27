import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Link,
} from "@mui/material";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiEyeOff, mdiEye } from "@mdi/js";
import {
  ResponsivePaper,
  ResponsiveStack,
} from "../../components/ResponsiveLayout";
import RootPaper from "../../layout/rootPaper";
import ResponsiveTitle from "../../components/responsiveTitle";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ResponsiveBodyTypography from "../../components/responsiveBodyTypography";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import PasswordField from "../../components/passwordField";
import ResetPasswordLink from "../../components/resetPasswordLink";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login: loginContext, loading, isAuthenticated } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setRedirecting(true);
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleTogglePassword = () => setShowPassword((v) => !v);

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
        {error && (
          <ResponsiveBodyTypography
            variant="bodyXs"
            color="error"
            textAlign="center"
          >
            {error}
          </ResponsiveBodyTypography>
        )}
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
