export const CHECKBOX = {
  defaultProps: {
    size: "small" as const,
  },
  styleOverrides: {
    root: {
      padding: 8,
      fontSize: "1.5rem",
      "& .MuiSvgIcon-root": {
        fontSize: "inherit",
      },
    },
  },
};
