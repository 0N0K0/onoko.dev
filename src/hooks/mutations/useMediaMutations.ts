import { useMutation } from "@apollo/client/react";
import {
  ADD_MEDIA_MUTATION,
  REMOVE_MEDIA_MUTATION,
  UPDATE_MEDIA_MUTATION,
} from "../../services/media/mediaMutations";
import type { Media } from "../../types/entities/mediaTypes";
import type { ErrorLike } from "@apollo/client";
import type { ApolloCache } from "@apollo/client";

/**
 * Hook personnalisé pour gérer les mutations liées aux medias (ajout, modification, suppression).
 * Ce hook centralise la logique de mutation pour les medias, permettant ainsi de réutiliser le même code pour les différentes opérations.
 * Il utilise le hook `useEntityMutation` pour effectuer les mutations GraphQL et gérer les états de soumission, de succès et d'erreur.
 * @returns {
 *    addMedia: useMutation.MutationFunction<boolean, { file: File | null }, ApolloCache>;
 *    editMedia: useMutation.MutationFunction<boolean, Partial<Media>, ApolloCache>;
 *    deleteMedia: useMutation.MutationFunction<boolean, { id: string }, ApolloCache>;
 *    addMediaData: boolean | null | undefined;
 *    addMediaLoading: boolean;
 *    addMediaError: ErrorLike | undefined;
 *    editMediaData: boolean | null | undefined;
 *    editMediaLoading: boolean;
 *    editMediaError: ErrorLike | undefined;
 *    deleteMediaData: boolean | null | undefined;
 *    deleteMediaLoading: boolean;
 *    deleteMediaError: ErrorLike | undefined;
 * } Un objet contenant les fonctions de mutation pour ajouter, modifier et supprimer des medias, ainsi que les données, les états de chargement et les erreurs associés à chaque mutation.
 */
export default function useMediaMutations(): {
  addMedia: useMutation.MutationFunction<
    boolean,
    { file: File | null },
    ApolloCache
  >;
  addMediaData: boolean | null | undefined;
  addMediaLoading: boolean;
  addMediaError: ErrorLike | undefined;
  editMedia: useMutation.MutationFunction<boolean, Partial<Media>, ApolloCache>;
  editMediaData: boolean | null | undefined;
  editMediaLoading: boolean;
  editMediaError: ErrorLike | undefined;
  removeMedia: useMutation.MutationFunction<
    boolean,
    { id: string },
    ApolloCache
  >;
  removeMediaData: boolean | null | undefined;
  removeMediaLoading: boolean;
  removeMediaError: ErrorLike | undefined;
} {
  // Ajouter un media
  const [
    addMedia,
    { data: addMediaData, loading: addMediaLoading, error: addMediaError },
  ] = useMutation<boolean, { file: File | null }>(ADD_MEDIA_MUTATION);

  // Modifier un media
  const [
    editMedia,
    { data: editMediaData, loading: editMediaLoading, error: editMediaError },
  ] = useMutation<boolean, Partial<Media>>(UPDATE_MEDIA_MUTATION);

  // Supprimer un media
  const [
    removeMedia,
    {
      data: removeMediaData,
      loading: removeMediaLoading,
      error: removeMediaError,
    },
  ] = useMutation<boolean, { id: string }>(REMOVE_MEDIA_MUTATION);

  return {
    addMedia,
    addMediaData,
    addMediaLoading,
    addMediaError,
    editMedia,
    editMediaData,
    editMediaLoading,
    editMediaError,
    removeMedia,
    removeMediaData,
    removeMediaLoading,
    removeMediaError,
  };
}
