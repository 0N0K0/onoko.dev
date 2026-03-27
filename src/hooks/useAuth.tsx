import { useContext } from "react";
import type { AuthContextType } from "../types/authTypes";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook personnalisé pour accéder au contexte d'authentification.
 * Doit être utilisé à l'intérieur d'un composant enveloppé par AuthProvider.
 * @returns {AuthContextType} Le contexte d'authentification avec les fonctions et états disponibles.
 */
export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
