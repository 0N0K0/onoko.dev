export const BUTTON = {
  defaultProps: {
    variant: "contained" as const,
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
      textAlign: "center" as const,
    },
  },
};
