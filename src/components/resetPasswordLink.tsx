import { Link } from "@mui/material";
import ResponsiveBodyTypography from "./responsiveBodyTypography";

/**
 * Composant de lien pour la réinitialisation du mot de passe.
 * Affiche un message invitant l'utilisateur à réinitialiser son mot de passe en cas d'oubli.
 */
export default function ResetPasswordLink() {
  return (
    <ResponsiveBodyTypography variant="bodyXs">
      Mot de passe oublié ?{" "}
      <Link href="/request-reset-password">Réinitialiser mon mot de passe</Link>
    </ResponsiveBodyTypography>
  );
}
