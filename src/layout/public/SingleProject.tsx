import { useParams } from "react-router-dom";
import useProjects from "../../hooks/queries/useProjects";

export function SingleProject() {
  const { projects } = useProjects();
  const project = projects?.find((p) => p.slug === useParams().slug);

  return <div>{project ? project.label : "Project not found"}</div>;
}
