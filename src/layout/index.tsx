import type { PaperProps } from "@mui/material";
import { ResponsivePaper } from "../components/custom/ResponsiveLayout";
import type { ResponsiveLayoutProps } from "../types/components/responsiveTypes";

type LayoutProps = ResponsiveLayoutProps<Record<string, unknown>> & PaperProps;

function LayoutRoot({ children, style, ...props }: LayoutProps) {
  return (
    <ResponsivePaper
      square
      {...props}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "auto",
        marginRight: "auto",
        ...style,
      }}
      elevation={0}
    >
      {children}
    </ResponsivePaper>
  );
}

function LayoutContent({ children, sx, ...props }: LayoutProps) {
  return (
    <ResponsivePaper
      component="main"
      paddingY={3}
      square
      elevation={0}
      {...props}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingX: 4,
        ...sx,
      }}
    >
      {children}
    </ResponsivePaper>
  );
}

const Layout = Object.assign(LayoutRoot, {
  Content: LayoutContent,
});

export default Layout;
