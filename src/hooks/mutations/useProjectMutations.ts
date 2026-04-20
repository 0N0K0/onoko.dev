import { useMutation } from "@apollo/client/react";
import {
  CREATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  UPDATE_PROJECT_MUTATION,
} from "../../services/project/projectMutations";
import type { Project } from "../../types/entities/projectTypes";
import type { ErrorLike } from "@apollo/client";
import type { ApolloCache } from "@apollo/client";

/**
 * Hook personnalisé pour gérer les mutations liées aux projects (ajout, modification, suppression).
 * Ce hook centralise la logique de mutation pour les projects, permettant ainsi de réutiliser le même code pour les différentes opérations.
 * Il utilise le hook `useEntityMutation` pour effectuer les mutations GraphQL et gérer les états de soumission, de succès et d'erreur.
 * @returns {
 *    createProject: useMutation.MutationFunction<boolean, { input: Omit<Project, "id"> }, ApolloCache>;
 *    editProject: useMutation.MutationFunction<boolean, { id: string; input: Partial<Project> }, ApolloCache>;
 *    deleteProject: useMutation.MutationFunction<boolean, { id: string }, ApolloCache>;
 *    createProjectData: boolean | null | undefined;
 *    createProjectLoading: boolean;
 *    createProjectError: ErrorLike | undefined;
 *    editProjectData: boolean | null | undefined;
 *    editProjectLoading: boolean;
 *    editProjectError: ErrorLike | undefined;
 *    deleteProjectData: boolean | null | undefined;
 *    deleteProjectLoading: boolean;
 *    deleteProjectError: ErrorLike | undefined;
 * } Un objet contenant les fonctions de mutation pour ajouter, modifier et supprimer des projects, ainsi que les données, les états de chargement et les erreurs associés à chaque mutation.
 */
export default function useProjectMutations(): {
  createProject: useMutation.MutationFunction<
    boolean,
    { input: Omit<Project, "id"> },
    ApolloCache
  >;
  createProjectData: boolean | null | undefined;
  createProjectLoading: boolean;
  createProjectError: ErrorLike | undefined;
  editProject: useMutation.MutationFunction<
    boolean,
    { id: string; input: Partial<Project> },
    ApolloCache
  >;
  editProjectData: boolean | null | undefined;
  editProjectLoading: boolean;
  editProjectError: ErrorLike | undefined;
  deleteProject: useMutation.MutationFunction<
    boolean,
    { id: string },
    ApolloCache
  >;
  deleteProjectData: boolean | null | undefined;
  deleteProjectLoading: boolean;
  deleteProjectError: ErrorLike | undefined;
} {
  // Ajouter un project
  const [
    createProject,
    {
      data: createProjectData,
      loading: createProjectLoading,
      error: createProjectError,
    },
  ] = useMutation<boolean, { input: Omit<Project, "id"> }>(
    CREATE_PROJECT_MUTATION,
  );

  // Modifier un project
  const [
    editProject,
    {
      data: editProjectData,
      loading: editProjectLoading,
      error: editProjectError,
    },
  ] = useMutation<
    boolean,
    {
      id: string;
      input: Partial<Project>;
    }
  >(UPDATE_PROJECT_MUTATION);

  // Supprimer un project
  const [
    deleteProject,
    {
      data: deleteProjectData,
      loading: deleteProjectLoading,
      error: deleteProjectError,
    },
  ] = useMutation<boolean, { id: string }>(DELETE_PROJECT_MUTATION);

  return {
    createProject,
    createProjectData,
    createProjectLoading,
    createProjectError,
    editProject,
    editProjectData,
    editProjectLoading,
    editProjectError,
    deleteProject,
    deleteProjectData,
    deleteProjectLoading,
    deleteProjectError,
  };
}
