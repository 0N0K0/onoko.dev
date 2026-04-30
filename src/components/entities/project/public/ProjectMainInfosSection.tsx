import type { Media } from "../../../../types/entities/mediaTypes";
import type { Project } from "../../../../types/entities/projectTypes";
import Picture from "../../../custom/Picture";
import ResponsiveBodyTypography from "../../../custom/ResponsiveBodyTypography";
import {
  ResponsiveBox,
  ResponsiveStack,
} from "../../../custom/ResponsiveLayout";
import ProjectTableRow from "./ProjectTableRow";

export default function ProjectMainInfosSection({
  project,
}: {
  project: Project;
}) {
  return (
    <>
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
    </>
  );
}
