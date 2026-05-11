import type { Project } from "../../../../types/entities/projectTypes";
import { hasRichTextContent } from "../../../../utils/stringUtils";
import StickyMenuBar from "../../../custom/StickyMenuBar";

export default function ProjectMenuBar({ project }: { project: Project }) {
  const sections: { id: string; label: string }[] = [];

  if (
    hasRichTextContent(project?.intro) ||
    project?.website?.url ||
    project?.mockup?.url
  )
    sections.push({ id: "intro", label: "Introduction" });
  if (project?.mockup?.images && project.mockup.images.length > 0)
    sections.push({ id: "mockup", label: "Maquettes" });
  if (project?.roles && project.roles.length > 0)
    sections.push({ id: "roles", label: "Prestations" });
  if (project?.stacks && project.stacks.length > 0)
    sections.push({ id: "technologies", label: "Technologies" });
  if (
    project?.kpis?.issues ||
    project?.kpis?.points ||
    project?.kpis?.commits ||
    project?.kpis?.pullRequests
  )
    sections.push({ id: "kpis", label: "KPI" });
  if (project?.presentation) {
    if (hasRichTextContent(project.presentation.context))
      sections.push({ id: "context", label: "Contexte" });

    if (hasRichTextContent(project.presentation.client))
      sections.push({ id: "client", label: "Client" });

    if (hasRichTextContent(project.presentation.issue))
      sections.push({ id: "issue", label: "Finalités" });

    if (hasRichTextContent(project.presentation.audience))
      sections.push({ id: "audience", label: "Audience" });
  }
  if (project?.need) {
    if (hasRichTextContent(project.need.features))
      sections.push({ id: "features", label: "Fonctionnalités" });

    if (hasRichTextContent(project.need.functionalConstraints))
      sections.push({
        id: "functional-constraints",
        label: "Contraintes fonctionnelles",
      });

    if (hasRichTextContent(project.need.technicalConstraints))
      sections.push({
        id: "technical-constraints",
        label: "Contraintes techniques",
      });
  }
  if (project?.coworkers && project.coworkers.length > 0)
    sections.push({ id: "team", label: "Équipe" });
  if (project?.organization) {
    if (hasRichTextContent(project.organization.methodology))
      sections.push({ id: "methodology", label: "Gestion de projet" });

    if (hasRichTextContent(project.organization.anticipation))
      sections.push({ id: "anticipation", label: "Anticipation" });

    if (hasRichTextContent(project.organization.evolution))
      sections.push({ id: "evolution", label: "Évolutions" });

    if (hasRichTextContent(project.organization.validation))
      sections.push({ id: "validation", label: "Validation" });
  }
  if (project?.feedback) {
    if (hasRichTextContent(project.feedback.client))
      sections.push({ id: "client-feedback", label: "Échos" });
    if (hasRichTextContent(project.feedback.general))
      sections.push({ id: "general-feedback", label: "Bilan" });
  }

  if (sections.length < 3) return null;

  return <StickyMenuBar sections={sections} />;
}
