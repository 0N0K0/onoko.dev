import type { Project } from "../../../../types/entities/projectTypes";
import { hasRichTextContent } from "../../../../utils/stringUtils";
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
      {hasRichTextContent(project.feedback.client) && (
        <ProjectTableRow id="client-feedback" title="Retours client">
          <WysiwygBox __html={project.feedback.client!} />
        </ProjectTableRow>
      )}
      {hasRichTextContent(project.feedback.general) && (
        <ProjectTableRow id="general-feedback" title="Bilan & enseignements">
          <WysiwygBox __html={project.feedback.general!} />
        </ProjectTableRow>
      )}
    </>
  );
}
