import {
  TableCell,
  TableRow,
  useTheme,
  type TableCellProps,
  type TableRowProps,
} from "@mui/material";
import ResponsiveTitle from "../../../custom/ResponsiveTitle";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import { useResponsiveWidth } from "../../../../hooks/layout/useResponsiveWidth";
import { useMediaQuery } from "@mui/system";
import { useLayoutEffect, useRef, useState } from "react";

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
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isXL = useMediaQuery(theme.breakpoints.up("xl"));
  const mainCellWidth = isXL
    ? useResponsiveWidth(8)
    : isLg
      ? useResponsiveWidth(6)
      : useResponsiveWidth(4);

  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLTableCellElement>(null);
  const [autoFontSize, setAutoFontSize] = useState<number | undefined>(
    undefined,
  );

  const fitFontSize = () => {
    if (!title || !titleRef.current || !containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth - (isLg ? 96 : 64);
    let fontSize = isLg ? 56 : 32; // px (3.5rem ou 2rem)
    titleRef.current.style.fontSize = fontSize + "px";
    let titleWidth = titleRef.current.scrollWidth;
    console.log({ titleWidth, containerWidth });
    while (titleWidth > containerWidth && fontSize > 16) {
      fontSize -= 2;
      titleRef.current.style.fontSize = fontSize + "px";
      titleWidth = titleRef.current.scrollWidth;
    }
    setAutoFontSize(fontSize);
  };

  useLayoutEffect(() => {
    fitFontSize();
    window.addEventListener("resize", fitFontSize);
    return () => {
      window.removeEventListener("resize", fitFontSize);
    };
    // eslint-disable-next-line
  }, [title, isLg, merged]);

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
          <ResponsiveTitle
            ref={titleRef}
            variant="h2"
            sx={{
              textAlign: "right",
              // width: "fit-content",
              fontSize: autoFontSize
                ? `${autoFontSize}px`
                : { lg: "3.5rem", xs: "2rem" },
              fontWeight: 700,
              lineHeight: { lg: "72px", xs: 1.2 },
            }}
          >
            {title}
          </ResponsiveTitle>
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
            <ResponsiveTitle
              variant="h2"
              sx={{
                fontSize: { lg: "3.5rem", xs: "2.5rem" },
                fontWeight: 700,
                lineHeight: { lg: "72px", xs: 1.2 },
                display: { md: merged ? "block" : "none", xs: "block" },
              }}
            >
              {title}
            </ResponsiveTitle>
          )}
          {children}
        </ResponsiveStack>
      </ProjectTableCell>
    </TableRow>
  );
}
