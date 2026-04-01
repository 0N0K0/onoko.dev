import AdminHeader from "./adminHeader";
import RootPaper from "../rootPaper";
import { ResponsivePaper } from "../../components/custom/responsiveLayout";
import AdminSidebar from "./adminSidebar";
import { Container } from "@mui/material";

/**
 * Layout principal de l'espace admin, avec une entête et une zone de contenu.
 * Utilisé pour les pages de l'espace admin.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootPaper>
      <AdminHeader />
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          padding: "0 !important",
        }}
      >
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
          }}
          square
          elevation={0}
        >
          {children}
        </ResponsivePaper>
      </Container>
    </RootPaper>
  );
}
