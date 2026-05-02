import Typography from "@mui/material/Typography";
import { verticalMediaQuery } from "../../theme/options/breakpoints";
import { useTheme } from "@mui/material";
import type { ResponsiveBodyTypographyProps } from "../../types/components/responsiveTypes";

/**
 * Composant de typographie pour le corps de texte avec une taille de police responsive.
 * La taille de la police s'adapte en fonction de la taille de l'écran, avec des limites pour éviter que le texte ne devienne trop petit ou trop grand.
 * @param {string} props.variant Le variant de typographie à utiliser (ex: "body1", "body2", etc.).
 * @param {React.ReactNode} props.children Le contenu à afficher à l'intérieur du composant.
 * @param {object} props.props Propriétés supplémentaires à passer au composant Typography.
 */
export default function ResponsiveBodyTypography({
  variant,
  children,
  ...props
}: ResponsiveBodyTypographyProps) {
  const theme = useTheme();

  return (
    <Typography
      variant={variant}
      {...props}
      sx={{
        [verticalMediaQuery("loose", "down")]: {
          fontSize: `min(${theme.typography[variant].fontSize}, ${theme.typography.bodyMd.fontSize})`,
          lineHeight: theme.typography.bodySm.lineHeight,
        },
        [verticalMediaQuery("compact", "down")]: {
          fontSize: `min(${theme.typography[variant].fontSize}, ${theme.typography.bodySm.fontSize})`,
          lineHeight: theme.typography.bodySm.lineHeight,
        },
        fontSize: {
          xs: `min(${theme.typography[variant].fontSize}, ${theme.typography.bodySm.fontSize})`,
          sm: `min(${theme.typography[variant].fontSize}, ${theme.typography.bodyMd.fontSize})`,
          md: theme.typography[variant].fontSize,
        },
        ...props.sx,
      }}
    >
      {children}
    </Typography>
  );
}
