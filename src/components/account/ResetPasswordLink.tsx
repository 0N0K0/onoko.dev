import { Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

/**
 * Composant de lien pour la réinitialisation du mot de passe.
 * Affiche un message invitant l'utilisateur à réinitialiser son mot de passe en cas d'oubli.
 */
export default function ResetPasswordLink() {
  return (
    <Typography variant="bodyXs" sx={{ textAlign: "end" }}>
      Mot&nbsp;de&nbsp;passe&nbsp;oublié&nbsp;?{" "}
      <Link component={RouterLink} to="/request-reset-password">
        Réinitialiser&nbsp;mon&nbsp;mot&nbsp;de&nbsp;passe
      </Link>
    </Typography>
  );
}
