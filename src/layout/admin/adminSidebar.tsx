import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ResponsiveDrawer } from "../../components/custom/responsiveLayout";
import { useResponsiveWidth } from "../../hooks/useResponsiveWidth";
import Icon from "@mdi/react";
import { mdiAccountCog, mdiTag, mdiViewDashboard } from "@mdi/js";

/**
 * Sidebar pour la partie admin, affichée uniquement sur les écrans md et plus grands
 */
export default function AdminSidebar() {
  const theme = useTheme();
  const drawerWidth = useResponsiveWidth(2);
  return (
    <ResponsiveDrawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        width: drawerWidth,
        position: "fixed",
        top: theme.sizes.adminHeaderHeight,
        alignSelf: "flex-start",
        height: `calc(100vh - ${theme.sizes.adminHeaderHeight})`,
        overflowY: "auto",
        zIndex: theme.zIndex.appBar,
        "& .MuiPaper-root": {
          width: drawerWidth,
          position: "fixed",
          top: theme.sizes.adminHeaderHeight,
          height: `calc(100vh - ${theme.sizes.adminHeaderHeight})`,
          boxSizing: "border-box",
          overflowY: "auto",
          zIndex: theme.zIndex.appBar,
        },
      }}
    >
      <List component="nav">
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="/admin"
            selected={window.location.pathname === "/admin"}
            sx={{
              paddingLeft: "32px",
            }}
          >
            <ListItemIcon>
              <Icon path={mdiViewDashboard} size={1} />
            </ListItemIcon>
            <ListItemText>Tableau de bord</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="/admin/categories"
            selected={window.location.pathname === "/admin/categories"}
            sx={{
              paddingLeft: "32px",
            }}
          >
            <ListItemIcon>
              <Icon path={mdiTag} size={1} />
            </ListItemIcon>
            <ListItemText>Catégories</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="/admin/account"
            selected={window.location.pathname === "/admin/account"}
            sx={{
              paddingLeft: "32px",
            }}
          >
            <ListItemIcon>
              <Icon path={mdiAccountCog} size={1} />
            </ListItemIcon>
            <ListItemText>Mon compte</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </ResponsiveDrawer>
  );
}
