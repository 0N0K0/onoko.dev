import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import AccountMenu from "../../components/accountMenu";
import { IconButton, MenuItem } from "@mui/material";
import Icon from "@mdi/react";
import { mdiHome } from "@mdi/js";
import CustomMenu from "../../components/customMenu";

/**
 * Entête de l'espace admin, avec des liens vers les différentes sections et la déconnexion.
 */
export default function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar
        sx={{ minHeight: "0px !important", justifyContent: "space-between" }}
      >
        <IconButton
          size="adminMenu"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <Icon path={mdiHome} size="1rem" />
        </IconButton>
        <CustomMenu
          id="home-menu"
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
        </CustomMenu>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
