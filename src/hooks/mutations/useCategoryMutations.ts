import { useMutation } from "@apollo/client/react";
import {
  CREATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
} from "../../services/category/categoryMutations";
import type { Category } from "../../types/entities/categoryTypes";
import type { ErrorLike } from "@apollo/client";
import type { ApolloCache } from "@apollo/client";

/**
 * Hook personnalisé pour gérer les mutations liées aux catégories (ajout, modification, suppression).
 * Ce hook centralise la logique de mutation pour les catégories, permettant ainsi de réutiliser le même code pour les différentes opérations.
 * Il utilise le hook `useEntityMutation` pour effectuer les mutations GraphQL et gérer les états de soumission, de succès et d'erreur.
 * @returns {
 *    createCategory: useMutation.MutationFunction<boolean, Omit<Category, "id">, ApolloCache>;
 *    editCategory: useMutation.MutationFunction<boolean, Partial<Category>, ApolloCache>;
 *    deleteCategory: useMutation.MutationFunction<boolean, { id: string }, ApolloCache>;
 *    createCategoryData: boolean | null | undefined;
 *    createCategoryLoading: boolean;
 *    createCategoryError: ErrorLike | undefined;
 *    editCategoryData: boolean | null | undefined;
 *    editCategoryLoading: boolean;
 *    editCategoryError: ErrorLike | undefined;
 *    deleteCategoryData: boolean | null | undefined;
 *    deleteCategoryLoading: boolean;
 *    deleteCategoryError: ErrorLike | undefined;
 * } Un objet contenant les fonctions de mutation pour ajouter, modifier et supprimer des catégories, ainsi que les données, les états de chargement et les erreurs associés à chaque mutation.
 */
export default function useCategoryMutations(): {
  createCategory: useMutation.MutationFunction<
    boolean,
    { input: Omit<Category, "id"> },
    ApolloCache
  >;
  createCategoryData: boolean | null | undefined;
  createCategoryLoading: boolean;
  createCategoryError: ErrorLike | undefined;
  editCategory: useMutation.MutationFunction<
    boolean,
    { id: string; input: Partial<Category> },
    ApolloCache
  >;
  editCategoryData: boolean | null | undefined;
  editCategoryLoading: boolean;
  editCategoryError: ErrorLike | undefined;
  deleteCategory: useMutation.MutationFunction<
    boolean,
    { id: string },
    ApolloCache
  >;
  deleteCategoryData: boolean | null | undefined;
  deleteCategoryLoading: boolean;
  deleteCategoryError: ErrorLike | undefined;
} {
  // Ajouter une catégorie
  const [
    createCategory,
    {
      data: createCategoryData,
      loading: createCategoryLoading,
      error: createCategoryError,
    },
  ] = useMutation<boolean, { input: Omit<Category, "id"> }>(
    CREATE_CATEGORY_MUTATION,
  );

  // Modifier une catégorie
  const [
    editCategory,
    {
      data: editCategoryData,
      loading: editCategoryLoading,
      error: editCategoryError,
    },
  ] = useMutation<boolean, { id: string; input: Partial<Category> }>(
    UPDATE_CATEGORY_MUTATION,
  );

  // Supprimer une ou plusieurs catégories
  const [
    deleteCategory,
    {
      data: deleteCategoryData,
      loading: deleteCategoryLoading,
      error: deleteCategoryError,
    },
  ] = useMutation<boolean, { id: string }>(DELETE_CATEGORY_MUTATION);

  return {
    createCategory,
    createCategoryData,
    createCategoryLoading,
    createCategoryError,
    editCategory,
    editCategoryData,
    editCategoryLoading,
    editCategoryError,
    deleteCategory,
    deleteCategoryData,
    deleteCategoryLoading,
    deleteCategoryError,
  };
}
