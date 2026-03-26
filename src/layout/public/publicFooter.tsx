import { Toolbar } from "@mui/material";
import ResponsiveBodyTypography from "../../components/responsiveBodyTypography";

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
