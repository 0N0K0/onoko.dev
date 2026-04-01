import { DELETE_CATEGORY_MUTATION } from "../../services/categoryMutations";
import type { useCategoryMutationProps } from "../../types/categoryTypes";
import { useEntityMutation } from "../useEntityMutation";

export default function useCategoryDelete({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  categories,
  setCategories,
}: useCategoryMutationProps) {
  const deleteCategory = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
  });
  return async (selectedCategories: string[]) => {
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
}
