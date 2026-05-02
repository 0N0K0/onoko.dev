import "quill/dist/quill.snow.css";
import { FormControl, FormLabel, Box, useTheme } from "@mui/material";
import useWysiwyg from "../../hooks/useWysiwyg";

interface WysiwygFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function WysiwygField({
  label,
  value,
  onChange,
}: WysiwygFieldProps) {
  const theme = useTheme();
  const { containerRef } = useWysiwyg({ value, onChange });

  return (
    <FormControl fullWidth>
      <FormLabel
        sx={{
          fontSize: "0.75rem",
          lineHeight: 2,
          color: theme.palette.text.secondary,
        }}
      >
        {label}
      </FormLabel>
      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "8px",
          boxSizing: "border-box",
          transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          "&:hover": {
            borderColor: theme.palette.text.primary,
            transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          },
          "&:focus-within": {
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
            transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
            "& .ql-toolbar.ql-snow": {
              padding: "11px 7px 12px",
            },
          },
          "& .ql-container.ql-snow": {
            border: "none",
            color: theme.palette.text.primary,
            fontFamily: "Roboto, sans-serif",
            fontSize: "16px",
            lineHeight: 1.5,
          },
          "& .ql-editor": {
            display: "flex",
            flexDirection: "column",
            rowGap: 3,
            fontFamily: "League Spartan, sans-serif",
            fontSize: "16px",
            lineHeight: 1.5,
            padding: "12px 16px",
            minHeight: "96px",
            "&.ql-blank::before": {
              color: theme.palette.text.disabled,
            },
            "& .ql-size-huge": { fontSize: "2rem", lineHeight: 1.5 },
            "& .ql-size-large": { fontSize: "1.25rem", lineHeight: 1.2 },
            "& .ql-size-small": { fontSize: "0.75rem", lineHeight: 2 },
            "& h3, & h4, & h5, & h6": {
              margin: 0,
              "&:not(:first-child)": { marginTop: "1.5rem" },
            },
            "& h3, & h4": {
              fontWeight: "100",
            },
            "& h5, & h6": {
              fontWeight: "400",
            },
            "& h3": {
              fontSize: "3rem",
              lineHeight: 1,
            },
            "& h4": {
              fontSize: "2.5rem",
              lineHeight: 1.2,
              margin: 0,
              "&:not(:first-child)": { marginTop: "1.5rem" },
            },
            "& h5": {
              fontSize: "2rem",
              lineHeight: 1.5,
              margin: 0,
              "&:not(:first-child)": { marginTop: "1.5rem" },
            },
            "& h6": {
              fontSize: "1.25rem",
              lineHeight: 1.2,
              margin: 0,
              "&:not(:first-child)": { marginTop: "1.5rem" },
            },
            "& ol": {
              paddingLeft: "2rem",
              "& li": {
                marginLeft: "1rem",
                paddingLeft: "0.5rem",
                '&[data-list="bullet"]': {
                  marginLeft: "0",
                  paddingLeft: "0rem",
                  listStyleType: "none",
                  display: "flex",
                  columnGap: "0.5rem",
                  "& .ql-ui": {
                    position: "relative",
                    boxSizing: "inherit",
                    "&::before": {
                      content: '"•"',
                      display: "inline-block",
                      width: "1rem",
                      textAlign: "center",
                      margin: 0,
                    },
                  },
                },
              },
            },
            "& a": {
              color: theme.palette.primary.light,
              textDecoration: "none",
              display: "inline-block",
              position: "relative",
              transition: `color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
              "&::after": {
                content: '""',
                display: "block",
                position: "absolute",
                bottom: "2px",
                left: 0,
                transform: "scaleX(0)",
                transformOrigin: "left",
                width: "100%",
                height: "1px",
                backgroundColor: theme.palette.primary.main,
                transition: `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
              },
              "&:hover": {
                color: theme.palette.primary.main,
                "&::after": {
                  transform: "scaleX(1)",
                },
              },
            },
            "& .ql-indent-1": { paddingLeft: "2rem" },
            "& .ql-indent-2": { paddingLeft: "4rem" },
            "& .ql-indent-3": { paddingLeft: "6rem" },
            "& .ql-indent-4": { paddingLeft: "8rem" },
            "& .ql-indent-5": { paddingLeft: "10rem" },
            "& .ql-indent-6": { paddingLeft: "12rem" },
            "& .ql-indent-7": { paddingLeft: "14rem" },
            "& .ql-indent-8": { paddingLeft: "16rem" },
          },
          "& .ql-toolbar": {
            "&.ql-snow": {
              border: "none",
              borderBottom: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.secondary,
              fontFamily: "Roboto, sans-serif",
              fontSize: "16px",
              lineHeight: 1.5,
              padding: "12px 8px",
              boxSizing: "border-box",
              height: "48px",
            },

            "& .ql-picker-label, & .ql-picker-options": {
              color: theme.palette.text.secondary,
              border: `1px solid ${theme.palette.divider} !important`,
              borderRadius: "4px",
            },
            "& .ql-picker-options": {
              backgroundColor: theme.palette.background.paper,
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.051), rgba(255, 255, 255, 0.051))",
            },
            "& .ql-picker-label:hover, & .ql-picker-label.ql-active, & .ql-picker-item:hover, & .ql-picker-item.ql-selected":
              {
                color: theme.palette.primary.main,
              },
            "& .ql-stroke": {
              stroke: theme.palette.text.secondary,
            },
            "& .ql-fill": {
              fill: theme.palette.text.secondary,
            },
            "& button:hover .ql-stroke, & button:focus .ql-stroke, & button.ql-active .ql-stroke, & .ql-picker-label:hover .ql-stroke, & .ql-picker-label.ql-active .ql-stroke, & .ql-picker-item:hover .ql-stroke, & .ql-picker-item.ql-selected .ql-stroke":
              {
                stroke: theme.palette.primary.main,
              },
            "& button:hover .ql-fill, & button:focus .ql-fill, & button.ql-active .ql-fill, & .ql-picker-label:hover .ql-fill, & .ql-picker-label.ql-active .ql-fill, & .ql-picker-item:hover .ql-fill, & .ql-picker-item.ql-selected .ql-fill":
              {
                fill: theme.palette.primary.main,
              },
          },
        }}
      >
        <div ref={containerRef} />
      </Box>
    </FormControl>
  );
}
