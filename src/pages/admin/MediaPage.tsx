import MediaLibrary from "../../components/entities/media/MediaLibrary";
import useMediaMutations from "../../hooks/mutations/useMediaMutations";

export default function Media() {
  const mutations = useMediaMutations();
  return <MediaLibrary mutations={mutations} />;
}
