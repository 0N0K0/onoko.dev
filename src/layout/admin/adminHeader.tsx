import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

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
      </Toolbar>
    </AppBar>
  );
}
