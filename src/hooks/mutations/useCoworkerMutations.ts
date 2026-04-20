import { useMutation } from "@apollo/client/react";
import {
  CREATE_COWORKER_MUTATION,
  DELETE_COWORKER_MUTATION,
  UPDATE_COWORKER_MUTATION,
} from "../../services/coworker/coworkerMutations";
import type { Coworker } from "../../types/entities/coworkerTypes";
import type { ErrorLike } from "@apollo/client";
import type { ApolloCache } from "@apollo/client";

/**
 * Hook personnalisé pour gérer les mutations liées aux coworkers (ajout, modification, suppression).
 * Ce hook centralise la logique de mutation pour les coworkers, permettant ainsi de réutiliser le même code pour les différentes opérations.
 * Il utilise le hook `useEntityMutation` pour effectuer les mutations GraphQL et gérer les états de soumission, de succès et d'erreur.
 * @returns {
 *    createCoworker: useMutation.MutationFunction<boolean, Omit<Coworker, "id">, ApolloCache>;
 *    editCoworker: useMutation.MutationFunction<boolean, Partial<Coworker>, ApolloCache>;
 *    deleteCoworker: useMutation.MutationFunction<boolean, { id: string }, ApolloCache>;
 *    createCoworkerData: boolean | null | undefined;
 *    createCoworkerLoading: boolean;
 *    createCoworkerError: ErrorLike | undefined;
 *    editCoworkerData: boolean | null | undefined;
 *    editCoworkerLoading: boolean;
 *    editCoworkerError: ErrorLike | undefined;
 *    deleteCoworkerData: boolean | null | undefined;
 *    deleteCoworkerLoading: boolean;
 *    deleteCoworkerError: ErrorLike | undefined;
 * } Un objet contenant les fonctions de mutation pour ajouter, modifier et supprimer des coworkers, ainsi que les données, les états de chargement et les erreurs associés à chaque mutation.
 */
export default function useCoworkerMutations(): {
  createCoworker: useMutation.MutationFunction<
    boolean,
    { input: Omit<Coworker, "id"> },
    ApolloCache
  >;
  createCoworkerData: boolean | null | undefined;
  createCoworkerLoading: boolean;
  createCoworkerError: ErrorLike | undefined;
  editCoworker: useMutation.MutationFunction<
    boolean,
    { id: string; input: Partial<Coworker> },
    ApolloCache
  >;
  editCoworkerData: boolean | null | undefined;
  editCoworkerLoading: boolean;
  editCoworkerError: ErrorLike | undefined;
  deleteCoworker: useMutation.MutationFunction<
    boolean,
    { id: string },
    ApolloCache
  >;
  deleteCoworkerData: boolean | null | undefined;
  deleteCoworkerLoading: boolean;
  deleteCoworkerError: ErrorLike | undefined;
} {
  // Ajouter un coworker
  const [
    createCoworker,
    {
      data: createCoworkerData,
      loading: createCoworkerLoading,
      error: createCoworkerError,
    },
  ] = useMutation<boolean, { input: Omit<Coworker, "id"> }>(
    CREATE_COWORKER_MUTATION,
  );

  // Modifier un coworker
  const [
    editCoworker,
    {
      data: editCoworkerData,
      loading: editCoworkerLoading,
      error: editCoworkerError,
    },
  ] = useMutation<boolean, { id: string; input: Partial<Coworker> }>(
    UPDATE_COWORKER_MUTATION,
  );

  // Supprimer un coworker
  const [
    deleteCoworker,
    {
      data: deleteCoworkerData,
      loading: deleteCoworkerLoading,
      error: deleteCoworkerError,
    },
  ] = useMutation<boolean, { id: string }>(DELETE_COWORKER_MUTATION);

  return {
    createCoworker,
    createCoworkerData,
    createCoworkerLoading,
    createCoworkerError,
    editCoworker,
    editCoworkerData,
    editCoworkerLoading,
    editCoworkerError,
    deleteCoworker,
    deleteCoworkerData,
    deleteCoworkerLoading,
    deleteCoworkerError,
  };
}
