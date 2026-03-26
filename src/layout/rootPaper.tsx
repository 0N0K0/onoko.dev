import type { PaperProps } from "@mui/material";
import { ResponsivePaper } from "../components/ResponsiveLayout";
import type { ResponsiveLayoutProps } from "../types/responsiveComponents";

export default function RootPaper({
  children,
  ...props
}: ResponsiveLayoutProps<{ children: React.ReactNode }> & PaperProps) {
  return (
    <ResponsivePaper
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      square
      {...props}
      elevation={0}
    >
      {children}
    </ResponsivePaper>
  );
}
