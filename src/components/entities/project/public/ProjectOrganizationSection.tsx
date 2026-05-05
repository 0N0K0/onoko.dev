import useCoworkers from "../../../../hooks/queries/useCoworkers";
import type { Project } from "../../../../types/entities/projectTypes";
import type { Role } from "../../../../types/entities/roleTypes";
import { stripHtml } from "../../../../utils/stringUtils";
import { WysiwygBox } from "../../../custom/WysiwygBox";
import ProjectTableRow from "./ProjectTableRow";

export default function ProjectOrganizationSection({
  project,
}: {
  project: Project;
}) {
  const { coworkers } = useCoworkers();

  if (
    !project.organization ||
    !project.coworkers ||
    project.coworkers?.length <= 0
  )
    return null;

  return (
    <>
      {project.coworkers.length > 0 && (
        <ProjectTableRow id="team" title="Équipe">
          <ul style={{ margin: 0, fontSize: "1.5rem", lineHeight: 2 }}>
            {project.coworkers.map((coworker) => {
              const fullCoworker = coworkers?.find((c) => c.id === coworker.id);
              return (
                <li key={coworker.id}>
                  {fullCoworker?.name && stripHtml(fullCoworker.name)} :{" "}
                  {coworker.roles
                    ?.map((role) => stripHtml((role as Role).label))
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
              {stripHtml(project.organization.workload)}
            </ProjectTableRow>
          )}
          {project.organization.methodology && (
            <ProjectTableRow id="methodology" title={"Gestion de\u00A0projet"}>
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
    </>
  );
}
