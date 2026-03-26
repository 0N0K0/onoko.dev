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
import { loginApi } from "../../services/authService";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => setShowPassword((v) => !v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = await loginApi(login, password);
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

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
          <TextField
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={loading}
            required
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                    >
                      {showPassword ? (
                        <Icon path={mdiEyeOff} size={1} />
                      ) : (
                        <Icon path={mdiEye} size={1} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
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
          <ResponsiveBodyTypography variant="bodyXs">
            Mot de passe oublié ?{" "}
            <Link href="/reset-password">Réinitialiser mon mot de passe</Link>
          </ResponsiveBodyTypography>
        </ResponsiveStack>
      </ResponsivePaper>
    </RootPaper>
  );
}
