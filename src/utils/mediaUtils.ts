import type { Media } from "../types/entities/mediaTypes";

/**
 * Vérifie si une valeur est un média résolu (c'est-à-dire un objet Media avec les propriétés nécessaires).
 * @param value - La valeur à vérifier.
 * @returns true si la valeur est un média résolu, sinon false.
 */
export function isResolvedMedia(value: unknown): value is Media {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    "path" in value
  );
}
