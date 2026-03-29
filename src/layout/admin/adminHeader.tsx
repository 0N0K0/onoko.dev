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
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <Icon path={mdiHome} size={1} />
        </IconButton>
        <CustomMenu
          id="home-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{ sx: { mt: "4px" } }}
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
