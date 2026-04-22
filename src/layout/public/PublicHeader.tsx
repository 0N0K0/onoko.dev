import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "@mui/material";

/**
 * Entête pour les pages publiques, avec des liens vers l'accueil et l'espace admin.
 * Utilisé sur les pages d'accueil, de connexion, etc.
 */
export default function PublicHeader() {
  const { isAuthenticated } = useAuthContext();

  return (
    <AppBar
      position="sticky"
      sx={{ top: isAuthenticated ? "24px" : "0" }}
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
            transform: "translateX(-28.44px)",
            display: "flex",
            fontWeight: "300",
            "& span": { display: "inline-block" },
            "& .hide": {
              opacity: 0,
              transition: "transform 1s ease-in-out, opacity 0.67s ease-in-out",
              "&.left": { transform: "translateX(33.62px)" },
              "&.right": { transform: "translateX(-29.5px)" },
            },
            "& .show": {
              zIndex: 4,
              transition: "transform 1s ease-in-out",
              "&.left": { transform: "translateX(8.67px)" },
              "&.right": { transform: "translateX(-8.67px)" },
            },
            "&:hover": {
              "& .hide": {
                opacity: 1,
                transition: "opacity 0.67s ease-in-out 0.33s",
                "&.left, &.right": {
                  transform: "translateX(0)",
                  transition:
                    "transform 1s ease-in-out, opacity 0.67s ease-in-out 0.33s",
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
      </Toolbar>
    </AppBar>
  );
}
