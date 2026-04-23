import { Toolbar, useTheme, Box, Link, AppBar } from "@mui/material";
import ResponsiveBodyTypography from "../../components/custom/ResponsiveBodyTypography";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import { useLocation } from "react-router-dom";

/**
 * Pied de page pour les pages publiques, affichant un message de copyright.
 * Utilisé sur les pages d'accueil, de connexion, etc.
 */
export default function PublicFooter() {
  const theme = useTheme();
  const { pathname } = useLocation();

  const pages = [
    {
      label: "Scriptum",
      sublabel: "Contact",
      route: "/contact",
      disabled: true,
    },
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
      route: "/legal",
      disabled: true,
    },
  ];

  return (
    <AppBar
      component="footer"
      position="sticky"
      sx={{ top: "calc(100dvh - 48px)", paddingX: { xs: 2, md: 4 } }}
      elevation={0}
    >
      <Toolbar>
        <ResponsiveStack
          sx={{
            flexGrow: 1,
            flexDirection: "row",
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
                  lineHeight: 2,
                  fontWeight: "300",
                  borderLeft: "1px solid transparent",
                  color: isActive
                    ? theme.palette.primary.light
                    : page.disabled
                      ? theme.palette.text.disabled
                      : "inherit",
                  pointerEvents: page.disabled ? "none" : "auto",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    borderLeft: `1px solid ${theme.palette.divider}`,
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
                      padding: "8px 16px 0 4px",
                      borderLeft: `1px solid ${theme.palette.divider}`,
                      position: "absolute",
                      top: "calc(-100% + 16px)",
                      left: "-1px",
                      display: "block",
                      fontWeight: "300",
                      lineHeight: 1,
                      textWrap: "nowrap",
                      backgroundColor: "rgba(11, 12, 14, 0.8)",
                      backdropFilter: "blur(8px)",
                      borderTopRightRadius: 4,
                    }}
                  >
                    {page.sublabel}
                  </Box>
                )}
              </Link>
            );
          })}
        </ResponsiveStack>
        <ResponsiveBodyTypography
          variant="bodyXs"
          color="textSecondary"
          component="p"
        >
          &copy;2024-{new Date().getFullYear()} Onoko Tous droits réservés.
        </ResponsiveBodyTypography>
      </Toolbar>
    </AppBar>
  );
}
