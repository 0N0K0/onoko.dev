import { useEffect, useState } from "react";
import ClosableSnackbarAlert from "../../components/custom/ClosableSnackbarAlert";
import SnackbarAlert from "../../components/custom/SnackbarAlert";
import MediaLibrary from "../../components/entities/media/MediaLibrary";
import useMediaMutations from "../../hooks/mutations/useMediaMutations";

export default function Media() {
  const {
    addMedia,
    addMediaData,
    addMediaLoading,
    addMediaError,
    editMedia,
    editMediaData,
    editMediaLoading,
    editMediaError,
    removeMedia,
    removeMediaData,
    removeMediaLoading,
    removeMediaError,
  } = useMediaMutations();

  const [submitSuccess, setSubmitSuccess] = useState<string>("");

  useEffect(() => {
    if (addMediaData) {
      setSubmitSuccess("Média ajouté avec succès");
    } else if (editMediaData) {
      setSubmitSuccess("Média modifié avec succès");
    } else if (removeMediaData) {
      setSubmitSuccess("Média supprimé avec succès");
    }
  }, [addMediaData, editMediaData, removeMediaData]);

  return (
    <>
      <MediaLibrary
        addMedia={addMedia}
        addMediaLoading={addMediaLoading}
        editMedia={editMedia}
        editMediaLoading={editMediaLoading}
        removeMedia={removeMedia}
        removeMediaLoading={removeMediaLoading}
      />
      <ClosableSnackbarAlert
        open={!!submitSuccess}
        setOpen={() => setSubmitSuccess("")}
        message={submitSuccess}
        severity="success"
      />
      <SnackbarAlert
        open={!!(addMediaError || editMediaError || removeMediaError)}
        message={
          addMediaError?.message ||
          editMediaError?.message ||
          removeMediaError?.message ||
          "Une erreur est survenue"
        }
        severity="error"
      />
    </>
  );
}
