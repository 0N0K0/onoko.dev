import { useMutation } from "@apollo/client/react";
import {
  CREATE_ROLE_MUTATION,
  DELETE_ROLE_MUTATION,
  UPDATE_ROLE_MUTATION,
} from "../../services/role/roleMutations";
import type { Role } from "../../types/entities/roleTypes";
import type { ErrorLike } from "@apollo/client";
import type { ApolloCache } from "@apollo/client";

/**
 * Hook personnalisé pour gérer les mutations liées aux roles (ajout, modification, suppression).
 * Ce hook centralise la logique de mutation pour les roles, permettant ainsi de réutiliser le même code pour les différentes opérations.
 * Il utilise le hook `useEntityMutation` pour effectuer les mutations GraphQL et gérer les états de soumission, de succès et d'erreur.
 * @returns {
 *    createRole: useMutation.MutationFunction<boolean, Omit<Role, "id">, ApolloCache>;
 *    editRole: useMutation.MutationFunction<boolean, Partial<Role>, ApolloCache>;
 *    deleteRole: useMutation.MutationFunction<boolean, { id: string }, ApolloCache>;
 *    createRoleData: boolean | null | undefined;
 *    createRoleLoading: boolean;
 *    createRoleError: ErrorLike | undefined;
 *    editRoleData: boolean | null | undefined;
 *    editRoleLoading: boolean;
 *    editRoleError: ErrorLike | undefined;
 *    deleteRoleData: boolean | null | undefined;
 *    deleteRoleLoading: boolean;
 *    deleteRoleError: ErrorLike | undefined;
 * } Un objet contenant les fonctions de mutation pour ajouter, modifier et supprimer des roles, ainsi que les données, les états de chargement et les erreurs associés à chaque mutation.
 */
export default function useRoleMutations(): {
  createRole: useMutation.MutationFunction<
    boolean,
    { input: Omit<Role, "id"> },
    ApolloCache
  >;
  createRoleData: boolean | null | undefined;
  createRoleLoading: boolean;
  createRoleError: ErrorLike | undefined;
  editRole: useMutation.MutationFunction<
    boolean,
    { id: string; input: Partial<Role> },
    ApolloCache
  >;
  editRoleData: boolean | null | undefined;
  editRoleLoading: boolean;
  editRoleError: ErrorLike | undefined;
  deleteRole: useMutation.MutationFunction<
    boolean,
    { id: string },
    ApolloCache
  >;
  deleteRoleData: boolean | null | undefined;
  deleteRoleLoading: boolean;
  deleteRoleError: ErrorLike | undefined;
} {
  // Ajouter un role
  const [
    createRole,
    {
      data: createRoleData,
      loading: createRoleLoading,
      error: createRoleError,
    },
  ] = useMutation<boolean, { input: Omit<Role, "id"> }>(CREATE_ROLE_MUTATION);

  // Modifier un role
  const [
    editRole,
    { data: editRoleData, loading: editRoleLoading, error: editRoleError },
  ] = useMutation<boolean, { id: string; input: Partial<Role> }>(
    UPDATE_ROLE_MUTATION,
  );

  // Supprimer un role
  const [
    deleteRole,
    {
      data: deleteRoleData,
      loading: deleteRoleLoading,
      error: deleteRoleError,
    },
  ] = useMutation<boolean, { id: string }>(DELETE_ROLE_MUTATION);

  return {
    createRole,
    createRoleData,
    createRoleLoading,
    createRoleError,
    editRole,
    editRoleData,
    editRoleLoading,
    editRoleError,
    deleteRole,
    deleteRoleData,
    deleteRoleLoading,
    deleteRoleError,
  };
}
