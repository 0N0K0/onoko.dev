import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import Layout from "..";
import AdminHeader from "../admin/AdminHeader";
import { useAuthContext } from "../../context/AuthContext";

/**
 * Layout principal pour les pages publiques (accueil, connexion, etc.).
 * Affiche une entête, un pied de page et une zone de contenu centrale.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthContext();

  return (
    <Layout sx={{ maxHeight: "100dvh", overflow: "hidden" }}>
      {isAuthenticated ? <AdminHeader /> : null}
      <PublicHeader />
      {children}
      <PublicFooter />
    </Layout>
  );
}
