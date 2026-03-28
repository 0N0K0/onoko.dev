import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomDialog from "../../components/customDialog";
import AccountMenu from "../../components/accountMenu";

/**
 * Entête de l'espace admin, avec des liens vers les différentes sections et la déconnexion.
 */
export default function AdminHeader() {
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Button variant="text" color="inherit" component={Link} to="/">
          Accueil
        </Button>
        <Button variant="text" color="inherit" component={Link} to="/admin">
          Espace Admin
        </Button>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
