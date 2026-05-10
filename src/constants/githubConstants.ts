export const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
export const GITHUB_REST_URL = "https://api.github.com";

/**
 * Token GitHub avec les scopes : read:user, read:packages, read:org
 * Ce token est en lecture seule et ne donne accès qu'aux données publiques + métriques utilisateur.
 */
export const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string;
