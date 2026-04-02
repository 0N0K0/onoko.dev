import type { PaperProps } from "@mui/material";
import { ResponsivePaper } from "../components/custom/responsiveLayout";
import type { ResponsiveLayoutProps } from "../types/responsiveTypes";

/**
 * Composant de layout principal pour les pages de l'application.
 * Utilise un ResponsivePaper pour créer une zone de contenu centrale avec une hauteur minimale de 100vh.
 * Permet d'aligner le contenu au centre de la page et d'ajouter des styles personnalisés via les props.
 * @param {React.ReactNode} props.children Le contenu à afficher à l'intérieur du layout.
 * @param {object} props.props Propriétés supplémentaires à passer au composant ResponsivePaper.
 */
export default function RootPaper({
  children,
  ...props
}: ResponsiveLayoutProps<{ children: React.ReactNode }> & PaperProps) {
  return (
    <ResponsivePaper
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginLeft: "auto",
        marginRight: "auto",
        ...props.style,
      }}
      square
      {...props}
      elevation={0}
    >
      {children}
    </ResponsivePaper>
  );
}
