import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import CustomDialog from "./customDialog";
import { Link, useLocation } from "react-router";
import { useState } from "react";

export default function AccountMenu() {
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleCloseDialog = () => {
    setLogoutConfirm(false);
    setAnchorEl(null);
  };
  const location = useLocation();

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
        <Icon path={mdiAccount} size={1} />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          component={Link}
          to="/admin/account"
          onClick={() => setAnchorEl(null)}
          selected={location.pathname === "/admin/account"}
        >
          Mon compte
        </MenuItem>
        <MenuItem onClick={() => setLogoutConfirm(true)}>
          Me déconnecter
        </MenuItem>
      </Menu>
      <CustomDialog
        open={logoutConfirm}
        onClose={handleCloseDialog}
        title="Voulez-vous vous déconnecter ?"
        content="Vous devrez vous reconnecter pour accéder à nouveau à l'espace administrateur."
        actions={
          <>
            <Button variant="text" onClick={handleCloseDialog}>
              Annuler
            </Button>
            <Button component={Link} to="/logout" onClick={handleCloseDialog}>
              Me déconnecter
            </Button>
          </>
        }
      />
    </>
  );
}
