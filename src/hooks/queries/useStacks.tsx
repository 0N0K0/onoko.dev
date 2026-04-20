import { useQuery } from "@apollo/client/react";
import { STACKS_QUERY } from "../../services/stack/stackQueries";
import useCategories from "./useCategories";
import type { Stack } from "../../types/entities/stackTypes";
import useMedias from "./useMedias";

export default function useStacks() {
  const { categories } = useCategories();
  const { medias } = useMedias();
  const { loading, error, data, refetch } = useQuery<{ stacks: Stack[] }>(
    STACKS_QUERY,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  const stacks = (data?.stacks ?? []).map((stack) => {
    let newStack = { ...stack };
    if (stack.icon) {
      newStack.icon = medias?.find((m) => m.id === stack.icon);
    }
    if (stack.category) {
      newStack.category = categories.find((c) => c.id === stack.category);
    }
    return newStack;
  });
  return { stacks, loading, error, refetch };
}
