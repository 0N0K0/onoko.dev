import { createTheme } from "@mui/material";

const defaultTheme = createTheme();

export const INPUT_BASE = {
  styleOverrides: {
    root: {
      borderRadius: "4px !important",
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
      "&.MuiInputBase-multiline": {
        padding: "0px",
        lineHeight: "1.5rem",
      },
    },
  },
};

export const INPUT_LABEL = {
  styleOverrides: {
    root: {
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
    asterisk: {
      color: defaultTheme.palette.warning.main,
    },
  },
};
