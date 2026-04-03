import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountMenu from "../../components/account/accountMenu";
import HomeMenu from "../../components/admin/homeMenu";
import {
  mdiAccountHardHat,
  mdiApplicationArrayOutline,
  mdiHardHat,
  mdiTag,
} from "@mdi/js";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";
import CustomIconButton from "../../components/custom/customIconButton";

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
          <CustomIconButton
            size="adminMenu"
            href="/admin/stacks"
            icon={mdiApplicationArrayOutline}
            iconSize="1rem"
          />
          <CustomIconButton
            size="adminMenu"
            href="/admin/coworkers"
            icon={mdiAccountHardHat}
            iconSize="1rem"
          />
          <CustomIconButton
            size="adminMenu"
            href="/admin/roles"
            icon={mdiHardHat}
            iconSize="1rem"
          />
          <CustomIconButton
            size="adminMenu"
            href="/admin/categories"
            icon={mdiTag}
            iconSize="1rem"
          />
        </ResponsiveStack>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
