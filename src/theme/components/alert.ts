export const ALERT = {
  defaultProps: {
    variant: "filled" as const,
    severity: "info" as const,
  },
  styleOverrides: {
    root: {
      borderRadius: "4px",
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "normal",
      padding: "7.2px 15.2px",
      gap: "8px",
      color: "#fff",
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
};
