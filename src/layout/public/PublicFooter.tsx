import { Toolbar } from "@mui/material";
import ResponsiveBodyTypography from "../../components/custom/ResponsiveBodyTypography";

/**
 * Pied de page pour les pages publiques, affichant un message de copyright.
 * Utilisé sur les pages d'accueil, de connexion, etc.
 */
export default function PublicFooter() {
  return (
    <Toolbar component="footer">
      <ResponsiveBodyTypography
        variant="bodyXs"
        color="textSecondary"
        component="p"
      >
        &copy;2026 Onoko Tous droits réservés.
      </ResponsiveBodyTypography>
    </Toolbar>
  );
}
