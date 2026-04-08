import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import type { ProjectContextType } from "../types/entities/projectTypes";

export function useProject(): ProjectContextType {
  const ctx = useContext(ProjectContext);
  if (!ctx) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return ctx;
}
