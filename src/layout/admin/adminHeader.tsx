import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import CustomDialog from "../../components/customDialog";

/**
 * Entête de l'espace admin, avec des liens vers les différentes sections et la déconnexion.
 */
export default function AdminHeader() {
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Button variant="text" color="inherit" component={Link} to="/">
            Accueil
          </Button>
          <Button variant="text" color="inherit" component={Link} to="/admin">
            Espace Admin
          </Button>
          <Button
            variant="text"
            color="inherit"
            component={Link}
            to="/admin/account"
          >
            Mon compte
          </Button>
          <Button
            variant="text"
            color="inherit"
            onClick={() => setLogoutConfirm(true)}
          >
            Me déconnecter
            {/* @TODO: show confirmation alert before logging out */}
          </Button>
        </Toolbar>
      </AppBar>
      <CustomDialog
        open={logoutConfirm}
        onClose={() => setLogoutConfirm(false)}
        title="Voulez-vous vous déconnecter ?"
        content="Vous devrez vous reconnecter pour accéder à nouveau à l'espace administrateur."
        actions={
          <>
            <Button variant="text" onClick={() => setLogoutConfirm(false)}>
              Annuler
            </Button>
            <Button component={Link} to="/logout">
              Me déconnecter
            </Button>
          </>
        }
      />
    </>
  );
}
