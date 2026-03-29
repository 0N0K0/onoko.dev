import AdminHeader from "./adminHeader";
import RootPaper from "../rootPaper";
import { ResponsivePaper } from "../../components/custom/responsiveLayout";

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
    </RootPaper>
  );
}
