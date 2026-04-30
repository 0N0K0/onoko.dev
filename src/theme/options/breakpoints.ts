export const BREAKPOINTS = {
  values: {
    xs: 0,
    sm: 496,
    md: 720,
    lg: 1056,
    xl: 1392,
    xxl: 1920,
  },
};

// Breakpoints verticaux basés sur la hauteur de l'écran, en complément des breakpoints horizontaux classiques.
export const VERTICAL_BREAKPOINTS = {
  tight: 0,
  compact: 552,
  loose: 792,
};

/**
 * Fonction utilitaire pour générer des media queries basées sur la hauteur de l'écran.
 * Permet de créer des breakpoints verticaux pour adapter le design en fonction de la hauteur de l'écran, en complément des breakpoints horizontaux classiques.
 * Utilise les valeurs définies dans VERTICAL_BREAKPOINTS pour générer des media queries "up" (min-height) ou "down" (max-height).
 * @param {keyof typeof VERTICAL_BREAKPOINTS} key Le nom du breakpoint vertical à utiliser (tight, compact, loose).
 * @param {"up" | "down"} direction La direction de la media query, soit "up" pour min-height, soit "down" pour max-height. Par défaut, "up".
 * @returns {string} La media query CSS correspondante à appliquer dans les styles.
 */
export const verticalMediaQuery = (
  key: keyof typeof VERTICAL_BREAKPOINTS,
  direction: "up" | "down" = "up",
): string => {
  const px = VERTICAL_BREAKPOINTS[key];
  if (direction === "up") {
    return `@media (min-height:${px}px)`;
  } else {
    return `@media (max-height:${px - 0.05}px)`;
  }
};
