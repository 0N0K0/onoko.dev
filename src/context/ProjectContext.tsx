import { createContext, useEffect, useMemo, useState } from "react";
import apolloClient from "../services/appolloClient";
import type { ProjectContextType } from "../types/entities/projectTypes";
import { PROJECTS_QUERY } from "../services/project/projectQueries";

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined,
);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<ProjectContextType["loading"]>(true);
  const [projects, setProjects] =
    useState<ProjectContextType["projects"]>(undefined);
  const [itemsError, setItemsError] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setItemsError("");
    try {
      const { data } = await apolloClient.query<{ [key: string]: any[] }>({
        query: PROJECTS_QUERY,
        fetchPolicy: "no-cache",
      });
      setProjects(data ? data.projects : []);
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
    () => ({ projects, setProjects, loading, itemsError }),
    [projects, setProjects, loading, itemsError],
  );
  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
}
