import { Button, Divider, Skeleton, Typography, useTheme } from "@mui/material";
import Layout from "../../layout";
import { useContactForm } from "../../context/ContactFormContext";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import profil from "../../assets/images/profil.jpeg";
import useGitHubStats from "../../hooks/queries/useGitHubStats";
import Icon from "@mdi/react";
import { mdiTrayArrowDown } from "@mdi/js";

export default function AboutPage() {
  const theme = useTheme();
  const { openContactForm } = useContactForm();
  const { stats } = useGitHubStats();

  return (
    <Layout.Content
      sx={{
        flexDirection: "row",
        paddingX: { xs: 4, lg: 8 },
        columnGap: { xs: 4, lg: 8 },
        marginX: "auto !important",
      }}
    >
      {/* Contenu principal */}
      <ResponsiveStack
        rowGap={9}
        sx={{
          maxWidth: "656px",
        }}
      >
        {/* A propos */}
        <Typography
          variant="h1"
          sx={{ fontWeight: "100", textTransform: "uppercase" }}
        >
          Hello world!
        </Typography>
        <ResponsiveStack rowGap={3}>
          <Typography variant="bodySm">
            Je m'appelle Noémie Koelblen.
          </Typography>
          <Typography variant="bodySm">
            Je suis développeuse web full-stack, avec une forte appétence pour
            le backend, l'architecture applicative et les outils bien pensés.
          </Typography>
          <Typography variant="bodySm">
            Je travaille principalement avec PHP & Symfony, Node.js, React et
            Wordpress, tout en intervenant sur l'ensemble de l'écosystème qui
            gravite autour du développement moderne : design, UX,
            automatisation, tooling, DevOps, gestion de projet...
          </Typography>
          <Typography variant="bodySm">
            Viscéralement curieuse, j’aime comprendre comment les choses
            fonctionnent et construire des solutions propres, durables et
            utiles. J’ai tendance à m’investir à fond dans tout ce qui
            m’intéresse : creuser un problème, expérimenter, apprendre une
            nouvelle technologie, optimiser un workflow ou simplifier les
            manières de travailler.
          </Typography>
          <Typography variant="bodySm">
            Qu’il s’agisse d’un produit ambitieux, d’un besoin métier concret ou
            d’une idée en germe — je suis toujours partante pour participer à de
            nouveaux projets ou partager différents points de vue. Parlons en !
          </Typography>
        </ResponsiveStack>
        {/* Contact */}
        <Typography
          variant="h1"
          component="p"
          sx={{
            marginX: "auto",
            whiteSpace: "nowrap",
            WebkitBoxReflect:
              "below -24px linear-gradient(transparent, rgba(0, 0, 0, 0.25))",
            fontWeight: 100,
            color: theme.palette.primary.light,
            cursor: "pointer",
            transition: "color 0.5s ease-in-out",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
          onClick={openContactForm}
        >
          prendre contact
        </Typography>
        {/* Complément d'information */}
        <ResponsiveStack rowGap={3}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontStyle: "italic", color: theme.palette.text.secondary }}
          >
            Expérience de terrain
          </Typography>
          <Typography variant="bodySm">
            J'ai occupé pendant plus de 10 ans des fonctions administratives et
            de support technique : secrétariat, RH, comptabilité, assistance
            informatique...
          </Typography>
          <Typography variant="bodySm">
            Mais mon rapport au développement ne date pas de ma reconversion en
            2023.
            <br />
            Très vite, je ne me suis plus contentée d'utiliser les outils. J'ai
            appris le VBA, manipulé des bases SQL, configuré des logiciels
            métiers, fait du webscraping, de la PAO, de la DAO, automatisé des
            process — et formé mes pairs aux dispositifs numériques.
          </Typography>
          <Typography variant="bodySm">
            J'ai acquis de cette expérience rigueur, et compréhension fine des
            besoins métiers. Pour moi, la technique n’a de valeur que
            lorsqu’elle améliore le quotidien des personnes qui l’utilisent.
          </Typography>
        </ResponsiveStack>
      </ResponsiveStack>
      {/* Contenu complémentaire */}
      <ResponsiveStack
        component="aside"
        rowGap={6}
        sx={{
          width: "fit-content",
          alignItems: "center",
        }}
      >
        <img
          src={profil}
          style={{
            maxWidth: `432px`,
            aspectRatio: "1 / 1",
            objectFit: "cover",
            borderRadius: "50%",
            border: `2px solid ${theme.palette.primary.light}`,
            alignSelf: "flex-start",
          }}
        />
        {/* Stats */}
        <ResponsiveStack
          rowGap={3}
          sx={{
            "& li": { display: "list-item !important" },
          }}
        >
          <Divider />
          <ResponsiveStack>
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
          </ResponsiveStack>
          <Divider />
          <ResponsiveStack rowGap={3}>
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
                  width="3ch"
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
                    width="3ch"
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
                    width="3ch"
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
                    width="3ch"
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
          </ResponsiveStack>
          <ResponsiveStack>
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
                      (stats.totalCommits +
                        stats.totalPRs +
                        stats.issuesOpened) /
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
          </ResponsiveStack>
          <Divider />
        </ResponsiveStack>
        <Button
          startIcon={<Icon path={mdiTrayArrowDown} size={1} />}
          sx={{ minWidth: "208px" }}
        >
          Obtenir mon CV
        </Button>
      </ResponsiveStack>
    </Layout.Content>
  );
}

// J'ai eu le plaisir d'être le mentor de Noémie et de l'accompagner dans sa reconversion professionnelle en tant que développeuse web. J'ai été surpris par son écoute, sa capacité d'apprentissage ainsi que sa curiosité qui lui ont permis de dépasser à plusieurs reprises les attentes de différents projets. Noémie sera un vrai atout dans une équipe et s'adaptera facilement à de nouveaux challenges. Alix V. | 22/04/2024
