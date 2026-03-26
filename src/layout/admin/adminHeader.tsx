import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function AdminHeader() {
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
