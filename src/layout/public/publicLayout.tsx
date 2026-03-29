import PublicHeader from "./publicHeader";
import PublicFooter from "./publicFooter";
import RootPaper from "../rootPaper";
import { ResponsivePaper } from "../../components/custom/responsiveLayout";
import { useAuth } from "../../hooks/useAuth";
import AdminHeader from "../admin/adminHeader";

/**
 * Layout principal pour les pages publiques (accueil, connexion, etc.).
 * Affiche une entête, un pied de page et une zone de contenu centrale.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  return (
    <RootPaper>
      {isAuthenticated ? <AdminHeader /> : null}
      <PublicHeader />
      <ResponsivePaper
        component="main"
        paddingY={3}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingX: 4,
        }}
        square
        elevation={0}
      >
        {children}
      </ResponsivePaper>
      <PublicFooter />
    </RootPaper>
  );
}
