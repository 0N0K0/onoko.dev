import {
  CREATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
} from "../services/categoryMutations";
import type { useCategoryMutationProps } from "../types/categoryTypes";
import { useEntityMutation } from "./useEntityMutation";

/**
 * Hook personnalisé pour gérer les mutations liées aux catégories (ajout, modification, suppression).
 * Ce hook centralise la logique de mutation pour les catégories, permettant ainsi de réutiliser le même code pour les différentes opérations.
 * Il utilise le hook `useEntityMutation` pour effectuer les mutations GraphQL et gérer les états de soumission, de succès et d'erreur.
 * @param {Function} props.setSubmitSuccess - Fonction pour définir le message de succès après une mutation réussie.
 * @param {Function} props.setSubmitError - Fonction pour définir le message d'erreur après une mutation échouée.
 * @param {Function} props.setSubmitting - Fonction pour définir l'état de soumission en cours.
 * @param {Function} props.setFormDialogOpen - Fonction pour ouvrir ou fermer le dialogue de formulaire.
 * @param {Function} props.setInitialCategory - Fonction pour définir la catégorie initiale lors de l'édition.
 * @param {Partial<Category> | null} props.editingCategory - La catégorie actuellement en cours d'édition.
 * @param {Function} props.setEditingCategory - Fonction pour définir la catégorie en cours d'édition.
 * @param {Function} props.setHasChanges - Fonction pour indiquer s'il y a des changements non sauvegardés.
 * @param {Array<Category>} props.categories - La liste actuelle des catégories.
 * @param {Function} props.setCategories - Fonction pour mettre à jour la liste des catégories.
 * @returns {{handleAdd: () => Promise<void>, handleEdit: () => Promise<void>, handleDelete: (selectedCategories: string[]) => Promise<void>}} Un ensemble de fonctions pour gérer respectivement l'ajout, la modification et la suppression des catégories.
 */
export default function useCategoryMutations({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  setFormDialogOpen,
  setInitialCategory,
  editingCategory,
  setEditingCategory,
  setHasChanges,
  categories,
  setCategories,
}: useCategoryMutationProps): {
  handleAdd: () => Promise<void>;
  handleEdit: () => Promise<void>;
  handleDelete: (selectedCategories: string[]) => Promise<void>;
} {
  // Ajouter une catégorie
  const addCategory = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    setEditingItem: setEditingCategory,
  });
  const handleAdd = async () => {
    await addCategory({
      mutation: CREATE_CATEGORY_MUTATION,
      variables: editingCategory,
      onSuccess: (data) => {
        setCategories((prev) => [...(prev || []), data.createCategory]);
        setSubmitSuccess(
          `La catégorie ${data.createCategory.label} a été créée avec succès.`,
        );
      },
      reset: true,
    });
  };

  // Modifier une catégorie
  const editCategory = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    setInitialItem: setInitialCategory,
    setEditingItem: setEditingCategory,
    setHasChanges,
  });
  const handleEdit = async () => {
    await editCategory({
      mutation: UPDATE_CATEGORY_MUTATION,
      variables: editingCategory,
      onSuccess: (data) => {
        setCategories((prev) =>
          prev?.map((c) =>
            c.id === data.updateCategory.id ? data.updateCategory : c,
          ),
        );
        setSubmitSuccess(
          `La catégorie ${data.updateCategory.label} a été modifiée avec succès.`,
        );
      },
      reset: true,
    });
  };

  // Supprimer une ou plusieurs catégories
  const deleteCategory = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
  });
  const handleDelete = async (selectedCategories: string[]) => {
    for (const categoryId of selectedCategories) {
      const category = categories?.find((c) => c.id === categoryId);
      await deleteCategory({
        mutation: DELETE_CATEGORY_MUTATION,
        variables: { id: categoryId },
        onSuccess: () => {
          setCategories((prev) => prev?.filter((c) => c.id !== categoryId));
          setSubmitSuccess(
            `La catégorie ${category?.label || categoryId} a été supprimée avec succès.`,
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
