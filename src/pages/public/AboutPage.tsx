import {
  Button,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import Layout from "../../layout";
import { useContactForm } from "../../context/ContactFormContext";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import profil from "../../assets/images/profil.jpeg";
import useGitHubStats from "../../hooks/queries/useGitHubStats";
import Icon from "@mdi/react";
import {
  mdiEmail,
  mdiGithub,
  mdiLinkedin,
  mdiPhone,
  mdiTrayArrowDown,
} from "@mdi/js";
import french from "../../assets/images/french.svg";
import english from "../../assets/images/english.svg";
import spanish from "../../assets/images/spanish.svg";
import CustomIconButton from "../../components/custom/CustomIconButton";
import useTestimonies from "../../hooks/queries/useTestimonies";
import { WysiwygBox } from "../../components/custom/WysiwygBox";

const LANGAGES = [
  { id: "french", label: "Français", level: "natif" },
  { id: "english", label: "Anglais", level: "courant" },
  { id: "spanish", label: "Espagnol", level: "notions" },
];

export default function AboutPage() {
  const theme = useTheme();
  const { openContactForm } = useContactForm();
  const { stats } = useGitHubStats();
  const { testimonies } = useTestimonies();

  return (
    <Layout.Content
      rowGap={18}
      sx={{ paddingX: "0 !important", paddingBottom: 12 }}
    >
      <ResponsiveStack
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
            justifyContent: "space-between",
            paddingTop: "48px !important",
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
              Qu’il s’agisse d’un produit ambitieux, d’un besoin métier concret
              ou d’une idée en germe — je suis toujours partante pour participer
              à de nouveaux projets ou partager différents points de vue.
              Parlons en !
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
              J'ai occupé pendant plus de 10 ans des fonctions administratives
              et de support technique : secrétariat, RH, comptabilité,
              assistance informatique...
            </Typography>
            <Typography variant="bodySm">
              Mais mon rapport au développement ne date pas de ma reconversion
              en 2023.
              <br />
              Très vite, je ne me suis plus contentée d'utiliser les outils.
              J'ai appris le VBA, manipulé des bases SQL, configuré des
              logiciels métiers, fait du webscraping, de la PAO, de la DAO,
              automatisé des process — et formé mes pairs aux dispositifs
              numériques.
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
            minWidth: "544px",
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
            }}
          />
          <ResponsiveStack
            rowGap={3}
            sx={{ width: "100%", alignItems: "center" }}
          >
            <ResponsiveStack direction="row" sx={{ marginX: "-12px" }}>
              <CustomIconButton icon={mdiEmail} onClick={openContactForm} />
              <CustomIconButton icon={mdiPhone} href="tel:+33632077408" />
              <CustomIconButton
                icon={mdiGithub}
                href="https://github.com/Noemie-Koelblen"
              />
              <CustomIconButton
                icon={mdiLinkedin}
                href="https://www.linkedin.com/in/no%C3%A9mie-koelblen/"
              />
            </ResponsiveStack>
            <Button
              startIcon={<Icon path={mdiTrayArrowDown} size={1} />}
              sx={{ minWidth: "208px" }}
            >
              Obtenir mon CV
            </Button>
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
                      {new Date(stats.lastActiveDate).toLocaleDateString(
                        "fr-FR",
                      )}
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
                  columnGap: 2,
                  rowGap: 1.5,
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
            </ResponsiveStack>
          </ResponsiveStack>
        </ResponsiveStack>
      </ResponsiveStack>
      <ResponsiveStack
        sx={{
          flexDirection: "row",
          columnGap: 4,
          paddingX: { xs: 4, lg: 8 },
          marginTop: "48px !important",
          alignItems: "end",
        }}
      >
        {testimonies.map((testimony) => (
          <Card
            key={testimony.id}
            sx={{
              flex: "1",
              background: `linear-gradient(rgba(11, 12, 14, 0.9), ${theme.palette.background.paper}) padding-box, linear-gradient(180deg, ${theme.palette.background.paper}, ${theme.palette.primary.dark}) border-box`,
              backdropFilter: "blur(4px)",
              borderRadius: "0 0 8px 8px",
              border: `1px solid transparent`,
              zIndex: 2,
              padding: "0px 32px 36px",
              overflow: "visible",
              height: "fit-content",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: 6,
                padding: "0",
              }}
            >
              <ResponsiveStack sx={{ marginBottom: "auto !important" }}>
                <Typography
                  variant="h1"
                  component="h2"
                  sx={{
                    fontWeight: "900",
                    marginTop: "-24px !important",
                    textTransform: "uppercase",
                    letterSpacing: "-0.05em",
                    textAlign: "right",
                  }}
                >
                  {testimony.name}
                </Typography>
                <ResponsiveStack
                  sx={{
                    flexDirection: "row",
                    columnGap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  {/* <Typography
                      variant="bodyLg"
                      sx={{
                        fontStyle: "italic",
                        fontWeight: "100",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {testimony.company}
                    </Typography> */}
                  <Typography
                    variant="bodyLg"
                    sx={{
                      fontStyle: "italic",
                      fontWeight: "100",
                      color: theme.palette.text.secondary,
                      textAlign: "right",
                      width: "100%",
                    }}
                  >
                    {testimony.createdAt
                      ? testimony.createdAt.locale("fr").format("MMMM YYYY")
                      : ""}
                  </Typography>
                </ResponsiveStack>
              </ResponsiveStack>
              <WysiwygBox __html={testimony.content!} />
            </CardContent>
          </Card>
        ))}
      </ResponsiveStack>
    </Layout.Content>
  );
}
