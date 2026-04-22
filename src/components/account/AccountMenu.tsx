import { mdiAccount, mdiAccountCog, mdiLogout } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CustomDialog from "../custom/CustomDialog";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import CustomMenu from "../custom/CustomMenu";
import ResponsiveBodyTypography from "../custom/ResponsiveBodyTypography";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import CustomIconButton from "../custom/CustomIconButton";
import { useAuthContext } from "../../context/AuthContext";

export default function AccountMenu() {
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleCloseDialog = () => {
    setLogoutConfirm(false);
    setAnchorEl(null);
  };
  const location = useLocation();
  const { user } = useAuthContext();

  return (
    <ResponsiveStack
      sx={{ flexDirection: "row", spacing: 1, alignItems: "center" }}
    >
      <ResponsiveBodyTypography variant="bodySm" color="textSecondary">
        Bonjour {user} !
      </ResponsiveBodyTypography>
      <CustomIconButton
        icon={mdiAccount}
        onClick={(e: React.MouseEvent<HTMLElement>) =>
          setAnchorEl(e.currentTarget)
        }
        color="inherit"
      />
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
        title="Voulez-vous vous&nbsp;déconnecter ?"
        titlePaddingBottom="0px"
        content="Vous devrez vous reconnecter pour accéder à nouveau à l'espace administrateur."
        actions={
          <>
            <Button
              variant="text"
              onClick={handleCloseDialog}
              sx={{ flex: "1 1 auto" }}
            >
              Annuler
            </Button>
            <Button
              component={Link}
              to="/logout"
              onClick={handleCloseDialog}
              sx={{ flex: "1 1 auto" }}
            >
              Me déconnecter
            </Button>
          </>
        }
      />
    </ResponsiveStack>
  );
}
