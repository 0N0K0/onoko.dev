import {
  TableCell,
  TableRow,
  Typography,
  type TableCellProps,
  type TableRowProps,
} from "@mui/material";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import { useResponsiveWidth } from "../../../../hooks/layout/useResponsiveWidth";
import { useLayoutEffect, useRef, useState } from "react";
import { useBreakpoints } from "../../../../hooks/mediaQueries";
import StretchyTypography from "../../../custom/StretchyTypography";

function ProjectTableCell({
  children,
  ...props
}: {
  children: React.ReactNode;
} & TableCellProps) {
  return (
    <TableCell {...props} sx={{ paddingY: 6, ...props.sx }}>
      {children}
    </TableCell>
  );
}

export default function ProjectTableRow({
  merged = false,
  title,
  children,
  tableCellProps,
  ...props
}: {
  merged?: boolean;
  title?: string;
  children: React.ReactNode;
  tableCellProps?: TableCellProps;
} & TableRowProps) {
  const { isLg, isXl } = useBreakpoints();
  const mainCellWidth = isXl
    ? useResponsiveWidth(8)
    : isLg
      ? useResponsiveWidth(6)
      : useResponsiveWidth(4);

  const containerRef = useRef<HTMLTableCellElement>(null);

  return (
    <TableRow {...props}>
      {!merged && (
        <ProjectTableCell
          ref={containerRef}
          sx={{
            verticalAlign: "top",
            paddingLeft: { lg: 8, xs: 4 },
            paddingRight: 4,
            borderRight: `1px solid rgb(81, 81, 81)`,
            display: { md: "table-cell", xs: "none" },
          }}
        >
          <StretchyTypography
            fontSize={40}
            baselineHeight={24}
            containerRef={containerRef}
            sx={{
              textAlign: "right",
              fontWeight: 700,
              lineHeight: { lg: 1.2, xs: 1.5 },
            }}
          >
            {title}
          </StretchyTypography>
        </ProjectTableCell>
      )}
      <ProjectTableCell
        colSpan={merged ? 2 : 1}
        {...tableCellProps}
        sx={{
          paddingRight: { lg: 8, xs: 4 },
          paddingLeft: merged ? { lg: 8, xs: 4 } : 4,
          width: mainCellWidth,
          ...tableCellProps?.sx,
        }}
      >
        <ResponsiveStack rowGap={3} maxWidth="100%" sx={{ overflow: "hidden" }}>
          {title && (
            <Typography
              variant="h2"
              sx={{
                fontSize: { lg: "2.5rem", xs: "2rem" },
                fontWeight: 700,
                lineHeight: { lg: 1.2, xs: 1.5 },
                display: { md: merged ? "block" : "none", xs: "block" },
                textAlign: "right",
              }}
            >
              {title}
            </Typography>
          )}
          {children}
        </ResponsiveStack>
      </ProjectTableCell>
    </TableRow>
  );
}
