import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountMenu from "../../components/account/accountMenu";
import HomeMenu from "../../components/admin/homeMenu";
import { mdiApplicationArrayOutline } from "@mdi/js";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";
import CustomIconButton from "../../components/custom/customIconButton";
import { ADMIN_MENU_LINKS } from "../../constants/adminLayoutConstants";

/**
 * Entête de l'espace admin, avec des liens vers les différentes sections et la déconnexion.
 */
export default function AdminHeader() {
  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar
        sx={{
          paddingX: "20px !important",
          minHeight: "0px !important",
          justifyContent: "space-between",
        }}
      >
        <ResponsiveStack direction="row" alignItems="center" spacing={1}>
          <HomeMenu />

          <CustomIconButton
            href="/admin/stacks"
            icon={mdiApplicationArrayOutline}
          />
          {Object.entries(ADMIN_MENU_LINKS)
            .filter(([path]) => path !== "/admin" && path !== "/admin/account")
            .map(([path, { icon }]) => (
              <CustomIconButton key={path} href={path} icon={icon} />
            ))}
        </ResponsiveStack>
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
