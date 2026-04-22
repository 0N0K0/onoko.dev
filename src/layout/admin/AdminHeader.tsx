import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AccountMenu from "../../components/account/AccountMenu";
import HomeMenu from "../../components/admin/HomeMenu";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import CustomIconButton from "../../components/custom/CustomIconButton";
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
          maxWidth: "100% !important",
        }}
      >
        <ResponsiveStack
          sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
        >
          <HomeMenu />

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
