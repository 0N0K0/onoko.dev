import { useQuery } from "@apollo/client/react";
import type { Category } from "../../types/entities/categoryTypes";
import { CATEGORIES_QUERY } from "../../services/category/categoryQueries";

export default function useCategories() {
  const { loading, error, data, refetch } = useQuery<{
    categories: Category[];
  }>(CATEGORIES_QUERY, {
    fetchPolicy: "cache-and-network",
  });
  return { categories: data?.categories ?? [], loading, error, refetch };
}
