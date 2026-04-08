import { useContext } from "react";
import type { MediaContextType } from "../types/entities/mediaTypes";
import { MediaContext } from "../context/MediaContext";

export function useMedia(): MediaContextType {
  const ctx = useContext(MediaContext);
  if (!ctx) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return ctx;
}
