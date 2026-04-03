import { createContext, useEffect, useMemo, useState } from "react";
import type { RoleContextType } from "../types/roleTypes";
import apolloClient from "../services/appolloClient";
import { ROLES_QUERY } from "../services/role/roleQueries";

export const RoleContext = createContext<RoleContextType | undefined>(
  undefined,
);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<RoleContextType["loading"]>(true);
  const [roles, setRoles] = useState<RoleContextType["roles"]>(undefined);
  const [itemsError, setItemsError] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setItemsError("");
    try {
      const { data } = await apolloClient.query<{ [key: string]: any[] }>({
        query: ROLES_QUERY,
        fetchPolicy: "no-cache",
      });
      setRoles(data ? data.roles : []);
    } catch (e: any) {
      setItemsError(e.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const contextValue = useMemo(
    () => ({ roles, setRoles, loading, itemsError }),
    [roles, setRoles, loading, itemsError],
  );
  return (
    <RoleContext.Provider value={contextValue}>{children}</RoleContext.Provider>
  );
}
