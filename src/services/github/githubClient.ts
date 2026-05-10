import {
  GITHUB_GRAPHQL_URL,
  GITHUB_REST_URL,
  GITHUB_TOKEN,
} from "../../constants/githubConstants";
import type { GitHubStatsQueryResponse } from "../../types/entities/githubTypes";

async function fetchGitHubGraphQL<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  const json = await response.json();

  if (json.errors?.length) {
    throw new Error(
      json.errors.map((e: { message: string }) => e.message).join(", "),
    );
  }

  return json.data as T;
}

/**
 * Récupère le nombre de packages d'une organisation via REST.
 * Plus fiable que le champ `packages` GraphQL pour les GitHub Packages npm.
 * Scope requis : read:packages
 */
export async function fetchOrgPackagesCount(orgLogin: string): Promise<number> {
  // Paginer jusqu'à 100 packages par page (max GitHub)
  let total = 0;
  let page = 1;
  while (true) {
    const response = await fetch(
      `${GITHUB_REST_URL}/orgs/${encodeURIComponent(orgLogin)}/packages?package_type=npm&per_page=100&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    if (!response.ok) return total; // org inaccessible ou pas de packages
    const packages: unknown[] = await response.json();
    total += packages.length;
    if (packages.length < 100) break;
    page++;
  }
  return total;
}

/**
 * Récupère les stats GitHub pour une année donnée.
 * contributionsCollection est limité à une fenêtre d'un an maximum.
 */
export async function fetchGitHubStatsForYear(
  year: number,
): Promise<GitHubStatsQueryResponse> {
  const from = new Date(Date.UTC(year, 0, 1)).toISOString();
  const to = new Date(
    Math.min(Date.UTC(year, 11, 31, 23, 59, 59, 999), Date.now()),
  ).toISOString();

  const { GITHUB_STATS_QUERY } = await import("./githubQueries");

  return fetchGitHubGraphQL<GitHubStatsQueryResponse>(GITHUB_STATS_QUERY, {
    from,
    to,
  });
}
