import { useTheme } from "@mui/material";
import { useWindowWidth } from "./useWindowWidth";

/**
 * Hook personnalisé pour obtenir la largeur responsive d'une colonne basée sur le thème et les breakpoints actifs.
 * Utilise les fonctions de thème de Material-UI pour déterminer la largeur appropriée en fonction des breakpoints horizontaux actifs, en s'assurant que la largeur ne dépasse pas les limites définies dans le thème pour chaque breakpoint.
 * Permet d'obtenir une largeur de colonne qui s'adapte à différentes tailles d'écran et orientations, en utilisant les valeurs définies dans le thème pour les colonnes responsives.
 * @param {number} n Le nombre de colonnes à utiliser pour calculer la largeur responsive (par exemple, 2 pour une largeur de 2 colonnes).
 * @returns {string | undefined} La largeur responsive calculée en fonction des breakpoints actifs et des valeurs définies dans le thème.
 */
export function useResponsiveWidth(n: number): string | undefined {
  const theme = useTheme();
  const width = useWindowWidth(); // ou utilise un hook pour suivre la largeur

  const breakpoints = theme.breakpoints.values;
  let active: keyof typeof breakpoints = "xs";
  if (width >= breakpoints.xxl) active = "xxl";
  else if (width >= breakpoints.xl) active = "xl";
  else if (width >= breakpoints.lg) active = "lg";
  else if (width >= breakpoints.md) active = "md";
  else if (width >= breakpoints.sm) active = "sm";
  else active = "xs";

  const key = `${n}col` as keyof typeof theme.sizes;
  const value = theme.sizes[key];
  if (value && typeof value === "object" && active in value) {
    return value[active];
  }
  return undefined;
}
