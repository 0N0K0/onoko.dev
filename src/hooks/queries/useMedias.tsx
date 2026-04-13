import { useQuery } from "@apollo/client/react";
import { MEDIAS_QUERY } from "../../services/media/mediaQueries";
import useCategories from "./useCategories";
import type { Media } from "../../types/entities/mediaTypes";

export default function useMedias() {
  const { categories } = useCategories();
  const { loading, error, data, refetch } = useQuery<{ medias: Media[] }>(
    MEDIAS_QUERY,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  const medias = (data?.medias ?? []).map((media) => {
    if (media.category) {
      return {
        ...media,
        category: categories.find((c) => c.id === media.category) || media.category,
      };
    }
    return media;
  });
  return { medias, loading, error, refetch };
}
