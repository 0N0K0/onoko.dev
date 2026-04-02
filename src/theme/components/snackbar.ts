export const SNACKBAR = {
  defaultProps: {
    anchorOrigin: {
      vertical: "bottom" as const,
      horizontal: "right" as const,
    },
  },
  styleOverrides: {
    root: {
      right: "16px !important",
    },
  },
};
