import { useEffect, useState } from "react";
import ClosableSnackbarAlert from "../../components/custom/ClosableSnackbarAlert";
import SnackbarAlert from "../../components/custom/SnackbarAlert";
import MediaLibrary from "../../components/entities/media/MediaLibrary";
import useMediaMutations from "../../hooks/mutations/useMediaMutations";
import useMedias from "../../hooks/queries/useMedias";

export default function Media() {
  const { refetch } = useMedias();

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
    if (!addMediaLoading && addMediaData) {
      setSubmitSuccess("Média ajouté avec succès");
      refetch();
    }
  }, [addMediaData]);
  useEffect(() => {
    if (!editMediaLoading && editMediaData) {
      setSubmitSuccess("Média modifié avec succès");
      refetch();
    }
  }, [editMediaData]);
  useEffect(() => {
    if (!removeMediaLoading && removeMediaData) {
      setSubmitSuccess("Média supprimé avec succès");
      refetch();
    }
  }, [removeMediaData]);

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
