import { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";
import type { CategoryContextType } from "../types/entities/categoryTypes";

export function useCategory(): CategoryContextType {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return ctx;
}
