// hooks/category/useCategoryMutation.ts
import apolloClient from "../services/appolloClient";
import type { useEntityMutationProps } from "../types/entityTypes";

export function useEntityMutation({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  setFormDialogOpen,
  setInitialItem,
  setEditingItem,
  setHasChanges,
}: useEntityMutationProps) {
  return async ({
    mutation,
    variables,
    onSuccess,
    onError,
    reset = false,
  }: {
    mutation: any;
    variables?: any;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    reset?: boolean;
  }) => {
    setSubmitSuccess?.("");
    setSubmitError?.("");
    setSubmitting?.(true);
    try {
      const { data } = await apolloClient.mutate({ mutation, variables });
      if (onSuccess) onSuccess(data);
      if (reset) {
        setFormDialogOpen?.(false);
        setInitialItem?.(null);
        setEditingItem?.(null);
        setHasChanges?.(false);
      }
    } catch (e: any) {
      setSubmitError?.(e.message || "Une erreur inconnue est survenue.");
      if (onError) onError(e);
    } finally {
      setSubmitting?.(false);
    }
  };
}
