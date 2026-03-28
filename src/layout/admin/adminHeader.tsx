import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import CustomDialog from "../../components/customDialog";
import AccountMenu from "../../components/accountMenu";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Icon from "@mdi/react";
import { mdiHome } from "@mdi/js";

/**
 * Entête de l'espace admin, avec des liens vers les différentes sections et la déconnexion.
 */
export default function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <Icon path={mdiHome} size={1} />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            component={Link}
            to="/"
            onClick={() => setAnchorEl(null)}
            selected={location.pathname === "/"}
          >
            Site
          </MenuItem>
          <MenuItem
            component={Link}
            to="/admin"
            onClick={() => setAnchorEl(null)}
            selected={location.pathname === "/admin"}
          >
            Tableau de bord
          </MenuItem>
        </Menu>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
