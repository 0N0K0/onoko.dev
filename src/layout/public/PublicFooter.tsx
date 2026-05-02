import {
  Toolbar,
  useTheme,
  Box,
  Link,
  AppBar,
  Typography,
} from "@mui/material";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import { useLocation } from "react-router-dom";
import CustomIconButton from "../../components/custom/CustomIconButton";
import { mdiEmail, mdiGithub, mdiLinkedin } from "@mdi/js";
import { useBreakpoints } from "../../hooks/mediaQueries";

/**
 * Pied de page pour les pages publiques, affichant un message de copyright.
 * Utilisé sur les pages d'accueil, de connexion, etc.
 */
export default function PublicFooter() {
  const theme = useTheme();
  const { isSm } = useBreakpoints();
  const { pathname } = useLocation();

  const pages = [
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
      sx={{
        maxWidth: "1920px",
        top: "auto",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        paddingX: { xs: 4, lg: 8 },
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          width: "100%",
          justifyContent: isSm ? "space-between" : "flex-end",
          alignItems: "end",
          flexWrap: "wrap",
          columnGap: 4,
        }}
      >
        {isSm && (
          <ResponsiveStack
            sx={{
              flexDirection: "row",
              columnGap: 3,
              marginRight: "auto",
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
                    marginLeft: "-4px",
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
        )}
        <ResponsiveStack direction="row" sx={{ marginX: "-12px" }}>
          <CustomIconButton icon={mdiEmail} disabled />
          <CustomIconButton
            icon={mdiGithub}
            component="a"
            href="https://github.com/Noemie-Koelblen"
          />
          <CustomIconButton icon={mdiLinkedin} />
        </ResponsiveStack>
        <Typography
          variant="bodyXs"
          color="textSecondary"
          component="p"
          sx={{
            lineHeight: "24px !important",
            marginLeft: "auto",
            marginRight: { xs: "-24px", lg: "-56px" },
          }}
        >
          &copy;2024-{new Date().getFullYear()} Onoko Tous droits réservés.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
