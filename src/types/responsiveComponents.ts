import type { TypographyProps } from "@mui/material";

export type ResponsiveBodyTypographyProps = TypographyProps & {
  variant: "bodyLg" | "bodyMd" | "bodySm" | "bodyXs";
  children: React.ReactNode;
};

export type ResponsiveTitleProps = TypographyProps & {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
};

export type ResponsiveLayoutProps<P> = P & {
  marginY?: string | number;
  paddingY?: string | number;
  rowGap?: string | number;
  children: React.ReactNode;
};
