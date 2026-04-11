import {
  ADD_MEDIA_MUTATION,
  REMOVE_MEDIA_MUTATION,
  UPDATE_MEDIA_MUTATION,
} from "../../services/media/mediaMutations";
import type {
  Media,
  useMediaMutationProps,
} from "../../types/entities/mediaTypes";
import { fileToBufferObj } from "../../utils/fileUtils";
import { useEntityMutation } from "./useEntityMutation";

export default function useMediaMutations({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  medias,
  setMedias,
}: useMediaMutationProps): {
  handleAdd: (item: Partial<Media>) => Promise<void>;
  handleEdit: (item: Partial<Media>) => Promise<void>;
  handleDelete: (selectedMedias: string[]) => Promise<void>;
} {
  // Ajouter un média
  const addMedia = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
  });
  const handleAdd = async (item: Partial<Media>) => {
    let imageFileObj = null;
    if (item.file) imageFileObj = await fileToBufferObj(item.file);
    await addMedia({
      mutation: ADD_MEDIA_MUTATION,
      variables: { file: imageFileObj },
      onSuccess: (data) => {
        setMedias((prev) => [...(prev || []), data.addMedia]);
        setSubmitSuccess?.(
          `Le média ${data.addMedia.label} a été importé avec succès.`,
        );
      },
      reset: true,
    });
  };

  // Modifier un média
  const editMedia = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
  });
  const handleEdit = async (item: Partial<Media>) => {
    if (item.category && typeof item.category !== "string") {
      item.category = item.category.id;
    }
    await editMedia({
      mutation: UPDATE_MEDIA_MUTATION,
      variables: item,
      onSuccess: (data) => {
        setMedias((prev) =>
          prev?.map((r) =>
            r.id === data.updateMedia.id ? data.updateMedia : r,
          ),
        );
        setSubmitSuccess?.(
          `Le média ${data.updateMedia.label} a été modifié avec succès.`,
        );
      },
      reset: true,
    });
  };

  // Supprimer un ou plusieurs médias
  const deleteMedia = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
  });
  const handleDelete = async (selectedMedias: string[]) => {
    for (const mediaId of selectedMedias) {
      const media = medias?.find((r) => r.id === mediaId);
      await deleteMedia({
        mutation: REMOVE_MEDIA_MUTATION,
        variables: { id: mediaId },
        onSuccess: () => {
          setMedias((prev) => prev?.filter((r) => r.id !== mediaId));
          setSubmitSuccess?.(
            `Le média ${media?.label || mediaId} a été supprimé avec succès.`,
          );
        },
      });
    }
  };

  return {
    handleAdd,
    handleEdit,
    handleDelete,
  };
}
