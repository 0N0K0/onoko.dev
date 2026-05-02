import { Typography } from "@mui/material";
import type { Media } from "../../../../types/entities/mediaTypes";
import type { Project } from "../../../../types/entities/projectTypes";
import Picture from "../../../custom/Picture";
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
                <Typography variant="bodySm">
                  {stack.label}
                  {stack.version && ` (${stack.version})`}
                </Typography>
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
              <Typography variant="bodyLg">
                Issues : {project.kpis.issues}
              </Typography>
            )}
            {project.kpis.points && (
              <Typography variant="bodyLg">
                Points : {project.kpis.points}
              </Typography>
            )}
            {project.kpis.commits && (
              <Typography variant="bodyLg">
                Commits : {project.kpis.commits}
              </Typography>
            )}
            {project.kpis.pullRequests && (
              <Typography variant="bodyLg">
                Pull Requests : {project.kpis.pullRequests}
              </Typography>
            )}
          </ResponsiveStack>
        </ProjectTableRow>
      )}
    </>
  );
}
