import ResponsiveTitle from "../../components/custom/ResponsiveTitle";
import MediaPicker from "../../components/entities/media/MediaPicker";

/**
 * Page d'accueil de l'espace admin.
 */
export default function Dashboard() {
  return (
    <>
      <ResponsiveTitle variant="h1" width="100%">
        Tableau de bord
      </ResponsiveTitle>
      <MediaPicker multiple onChange={() => {}} />
    </>
  );
}
