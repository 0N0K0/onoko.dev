import { useQuery } from "@apollo/client/react";
import { COWORKERS_QUERY } from "../../services/coworker/coworkerQueries";
import type { Coworker } from "../../types/entities/coworkerTypes";
import useRoles from "./useRoles";
import { normalizeRefs } from "../../utils/normalizeRef";

export default function useCoworkers() {
  const { roles } = useRoles();
  const { loading, error, data, refetch } = useQuery<{ coworkers: Coworker[] }>(
    COWORKERS_QUERY,
    { fetchPolicy: "cache-and-network" },
  );
  const coworkers = (data?.coworkers ?? []).map((coworker) => ({
    ...coworker,
    roles: coworker.roles
      ? normalizeRefs(coworker.roles, roles)
      : coworker.roles,
  }));
  return { coworkers, loading, error, refetch };
}
