import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

/**
 * Entête pour les pages publiques, avec des liens vers l'accueil et l'espace admin.
 * Utilisé sur les pages d'accueil, de connexion, etc.
 */
export default function PublicHeader() {
  const { isAuthenticated } = useAuthContext();

  return (
    <AppBar
      position="sticky"
      sx={{ top: isAuthenticated ? "24px" : "0" }}
      elevation={0}
    >
      <Toolbar>
        <Button variant="text" color="inherit" component={RouterLink} to="/">
          Accueil
        </Button>
      </Toolbar>
    </AppBar>
  );
}
