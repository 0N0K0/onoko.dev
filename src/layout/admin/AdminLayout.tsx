import AdminHeader from "./AdminHeader";
import RootPaper from "../RootPaper";
import { ResponsivePaper } from "../../components/custom/ResponsiveLayout";
import AdminSidebar from "./AdminSidebar";
import { useTheme } from "@mui/material";
import { useResponsiveWidth } from "../../hooks/layout/useResponsiveWidth";

/**
 * Layout principal de l'espace admin, avec une entête et une zone de contenu.
 * Utilisé pour les pages de l'espace admin.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <RootPaper maxWidth={"100% !important"} sx={{ width: "100% !important" }}>
      <AdminHeader />
      <AdminSidebar />
      <ResponsivePaper
        component="main"
        paddingY={3}
        rowGap={6}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingX: 4,
          alignItems: "center",
          minHeight: "0",
          height: `calc(100vh - ${theme.sizes.adminHeaderHeight})`,
          maxHeight: `calc(100vh - ${theme.sizes.adminHeaderHeight})`,
          overflowY: "hidden",
          marginLeft: { md: useResponsiveWidth(2), xs: 0 },
        }}
        square
        elevation={0}
        maxWidth={"100% !important"}
      >
        {children}
      </ResponsivePaper>
    </RootPaper>
  );
}
