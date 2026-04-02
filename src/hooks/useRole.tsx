import { useContext } from "react";
import type { RoleContextType } from "../types/roleTypes";
import { RoleContext } from "../context/RoleContext";

export function useRole(): RoleContextType {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return ctx;
}
