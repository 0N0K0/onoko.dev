import { UPDATE_CATEGORY_MUTATION } from "../../services/categoryMutations";
import type { useCategoryMutationProps } from "../../types/categoryTypes";
import { useEntityMutation } from "../useEntityMutation";

export default function useCategoryEdit({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  setFormDialogOpen,
  setInitialCategory,
  editingCategory,
  setEditingCategory,
  setHasChanges,
  setCategories,
}: useCategoryMutationProps) {
  const editCategory = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    setInitialItem: setInitialCategory,
    setEditingItem: setEditingCategory,
    setHasChanges,
  });
  return async () => {
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
}
