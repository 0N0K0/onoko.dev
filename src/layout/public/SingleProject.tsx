import { Link as ReactLink, useParams } from "react-router-dom";
import useProjects from "../../hooks/queries/useProjects";
import Layout from "..";
import ResponsiveTitle from "../../components/custom/ResponsiveTitle";
import {
  ResponsiveBox,
  ResponsiveImageList,
  ResponsiveStack,
} from "../../components/custom/ResponsiveLayout";
import { API_URL } from "../../constants/apiConstants";
import type { Media } from "../../types/entities/mediaTypes";
import {
  Box,
  Button,
  ImageListItem,
  Link,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ResponsiveBodyTypography from "../../components/custom/ResponsiveBodyTypography";
import Picture from "../../components/custom/Picture";
import { WysiwygBox } from "../../components/custom/WysiwygBox";
import { useAuthContext } from "../../context/AuthContext";
import type { Role } from "../../types/entities/roleTypes";
import useCoworkers from "../../hooks/queries/useCoworkers";

export function SingleProject() {
  const params = useParams();
  const { projects } = useProjects();
  const project = projects?.find((p) => p.slug === params.slug);
  const theme = useTheme();
  const { isAuthenticated } = useAuthContext();
  const { coworkers } = useCoworkers();

  const sections: { id: string; label: string }[] = [];

  if (project?.intro || project?.website?.url || project?.mockup?.url)
    sections.push({ id: "intro", label: "Introduction" });
  if (project?.mockup?.images && project.mockup.images.length > 0)
    sections.push({ id: "mockup", label: "Maquettes" });
  if (project?.roles && project.roles.length > 0)
    sections.push({ id: "roles", label: "Prestations" });
  if (project?.presentation) {
    if (project.presentation.context)
      sections.push({ id: "context", label: "Contexte" });

    if (project.presentation.client)
      sections.push({ id: "client", label: "Client" });

    if (project.presentation.issue)
      sections.push({ id: "issue", label: "Finalités" });

    if (project.presentation.audience)
      sections.push({ id: "audience", label: "Audience" });
  }
  if (project?.need) {
    if (project.need.features)
      sections.push({ id: "features", label: "Fonctionnalités" });

    if (project.need.functionalConstraints)
      sections.push({
        id: "functional-constraints",
        label: "Contraintes fonctionnelles",
      });

    if (project.need.technicalConstraints)
      sections.push({
        id: "technical-constraints",
        label: "Contraintes techniques",
      });
  }
  if (project?.coworkers && project.coworkers.length > 0)
    sections.push({ id: "team", label: "Équipe" });
  if (project?.organization) {
    if (project.organization.methodology)
      sections.push({ id: "methodology", label: "Gestion de projet" });

    if (project.organization.anticipation)
      sections.push({ id: "anticipation", label: "Anticipation" });

    if (project.organization.evolution)
      sections.push({ id: "evolution", label: "Évolutions" });

    if (project.organization.validation)
      sections.push({ id: "validation", label: "Validation" });
  }
  if (project?.stacks && project.stacks.length > 0)
    sections.push({ id: "technologies", label: "Technologies" });
  if (
    project?.kpis?.issues ||
    project?.kpis?.points ||
    project?.kpis?.commits ||
    project?.kpis?.pullRequests
  )
    sections.push({ id: "kpis", label: "KPI" });
  if (project?.feedback) {
    if (project.feedback.client)
      sections.push({ id: "client-feedback", label: "Retours" });
    if (project.feedback.general)
      sections.push({ id: "general-feedback", label: "Bilan" });
  }

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const scrollContainer = document.querySelector("main");
    if (!scrollContainer) return;

    const handleScrollSpy = () => {
      let lastSectionId = "";
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            rect.top < window.innerHeight &&
            window.innerHeight - Math.max(rect.top, 0) >= 168
          ) {
            lastSectionId = id;
          }
        }
      }
      setActiveSection(lastSectionId);
    };

    scrollContainer.addEventListener("scroll", handleScrollSpy, {
      passive: true,
    });
    handleScrollSpy();
    return () => scrollContainer.removeEventListener("scroll", handleScrollSpy);
  }, [sections]);

  const [selectedTab, setSelectedTab] = useState(0);

  if (!project) return null;

  const thumbnailUrl =
    API_URL + (project.thumbnail as Media)?.path.replace(/\.webp$/, `_xl.webp`);

  return (
    <Layout.Content
      sx={{
        paddingTop: "0 !important",
        paddingX: 0,
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
      className="single-project-content"
    >
      <ResponsiveStack component="hgroup" rowGap={3}>
        <Box
          sx={{
            position: "relative",
            minHeight: `calc(100dvh - 96px - 168px - ${isAuthenticated ? "48px" : "0px"})`,
            background: `url(${thumbnailUrl}) ${project.thumbnail?.focus || "center"} / cover no-repeat`,
            backgroundAttachment: "fixed",
            justifyContent: "end",
            alignItems: "center",
            borderTop: `1px solid ${theme.palette.divider}`,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        />
        <ResponsiveStack
          sx={{ paddingX: 8, paddingBottom: "1.5rem !important" }}
        >
          <ResponsiveStack
            direction="row"
            sx={{
              alignItems: "end",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveTitle
              variant="h1"
              style={{ position: "relative", zIndex: 2, fontWeight: "900" }}
            >
              {project ? project.label : "Project not found"}
            </ResponsiveTitle>
            {project.client && (
              <ResponsiveStack
                direction="row"
                sx={{ alignItems: "center", columnGap: 1 }}
              >
                {project.client.logo && (
                  <Picture
                    image={project.client.logo}
                    maxHeight="72px"
                    maxWidth="72px"
                    style={{ minWidth: "72px", minHeight: "72px" }}
                  />
                )}
                <ResponsiveBodyTypography
                  variant="bodyLg"
                  style={{
                    fontSize: "4rem",
                    lineHeight: 1.125,
                    fontWeight: "100",
                  }}
                >
                  {project.client.label}
                </ResponsiveBodyTypography>
              </ResponsiveStack>
            )}
          </ResponsiveStack>
          <ResponsiveStack
            direction="row"
            sx={{
              columnGap: 2,
              alignItems: "center",
              justifyContent: "space-between",
              fontStyle: "italic",
              fontWeight: "200",
            }}
          >
            {project.categories && (
              <ResponsiveBodyTypography variant="bodyLg">
                {project.categories
                  .filter(
                    (category) =>
                      category.label !== "Epinglé" &&
                      category.label !== "Professionnel",
                  )
                  .map((category) => category.label)
                  .join(" | ")}
              </ResponsiveBodyTypography>
            )}
            {project.startDate && (
              <ResponsiveBodyTypography
                variant="bodyLg"
                style={{ fontWeight: "200" }}
              >
                {`${project.endDate ? "De" : "Depuis"} ${project.startDate.locale("fr").format("MMMM YYYY")} ${
                  project.endDate
                    ? `à ${project.endDate.locale("fr").format("MMMM YYYY")}`
                    : ""
                }`}
              </ResponsiveBodyTypography>
            )}
          </ResponsiveStack>
        </ResponsiveStack>
      </ResponsiveStack>

      {sections.length > 3 && (
        <Toolbar
          sx={{
            position: "sticky",
            top: "0",
            height: "48px",
            backgroundColor: theme.palette.background.default,
            zIndex: 2,
            paddingX: "64px !important",
            borderTop: `1px solid rgb(81, 81, 81)`,
            borderBottom: `1px solid rgb(81, 81, 81)`,
            overflowX: "auto",
            scrollbarWidth: "none",
            columnGap: 2,
            justifyContent: "center",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "& a": {
              color: theme.palette.text.primary,
              textDecoration: "none",
              display: "inline-block",
              position: "relative",
              transition: `color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
              whiteSpace: "nowrap",
              "&::after": {
                content: '""',
                display: "block",
                position: "absolute",
                bottom: "6px",
                left: 0,
                transform: "scaleX(0)",
                transformOrigin: "right",
                width: "100%",
                height: "1px",
                backgroundColor: theme.palette.primary.main,
                transition: `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
              },
              "&:hover": {
                color: theme.palette.primary.main,
                "&::after": {
                  transform: "scaleX(1)",
                  transformOrigin: "left",
                },
              },
              "&.active-section": {
                color: theme.palette.primary.main,
                "&::after": {
                  transform: "scaleX(1)",
                  transformOrigin: "left",
                },
              },
            },
          }}
        >
          {sections.map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active-section" : undefined}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) {
                  const y =
                    el.getBoundingClientRect().top +
                    document.querySelector("main")!.scrollTop -
                    96;
                  document
                    .querySelector("main")
                    ?.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              {label}
            </Link>
          ))}
        </Toolbar>
      )}

      <Table
        sx={{
          "& .MuiTableCell-root": {
            paddingY: 6,
            "&:first-child": {
              verticalAlign: "top",
              paddingLeft: 8,
              paddingRight: 4,
              '&:not([colspan="2"])': {
                borderRight: `1px solid rgb(81, 81, 81)`,
                "& h2": {
                  textAlign: "right",
                },
              },
            },
            "&:last-child": {
              paddingRight: 8,
              paddingLeft: 4,
              width: theme.sizes.columnWidth(3, 2, "min(100dvw, 1920px)"),
            },
            "&[colspan='2']": {
              paddingX: 8,
            },
          },
        }}
      >
        <TableBody
          sx={{
            borderTop:
              sections.length <= 3 ? `1px solid rgb(81, 81, 81)` : "none",
          }}
        >
          {(project.intro || project.website?.url || project.mockup?.url) && (
            <TableRow id="intro">
              <TableCell colSpan={2}>
                <ResponsiveStack rowGap={6}>
                  {project.intro && (
                    <WysiwygBox
                      __html={project.intro}
                      sx={{
                        maxWidth: theme.sizes.columnWidth(
                          3,
                          2,
                          "min(100dvw, 1920px)",
                        ),
                        margin: "0 auto",
                      }}
                    />
                  )}
                  {(project.website?.url || project.mockup?.url) && (
                    <ResponsiveStack
                      sx={{
                        flexDirection: "row",
                        columnGap: 4,
                        justifyContent: "space-around",
                        paddingX: 8,
                      }}
                    >
                      {project.website?.url && (
                        <Button
                          component={ReactLink}
                          to={project.website.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ minWidth: "208px" }}
                        >
                          {project.website.label || "Visiter le site web"}
                        </Button>
                      )}
                      {project.mockup?.url && (
                        <Button
                          component={ReactLink}
                          to={project.mockup.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ minWidth: "208px" }}
                        >
                          {project.mockup.label || "Explorer la maquette"}
                        </Button>
                      )}
                    </ResponsiveStack>
                  )}
                </ResponsiveStack>
              </TableCell>
            </TableRow>
          )}
          {project.mockup?.images && project.mockup?.images.length > 0 && (
            <TableRow id="mockup">
              <TableCell colSpan={2}>
                <ResponsiveStack rowGap={3}>
                  <ResponsiveTitle variant="h2">Maquettes</ResponsiveTitle>
                  {(() => {
                    const desktopImages = project.mockup.images.filter((img) =>
                      (img as Media).label?.toLowerCase().startsWith("desktop"),
                    );
                    const tabletImages = project.mockup.images.filter((img) =>
                      (img as Media).label?.toLowerCase().startsWith("tablet"),
                    );
                    const mobileImages = project.mockup.images.filter((img) =>
                      (img as Media).label?.toLowerCase().startsWith("mobile"),
                    );
                    const otherImages = project.mockup.images.filter((img) => {
                      const label = (img as Media).label?.toLowerCase() || "";
                      return (
                        !label.startsWith("desktop") &&
                        !label.startsWith("tablet") &&
                        !label.startsWith("mobile")
                      );
                    });
                    return (
                      <>
                        <Tabs
                          value={selectedTab}
                          onChange={(_, newValue) => setSelectedTab(newValue)}
                          centered
                        >
                          {desktopImages.length > 0 && <Tab label="Desktop" />}
                          {tabletImages.length > 0 && <Tab label="Tablet" />}
                          {mobileImages.length > 0 && <Tab label="Mobile" />}
                          {otherImages.length > 0 && <Tab label="Autres" />}
                        </Tabs>
                        {(() => {
                          const imageLists = [
                            { images: desktopImages, label: "Desktop" },
                            { images: tabletImages, label: "Tablet" },
                            { images: mobileImages, label: "Mobile" },
                            { images: otherImages, label: "Autres" },
                          ];
                          let tabIndex = 0;
                          return imageLists.map((list, _) => {
                            if (list.images.length === 0) return null;
                            const currentIndex = tabIndex;
                            tabIndex++;
                            return (
                              <ResponsiveImageList
                                key={list.label}
                                variant="masonry"
                                gap={16}
                                maxWidth="fit-content"
                                role="tabpanel"
                                sx={{
                                  marginX: "auto",
                                  display:
                                    selectedTab === currentIndex
                                      ? "block"
                                      : "none",
                                }}
                              >
                                {list.images.map((image) => (
                                  <ImageListItem
                                    key={image.id}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Picture
                                      image={image as Media}
                                      maxWidth={theme.sizes.columnWidth(
                                        3,
                                        2,
                                        "min(100dvw, 1920px)",
                                      )}
                                      style={{
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        width: "fit-content",
                                      }}
                                    />
                                  </ImageListItem>
                                ))}
                              </ResponsiveImageList>
                            );
                          });
                        })()}
                      </>
                    );
                  })()}
                </ResponsiveStack>
              </TableCell>
            </TableRow>
          )}
          {project.roles && (
            <TableRow id="roles">
              <TableCell>
                <ResponsiveTitle variant="h2">Prestations</ResponsiveTitle>
              </TableCell>
              <TableCell>
                {project.roles && (
                  <ul style={{ margin: 0 }}>
                    {project.roles
                      ?.sort((a, b) => {
                        const labelA = typeof a === "string" ? a : a.label;
                        const labelB = typeof b === "string" ? b : b.label;
                        return labelA.localeCompare(labelB);
                      })
                      .map((role) => (
                        <li
                          key={typeof role === "string" ? role : role.id}
                          style={{
                            fontSize: "1.5rem",
                            lineHeight: 2,
                          }}
                        >
                          {typeof role === "string" ? role : role.label}
                        </li>
                      ))}
                  </ul>
                )}
              </TableCell>
            </TableRow>
          )}
          {project.presentation && (
            <>
              {project.presentation.context && (
                <TableRow id="context">
                  <TableCell>
                    <ResponsiveTitle variant="h2">Contexte</ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox __html={project.presentation.context} />
                  </TableCell>
                </TableRow>
              )}
              {project.presentation.client && (
                <TableRow id="client">
                  <TableCell>
                    <ResponsiveTitle variant="h2">Client</ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <ResponsiveStack rowGap={6}>
                      {(project.client || project.manager) && (
                        <ResponsiveStack
                          sx={{
                            flexDirection: "row",
                            columnGap: 4,
                            borderBottom: `1px solid rgb(81, 81, 81)`,
                            marginLeft: "-2rem",
                            marginRight: "-4rem",
                            paddingLeft: "2rem",
                            paddingRight: "4rem",
                            paddingBottom: "3rem !important",
                          }}
                        >
                          {project.client && (
                            <ResponsiveStack
                              direction="row"
                              sx={{
                                alignItems: "center",
                                columnGap: 1,
                                flex: "1 1 auto",
                              }}
                            >
                              <ResponsiveBodyTypography variant="bodyLg">
                                Entité :
                              </ResponsiveBodyTypography>
                              {project.client.logo && (
                                <Picture
                                  image={project.client.logo}
                                  maxHeight="48px"
                                  maxWidth="48px"
                                  style={{
                                    minWidth: "48px",
                                    minHeight: "48px",
                                  }}
                                />
                              )}
                              <ResponsiveBodyTypography variant="bodyLg">
                                {project.client.label}
                              </ResponsiveBodyTypography>
                            </ResponsiveStack>
                          )}
                          {project.manager && (
                            <ResponsiveBodyTypography
                              variant="bodyLg"
                              sx={{
                                flex: "1 1 auto",
                                "& a": {
                                  color: theme.palette.primary.light,
                                  textDecoration: "none",
                                  display: "inline-block",
                                  position: "relative",
                                  transition: `color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                                  "&::after": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    bottom: "10px",
                                    left: 0,
                                    transform: "scaleX(0)",
                                    transformOrigin: "right",
                                    width: "100%",
                                    height: "1px",
                                    backgroundColor: theme.palette.primary.main,
                                    transition: `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                                  },
                                  "&:hover": {
                                    color: theme.palette.primary.main,
                                    "&::after": {
                                      transform: "scaleX(1)",
                                      transformOrigin: "left",
                                    },
                                  },
                                },
                              }}
                            >
                              Responsable :{" "}
                              {project.manager.email ? (
                                <a href={`mailto:${project.manager.email}`}>
                                  {project.manager.name}
                                </a>
                              ) : (
                                project.manager.name
                              )}
                            </ResponsiveBodyTypography>
                          )}
                        </ResponsiveStack>
                      )}
                      <WysiwygBox __html={project.presentation.client} />
                    </ResponsiveStack>
                  </TableCell>
                </TableRow>
              )}
              {project.presentation.issue && (
                <TableRow id="issue">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Finalités & enjeux
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox __html={project.presentation.issue} />
                  </TableCell>
                </TableRow>
              )}
              {project.presentation.audience && (
                <TableRow id="audience">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Utilisateurs & audience&nbsp;cible
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox __html={project.presentation.audience} />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
          {project.need && (
            <>
              {project.need.features && (
                <TableRow id="features">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Fonctionnalités attendues
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox __html={project.need.features} />
                  </TableCell>
                </TableRow>
              )}
              {project.need.functionalConstraints && (
                <TableRow id="functional-constraints">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Contraintes fonctionnelles
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox __html={project.need.functionalConstraints} />
                  </TableCell>
                </TableRow>
              )}
              {project.need.technicalConstraints && (
                <TableRow id="technical-constraints">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Contraintes techniques
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox __html={project.need.technicalConstraints} />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
          {project.coworkers.length > 0 && (
            <TableRow id="team">
              <TableCell>
                <ResponsiveTitle variant="h2">Équipe</ResponsiveTitle>
              </TableCell>
              <TableCell
                sx={{
                  fontSize: "1.5rem",
                  lineHeight: 2,
                }}
              >
                <ul style={{ margin: 0 }}>
                  {project.coworkers.map((coworker) => {
                    const fullCoworker = coworkers?.find(
                      (c) => c.id === coworker.id,
                    );
                    return (
                      <li key={coworker.id}>
                        {fullCoworker?.name} :{" "}
                        {coworker.roles
                          ?.map((role) => (role as Role).label)
                          .join(" | ")}
                      </li>
                    );
                  })}
                </ul>
              </TableCell>
            </TableRow>
          )}
          {project.organization && (
            <>
              {project.organization.workload && (
                <TableRow id="workload">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Charge de&nbsp;travail
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem", lineHeight: 2 }}>
                    {project.organization.workload}
                  </TableCell>
                </TableRow>
              )}
              {project.organization.methodology && (
                <TableRow id="methodology">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Gestion de&nbsp;projet
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox
                      __html={project.organization.methodology || ""}
                    />
                  </TableCell>
                </TableRow>
              )}
              {project.organization.anticipation && (
                <TableRow id="anticipation">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Anticipation des&nbsp;risques
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox __html={project.organization.anticipation} />
                  </TableCell>
                </TableRow>
              )}
              {project.organization.evolution && (
                <TableRow id="evolution">
                  <TableCell>
                    <ResponsiveTitle variant="h2">Évolutions</ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox __html={project.organization.evolution || ""} />
                  </TableCell>
                </TableRow>
              )}
              {project.organization.validation && (
                <TableRow id="validation">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Modalités de&nbsp;validation
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox
                      __html={project.organization.validation || ""}
                    />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
          {project.stacks && project.stacks.length > 0 && (
            <TableRow id="technologies">
              <TableCell>
                <ResponsiveTitle variant="h2">
                  Technologies utilisées
                </ResponsiveTitle>
              </TableCell>
              <TableCell>
                <ResponsiveBox
                  rowGap={6}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(auto-fit, minmax(72px, 1fr))`,
                    columnGap: 4,
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  {project.stacks.map((stack) => (
                    <ResponsiveStack
                      key={stack.id}
                      rowGap={3}
                      sx={{ alignItems: "center" }}
                    >
                      <Picture
                        image={stack.icon as Media}
                        style={{ aspectRatio: "1 / 1" }}
                      />
                      <ResponsiveBodyTypography variant="bodySm">
                        {stack.label}
                        {stack.version && ` (${stack.version})`}
                      </ResponsiveBodyTypography>
                    </ResponsiveStack>
                  ))}
                </ResponsiveBox>
              </TableCell>
            </TableRow>
          )}
          {(project.kpis?.issues ||
            project.kpis?.points ||
            project.kpis?.commits ||
            project.kpis?.pullRequests) && (
            <TableRow id="kpis">
              <TableCell>
                <ResponsiveTitle variant="h2">KPI</ResponsiveTitle>
              </TableCell>
              <TableCell>
                <ResponsiveStack
                  rowGap={3}
                  sx={{
                    flexDirection: "row",
                    columnGap: 4,
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {project.kpis.issues && (
                    <ResponsiveBodyTypography variant="bodyLg">
                      Issues : {project.kpis.issues}
                    </ResponsiveBodyTypography>
                  )}
                  {project.kpis.points && (
                    <ResponsiveBodyTypography variant="bodyLg">
                      Points : {project.kpis.points}
                    </ResponsiveBodyTypography>
                  )}
                  {project.kpis.commits && (
                    <ResponsiveBodyTypography variant="bodyLg">
                      Commits : {project.kpis.commits}
                    </ResponsiveBodyTypography>
                  )}
                  {project.kpis.pullRequests && (
                    <ResponsiveBodyTypography variant="bodyLg">
                      Pull Requests : {project.kpis.pullRequests}
                    </ResponsiveBodyTypography>
                  )}
                </ResponsiveStack>
              </TableCell>
            </TableRow>
          )}
          {project.feedback && (
            <>
              {project.feedback.client && (
                <TableRow id="client-feedback">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Retours client
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox __html={project.feedback.client} />
                  </TableCell>
                </TableRow>
              )}
              {project.feedback.general && (
                <TableRow id="general-feedback">
                  <TableCell>
                    <ResponsiveTitle variant="h2">
                      Bilan & enseignements
                    </ResponsiveTitle>
                  </TableCell>
                  <TableCell>
                    <WysiwygBox __html={project.feedback.general} />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </Layout.Content>
  );
}
