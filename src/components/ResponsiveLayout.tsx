import React from "react";
import Box, { type BoxProps } from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";
import Paper, { type PaperProps } from "@mui/material/Paper";
import ImageList, { type ImageListProps } from "@mui/material/ImageList";
import type { ResponsiveLayoutProps } from "../types/responsiveComponents";
import { getResponsiveSx } from "../utils/responsiveUtils";

/**
 * Composant générique pour appliquer un layout responsive à n'importe quel composant MUI
 * @param Component Le composant cible (Box, Stack, Paper, etc.)
 * @param props Les props du composant cible + marginY/paddingY/rowGap
 */
export function ResponsiveLayout<ComponentProps extends { sx?: any }>(
  Component: React.ElementType,
) {
  return React.forwardRef<any, ResponsiveLayoutProps<ComponentProps>>(
    ({ marginY, paddingY, rowGap, sx, ...props }) => {
      if (typeof marginY === "number") marginY = `${marginY * 8}px`;
      if (typeof paddingY === "number") paddingY = `${paddingY * 8}px`;
      if (typeof rowGap === "number") rowGap = `${rowGap * 8}px`;
      const responsiveSx = getResponsiveSx({ marginY, paddingY, rowGap });
      return <Component {...props} sx={{ ...sx, ...responsiveSx }} />;
    },
  );
}

export const ResponsiveBox = ResponsiveLayout<BoxProps>(Box);
export const ResponsiveStack = ResponsiveLayout<StackProps>(Stack);
export const ResponsivePaper = ResponsiveLayout<PaperProps>(Paper);
export const ResponsiveImageList = ResponsiveLayout<ImageListProps>(ImageList);
