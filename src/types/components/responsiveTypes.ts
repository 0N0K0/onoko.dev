import type { TypographyProps } from "@mui/material";

/**
 * Ce fichier définit les types TypeScript liés aux composants responsives utilisés dans l'application, notamment les types pour les titres, les typographies de corps de texte et les layouts responsives.
 * Ces types permettent d'assurer une utilisation cohérente et typée de ces composants à travers l'application, facilitant ainsi le développement et la maintenance du code.
 */

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
  marginBottom?: string | number;
  paddingY?: string | number;
  paddingX?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
  alignItems?: string;
  justifyContent?: string;
  flexWrap?: string;
  flex?: string | number;
  children: React.ReactNode;
  height?: string | number;
  width?: string | number;
  maxWidth?: number | string;
  overflow?: string;
};

export type GetResponsiveSxProps = {
  marginY?: string;
  paddingY?: string;
  rowGap?: string;
};

export type ResponsiveSxProps = {
  marginY: { xs: string; sm: string; md: string };
  paddingY: { xs: string; sm: string; md: string };
  rowGap: { xs: string; sm: string; md: string };
  [key: string]: any;
};
