import { createTheme, type Theme } from "@mui/material/styles";

const verticalBreakpoints = {
  tight: 0,
  compact: 552,
  loose: 792,
};

export const verticalMediaQuery = (
  key: keyof typeof verticalBreakpoints,
  direction: "up" | "down" = "up",
) => {
  const px = verticalBreakpoints[key];
  if (direction === "up") {
    return `@media (min-height:${px}px)`;
  } else {
    return `@media (max-height:${px - 0.05}px)`;
  }
};

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
