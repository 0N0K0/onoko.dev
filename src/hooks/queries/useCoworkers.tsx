import { useQuery } from "@apollo/client/react";
import { COWORKERS_QUERY } from "../../services/coworker/coworkerQueries";
import type { Coworker } from "../../types/entities/coworkerTypes";
import useRoles from "./useRoles";
import type { Role } from "../../types/entities/roleTypes";

export default function useCoworkers() {
  const { roles } = useRoles();
  const { loading, error, data, refetch } = useQuery<{ coworkers: Coworker[] }>(
    COWORKERS_QUERY,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  const coworkers = (data?.coworkers ?? []).map((coworker) => {
    if (coworker.roles) {
      return {
        ...coworker,
        roles: coworker.roles.map((role) => {
          if (typeof role === "string") {
            const fullRole = roles.find((r) => r.id === role);
            return fullRole || {};
          }
          return role;
        }) as Role[],
      };
    }
    return coworker;
  });
  return { coworkers, loading, error, refetch };
}
