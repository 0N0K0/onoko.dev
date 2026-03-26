import Typography from "@mui/material/Typography";
import { verticalMediaQuery } from "../theme";
import { useTheme } from "@mui/material";
import type { ResponsiveTitleProps } from "../types/responsiveComponents";

export default function ResponsiveTitle({
  variant,
  children,
  ...props
}: ResponsiveTitleProps) {
  const theme = useTheme();

  return (
    <Typography
      variant={variant}
      {...props}
      sx={{
        fontSize: {
          xs: `min(${theme.typography[variant].fontSize}, ${theme.typography.h5.fontSize})`,
          sm: `min(${theme.typography[variant].fontSize}, ${theme.typography.h4.fontSize})`,
          md: theme.typography[variant].fontSize,
        },

        [verticalMediaQuery("loose", "down")]: {
          fontSize: `min(${theme.typography[variant].fontSize}, ${theme.typography.h4.fontSize})`,
          lineHeight: `min(${theme.typography[variant].lineHeight}, ${theme.typography.h4.lineHeight})`,
        },
        [verticalMediaQuery("compact", "down")]: {
          fontSize: `min(${theme.typography[variant].fontSize}, ${theme.typography.h5.fontSize})`,
          lineHeight: `min(${theme.typography[variant].lineHeight}, ${theme.typography.h5.lineHeight})`,
        },
      }}
    >
      {children}
    </Typography>
  );
}
