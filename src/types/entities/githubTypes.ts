export interface GitHubLanguage {
  name: string;
  color: string | null;
  size: number; // en octets
}

export interface GitHubContributionDay {
  date: string;
  contributionCount: number;
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

export interface GitHubContributionCalendar {
  totalContributions: number;
  weeks: GitHubContributionWeek[];
}

export interface GitHubContributionsCollection {
  totalCommitContributions: number;
  commitContributionsByRepository: Array<{
    repository: { nameWithOwner: string; owner: { login: string } };
  }>;
  contributionCalendar: GitHubContributionCalendar;
}

export interface GitHubRepositoryConnection {
  totalCount: number;
}

export interface GitHubRepositoryLanguagesEdge {
  size: number;
  node: { name: string; color: string | null };
}

export interface GitHubRepositoryNode {
  languages: {
    edges: GitHubRepositoryLanguagesEdge[];
  };
}

export interface GitHubOrgNode {
  projectsV2: { totalCount: number };
  repositories: {
    totalCount: number;
    nodes: GitHubRepositoryNode[];
  };
}

export interface GitHubViewer {
  createdAt: string;
  login: string;
  publicRepos: GitHubRepositoryConnection;
  privateRepos: GitHubRepositoryConnection;
  archivedRepos: GitHubRepositoryConnection;
  packages: { totalCount: number };
  projectsV2: { totalCount: number };
  organizations: {
    nodes: Array<{ login: string; projectsV2: { totalCount: number } }>;
  };
  pullRequests: { totalCount: number };
  issues: { totalCount: number };
  contributionsCollection: GitHubContributionsCollection;
  repositories: {
    nodes: GitHubRepositoryNode[];
  };
}

export interface GitHubStatsQueryResponse {
  viewer: GitHubViewer;
  org0N0K0: GitHubOrgNode | null;
  orgImasioOnoko: GitHubOrgNode | null;
}

// Données calculées exposées par le hook
export interface GitHubStats {
  // Repos perso
  publicRepos: number;
  privateRepos: number;
  archivedRepos: number;
  totalRepos: number;

  // Packages (perso + orgs)
  packages: number;

  // Projects (perso + toutes les orgs)
  totalProjects: number;
  orgsProjects: number;

  // Pull requests
  totalPRs: number;

  // Commits
  totalCommits: number;

  // Langages (triés par taille décroissante)
  languages: GitHubLanguage[];

  // Issues
  issuesOpened: number;

  // Contributions
  reposContributedTo: number; // total unique (perso + orgs + externes)
  externalReposContributedTo: number; // hors repos perso et orgs connues
  orgReposContributedTo: number;
  orgs: Array<{
    login: string;
    packages: number;
    reposContributedTo: number;
    totalRepos: number;
    totalProjects: number;
  }>;

  // Métriques calculées (depuis l'inscription)
  activeDays: number;
  commitsPerWeek: number;
  velocityLast4Weeks: number;
  currentStreak: number;
  longestStreak: number;
  firstActiveDate: string | null;
  lastActiveDate: string | null;
  accountAge: number; // en jours
}
