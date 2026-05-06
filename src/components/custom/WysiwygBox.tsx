import { Box, useTheme } from "@mui/material";
import type { BoxProps } from "@mui/material";

export function WysiwygBox({
  __html,
  ...props
}: { __html: string } & BoxProps) {
  const theme = useTheme();

  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 3,
        "& p, & ol": { fontSize: "1rem", lineHeight: 1.5, margin: "0" },
        "& .ql-size-huge": {
          fontSize: { xs: "1rem", sm: "1.25rem", md: "2rem" },
          lineHeight: { xs: 1.5, sm: 1.2, md: 1.5 },
        },
        "& .ql-size-large": {
          fontSize: { xs: "1rem", sm: "1.25rem" },
          lineHeight: { xs: 1.2, sm: 1.2 },
        },
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
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          lineHeight: { xs: 1.5, sm: 1.2, md: 1 },
        },
        "& h4": {
          fontSize: { xs: "2rem", sm: "2.5rem" },
          lineHeight: { xs: 1.5, sm: 1.2 },
          margin: 0,
          "&:not(:first-child)": { marginTop: "1.5rem" },
          fontStyle: "italic",
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
          fontStyle: "italic",
        },
        "& ol": {
          paddingLeft: "2rem",
          "& li": {
            marginLeft: "1rem",
            paddingLeft: "0.5rem",
            '&[data-list="bullet"]': {
              marginLeft: "0",
              paddingLeft: "0",
              listStyleType: "none",
              display: "flex",
              columnGap: "0.5rem",
              "& .ql-ui::before": {
                content: '"•"',
                display: "inline-block",
                width: "1rem",
                textAlign: "center",
                margin: 0,
              },
            },
            "&.ql-indent-1": { paddingLeft: "0.5rem" },
            "&.ql-indent-2": { paddingLeft: "1rem" },
            "&.ql-indent-3": { paddingLeft: "1.5rem" },
            "&.ql-indent-4": { paddingLeft: "2rem" },
            "&.ql-indent-5": { paddingLeft: "2.5rem" },
            "&.ql-indent-6": { paddingLeft: "3rem" },
            "&.ql-indent-7": { paddingLeft: "3.5rem" },
            "&.ql-indent-8": { paddingLeft: "4rem" },
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
            transformOrigin: "right",
            width: "100%",
            height: "1px",
            backgroundColor: theme.palette.primary.main,
            transition: `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          },
          "&:hover": {
            color: theme.palette.primary.main,
            "&::after": {
              transform: "scaleX(1)",
              transformOrigin: "left",
            },
          },
        },
        "& .ql-align-center": { textAlign: "center" },
        "& .ql-align-right": { textAlign: "right" },
        "& .ql-align-justify": { textAlign: "justify" },
        "& .ql-indent-1": { paddingLeft: { lg: "2rem", xs: "1rem" } },
        "& .ql-indent-2": { paddingLeft: { lg: "4rem", xs: "2rem" } },
        "& .ql-indent-3": { paddingLeft: { lg: "6rem", xs: "3rem" } },
        "& .ql-indent-4": { paddingLeft: { lg: "8rem", xs: "4rem" } },
        "& .ql-indent-5": { paddingLeft: { lg: "10rem", xs: "5rem" } },
        "& .ql-indent-6": { paddingLeft: { lg: "12rem", xs: "6rem" } },
        "& .ql-indent-7": { paddingLeft: { lg: "14rem", xs: "7rem" } },
        "& .ql-indent-8": { paddingLeft: { lg: "16rem", xs: "8rem" } },

        ...props.sx,
      }}
      dangerouslySetInnerHTML={{ __html }}
    />
  );
}
