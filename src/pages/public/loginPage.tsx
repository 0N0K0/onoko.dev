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
import { Link as RouterLink } from "react-router-dom";
import ResponsiveBodyTypography from "../../components/responsiveBodyTypography";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword((v) => !v);

  return (
    <RootPaper
      sx={{
        alignItems: "center",
        justifyContent: "center !important",
      }}
    >
      <ResponsivePaper
        component="form"
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
          <TextField label="Identifiant" fullWidth />
          <TextField
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            fullWidth
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
            >
              Revenir au site
            </Button>
            <Button variant="contained" color="primary" fullWidth>
              Me connecter
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
