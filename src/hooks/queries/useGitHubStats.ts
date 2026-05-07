import { useEffect, useState } from "react";
import { fetchGitHubStatsForYear, fetchOrgPackagesCount } from "../../services/github/githubClient";
import type {
  GitHubContributionDay,
  GitHubLanguage,
  GitHubStats,
} from "../../types/entities/githubTypes";

const ORG_LOGINS = ["0N0K0", "IMASIO-ONOKO"] as const;

function computeStreaks(days: GitHubContributionDay[]): {
  current: number;
  longest: number;
} {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let longest = 0;
  let current = 0;
  let streak = 0;
  let prevDate: Date | null = null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const day of sorted) {
    if (day.contributionCount === 0) {
      streak = 0;
      prevDate = null;
      continue;
    }
    const d = new Date(day.date);
    if (prevDate === null) {
      streak = 1;
    } else {
      const diff = (d.getTime() - prevDate.getTime()) / 86400000;
      streak = diff === 1 ? streak + 1 : 1;
    }
    prevDate = d;
    if (streak > longest) longest = streak;

    // Le streak courant : valide uniquement si le dernier jour actif est hier ou aujourd'hui
    const diff = (today.getTime() - d.getTime()) / 86400000;
    if (diff <= 1) current = streak;
  }

  return { current, longest };
}

function aggregateLanguages(
  nodes: { languages: { edges: { size: number; node: { name: string; color: string | null } }[] } }[],
): GitHubLanguage[] {
  const map = new Map<string, GitHubLanguage>();
  for (const repo of nodes) {
    for (const edge of repo.languages.edges) {
      const existing = map.get(edge.node.name);
      if (existing) {
        existing.size += edge.size;
      } else {
        map.set(edge.node.name, { name: edge.node.name, color: edge.node.color, size: edge.size });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => b.size - a.size);
}

export default function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const currentYear = new Date().getFullYear();

        // Première requête pour obtenir createdAt et les données statiques
        const firstResponse = await fetchGitHubStatsForYear(currentYear);
        if (cancelled) return;

        const viewer = firstResponse.viewer;
        const accountCreatedYear = new Date(viewer.createdAt).getFullYear();

        // Itérer sur toutes les années depuis la création du compte
        const years = Array.from(
          { length: currentYear - accountCreatedYear + 1 },
          (_, i) => accountCreatedYear + i,
        );

        const allResponses = await Promise.all(
          years
            .filter((y) => y !== currentYear) // déjà récupéré
            .map(fetchGitHubStatsForYear),
        );
        if (cancelled) return;

        const allContributionDays: GitHubContributionDay[] = [];
        const seenDates = new Set<string>();
        const seenRepos = new Map<string, string>(); // nameWithOwner → ownerLogin
        let totalCommits = 0;

        // Agréger toutes les années (tri chronologique pour cohérence)
        const allYearResponses = [...allResponses].sort(
          (a, b) =>
            new Date(a.viewer.contributionsCollection.contributionCalendar.weeks[0]?.contributionDays[0]?.date ?? 0).getTime() -
            new Date(b.viewer.contributionsCollection.contributionCalendar.weeks[0]?.contributionDays[0]?.date ?? 0).getTime(),
        );
        allYearResponses.push(firstResponse);

        for (const res of allYearResponses) {
          const col = res.viewer.contributionsCollection;
          totalCommits += col.totalCommitContributions;
          for (const contrib of col.commitContributionsByRepository) {
            if (!seenRepos.has(contrib.repository.nameWithOwner)) {
              seenRepos.set(contrib.repository.nameWithOwner, contrib.repository.owner.login);
            }
          }
          for (const week of col.contributionCalendar.weeks) {
            for (const day of week.contributionDays) {
              if (!seenDates.has(day.date)) {
                seenDates.add(day.date);
                allContributionDays.push(day);
              }
            }
          }
        }

        const activeDays = allContributionDays.filter((d) => d.contributionCount > 0);
        const { current: currentStreak, longest: longestStreak } = computeStreaks(allContributionDays);

        const sortedActive = [...activeDays].sort((a, b) => a.date.localeCompare(b.date));
        const firstActiveDate = sortedActive[0]?.date ?? null;
        const lastActiveDate = sortedActive.at(-1)?.date ?? null;

        // Semaines réellement écoulées depuis la création du compte
        const accountCreatedAt = new Date(viewer.createdAt);
        const totalWeeks = Math.max(
          1,
          Math.ceil((Date.now() - accountCreatedAt.getTime()) / (7 * 86400000)),
        );
        const commitsPerWeek = totalCommits / totalWeeks;

        // Vélocité : 4 dernières semaines du calendrier de l'année courante
        const last4Weeks = viewer.contributionsCollection.contributionCalendar.weeks.slice(-4);
        const velocityLast4Weeks =
          last4Weeks
            .flatMap((w) => w.contributionDays)
            .reduce((sum, d) => sum + d.contributionCount, 0) / 4;

        const accountAge = Math.floor(
          (Date.now() - new Date(viewer.createdAt).getTime()) / 86400000,
        );

        const orgLogins = new Set<string>(ORG_LOGINS);
        const reposContributedTo = seenRepos.size;
        const orgReposContributedTo = Array.from(seenRepos.values()).filter((login) =>
          orgLogins.has(login),
        ).length;
        const orgReposContributedToPerOrg = ORG_LOGINS.map(
          (login) => Array.from(seenRepos.values()).filter((v) => v === login).length,
        );
        // Repos externes = ni perso (viewer.login), ni orgs connues
        const externalReposContributedTo = Array.from(seenRepos.values()).filter(
          (login) => login !== viewer.login && !orgLogins.has(login),
        ).length;

        // Repos totaux par org (via l'API)
        const orgTotalRepoCounts = [
          firstResponse.org0N0K0?.repositories.totalCount ?? 0,
          firstResponse.orgImasioOnoko?.repositories.totalCount ?? 0,
        ];
        const orgTotalRepos = orgTotalRepoCounts.reduce((s, n) => s + n, 0);

        // Projects par org (toutes les orgs dont on est membre)
        const orgsProjects = viewer.organizations.nodes.reduce(
          (sum, org) => sum + org.projectsV2.totalCount,
          0,
        );
        const totalProjects = viewer.projectsV2.totalCount + orgsProjects;

        // Packages via REST — plus fiable que GraphQL pour les GitHub Packages
        const orgPackageCounts = await Promise.all(
          ORG_LOGINS.map(fetchOrgPackagesCount),
        );
        if (cancelled) return;
        const orgPackages = orgPackageCounts.reduce((s, n) => s + n, 0);

        const orgRepoNodes = [
          ...(firstResponse.org0N0K0?.repositories.nodes ?? []),
          ...(firstResponse.orgImasioOnoko?.repositories.nodes ?? []),
        ];

        setStats({
          publicRepos: viewer.publicRepos.totalCount,
          privateRepos: viewer.privateRepos.totalCount,
          archivedRepos: viewer.archivedRepos.totalCount,
          totalRepos:
            viewer.publicRepos.totalCount + viewer.privateRepos.totalCount + orgTotalRepos,
          packages: viewer.packages.totalCount + orgPackages,
          totalProjects,
          orgsProjects,
          issuesOpened: viewer.issues.totalCount,
          reposContributedTo,
          externalReposContributedTo,
          orgReposContributedTo,
          orgs: ORG_LOGINS.map((login, i) => ({
            login,
            packages: orgPackageCounts[i],
            reposContributedTo: orgReposContributedToPerOrg[i],
            totalRepos: orgTotalRepoCounts[i],
            totalProjects: viewer.organizations.nodes.find((o) => o.login === login)?.projectsV2.totalCount ?? 0,
          })),
          totalPRs: viewer.pullRequests.totalCount,
          totalCommits,
          languages: aggregateLanguages([
            ...viewer.repositories.nodes,
            ...orgRepoNodes,
          ]),
          activeDays: activeDays.length,
          commitsPerWeek: Math.round(commitsPerWeek * 10) / 10,
          velocityLast4Weeks: Math.round(velocityLast4Weeks * 10) / 10,
          currentStreak,
          longestStreak,
          firstActiveDate,
          lastActiveDate,
          accountAge,
        });
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading, error };
}
