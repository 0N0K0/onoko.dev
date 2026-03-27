import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

/**
 * Entête pour les pages publiques, avec des liens vers l'accueil et l'espace admin.
 * Utilisé sur les pages d'accueil, de connexion, etc.
 */
export default function PublicHeader() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          Accueil
        </Button>
        <Button color="inherit" component={RouterLink} to="/admin">
          Espace Admin
        </Button>
      </Toolbar>
    </AppBar>
  );
}
