import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ResponsiveDrawer } from "../../components/custom/ResponsiveLayout";
import { useResponsiveWidth } from "../../hooks/layout/useResponsiveWidth";
import Icon from "@mdi/react";
import { ADMIN_MENU_LINKS } from "../../constants/adminLayoutConstants";

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
        {Object.entries(ADMIN_MENU_LINKS).map(([path, { icon, label }]) => (
          <ListItem disablePadding key={path}>
            <ListItemButton
              component="a"
              href={path}
              selected={window.location.pathname === path}
              sx={{
                paddingLeft: "32px",
              }}
            >
              <ListItemIcon>
                <Icon path={icon} size={1} />
              </ListItemIcon>
              <ListItemText>{label}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </ResponsiveDrawer>
  );
}
