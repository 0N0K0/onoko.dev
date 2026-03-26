import Typography from "@mui/material/Typography";
import { verticalMediaQuery } from "../theme";
import { useTheme } from "@mui/material";
import type { ResponsiveBodyTypographyProps } from "../types/responsiveComponents";

export default function ResponsiveBodyTypography({
  variant,
  children,
  ...props
}: ResponsiveBodyTypographyProps) {
  const theme = useTheme();

  return (
    <Typography
      variant={variant}
      {...props}
      sx={{
        fontSize: {
          xs: `min(${theme.typography[variant].fontSize}, ${theme.typography.bodySm.fontSize})`,
          sm: `min(${theme.typography[variant].fontSize}, ${theme.typography.bodyMd.fontSize})`,
          md: theme.typography[variant].fontSize,
        },
        [verticalMediaQuery("loose", "down")]: {
          fontSize: `min(${theme.typography[variant].fontSize}, ${theme.typography.bodyMd.fontSize})`,
          lineHeight: theme.typography.bodySm.lineHeight,
        },
        [verticalMediaQuery("compact", "down")]: {
          fontSize: `min(${theme.typography[variant].fontSize}, ${theme.typography.bodySm.fontSize})`,
          lineHeight: theme.typography.bodySm.lineHeight,
        },
      }}
    >
      {children}
    </Typography>
  );
}
