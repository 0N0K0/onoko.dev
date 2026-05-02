import type { Project } from "../../../../types/entities/projectTypes";
import { WysiwygBox } from "../../../custom/WysiwygBox";
import ProjectTableRow from "./ProjectTableRow";

export default function ProjectNeedSection({ project }: { project: Project }) {
  if (!project.need) return null;

  return (
    <>
      {project.need.features && (
        <ProjectTableRow id="features" title="Fonctionnalités attendues">
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
  );
}
