import Typography from "@mui/material/Typography";
import { verticalMediaQuery } from "../../theme/options/breakpoints";
import { useTheme } from "@mui/material";
import type { ResponsiveTitleProps } from "../../types/components/responsiveTypes";

/**
 * Composant de typographie pour les titres avec une taille de police responsive.
 * La taille de la police s'adapte en fonction de la taille de l'écran, avec des limites pour éviter que le texte ne devienne trop petit ou trop grand.
 * @param {string} props.variant Le variant de typographie à utiliser (ex: "h1", "h2", etc.).
 * @param {React.ReactNode} props.children Le contenu à afficher à l'intérieur du composant.
 * @param {object} props.props Propriétés supplémentaires à passer au composant Typography.
 */
export default function ResponsiveTitle({
  variant,
  children,
  ...props
}: ResponsiveTitleProps) {
  const theme = useTheme();

  return (
    <Typography
      variant={variant}
      {...props}
      sx={{
        fontSize: {
          xs: `min(${theme.typography[variant].fontSize}, ${theme.typography.h5.fontSize})`,
          sm: `min(${theme.typography[variant].fontSize}, ${theme.typography.h4.fontSize})`,
          md: theme.typography[variant].fontSize,
        },

        [verticalMediaQuery("loose", "down")]: {
          fontSize: `min(${theme.typography[variant].fontSize}, ${theme.typography.h4.fontSize})`,
          lineHeight: `min(${theme.typography[variant].lineHeight}, ${theme.typography.h4.lineHeight})`,
        },
        [verticalMediaQuery("compact", "down")]: {
          fontSize: `min(${theme.typography[variant].fontSize}, ${theme.typography.h5.fontSize})`,
          lineHeight: `min(${theme.typography[variant].lineHeight}, ${theme.typography.h5.lineHeight})`,
        },
      }}
    >
      {children}
    </Typography>
  );
}
