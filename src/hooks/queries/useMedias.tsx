import { useQuery } from "@apollo/client/react";
import { MEDIAS_QUERY } from "../../services/media/mediaQueries";
import useCategories from "./useCategories";
import type { Media } from "../../types/entities/mediaTypes";
import { normalizeRef } from "../../utils/normalizeRef";

export default function useMedias() {
  const { categories } = useCategories();
  const { loading, error, data, refetch } = useQuery<{ medias: Media[] }>(
    MEDIAS_QUERY,
    { fetchPolicy: "cache-and-network" },
  );
  const medias = (data?.medias ?? []).map((media) => ({
    ...media,
    category: normalizeRef(media.category, categories) ?? media.category,
  }));
  return { medias, loading, error, refetch };
}
