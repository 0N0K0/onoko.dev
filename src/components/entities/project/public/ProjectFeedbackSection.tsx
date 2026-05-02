import type { Project } from "../../../../types/entities/projectTypes";
import { WysiwygBox } from "../../../custom/WysiwygBox";
import ProjectTableRow from "./ProjectTableRow";

export default function ProjectFeedbackSection({
  project,
}: {
  project: Project;
}) {
  if (!project.feedback) return null;

  return (
    <>
      {project.feedback.client && (
        <ProjectTableRow id="client-feedback" title="Retours client">
          <WysiwygBox __html={project.feedback.client} />
        </ProjectTableRow>
      )}
      {project.feedback.general && (
        <ProjectTableRow id="general-feedback" title="Bilan & enseignements">
          <WysiwygBox __html={project.feedback.general} />
        </ProjectTableRow>
      )}
    </>
  );
}
