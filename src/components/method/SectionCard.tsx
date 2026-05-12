import { Card, CardContent, useTheme, type CardProps } from "@mui/material";
import { useBreakpoints } from "../../hooks/mediaQueries";
import StretchyTypography from "../custom/StretchyTypography";
import { useRef } from "react";

export default function SectionCard({
  title,
  children,
  invisible = false,
  ...props
}: {
  children: React.ReactNode;
  title?: string;
  invisible?: boolean;
} & CardProps) {
  const theme = useTheme();
  const { isMd } = useBreakpoints();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Card
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        background: invisible
          ? "none"
          : `linear-gradient(rgba(11, 12, 14), ${theme.palette.background.paper}) padding-box, linear-gradient(180deg, ${theme.palette.primary.dark}, ${theme.palette.background.paper}) border-box`,
        borderRadius: invisible ? 0 : 1,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        border: invisible ? "none" : `1px solid transparent`,
        boxShadow: "none",
        marginX: isMd ? 0 : !invisible ? -2 : 0,
        width: isMd ? "auto" : !invisible ? "calc(100% + 32px)" : "auto",
        ...props.sx,
      }}
    >
      <CardContent
        ref={containerRef}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          rowGap: 3,
          padding: invisible
            ? "0px !important"
            : `36px ${isMd ? 32 : 16}px !important`,
          paddingBottom: invisible ? "0px !important" : "36px !important",
        }}
      >
        {title && (
          <StretchyTypography
            containerRef={containerRef}
            fontSize={48}
            variant="h3"
          >
            {title}
          </StretchyTypography>
        )}
        {children}
      </CardContent>
    </Card>
  );
}
