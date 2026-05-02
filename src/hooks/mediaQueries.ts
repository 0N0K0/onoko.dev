import { useMediaQuery, useTheme } from "@mui/material";

export const useCanHover = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");

export const useBreakpoints = () => {
  const theme = useTheme();
  const isXxl = useMediaQuery(theme.breakpoints.up("xxl"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isXs = useMediaQuery(theme.breakpoints.up("xs"));

  return {
    isXxl,
    isXl,
    isLg,
    isMd,
    isSm,
    isXs,
  };
};
