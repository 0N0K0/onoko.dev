import {
  CREATE_COWORKER_MUTATION,
  DELETE_COWORKER_MUTATION,
  UPDATE_COWORKER_MUTATION,
} from "../../services/coworker/coworkerMutations";
import type {
  Coworker,
  useCoworkerMutationProps,
} from "../../types/cowokerTypes";
import { useEntityMutation } from "./useEntityMutation";

export default function useCoworkerMutations({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  setFormDialogOpen,
  coworkers,
  setCoworkers,
}: useCoworkerMutationProps): {
  handleAdd: (item: Partial<Coworker>) => void;
  handleEdit: (item: Partial<Coworker>) => void;
  handleDelete: (selectedCoworkers: string[]) => Promise<void>;
} {
  // Ajouter un collaborateur
  const addCoworker = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
  });
  const handleAdd = async (item: Partial<Coworker>) => {
    await addCoworker({
      mutation: CREATE_COWORKER_MUTATION,
      variables: item,
      onSuccess: (data) => {
        setCoworkers((prev) => [...(prev || []), data.createCoworker]);
        setSubmitSuccess?.(
          `Le collaborateur ${data.createCoworker.name} a été créé avec succès.`,
        );
      },
      reset: true,
    });
  };

  // Modifier un collaborateur
  const editCoworker = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
  });
  const handleEdit = async (item: Partial<Coworker>) => {
    await editCoworker({
      mutation: UPDATE_COWORKER_MUTATION,
      variables: item,
      onSuccess: (data) => {
        setCoworkers((prev) =>
          prev?.map((r) =>
            r.id === data.updateCoworker.id ? data.updateCoworker : r,
          ),
        );
        setSubmitSuccess?.(
          `Le collaborateur ${data.updateCoworker.name} a été modifié avec succès.`,
        );
      },
      reset: true,
    });
  };

  // Supprimer un ou plusieurs collaborateurs
  const deleteCoworker = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
  });
  const handleDelete = async (selectedCoworkers: string[]) => {
    for (const coworkerId of selectedCoworkers) {
      const coworker = coworkers?.find((r) => r.id === coworkerId);
      await deleteCoworker({
        mutation: DELETE_COWORKER_MUTATION,
        variables: { id: coworkerId },
        onSuccess: () => {
          setCoworkers((prev) => prev?.filter((r) => r.id !== coworkerId));
          setSubmitSuccess?.(
            `Le collaborateur ${coworker?.name || coworkerId} a été supprimé avec succès.`,
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
