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
  shape: {
    borderRadius: "8px",
  },
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    h1: { fontSize: "5rem", lineHeight: 1.2, letterSpacing: "normal" },
    h2: { fontSize: "4rem", lineHeight: 1.125, letterSpacing: "normal" },
    h3: { fontSize: "3rem", lineHeight: 1, letterSpacing: "normal" },
    h4: { fontSize: "2.5rem", lineHeight: 1.2, letterSpacing: "normal" },
    h5: { fontSize: "2rem", lineHeight: 1.5, letterSpacing: "normal" },
    h6: { fontSize: "1.5rem", lineHeight: 1, letterSpacing: "normal" },
    body1: { fontSize: "1rem", lineHeight: 1.5, letterSpacing: "normal" },
    body2: { fontSize: "0.75rem", lineHeight: 2, letterSpacing: "normal" },
    bodyLg: { fontSize: "2rem", lineHeight: 1.5 },
    bodyMd: { fontSize: "1.25rem", lineHeight: 1.2 },
    bodySm: { fontSize: "1rem", lineHeight: 1.5 },
    bodyXs: { fontSize: "0.75rem", lineHeight: 2 },
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
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            fontSize: "1rem",
            lineHeight: 1,
            letterSpacing: "normal",
            "&.MuiInputLabel-shrink": {
              transform: "translate(14px, -6px) scale(0.75) ",
            },
            "&.Mui-focused": {
              transform: "translate(14px, -6px) scale(0.75) ",
            },
          },
          "& .MuiInputBase-root": {
            borderRadius: "4px",
            fontSize: "1rem",
            lineHeight: 1,
            letterSpacing: "normal",
            "& .MuiInputBase-input": {
              padding: "12px 16px",
              minHeight: "1.5rem",
              "&.MuiInputBase-inputAdornedEnd": {
                paddingRight: "8px",
              },
            },
            "&.MuiInputBase-adornedEnd": {
              paddingRight: "0px",

              "& .MuiInputAdornment-root": {
                margin: "0px",
              },
            },
          },
          "& .MuiFormHelperText-root": {
            fontSize: "0.75rem",
            lineHeight: 2,
            marginTop: "0px",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          borderRadius: "4px",
          fontSize: "1rem",
          lineHeight: 1.5,
          letterSpacing: "normal",
          marginTop: "4px",
          marginBottom: "4px",
          padding: "8px 16px",
          textAlign: "center",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&.MuiIconButton-sizeMedium": {
            margin: "4px",
          },
          "&.MuiIconButton-sizeSmall": {
            padding: "6px",
            fontSize: "1.25rem",
          },
          "& .MuiSvgIcon-root": {
            fontSize: "inherit",
          },
          variants: [
            {
              props: { size: "adminMenu" },
              style: {
                minWidth: "0px !important",
                fontSize: "1rem",
                lineHeight: 1,
                letterSpacing: "normal",
                padding: "4px",
              },
            },
          ],
        },
      },
    },
    MuiCircularProgress: {
      defaultProps: {
        size: "48px",
        thickness: 2,
      },
    },
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      },
      styleOverrides: {
        root: {
          right: "16px !important",
        },
      },
    },
    MuiAlert: {
      defaultProps: {
        variant: "outlined",
        severity: "info",
      },
      styleOverrides: {
        root: {
          borderRadius: "4px",
          fontSize: "1rem",
          lineHeight: 1.5,
          letterSpacing: "normal",
          padding: "7.2px 15.2px",
          gap: "8px",
          "& .MuiAlert-icon": {
            fontSize: "1.25rem",
            margin: "0px",
            padding: "6px 0px",
          },
          "& .MuiAlert-message": {
            padding: "4px 0px",
          },
          "& .MuiAlert-action": {
            margin: "0px -6px",
            padding: "0px",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "8px",
          padding: "24px 32px",
          margin: "24px auto",
          gap: "24px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
          lineHeight: 1,
          letterSpacing: "normal",
          padding: "0px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          lineHeight: 1.5,
          letterSpacing: "normal",
          padding: "0px",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          lineHeight: 1.5,
          letterSpacing: "normal",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "0px",
          gap: "8px",
          "& .MuiButton-root": {
            marginLeft: "0px",
            marginRight: "0px",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "4px",
        },
        list: {
          padding: "0px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          lineHeight: 1.5,
          letterSpacing: "normal",
          gap: "8px",
          padding: "12px 16px",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: "0px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          lineHeight: 1.5,
          letterSpacing: "normal",
          padding: "12px 16px",
          gap: "8px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "0px !important",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          lineHeight: 1.5,
          letterSpacing: "normal",
        },
      },
    },
  },
});

// Ajout de tailles calculées personnalisées
const sizes = () => {
  const rootPaddingY = "24px";
  const rootPaddingX = "32px";
  const columnGap = "16px";
  const rowGap = "24px";
  const rootWidth = `calc(min(100dvw, 1920px) - ${rootPaddingX} * 2)`;
  const divisions = {
    xs: 3,
    sm: 4,
    md: 6,
    lg: 9,
    xl: 12,
    xxl: 12,
  };
  const columnWidth = (
    division: number,
    columns: number,
    baseWidth: string = rootWidth,
  ) => {
    if (columns > division) columns = division;
    if (columns < 1) return "100dvw";
    return `calc(${baseWidth} / ${division} * ${columns})`;
  };
  const colCounts = Array.from({ length: 11 }, (_, i) => i + 2);
  const colSizes = Object.fromEntries(
    colCounts.map((n) => [
      `${n}col`,
      Object.fromEntries(
        Object.entries(divisions).map(([breakpoint, cols]) => [
          breakpoint,
          columnWidth(cols, n),
        ]),
      ),
    ]),
  );

  return {
    adminHeaderHeight: "24px",
    rootPaddingY,
    rootPaddingX,
    rowGap,
    columnGap,
    rootWidth,
    ...colSizes,
    columnWidth,
  };
};

// Ajout des formes personnalisées
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

// Injection des tailles personnalisées dans le thème
(baseTheme as any).sizes = sizes();

const theme = baseTheme as Theme;

export default theme;
