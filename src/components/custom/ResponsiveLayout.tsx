import React from "react";
import Box, { type BoxProps } from "@mui/material/Box";
import Stack, { type StackProps } from "@mui/material/Stack";
import Paper, { type PaperProps } from "@mui/material/Paper";
import ImageList, { type ImageListProps } from "@mui/material/ImageList";
import type { ResponsiveLayoutProps } from "../../types/components/responsiveTypes";
import { getResponsiveSx } from "../../utils/responsiveUtils";
import { Drawer, useTheme, type DrawerProps } from "@mui/material";

/**
 * Composant générique pour appliquer un layout responsive à n'importe quel composant MUI
 * @param {ComponentProps} Component Le composant cible (Box, Stack, Paper, etc.)
 * @param {number | string} props.marginY Marge verticale (peut être un nombre multiplié par 8px ou une string CSS)
 * @param {number | string} props.paddingY Padding vertical (peut être un nombre multiplié par 8px ou une string CSS)
 * @param {number | string} props.rowGap Espace entre les lignes (peut être un nombre multiplié par 8px ou une string CSS)
 */
export function ResponsiveLayout<ComponentProps extends { sx?: any }>(
  Component: React.ElementType,
) {
  return React.forwardRef<any, ResponsiveLayoutProps<ComponentProps>>(
    (props, ref) => {
      const theme = useTheme();
      let { maxWidth, marginY, paddingY, rowGap, sx, ...rest } = props;
      if (typeof marginY === "number") marginY = `${marginY * 8}px`;
      if (typeof paddingY === "number") paddingY = `${paddingY * 8}px`;
      if (typeof rowGap === "number") rowGap = `${rowGap * 8}px`;
      const responsiveSx = getResponsiveSx({
        marginY,
        paddingY,
        rowGap,
      });
      return (
        <Component
          ref={ref}
          {...rest}
          sx={{
            ...responsiveSx,
            maxWidth: maxWidth || theme.breakpoints.values.xxl,
            ...sx,
          }}
        />
      );
    },
  );
}

export const ResponsiveBox = ResponsiveLayout<BoxProps>(Box);
export const ResponsiveStack = ResponsiveLayout<StackProps>(Stack);
export const ResponsivePaper = ResponsiveLayout<PaperProps>(Paper);
export const ResponsiveDrawer = ResponsiveLayout<DrawerProps>(Drawer); // Utiliser Box pour Drawer car Drawer n'est pas un composant MUI standard
export const ResponsiveImageList = ResponsiveLayout<ImageListProps>(ImageList);
