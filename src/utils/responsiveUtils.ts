import { useTheme } from "@mui/material";
import { verticalMediaQuery } from "../theme";
import type {
  GetResponsiveSxProps,
  ResponsiveSxProps,
} from "../types/responsiveTypes";

/**
 * Utilitaire pour générer des styles responsives basés sur les propriétés de marge, de padding et d'espacement entre les éléments.
 * Utilise les breakpoints et les fonctions de thème de Material-UI pour créer des styles qui s'adaptent à différentes tailles d'écran et orientations.
 * Permet de limiter les valeurs de marge, de padding et d'espacement à des maximums définis dans le thème pour éviter des espacements excessifs sur les grands écrans.
 * @param {string} props.marginY La marge verticale à appliquer, qui sera limitée par les breakpoints du thème.
 * @param {string} props.paddingY Le padding vertical à appliquer, qui sera limité par les breakpoints du thème.
 * @param {string} props.rowGap L'espacement entre les éléments (row gap) à appliquer, qui sera limité par les breakpoints du thème.
 * @returns {{ maxWidth: number; marginY: { xs: string; sm: string; md: string }; paddingY: { xs: string; sm: string; md: string }; rowGap: { xs: string; sm: string; md: string }; [key: string]: any;}} Un objet de styles responsives à appliquer aux composants.
 */
export function getResponsiveSx({
  marginY = "0px",
  paddingY = "0px",
  rowGap = "0px",
}: GetResponsiveSxProps): ResponsiveSxProps {
  const theme = useTheme();

  const maxSpacing = theme.spacing(24);
  const maxCompactSpacing = theme.spacing(18);
  const maxTightSpacing = theme.spacing(12);

  return {
    maxWidth: theme.breakpoints.values.xxl,
    marginY: {
      xs: `min(${marginY}, ${maxTightSpacing})`,
      sm: `min(${marginY}, ${maxCompactSpacing})`,
      md: `min(${marginY}, ${maxSpacing})`,
    },
    paddingY: {
      xs: `min(${paddingY}, ${maxTightSpacing})`,
      sm: `min(${paddingY}, ${maxCompactSpacing})`,
      md: `min(${paddingY}, ${maxSpacing})`,
    },
    rowGap: {
      xs: `min(${rowGap}, ${maxTightSpacing})`,
      sm: `min(${rowGap}, ${maxCompactSpacing})`,
      md: `min(${rowGap}, ${maxSpacing})`,
    },
    [verticalMediaQuery("loose", "down")]: {
      marginY: `min(${marginY}, ${maxCompactSpacing})`,
      paddingY: `min(${paddingY}, ${maxCompactSpacing})`,
      rowGap: `min(${rowGap}, ${maxCompactSpacing})`,
    },
    [verticalMediaQuery("compact", "down")]: {
      marginY: `min(${marginY}, ${maxTightSpacing})`,
      paddingY: `min(${paddingY}, ${maxTightSpacing})`,
      rowGap: `min(${rowGap}, ${maxTightSpacing})`,
    },
  };
}
