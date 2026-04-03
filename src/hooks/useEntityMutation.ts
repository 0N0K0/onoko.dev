import apolloClient from "../services/appolloClient";
import type { useEntityMutationProps } from "../types/entityTypes";

/**
 * Hook personnalisé pour gérer les mutations d'entités avec Apollo Client
 * Permet de centraliser la logique de mutation, y compris la gestion des états de soumission, de succès et d'erreur
 * @param {function} props.setSubmitSuccess Fonction pour définir le message de succès après une mutation réussie
 * @param {function} props.setSubmitError Fonction pour définir le message d'erreur après une mutation échouée
 * @param {function} props.setSubmitting Fonction pour définir l'état de soumission (true pendant la mutation, false après)
 * @param {function} props.setFormDialogOpen Fonction pour ouvrir/fermer le dialogue de formulaire
 * @param {function} props.setInitialItem Fonction pour définir l'item initial à afficher dans le formulaire (pour les modifications)
 * @param {function} props.setEditingItem Fonction pour définir l'item actuellement en cours d'édition
 * @param {function} props.setHasChanges Fonction pour indiquer s'il y a des changements non sauvegardés dans le formulaire
 * @returns {function} Fonction à appeler pour exécuter une mutation avec les paramètres spécifiés
 */
export function useEntityMutation({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  setFormDialogOpen,
}: useEntityMutationProps): (params: {
  mutation: any;
  variables?: any;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  reset?: boolean;
}) => Promise<void> {
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
      }
    } catch (e: any) {
      setSubmitError?.(e.message || "Une erreur inconnue est survenue.");
      if (onError) onError(e);
    } finally {
      setSubmitting?.(false);
    }
  };
}
