import { CREATE_CATEGORY_MUTATION } from "../../services/categoryMutations";
import type { useCategoryMutationProps } from "../../types/categoryTypes";
import { useEntityMutation } from "../useEntityMutation";

export default function useCategoryAdd({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  setFormDialogOpen,
  editingCategory,
  setEditingCategory,
  setCategories,
}: useCategoryMutationProps) {
  const addCategory = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    setEditingItem: setEditingCategory,
  });
  return async () => {
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
}
