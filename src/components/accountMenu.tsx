import { mdiAccount, mdiAccountCog, mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
} from "@mui/material";
import CustomDialog from "./custom/customDialog";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import CustomMenu from "./custom/customMenu";
import ResponsiveBodyTypography from "./custom/responsiveBodyTypography";
import { useAuth } from "../hooks/useAuth";
import { ResponsiveStack } from "./custom/responsiveLayout";

export default function AccountMenu() {
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleCloseDialog = () => {
    setLogoutConfirm(false);
    setAnchorEl(null);
  };
  const location = useLocation();
  const { user } = useAuth();

  return (
    <ResponsiveStack direction="row" spacing={1}>
      <ResponsiveBodyTypography variant="bodyXs" color="textSecondary">
        Bonjour {user} !
      </ResponsiveBodyTypography>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="inherit"
        size="adminMenu"
      >
        <Icon path={mdiAccount} size="1rem" />
      </IconButton>
      <CustomMenu
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
            <Button
              variant="text"
              onClick={handleCloseDialog}
              sx={{ flex: "1 1 208px" }}
            >
              Annuler
            </Button>
            <Button
              component={Link}
              to="/logout"
              onClick={handleCloseDialog}
              sx={{ flex: "1 1 208px" }}
            >
              Me déconnecter
            </Button>
          </>
        }
      />
    </ResponsiveStack>
  );
}
