import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import AccountMenu from "../../components/accountMenu";
import { useAuth } from "../../hooks/useAuth";

/**
 * Entête pour les pages publiques, avec des liens vers l'accueil et l'espace admin.
 * Utilisé sur les pages d'accueil, de connexion, etc.
 */
export default function PublicHeader() {
  const { isAuthenticated } = useAuth();

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Button variant="text" color="inherit" component={RouterLink} to="/">
          Accueil
        </Button>
        {isAuthenticated && (
          <>
            <Button
              variant="text"
              color="inherit"
              component={RouterLink}
              to="/admin"
            >
              Espace Admin
            </Button>
            <AccountMenu />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
