import { Divider, Skeleton, Typography, useTheme } from "@mui/material";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import useGitHubStats from "../../hooks/queries/useGitHubStats";
import french from "../../assets/images/french.svg";
import english from "../../assets/images/english.svg";
import spanish from "../../assets/images/spanish.svg";
import { useBreakpoints } from "../../hooks/mediaQueries";

const LANGAGES = [
  { id: "french", label: "Français", level: "natif" },
  { id: "english", label: "Anglais", level: "courant" },
  { id: "spanish", label: "Espagnol", level: "notions" },
];

export default function ComplementaryProfileSection() {
  const theme = useTheme();
  const { isLg } = useBreakpoints();
  const { stats } = useGitHubStats();

  return (
    <ResponsiveStack rowGap={3} sx={{ width: "100%", alignItems: "center" }}>
      {!isLg && (
        <Typography
          variant="h1"
          component="h2"
          sx={{
            fontWeight: "100",
            textAlign: "center",
            color: theme.palette.text.secondary,
          }}
        >
          Instantané
        </Typography>
      )}

      {/* Stats */}
      <ResponsiveStack
        rowGap={3}
        sx={{
          width: "100%",
          "& li": { display: "list-item !important" },
        }}
      >
        <Divider />
        <ul style={{ marginLeft: "0" }}>
          <li>
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {stats.publicRepos +
                  stats.privateRepos +
                  (stats.orgs.find(
                    (o: { login: string; reposContributedTo: number }) =>
                      o.login === "0N0K0",
                  )?.reposContributedTo ?? 0) +
                  (stats.orgs.find(
                    (o: { login: string; reposContributedTo: number }) =>
                      o.login === "IMASIO-ONOKO",
                  )?.reposContributedTo ?? 0)}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="2ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            repositories dont{" "}
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {stats ? (
                  (stats.orgs.find(
                    (o: { login: string; reposContributedTo: number }) =>
                      o.login === "IMASIO-ONOKO",
                  )?.reposContributedTo ?? 0)
                ) : (
                  <Skeleton
                    variant="text"
                    width="2ch"
                    sx={{ display: "inline-block" }}
                  />
                )}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="3ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            au sein d'une organisation cofondée
          </li>
          <li>
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {stats.packages}{" "}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="3ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            packages publiés
          </li>
          <li>
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {stats.totalProjects -
                  stats.orgsProjects +
                  (stats.orgs.find(
                    (o: { login: string; totalProjects: number }) =>
                      o.login === "0N0K0",
                  )?.totalProjects ?? 0) +
                  (stats.orgs.find(
                    (o: { login: string; totalProjects: number }) =>
                      o.login === "IMASIO-ONOKO",
                  )?.totalProjects ?? 0)}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="1ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            projets structurés
          </li>
          <li>
            <span
              style={{
                color: theme.palette.primary.light,
                fontWeight: "bold",
              }}
            >
              9
            </span>{" "}
            projets Figma dont{" "}
            <span
              style={{
                color: theme.palette.primary.light,
                fontWeight: "bold",
              }}
            >
              1
            </span>{" "}
            librairie commune
          </li>
        </ul>
        <Divider />
        <Typography
          variant="bodySm"
          style={{
            fontStyle: "italic",
            color: theme.palette.text.secondary,
          }}
        >
          Depuis{" "}
          {stats && stats.firstActiveDate ? (
            new Date(stats.firstActiveDate).toLocaleDateString("fr-FR", {
              month: "long",
              year: "numeric",
            })
          ) : (
            <Skeleton
              variant="text"
              width="10ch"
              sx={{ display: "inline-block" }}
            />
          )}
        </Typography>
        <ul style={{ marginLeft: "0" }}>
          <li>
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {stats.issuesOpened}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="4ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            issues rédigées
          </li>
          <li>
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {stats.totalCommits}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="4ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            commits
          </li>
          <li>
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {stats.totalPRs}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="4ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            pull requests
          </li>
          <li>
            contributions sur{" "}
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {stats.externalReposContributedTo}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="2ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            repositories externes
          </li>
          <li>
            participations à{" "}
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {stats.orgsProjects -
                  (stats.orgs.find(
                    (o: { login: string; totalProjects: number }) =>
                      o.login === "IMASIO-ONOKO",
                  )?.totalProjects ?? 0) -
                  (stats.orgs.find(
                    (o: { login: string; totalProjects: number }) =>
                      o.login === "0N0K0",
                  )?.totalProjects ?? 0)}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="1ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            projets externes
          </li>
        </ul>
        <ul style={{ marginLeft: "0" }}>
          <li>
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {stats.activeDays}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="3ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            jours d'activité
          </li>
          <li>
            Moyenne de{" "}
            {stats ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {Math.round(
                  (stats.totalCommits + stats.totalPRs + stats.issuesOpened) /
                    (stats.activeDays / 5),
                )}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="2ch"
                sx={{ display: "inline-block" }}
              />
            )}{" "}
            contributions par semaine active
          </li>
          <li>
            Dernière contribution le{" "}
            {stats && stats.lastActiveDate ? (
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "bold",
                }}
              >
                {new Date(stats.lastActiveDate).toLocaleDateString("fr-FR")}
              </span>
            ) : (
              <Skeleton
                variant="text"
                width="10ch"
                sx={{ display: "inline-block" }}
              />
            )}
          </li>
        </ul>
        <Divider />
      </ResponsiveStack>
      {/* Langues */}
      <ResponsiveStack
        rowGap={3}
        sx={{
          width: "100%",
          "& li": {
            display: "list-item !important",
            "&::before": { display: "none !important" },
          },
        }}
      >
        <ul
          style={{
            marginLeft: "0",
            display: "flex",
            columnGap: 32,
            rowGap: 24,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {LANGAGES.map((lang) => (
            <li key={lang.id}>
              <img
                src={
                  lang.id === "french"
                    ? french
                    : lang.id === "english"
                      ? english
                      : spanish
                }
                alt={lang.label}
                style={{
                  height: "1.25rem",
                  verticalAlign: "middle",
                  marginRight: "0.5rem",
                }}
              />
              {lang.label} :{" "}
              <span
                style={{
                  color: theme.palette.primary.light,
                  fontWeight: "500",
                }}
              >
                {lang.level}
              </span>
            </li>
          ))}
        </ul>
        <Divider />
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
