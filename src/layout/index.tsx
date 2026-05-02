import type { PaperProps } from "@mui/material";
import { ResponsivePaper } from "../components/custom/ResponsiveLayout";
import type { ResponsiveLayoutProps } from "../types/components/responsiveTypes";

type LayoutProps = ResponsiveLayoutProps<Record<string, unknown>> & PaperProps;

function LayoutRoot({ children, sx, ...props }: LayoutProps) {
  return (
    <ResponsivePaper
      square
      {...props}
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "auto",
        marginRight: "auto",
        ...sx,
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
      square
      elevation={0}
      {...props}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingX: 4,
        paddingY: "24px !important",
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
