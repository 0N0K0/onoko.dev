import type { Category } from "../../../../types/entities/categoryTypes";
import type { Project } from "../../../../types/entities/projectTypes";
import ProjectsCarousel from "./ProjectsCarousel";
import ProjectTableRow from "./ProjectTableRow";

export function ProjectRelatedSection({
  project,
  projects,
}: {
  project: Project;
  projects: Project[];
}) {
  // Récupère les catégories du projet courant, hors 'Professionnel'
  const mainCategories =
    project?.categories
      ?.filter(
        (cat) =>
          (cat as Category).label !== "Professionnel" &&
          (cat as Category).label !== "Epinglé",
      )
      ?.map((cat) => (cat as Category).id) ?? [];

  // Projets similaires par catégorie (hors projet courant)
  let relatedProjects =
    projects
      ?.filter(
        (p) =>
          p.id !== project?.id &&
          p.categories?.some((cat) =>
            mainCategories.includes((cat as Category).id),
          ),
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
        p.categories?.some((cat) => (cat as Category).label === "Epinglé"),
    );
    relatedProjects = [
      ...relatedProjects,
      ...pinned.slice(0, 4 - relatedProjects.length),
    ];
  }

  return (
    <ProjectTableRow
      merged
      title="Ceux-ci pourraient vous intéresser"
      tableCellProps={{
        sx: {
          paddingX: "0 !important",
          "& h2": {
            marginLeft: { lg: 8, xs: 4 },
          },
        },
      }}
    >
      <ProjectsCarousel projects={relatedProjects} minHeight="384px" />
    </ProjectTableRow>
  );
}
