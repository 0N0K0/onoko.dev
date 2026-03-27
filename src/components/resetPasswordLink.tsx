import { Link } from "@mui/material";
import ResponsiveBodyTypography from "./responsiveBodyTypography";

export default function ResetPasswordLink() {
  return (
    <ResponsiveBodyTypography variant="bodyXs">
      Mot de passe oublié ?{" "}
      <Link href="/request-reset-password">Réinitialiser mon mot de passe</Link>
    </ResponsiveBodyTypography>
  );
}
