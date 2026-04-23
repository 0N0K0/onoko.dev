import { useAuthContext } from "../../context/AuthContext";
import { Box, Link, useTheme, Toolbar, AppBar } from "@mui/material";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import { useLocation } from "react-router-dom";

/**
 * Entête pour les pages publiques, avec des liens vers l'accueil et l'espace admin.
 * Utilisé sur les pages d'accueil, de connexion, etc.
 */
export default function PublicHeader() {
  const theme = useTheme();
  const { isAuthenticated } = useAuthContext();
  const { pathname } = useLocation();

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

  return (
    <AppBar
      position="sticky"
      sx={{ top: isAuthenticated ? "24px" : "0", paddingX: { xs: 2, md: 4 } }}
      elevation={0}
    >
      <Toolbar>
        <Link
          href="/"
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
            "&:hover": {
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
      </Toolbar>
    </AppBar>
  );
}
