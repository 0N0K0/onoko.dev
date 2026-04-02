import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountMenu from "../../components/account/accountMenu";
import HomeMenu from "../../components/admin/homeMenu";
import { IconButton } from "@mui/material";
import Icon from "@mdi/react";
import { mdiTag } from "@mdi/js";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";

/**
 * Entête de l'espace admin, avec des liens vers les différentes sections et la déconnexion.
 */
export default function AdminHeader() {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar
        sx={{ minHeight: "0px !important", justifyContent: "space-between" }}
      >
        <ResponsiveStack direction="row" alignItems="center" spacing={1}>
          <HomeMenu />
          <IconButton size="adminMenu" href="/admin/categories">
            <Icon path={mdiTag} size="1rem" />
          </IconButton>
        </ResponsiveStack>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
