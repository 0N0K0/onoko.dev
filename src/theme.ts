import { createTheme, type Theme } from "@mui/material/styles";

// Breakpoints verticaux basés sur la hauteur de l'écran, en complément des breakpoints horizontaux classiques.
const verticalBreakpoints = {
  tight: 0,
  compact: 552,
  loose: 792,
};

/**
 * Fonction utilitaire pour générer des media queries basées sur la hauteur de l'écran.
 * Permet de créer des breakpoints verticaux pour adapter le design en fonction de la hauteur de l'écran, en complément des breakpoints horizontaux classiques.
 * Utilise les valeurs définies dans verticalBreakpoints pour générer des media queries "up" (min-height) ou "down" (max-height).
 * @param {keyof typeof verticalBreakpoints} key Le nom du breakpoint vertical à utiliser (tight, compact, loose).
 * @param {"up" | "down"} direction La direction de la media query, soit "up" pour min-height, soit "down" pour max-height. Par défaut, "up".
 * @returns {string} La media query CSS correspondante à appliquer dans les styles.
 */
export const verticalMediaQuery = (
  key: keyof typeof verticalBreakpoints,
  direction: "up" | "down" = "up",
): string => {
  const px = verticalBreakpoints[key];
  if (direction === "up") {
    return `@media (min-height:${px}px)`;
  } else {
    return `@media (max-height:${px - 0.05}px)`;
  }
};

// Thème personnalisé pour l'application, basé sur le thème sombre de Material-UI avec des couleurs et des typographies adaptées.
const baseTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0B0C0E",
      paper: "#0B0C0E",
    },
    grey: {
      50: "#F1F1F4",
      100: "#E3E4E8",
      200: "#C7C9D1",
      300: "#ABAEBA",
      400: "#8F93A3",
      500: "#73788C",
      600: "#5C6070",
      700: "#454854",
      800: "#2E3038",
      900: "#17181C",
    },
  },
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    h1: { fontSize: "5rem", lineHeight: 1.2 },
    h2: { fontSize: "4rem", lineHeight: 1.125 },
    h3: { fontSize: "3rem", lineHeight: 1 },
    h4: { fontSize: "2.5rem", lineHeight: 1.2 },
    h5: { fontSize: "2rem", lineHeight: 1.5 },
    h6: { fontSize: "1.5rem", lineHeight: 1 },
    bodyLg: { fontSize: "2rem", lineHeight: 1.5 },
    bodyMd: { fontSize: "1.25rem", lineHeight: 1.2 },
    bodySm: { fontSize: "1rem", lineHeight: 1.5 },
    bodyXs: { fontSize: "0.75rem", lineHeight: 2 },
  },
  shape: {
    borderRadius: "8px",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 496,
      md: 720,
      lg: 1056,
      xl: 1392,
      xxl: 1920,
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: "32px !important",
          paddingRight: "32px !important",
          minHeight: "48px !important",
        },
      },
    },
  },
});

// Ajout de formes personnalisées au thème pour une plus grande flexibilité dans les styles des composants.
const customShapes = {
  borderRadiusXs: "2px",
  borderRadiusSm: "4px",
  borderRadiusMd: "8px",
  borderRadiusLg: "16px",
  borderRadiusXl: "24px",
  borderRadiusXxl: "32px",
  borderRadiusFull: "9999px",
};
Object.assign(baseTheme.shape, customShapes);

const theme = baseTheme as Theme;

export default theme;
