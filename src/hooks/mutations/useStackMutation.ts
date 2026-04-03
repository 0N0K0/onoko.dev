import {
  CREATE_STACK_MUTATION,
  DELETE_STACK_MUTATION,
  UPDATE_STACK_MUTATION,
} from "../../services/stack/stackMutations";
import type {
  Stack,
  useStackMutationProps,
} from "../../types/entities/stackTypes";
import { fileToBufferObj } from "../../utils/fileUtils";
import { useEntityMutation } from "./useEntityMutation";

/**
 * Ce hook personnalisé gère les mutations liées aux technologies, notamment l'ajout, la modification et la suppression de technologies. Il utilise le hook useEntityMutation pour effectuer les opérations de mutation GraphQL, et met à jour l'état local des technologies en fonction des résultats des mutations.
 * Les fonctions handleAdd, handleEdit et handleDelete sont retournées par le hook pour être utilisées dans les composants qui nécessitent ces fonctionnalités, permettant ainsi une gestion centralisée et cohérente des mutations liées aux technologies à travers l'application.
 * @param {function} props.setSubmitSuccess Fonction pour définir le message de succès après une mutation réussie.
 * @param {function} props.setSubmitError Fonction pour définir le message d'erreur après une mutation échouée.
 * @param {function} props.setSubmitting Fonction pour définir l'état de soumission en cours.
 * @param {function} props.setFormDialogOpen Fonction pour ouvrir ou fermer le dialogue de formulaire.
 * @param {Stack | null} props.initialStack La technologie initiale utilisée lors de l'édition d'une technologie.
 * @param {function} props.setInitialStack Fonction pour définir la technologie initiale lors de l'édition.
 * @param {Partial<Stack> | null} props.editingStack La technologie actuellement en cours d'édition.
 * @param {function} props.setEditingStack Fonction pour définir la technologie en cours d'édition.
 * @param {Array<Stack>} props.stacks La liste actuelle des technologies.
 * @param {function} props.setStacks Fonction pour mettre à jour la liste des technologies.
 * @returns {
 *            handleAdd: (item: Partial<Stack & { iconFile?: File | null }>) => Promise<void>,
 *            handleEdit: (item: Partial<Stack & { iconFile?: File | null }>) => Promise<void>,
 *            handleDelete: (selectedStacks: string[]) => Promise<void>
 *           } Un ensemble de fonctions pour gérer respectivement l'ajout, la modification et la suppression des technologies.
 */
export default function useStackMutations({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  setFormDialogOpen,
  stacks,
  setStacks,
}: useStackMutationProps): {
  handleAdd: (
    item: Partial<Stack & { iconFile?: File | null }>,
  ) => Promise<void>;
  handleEdit: (
    item: Partial<Stack & { iconFile?: File | null }>,
  ) => Promise<void>;
  handleDelete: (selectedStacks: string[]) => Promise<void>;
} {
  // Ajouter une technologie
  const addStack = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
  });
  const handleAdd = async (
    item: Partial<Stack & { iconFile?: File | null }>,
  ) => {
    let iconFileObj = null;
    if (item.iconFile) iconFileObj = await fileToBufferObj(item.iconFile);

    await addStack({
      mutation: CREATE_STACK_MUTATION,
      variables: { ...item, iconFile: iconFileObj },
      onSuccess: (data) => {
        setStacks((prev) => [...(prev || []), data.createStack]);
        setSubmitSuccess?.(
          `La technologie ${data.createStack.label} a été créée avec succès.`,
        );
      },
      reset: true,
    });
  };

  // Modifier une technologie
  const editStack = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
  });
  const handleEdit = async (
    item: Partial<Stack & { iconFile?: File | null }>,
  ) => {
    if (!item) return;

    let iconFileObj = null;
    if (item.iconFile) iconFileObj = await fileToBufferObj(item.iconFile);

    await editStack({
      mutation: UPDATE_STACK_MUTATION,
      variables: {
        ...item,
        iconFile: iconFileObj,
        category:
          typeof item.category === "string" ? item.category : item.category?.id,
      },
      onSuccess: (data) => {
        setStacks((prev) =>
          prev?.map((s) =>
            s.id === data.updateStack.id ? data.updateStack : s,
          ),
        );
        setSubmitSuccess?.(
          `La technologie ${data.updateStack.label} a été modifiée avec succès.`,
        );
      },
      reset: true,
    });
  };

  // Supprimer une ou plusieurs technologies
  const deleteStack = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
  });
  const handleDelete = async (selectedStacks: string[]) => {
    for (const stackId of selectedStacks) {
      const stack = stacks?.find((s) => s.id === stackId);
      await deleteStack({
        mutation: DELETE_STACK_MUTATION,
        variables: { id: stackId },
        onSuccess: () => {
          setStacks((prev) => prev?.filter((s) => s.id !== stackId));
          setSubmitSuccess?.(
            `La technologie ${stack?.label || stackId} a été supprimée avec succès.`,
          );
        },
      });
    }
  };

  return { handleAdd, handleEdit, handleDelete };
}
