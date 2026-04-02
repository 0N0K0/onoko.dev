import { mdiHome } from "@mdi/js";
import Icon from "@mdi/react";
import { IconButton, MenuItem } from "@mui/material";
import CustomMenu from "../custom/customMenu";
import { Link } from "react-router";
import { useState } from "react";

export default function HomeMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  return (
    <>
      <IconButton
        size="adminMenu"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="inherit"
      >
        <Icon path={mdiHome} size="1rem" />
      </IconButton>
      <CustomMenu
        id="home-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          component={Link}
          to="/"
          onClick={() => setAnchorEl(null)}
          selected={location.pathname === "/"}
        >
          Site
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin"
          onClick={() => setAnchorEl(null)}
          selected={location.pathname === "/admin"}
        >
          Tableau de bord
        </MenuItem>
      </CustomMenu>
    </>
  );
}
