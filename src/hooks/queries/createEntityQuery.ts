import { useQuery } from "@apollo/client/react";
import type { ErrorLike, DocumentNode } from "@apollo/client";

export function createEntityQuery<T, K extends string>(
  gqlQuery: DocumentNode,
  key: K,
) {
  return function () {
    const { loading, error, data, refetch } = useQuery<{ [P in K]: T[] }>(
      gqlQuery,
      { fetchPolicy: "cache-and-network" },
    );
    return {
      [key]: data?.[key] ?? [],
      loading,
      error,
      refetch,
    } as { [P in K]: T[] } & {
      loading: boolean;
      error: ErrorLike | undefined;
      refetch: () => void;
    };
  };
}
