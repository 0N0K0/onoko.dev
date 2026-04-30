import { Button, useTheme } from "@mui/material";
import type { Project } from "../../../../types/entities/projectTypes";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import { WysiwygBox } from "../../../custom/WysiwygBox";
import ProjectTableRow from "./ProjectTableRow";
import { Link as ReactLink } from "react-router-dom";

export default function ProjectIntro({ project }: { project: Project }) {
  const theme = useTheme();

  if (project.intro || project.website?.url || project.mockup?.url)
    return (
      <ProjectTableRow id="intro" merged>
        <ResponsiveStack rowGap={6}>
          {project.intro && (
            <WysiwygBox
              __html={project.intro}
              sx={{
                maxWidth: theme.sizes.columnWidth(3, 2, "min(100dvw, 1920px)"),
                margin: "0 auto",
              }}
            />
          )}
          {(project.website?.url || project.mockup?.url) && (
            <ResponsiveStack
              sx={{
                flexDirection: "row",
                columnGap: 4,
                justifyContent: "space-around",
                paddingX: 8,
              }}
            >
              {project.website?.url && (
                <Button
                  component={ReactLink}
                  to={project.website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ minWidth: "208px" }}
                >
                  {project.website.label || "Visiter le site web"}
                </Button>
              )}
              {project.mockup?.url && (
                <Button
                  component={ReactLink}
                  to={project.mockup.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ minWidth: "208px" }}
                >
                  {project.mockup.label || "Explorer la maquette"}
                </Button>
              )}
            </ResponsiveStack>
          )}
        </ResponsiveStack>
      </ProjectTableRow>
    );
}
