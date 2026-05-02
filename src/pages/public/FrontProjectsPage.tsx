import CallToAction from "../../components/CallToAction";
import ProjectsCarousel from "../../components/entities/project/public/ProjectsCarousel";
import useProjects from "../../hooks/queries/useProjects";
import Layout from "../../layout";

export function FrontProjectsPage() {
  const projects = useProjects();

  const webSiteProjects = projects.projects.filter((project) => {
    const labels = project.categories?.map((c) => c.label) ?? [];
    return labels.includes("Site web") && !labels.includes("Bac à sable");
  });

  const softwareProjects = projects.projects.filter((project) => {
    const labels = project.categories?.map((c) => c.label) ?? [];
    return labels.includes("Logiciel") && !labels.includes("Bac à sable");
  });

  const toolProjects = projects.projects.filter((project) => {
    const labels = project.categories?.map((c) => c.label) ?? [];
    return (
      (labels.includes("Libraire") ||
        labels.includes("Plugin") ||
        labels.includes("Automatisation")) &&
      !labels.includes("Bac à sable")
    );
  });

  const persoProjects = projects.projects.filter((project) =>
    project.categories?.some((c) => c.label === "Bac à sable"),
  );

  return (
    <Layout.Content rowGap={6} sx={{ paddingX: 0, overflowY: "auto" }}>
      <ProjectsCarousel
        title={<>Sites Web</>}
        subtitle={<>Du pixel à la prod</>}
        projects={webSiteProjects}
        minHeight="calc(100dvh - 18rem)"
      />
      <ProjectsCarousel
        title={<>Logiciels</>}
        subtitle={<>Des solutions sur mesure</>}
        projects={softwareProjects}
        minHeight="calc(100dvh - 18rem)"
      />
      <ProjectsCarousel
        title={<>Modules</>}
        subtitle={
          <>
            Librairies, Plugins
            <br />& Automatisations
          </>
        }
        projects={toolProjects}
        minHeight="calc(100dvh - 18rem)"
      />
      <ProjectsCarousel
        title={<>Bac à sable</>}
        subtitle={<>Libres curiosités</>}
        projects={persoProjects}
        minHeight="calc(100dvh - 18rem)"
      />
      <CallToAction emphasis />
    </Layout.Content>
  );
}
