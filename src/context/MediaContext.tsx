import { createContext, useEffect, useMemo, useState } from "react";
import type { MediaContextType } from "../types/entities/mediaTypes";
import apolloClient from "../services/appolloClient";
import { MEDIAS_QUERY } from "../services/media/mediaQueries";

export const MediaContext = createContext<MediaContextType | undefined>(
  undefined,
);

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<MediaContextType["loading"]>(true);
  const [medias, setMedias] = useState<MediaContextType["medias"]>(undefined);
  const [itemsError, setItemsError] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setItemsError("");
    try {
      const { data } = await apolloClient.query<{ [key: string]: any[] }>({
        query: MEDIAS_QUERY,
        fetchPolicy: "no-cache",
      });
      setMedias(data ? data.medias : []);
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
    () => ({ medias, setMedias, loading, itemsError }),
    [medias, setMedias, loading, itemsError],
  );
  return (
    <MediaContext.Provider value={contextValue}>
      {children}
    </MediaContext.Provider>
  );
}
