const ORG_REPO_LANGUAGES_FRAGMENT = `
  fragment OrgRepoLanguages on Organization {
    projectsV2(first: 1) {
      totalCount
    }
    repositories(
      first: 100
      isFork: false
      orderBy: { field: PUSHED_AT, direction: DESC }
    ) {
      totalCount
      nodes {
        languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            size
            node { name color }
          }
        }
      }
    }
  }
`;

export const GITHUB_STATS_QUERY = `
  ${ORG_REPO_LANGUAGES_FRAGMENT}

  query GitHubStats($from: DateTime!, $to: DateTime!) {
    viewer {
      createdAt
      login

      publicRepos: repositories(privacy: PUBLIC, ownerAffiliations: OWNER) {
        totalCount
      }
      privateRepos: repositories(privacy: PRIVATE, ownerAffiliations: OWNER) {
        totalCount
      }
      archivedRepos: repositories(isArchived: true, ownerAffiliations: OWNER) {
        totalCount
      }

      packages(first: 100) {
        totalCount
      }

      projectsV2(first: 1) {
        totalCount
      }

      pullRequests {
        totalCount
      }

      issues(first: 1) {
        totalCount
      }

      organizations(first: 100) {
        nodes {
          login
          projectsV2(first: 1) {
            totalCount
          }
        }
      }

      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        commitContributionsByRepository(maxRepositories: 100) {
          repository {
            nameWithOwner
            owner { login }
          }
        }
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }

      repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          languages(first: 20, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node { name color }
            }
          }
        }
      }
    }

    org0N0K0: organization(login: "0N0K0") {
      ...OrgRepoLanguages
    }
    orgImasioOnoko: organization(login: "IMASIO-ONOKO") {
      ...OrgRepoLanguages
    }
  }
`;
