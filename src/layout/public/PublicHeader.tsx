import { useAuthContext } from "../../context/AuthContext";
import {
  Box,
  Link,
  useTheme,
  Toolbar,
  AppBar,
  Menu,
  MenuItem,
} from "@mui/material";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useBreakpoints, useCanHover } from "../../hooks/mediaQueries";
import CustomIconButton from "../../components/custom/CustomIconButton";
import { mdiClose, mdiMenu } from "@mdi/js";
import { useEffect, useState } from "react";

/**
 * Entête pour les pages publiques, avec des liens vers l'accueil et l'espace admin.
 * Utilisé sur les pages d'accueil, de connexion, etc.
 */
export default function PublicHeader() {
  const maintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  const theme = useTheme();
  const { isSm } = useBreakpoints();
  const canHover = useCanHover();

  const { isAuthenticated } = useAuthContext();
  const { pathname } = useLocation();

  const [isLogoOpen, setIsLogoOpen] = useState(!canHover);
  useEffect(() => {
    setTimeout(() => {
      setIsLogoOpen(false);
    }, 900);
  }, [canHover]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pages = [
    {
      label: "Opera",
      sublabel: "Réalisations",
      route: "/projects",
      disabled: false,
    },
    { label: "Exerceo", sublabel: "Méthode", route: "/method", disabled: true },
    { label: "Pretium", sublabel: "Tarifs", route: "/pricing", disabled: true },
  ];
  if (!isSm) {
    pages.unshift({
      label: "Receptio",
      sublabel: "Accueil",
      route: "/",
      disabled: false,
    });
    pages.push(
      { label: "Ego", sublabel: "A propos", route: "/about", disabled: true },
      {
        label: "Musae",
        sublabel: "Inspirations",
        route: "/inspirations",
        disabled: true,
      },
      {
        label: "Legalis",
        sublabel: "Mentions légales",
        route: "/legal-notice",
        disabled: false,
      },
    );
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        top: isAuthenticated ? "48px" : "0",
        paddingX: { xs: 4, lg: 8 },
        maxWidth: "1920px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link
          href="/"
          className={isLogoOpen ? "open" : "collapsed"}
          underline="none"
          color="inherit"
          sx={{
            fontSize: "1.5rem",
            lineHeight: 1,
            transform: "translateX(-24px)",
            display: "flex",
            fontWeight: "300",
            "& span": { display: "inline-block" },
            "& .hide": {
              opacity: 0,
              transition:
                "transform 900ms ease-in-out, opacity 600ms ease-in-out",
              "&.left": { transform: "translateX(33.62px)" },
              "&.right": { transform: "translateX(-29.5px)" },
            },
            "& .show": {
              zIndex: 4,
              transition: "transform 900ms ease-in-out",
              "&.left": { transform: "translateX(8.67px)" },
              "&.right": { transform: "translateX(-8.67px)" },
            },
            "&:hover, &.open": {
              "& .hide": {
                opacity: 1,
                transition: "opacity 600ms ease-in-out 300ms",
                "&.left, &.right": {
                  transform: "translateX(0)",
                  transition:
                    "transform 900ms ease-in-out, opacity 600ms ease-in-out 300ms",
                },
              },
              "& .show.left, & .show.right": {
                transform: "translateX(0)",
              },
            },
          }}
        >
          <span className="hide left">O</span>
          <span className="show left">N</span>
          <span className="hide">O</span>
          <span className="show right">K</span>
          <span className="hide right">O</span>
        </Link>
        {isSm && !maintenanceMode ? (
          <ResponsiveStack
            sx={{
              flexGrow: 1,
              flexDirection: "row",
              justifyContent: "end",
              columnGap: 3,
            }}
          >
            {pages.map((page) => {
              const isActive = pathname === page.route;
              return (
                <Link
                  key={page.label}
                  href={page.disabled ? undefined : page.route}
                  underline="none"
                  color="inherit"
                  sx={{
                    paddingX: "4px",
                    position: "relative",
                    fontSize: "1.5rem",
                    fontWeight: "300",
                    borderRight: "1px solid transparent",
                    color: isActive
                      ? theme.palette.primary.light
                      : page.disabled
                        ? theme.palette.text.disabled
                        : "inherit",
                    pointerEvents: page.disabled ? "none" : "auto",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      borderRight: `1px solid ${theme.palette.divider}`,
                      "& span": { opacity: 1 },
                    },
                    "& span": {
                      display: "block",
                      opacity: 0,
                      transition: "all 300ms ease-in-out",
                    },
                  }}
                >
                  {page.label}
                  {page.sublabel && (
                    <Box
                      component="span"
                      sx={{
                        color: theme.palette.text.primary,
                        padding: "0 4px 6px 16px",
                        borderRight: `1px solid ${theme.palette.divider}`,
                        position: "absolute",
                        top: "100%",
                        right: "-1px",
                        display: "block",
                        fontWeight: "300",
                        lineHeight: 1,
                        textWrap: "nowrap",
                        backgroundColor: "rgba(11, 12, 14, 0.8)",
                        backdropFilter: "blur(8px)",
                        borderBottomLeftRadius: 4,
                      }}
                    >
                      {page.sublabel}
                    </Box>
                  )}
                </Link>
              );
            })}
          </ResponsiveStack>
        ) : !maintenanceMode ? (
          <>
            <CustomIconButton
              icon={open ? mdiClose : mdiMenu}
              onClick={handleClick}
              style={{ marginRight: "-12px" }}
            />
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {pages.map((page) => {
                const isActive = pathname === page.route;
                return (
                  <MenuItem
                    key={page.label}
                    component={RouterLink}
                    to={page.disabled ? "#" : page.route}
                    onClick={handleClose}
                    selected={isActive}
                    disabled={page.disabled}
                  >
                    {page.label}{" "}
                    <span style={{ color: theme.palette.text.secondary }}>
                      | {page.sublabel}
                    </span>
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}
