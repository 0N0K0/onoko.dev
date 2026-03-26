import { useTheme } from "@mui/material";
import { verticalMediaQuery } from "../theme";

export function getResponsiveSx({
  marginY = "0px",
  paddingY = "0px",
  rowGap = "0px",
}) {
  const theme = useTheme();

  const maxSpacing = theme.spacing(24);
  const maxCompactSpacing = theme.spacing(18);
  const maxTightSpacing = theme.spacing(12);

  return {
    maxWidth: theme.breakpoints.values.xxl,
    marginY: {
      xs: `min(${marginY}, ${maxTightSpacing})`,
      sm: `min(${marginY}, ${maxCompactSpacing})`,
      md: `min(${marginY}, ${maxSpacing})`,
    },
    paddingY: {
      xs: `min(${paddingY}, ${maxTightSpacing})`,
      sm: `min(${paddingY}, ${maxCompactSpacing})`,
      md: `min(${paddingY}, ${maxSpacing})`,
    },
    rowGap: {
      xs: `min(${rowGap}, ${maxTightSpacing})`,
      sm: `min(${rowGap}, ${maxCompactSpacing})`,
      md: `min(${rowGap}, ${maxSpacing})`,
    },
    [verticalMediaQuery("loose", "down")]: {
      marginY: `min(${marginY}, ${maxCompactSpacing})`,
      paddingY: `min(${paddingY}, ${maxCompactSpacing})`,
      rowGap: `min(${rowGap}, ${maxCompactSpacing})`,
    },
    [verticalMediaQuery("compact", "down")]: {
      marginY: `min(${marginY}, ${maxTightSpacing})`,
      paddingY: `min(${paddingY}, ${maxTightSpacing})`,
      rowGap: `min(${rowGap}, ${maxTightSpacing})`,
    },
  };
}
