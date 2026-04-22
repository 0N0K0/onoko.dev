import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import Layout from "..";
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
  const sidebarWidth = useResponsiveWidth(2);
  return (
    <Layout maxWidth={"100% !important"} sx={{ width: "100% !important" }}>
      <AdminHeader />
      <AdminSidebar />
      <Layout.Content
        rowGap={6}
        maxWidth={"100% !important"}
        sx={{
          alignItems: "center",
          minHeight: "0",
          height: `calc(100vh - ${theme.sizes.adminHeaderHeight})`,
          maxHeight: `calc(100vh - ${theme.sizes.adminHeaderHeight})`,
          overflowY: "hidden",
          marginLeft: { md: sidebarWidth, xs: 0 },
        }}
      >
        {children}
      </Layout.Content>
    </Layout>
  );
}
