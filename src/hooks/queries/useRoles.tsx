import { useQuery } from "@apollo/client/react";
import type { Role } from "../../types/entities/roleTypes";
import { ROLES_QUERY } from "../../services/role/roleQueries";

export default function useRoles() {
  const { loading, error, data, refetch } = useQuery<{ roles: Role[] }>(
    ROLES_QUERY,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  return { roles: data?.roles ?? [], loading, error, refetch };
}
