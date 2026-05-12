import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import Layout from "..";
import AdminHeader from "../admin/AdminHeader";
import { useAuthContext } from "../../context/AuthContext";
import { ContactFormProvider } from "../../context/ContactFormContext";
import { useRef, useLayoutEffect, useState } from "react";

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

  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(48);

  useLayoutEffect(() => {
    const updateFooterHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };
    updateFooterHeight();
    window.addEventListener("resize", updateFooterHeight);
    return () => window.removeEventListener("resize", updateFooterHeight);
  }, []);

  return (
    <ContactFormProvider>
      <Layout
        sx={{
          minHeight: "100dvh",
          overflowX: "clip",
          paddingBottom: `${footerHeight}px !important`,
          paddingTop: isAuthenticated ? "96px !important" : "48px !important",
        }}
      >
        {isAuthenticated ? <AdminHeader position="fixed" /> : null}
        <PublicHeader />
        {children}
        <PublicFooter ref={footerRef} />
      </Layout>
    </ContactFormProvider>
  );
}
