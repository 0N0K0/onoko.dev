import { useMutation } from "@apollo/client/react";
import {
  CREATE_STACK_MUTATION,
  DELETE_STACK_MUTATION,
  UPDATE_STACK_MUTATION,
} from "../../services/stack/stackMutations";
import type { Stack } from "../../types/entities/stackTypes";
import type { ErrorLike } from "@apollo/client";
import type { ApolloCache } from "@apollo/client";

/**
 * Hook personnalisé pour gérer les mutations liées aux stacks (ajout, modification, suppression).
 * Ce hook centralise la logique de mutation pour les stacks, permettant ainsi de réutiliser le même code pour les différentes opérations.
 * Il utilise le hook `useEntityMutation` pour effectuer les mutations GraphQL et gérer les états de soumission, de succès et d'erreur.
 * @returns {
 *    createStack: useMutation.MutationFunction<boolean, Omit<Stack, "id">, ApolloCache>;
 *    editStack: useMutation.MutationFunction<boolean, Partial<Stack>, ApolloCache>;
 *    deleteStack: useMutation.MutationFunction<boolean, { id: string }, ApolloCache>;
 *    createStackData: boolean | null | undefined;
 *    createStackLoading: boolean;
 *    createStackError: ErrorLike | undefined;
 *    editStackData: boolean | null | undefined;
 *    editStackLoading: boolean;
 *    editStackError: ErrorLike | undefined;
 *    deleteStackData: boolean | null | undefined;
 *    deleteStackLoading: boolean;
 *    deleteStackError: ErrorLike | undefined;
 * } Un objet contenant les fonctions de mutation pour ajouter, modifier et supprimer des stacks, ainsi que les données, les états de chargement et les erreurs associés à chaque mutation.
 */
export default function useStackMutations(): {
  createStack: useMutation.MutationFunction<
    boolean,
    Omit<Stack, "id">,
    ApolloCache
  >;
  createStackData: boolean | null | undefined;
  createStackLoading: boolean;
  createStackError: ErrorLike | undefined;
  editStack: useMutation.MutationFunction<boolean, Partial<Stack>, ApolloCache>;
  editStackData: boolean | null | undefined;
  editStackLoading: boolean;
  editStackError: ErrorLike | undefined;
  deleteStack: useMutation.MutationFunction<
    boolean,
    { id: string },
    ApolloCache
  >;
  deleteStackData: boolean | null | undefined;
  deleteStackLoading: boolean;
  deleteStackError: ErrorLike | undefined;
} {
  // Ajouter un stack
  const [
    createStack,
    {
      data: createStackData,
      loading: createStackLoading,
      error: createStackError,
    },
  ] = useMutation<boolean, Omit<Stack, "id">>(CREATE_STACK_MUTATION);

  // Modifier un stack
  const [
    editStack,
    { data: editStackData, loading: editStackLoading, error: editStackError },
  ] = useMutation<boolean, Partial<Stack>>(UPDATE_STACK_MUTATION);

  // Supprimer un stack
  const [
    deleteStack,
    {
      data: deleteStackData,
      loading: deleteStackLoading,
      error: deleteStackError,
    },
  ] = useMutation<boolean, { id: string }>(DELETE_STACK_MUTATION);

  return {
    createStack,
    createStackData,
    createStackLoading,
    createStackError,
    editStack,
    editStackData,
    editStackLoading,
    editStackError,
    deleteStack,
    deleteStackData,
    deleteStackLoading,
    deleteStackError,
  };
}
