import { mdiAccount, mdiAccountCog, mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import CustomDialog from "./customDialog";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import CustomMenu from "./customMenu";

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
      <CustomMenu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { mt: "4px" } }}
      >
        <MenuItem
          component={Link}
          to="/admin/account"
          onClick={() => setAnchorEl(null)}
          selected={location.pathname === "/admin/account"}
        >
          <ListItemIcon>
            <Icon path={mdiAccountCog} size={1} />
          </ListItemIcon>
          <ListItemText>Mon compte</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setLogoutConfirm(true)}>
          <ListItemIcon>
            <Icon path={mdiLogout} size={1} />
          </ListItemIcon>
          <ListItemText>Me déconnecter</ListItemText>
        </MenuItem>
      </CustomMenu>
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
