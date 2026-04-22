import { useQuery } from "@apollo/client/react";
import { STACKS_QUERY } from "../../services/stack/stackQueries";
import useCategories from "./useCategories";
import type { Stack } from "../../types/entities/stackTypes";
import useMedias from "./useMedias";
import { normalizeRef } from "../../utils/normalizeRef";

export default function useStacks() {
  const { categories } = useCategories();
  const { medias } = useMedias();
  const { loading, error, data, refetch } = useQuery<{ stacks: Stack[] }>(
    STACKS_QUERY,
    { fetchPolicy: "cache-and-network" },
  );
  const stacks = (data?.stacks ?? []).map((stack) => ({
    ...stack,
    icon: normalizeRef(stack.icon, medias),
    category: normalizeRef(stack.category, categories),
  }));
  return { stacks, loading, error, refetch };
}
