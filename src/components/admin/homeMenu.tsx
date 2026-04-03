import { mdiHome } from "@mdi/js";
import { MenuItem } from "@mui/material";
import CustomMenu from "../custom/customMenu";
import { Link } from "react-router";
import { useState } from "react";
import CustomIconButton from "../custom/customIconButton";

export default function HomeMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
