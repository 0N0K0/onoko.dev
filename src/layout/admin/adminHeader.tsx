import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

/**
 * Entête de l'espace admin, avec des liens vers les différentes sections et la déconnexion.
 */
export default function AdminHeader() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Accueil
        </Button>
        <Button color="inherit" component={Link} to="/admin">
          Espace Admin
        </Button>
        <Button color="inherit" component={Link} to="/admin/account">
          Mon compte
        </Button>
        <Button color="inherit" component={Link} to="/logout">
          Me déconnecter
          {/* @TODO: show confirmation alert before logging out */}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
