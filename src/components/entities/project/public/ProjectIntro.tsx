import { Button } from "@mui/material";
import type { Project } from "../../../../types/entities/projectTypes";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import { WysiwygBox } from "../../../custom/WysiwygBox";
import ProjectTableRow from "./ProjectTableRow";
import { Link as ReactLink } from "react-router-dom";
import { useResponsiveWidth } from "../../../../hooks/layout/useResponsiveWidth";
import { stripHtml } from "../../../../utils/stringUtils";

export default function ProjectIntro({ project }: { project: Project }) {
  const maxWidth = useResponsiveWidth(8);

  if (project.intro || project.website?.url || project.mockup?.url)
    return (
      <ProjectTableRow id="intro" merged>
        <ResponsiveStack rowGap={6}>
          {project.intro && (
            <WysiwygBox
              __html={project.intro}
              sx={{
                maxWidth: maxWidth,
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
                flexWrap: "wrap",
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
                  {project.website.label
                    ? stripHtml(project.website.label)
                    : "Visiter le site web"}
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
                  {project.mockup.label
                    ? stripHtml(project.mockup.label)
                    : "Explorer la maquette"}
                </Button>
              )}
            </ResponsiveStack>
          )}
        </ResponsiveStack>
      </ProjectTableRow>
    );
}
