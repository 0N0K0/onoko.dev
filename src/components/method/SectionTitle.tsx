import { ResponsiveStack } from "../custom/ResponsiveLayout";
import { Typography, useTheme } from "@mui/material";

export default function SectionTitle({
  title,
  titleColor,
  subtitle,
  subtitleColor,
  nowrap = true,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  titleColor?: string;
  subtitleColor?: string;
  nowrap?: boolean;
}) {
  const theme = useTheme();

  return (
    <ResponsiveStack
      sx={{
        flexDirection: { lg: "row", xs: "column" },
        columnGap: "1ch",
        flexWrap: "wrap",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: titleColor || theme.palette.primary.light,
          letterSpacing: "-0.05em",
          whiteSpace: { lg: nowrap ? "nowrap" : "normal", xs: "normal" },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h2"
        component="p"
        sx={{
          fontWeight: "100",
          color: subtitleColor || "inherit",
          whiteSpace: { lg: nowrap ? "nowrap" : "normal", xs: "normal" },
        }}
      >
        {subtitle}
      </Typography>
    </ResponsiveStack>
  );
}
