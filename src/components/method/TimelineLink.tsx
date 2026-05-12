import { Link, useTheme } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";

export default function TimelineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const { isAuthenticated } = useAuthContext();
  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const y =
            el.getBoundingClientRect().top +
            window.scrollY -
            (isAuthenticated ? 180 : 132);
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }}
      sx={{
        color: theme.palette.text.primary,
        textDecoration: "none",
        display: "inline",
        backgroundImage: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.main})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "100% calc(100%)",
        backgroundSize: "0% 1px",
        transition: `color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}, background-size ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
        "&:hover": {
          color: theme.palette.primary.main,
          backgroundSize: "100% 1px",
          backgroundPosition: "0% calc(100%)",
        },
      }}
    >
      {children}
    </Link>
  );
}
