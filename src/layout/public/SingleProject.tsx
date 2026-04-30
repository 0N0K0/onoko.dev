import { Link as ReactLink, useParams } from "react-router-dom";
import useProjects from "../../hooks/queries/useProjects";
import Layout from "..";
import {
  ResponsiveBox,
  ResponsiveImageList,
  ResponsiveStack,
} from "../../components/custom/ResponsiveLayout";
import type { Media } from "../../types/entities/mediaTypes";
import {
  Button,
  ImageListItem,
  Table,
  TableBody,
  useTheme,
} from "@mui/material";
import ResponsiveBodyTypography from "../../components/custom/ResponsiveBodyTypography";
import Picture from "../../components/custom/Picture";
import { WysiwygBox } from "../../components/custom/WysiwygBox";
import type { Role } from "../../types/entities/roleTypes";
import useCoworkers from "../../hooks/queries/useCoworkers";
import ProjectsCarousel from "../../components/entities/project/public/ProjectsCarousel";
import ProjectTableRow from "../../components/entities/project/public/ProjectTableRow";
import ProjectHeader from "../../components/entities/project/public/ProjectHeader";
import ProjectMenuBar from "../../components/entities/project/public/ProjectMenuBar";

export function SingleProject() {
  const params = useParams();
  const { projects } = useProjects();
  const project = projects?.find((p) => p.slug === params.slug);
  // Récupère les catégories du projet courant, hors 'Professionnel'
  const mainCategories =
    project?.categories
      ?.filter(
        (cat) => cat.label !== "Professionnel" && cat.label !== "Epinglé",
      )
      ?.map((cat) => cat.id) ?? [];

  // Projets similaires par catégorie (hors projet courant)
  let relatedProjects =
    projects
      ?.filter(
        (p) =>
          p.id !== project?.id &&
          p.categories?.some((cat) => mainCategories.includes(cat.id)),
      )
      .slice(0, 4) ?? [];

  // Si moins de 4, compléter avec les projets épinglés (hors projet courant et déjà présents)
  if (relatedProjects.length < 4 && projects) {
    const alreadyIds = new Set([
      project?.id,
      ...relatedProjects.map((p) => p.id),
    ]);
    const pinned = projects.filter(
      (p) =>
        !alreadyIds.has(p.id) &&
        p.categories?.some((cat) => cat.label === "Epinglé"),
    );
    relatedProjects = [
      ...relatedProjects,
      ...pinned.slice(0, 4 - relatedProjects.length),
    ];
  }
  const theme = useTheme();

  const { coworkers } = useCoworkers();

  if (!project) return null;

  return (
    <Layout.Content
      sx={{
        paddingTop: "0 !important",
        paddingX: 0,
        scrollBehavior: "smooth",
      }}
      className="single-project-content"
    >
      <ProjectHeader project={project} />
      <ProjectMenuBar project={project} />

      <Table
        sx={{
          "& .MuiTableCell-root:first-of-type": {
            maxWidth: `calc(100dvw - ${theme.sizes.columnWidth(3, 2, "min(100dvw, 1920px)")}) !important`,
          },
        }}
      >
        <TableBody>
          {(project.intro || project.website?.url || project.mockup?.url) && (
            <ProjectTableRow id="intro" merged>
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
            </ProjectTableRow>
          )}
          {project.mockup && (
            <ProjectTableRow id="mockup" merged>
              {project.mockup.images && project.mockup.images.length > 0 && (
                <ResponsiveImageList
                  variant="masonry"
                  gap={16}
                  maxWidth="fit-content"
                  role="tabpanel"
                  sx={{
                    marginX: "auto",
                  }}
                >
                  {project.mockup.images.map((image) => (
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
              )}
              {project.mockup.embed && (
                <iframe
                  src={project.mockup.embed}
                  allowFullScreen
                  style={{
                    height: "calc(100dvh - 144px)",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "8px",
                    width: "100%",
                  }}
                />
              )}
            </ProjectTableRow>
          )}
          {project.roles && (
            <ProjectTableRow id="roles" title="Prestations">
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
            </ProjectTableRow>
          )}
          {project.stacks && project.stacks.length > 0 && (
            <ProjectTableRow id="technologies" title="Technologies utilisées">
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
            </ProjectTableRow>
          )}
          {(project.kpis?.issues ||
            project.kpis?.points ||
            project.kpis?.commits ||
            project.kpis?.pullRequests) && (
            <ProjectTableRow id="kpis" title="KPI">
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
            </ProjectTableRow>
          )}
          {(project.presentation?.context ||
            project.presentation?.client ||
            project.presentation?.issue ||
            project.presentation?.audience ||
            project.need?.features ||
            project.need?.functionalConstraints ||
            project.need?.technicalConstraints ||
            project.organization?.methodology ||
            project.organization?.anticipation ||
            project.organization?.evolution ||
            project.organization?.validation) && (
            <ProjectTableRow merged>
              <ResponsiveStack
                paddingY={3}
                rowGap={3}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  background: theme.palette.primary.dark,
                  paddingX: 8,
                  width: "fit-content",
                  minWidth: theme.sizes.columnWidth(
                    3,
                    2,
                    "min(100dvw, 1920px)",
                  ),
                  margin: "0 auto",
                  borderRadius: 1,
                }}
              >
                <ResponsiveBodyTypography
                  variant="bodyLg"
                  sx={{ fontStyle: "italic" }}
                >
                  Une question&nbsp;?
                  <br />
                  Je serais ravie d'échanger avec vous&nbsp;!
                </ResponsiveBodyTypography>
                <Button
                  size="large"
                  color="inherit"
                  sx={{
                    marginTop: 9,
                    margin: "auto",
                  }}
                >
                  Me contacter
                </Button>
              </ResponsiveStack>
            </ProjectTableRow>
          )}
          {project.presentation && (
            <>
              {project.presentation.context && (
                <ProjectTableRow id="context" title="Contexte">
                  <WysiwygBox __html={project.presentation.context} />
                </ProjectTableRow>
              )}
              {project.presentation.client && (
                <ProjectTableRow id="client" title="Client">
                  <ResponsiveStack sx={{ rowGap: { md: 6, xs: 3 } }}>
                    {(project.client || project.manager) && (
                      <ResponsiveStack
                        rowGap={3}
                        sx={{
                          flexDirection: "row",
                          columnGap: 4,
                          borderBottom: {
                            md: `1px solid rgb(81, 81, 81)`,
                          },
                          marginLeft: "-2rem",
                          marginRight: "-4rem",
                          paddingLeft: "2rem",
                          paddingRight: "4rem",
                          paddingBottom: { md: "3rem !important" },
                          flexWrap: "wrap",
                          alignItems: "center",
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
                              height: "fit-content",
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
                </ProjectTableRow>
              )}
              {project.presentation.issue && (
                <ProjectTableRow id="issue" title="Finalités & enjeux">
                  <WysiwygBox __html={project.presentation.issue} />
                </ProjectTableRow>
              )}
              {project.presentation.audience && (
                <ProjectTableRow
                  id="audience"
                  title={"Utilisateurs\u00A0& audience\u00A0cible"}
                >
                  <WysiwygBox __html={project.presentation.audience} />
                </ProjectTableRow>
              )}
            </>
          )}
          {project.need && (
            <>
              {project.need.features && (
                <ProjectTableRow
                  id="features"
                  title="Fonctionnalités attendues"
                >
                  <WysiwygBox __html={project.need.features} />
                </ProjectTableRow>
              )}
              {project.need.functionalConstraints && (
                <ProjectTableRow
                  id="functional-constraints"
                  title="Contraintes fonctionnelles"
                >
                  <WysiwygBox __html={project.need.functionalConstraints} />
                </ProjectTableRow>
              )}
              {project.need.technicalConstraints && (
                <ProjectTableRow
                  id="technical-constraints"
                  title="Contraintes techniques"
                >
                  <WysiwygBox __html={project.need.technicalConstraints} />
                </ProjectTableRow>
              )}
            </>
          )}
          {project.coworkers.length > 0 && (
            <ProjectTableRow id="team" title="Équipe">
              <ul style={{ margin: 0, fontSize: "1.5rem", lineHeight: 2 }}>
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
            </ProjectTableRow>
          )}
          {project.organization && (
            <>
              {project.organization.workload && (
                <ProjectTableRow id="workload" title={"Charge de\u00A0travail"}>
                  {project.organization.workload}
                </ProjectTableRow>
              )}
              {project.organization.methodology && (
                <ProjectTableRow
                  id="methodology"
                  title={"Gestion de\u00A0projet"}
                >
                  <WysiwygBox __html={project.organization.methodology} />
                </ProjectTableRow>
              )}
              {project.organization.anticipation && (
                <ProjectTableRow
                  id="anticipation"
                  title={"Anticipation des\u00A0risques"}
                >
                  <WysiwygBox __html={project.organization.anticipation} />
                </ProjectTableRow>
              )}
              {project.organization.evolution && (
                <ProjectTableRow id="evolution" title="Évolutions">
                  <WysiwygBox __html={project.organization.evolution} />
                </ProjectTableRow>
              )}
              {project.organization.validation && (
                <ProjectTableRow
                  id="validation"
                  title={"Modalités de\u00A0validation"}
                >
                  <WysiwygBox __html={project.organization.validation} />
                </ProjectTableRow>
              )}
            </>
          )}
          {project.feedback && (
            <>
              {project.feedback.client && (
                <ProjectTableRow id="client-feedback" title="Retours client">
                  <WysiwygBox __html={project.feedback.client} />
                </ProjectTableRow>
              )}
              {project.feedback.general && (
                <ProjectTableRow
                  id="general-feedback"
                  title="Bilan & enseignements"
                >
                  <WysiwygBox __html={project.feedback.general} />
                </ProjectTableRow>
              )}
            </>
          )}
          <ProjectTableRow
            merged
            title="Ceux-ci pourraient vous intéresser"
            tableCellProps={{
              sx: {
                paddingX: "0 !important",
                "& h2": {
                  marginLeft: 8,
                },
              },
            }}
          >
            <ProjectsCarousel projects={relatedProjects} minHeight="384px" />
          </ProjectTableRow>
          <ProjectTableRow
            merged
            sx={{ background: theme.palette.primary.dark }}
          >
            <ResponsiveStack
              paddingY={3}
              rowGap={3}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <ResponsiveBodyTypography
                variant="bodyLg"
                sx={{ fontStyle: "italic" }}
              >
                Une&nbsp;question&nbsp;? N'hésitez&nbsp;plus...
                <br />
                Je&nbsp;serais sincèrement ravie&nbsp;d'échanger
                avec&nbsp;vous&nbsp;!
              </ResponsiveBodyTypography>
              <Button
                size="large"
                color="inherit"
                sx={{
                  marginTop: 9,
                  margin: "auto",
                }}
              >
                Me contacter
              </Button>
            </ResponsiveStack>
          </ProjectTableRow>
        </TableBody>
      </Table>
    </Layout.Content>
  );
}
