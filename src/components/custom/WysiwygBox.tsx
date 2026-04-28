import { Box, useTheme } from "@mui/material";

export function WysiwygBox({ __html }: { __html: string }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 3,
        "& p, & li": { fontSize: "1rem", lineHeight: 1.5, margin: "0" },
        "& .ql-size-huge": { fontSize: "2rem", lineHeight: 1.5 },
        "& .ql-size-large": { fontSize: "1.25rem", lineHeight: 1.2 },
        "& .ql-size-small": { fontSize: "0.75rem", lineHeight: 2 },
        "& h3": {
          fontSize: "3rem",
          lineHeight: 1,
          fontWeight: "100",
          margin: 0,
          "&:not(:first-child)": { marginTop: "1.5rem" },
        },
        "& h4": {
          fontSize: "2.5rem",
          lineHeight: 1.2,
          fontWeight: "100",
          margin: 0,
          "&:not(:first-child)": { marginTop: "1.5rem" },
        },
        "& h5": {
          fontSize: "2rem",
          lineHeight: 1.5,
          fontWeight: "400",
          margin: 0,
          "&:not(:first-child)": { marginTop: "1.5rem" },
        },
        "& h6": {
          fontSize: "1.25rem",
          lineHeight: 1.2,
          fontWeight: "400",
          margin: 0,
          "&:not(:first-child)": { marginTop: "1.5rem" },
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
        "& .ql-align-center": { textAlign: "center" },
        "& .ql-align-right": { textAlign: "right" },
        "& .ql-align-justify": { textAlign: "justify" },
        "& .ql-indent-1": { paddingLeft: "2rem" },
        "& .ql-indent-2": { paddingLeft: "4rem" },
        "& .ql-indent-3": { paddingLeft: "6rem" },
        "& .ql-indent-4": { paddingLeft: "8rem" },
        "& .ql-indent-5": { paddingLeft: "10rem" },
        "& .ql-indent-6": { paddingLeft: "12rem" },
        "& .ql-indent-7": { paddingLeft: "14rem" },
        "& .ql-indent-8": { paddingLeft: "16rem" },
      }}
      dangerouslySetInnerHTML={{ __html }}
    />
  );
}
