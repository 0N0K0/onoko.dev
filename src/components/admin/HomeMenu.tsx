import { mdiHome } from "@mdi/js";
import { MenuItem } from "@mui/material";
import CustomMenu from "../custom/CustomMenu";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import CustomIconButton from "../custom/CustomIconButton";

export default function HomeMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { pathname } = useLocation();
  return (
    <>
      <CustomIconButton
        onClick={(e: React.MouseEvent<HTMLElement>) =>
          setAnchorEl(e.currentTarget)
        }
        color="inherit"
        icon={mdiHome}
      />
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
          selected={pathname === "/"}
        >
          Site
        </MenuItem>
        <MenuItem
          component={Link}
          to="/admin"
          onClick={() => setAnchorEl(null)}
          selected={pathname === "/admin"}
        >
          Tableau de bord
        </MenuItem>
      </CustomMenu>
    </>
  );
}
