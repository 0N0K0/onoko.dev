import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ResponsiveDrawer } from "../../components/custom/responsiveLayout";
import { useResponsiveWidth } from "../../hooks/useResponsiveWidth";
import Icon from "@mdi/react";
import { mdiAccountCog, mdiTag, mdiViewDashboard } from "@mdi/js";

export default function AdminSidebar() {
  const drawerWidth = useResponsiveWidth(2);
  return (
    <ResponsiveDrawer
      variant="permanent"
      open={true}
      sx={{
        display: { xs: "none", md: "block" },
        width: drawerWidth,
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        "& .MuiPaper-root": {
          width: drawerWidth,
          position: "relative",
          height: "100vh",
          boxSizing: "border-box",
          overflowY: "auto",
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
