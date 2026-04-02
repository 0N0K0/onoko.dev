export const TEXT_FIELD = {
  defaultProps: {
    variant: "outlined" as const,
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
};
