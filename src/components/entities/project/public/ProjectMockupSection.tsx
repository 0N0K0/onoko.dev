import { ImageListItem, useTheme } from "@mui/material";
import type { Project } from "../../../../types/entities/projectTypes";
import { ResponsiveImageList } from "../../../custom/ResponsiveLayout";
import ProjectTableRow from "./ProjectTableRow";
import Picture from "../../../custom/Picture";
import type { Media } from "../../../../types/entities/mediaTypes";

export default function ProjectMockupSection({
  project,
}: {
  project: Project;
}) {
  const theme = useTheme();

  if (!project.mockup?.images?.length && !project.mockup?.embed) return null;

  return (
    <ProjectTableRow id="mockup" merged>
      {project.mockup.images && project.mockup.images.length > 0 && (
        <ResponsiveImageList
          variant="masonry"
          gap={16}
          maxWidth="fit-content"
          role="tabpanel"
          sx={{
            marginX: "auto",
          }}
        >
          {project.mockup.images.map((image) => (
            <ImageListItem
              key={image.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Picture
                image={image as Media}
                maxWidth={theme.sizes.columnWidth(3, 2, "min(100dvw, 1920px)")}
                style={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "8px",
                  overflow: "hidden",
                  width: "fit-content",
                }}
              />
            </ImageListItem>
          ))}
        </ResponsiveImageList>
      )}
      {project.mockup.embed && (
        <iframe
          src={project.mockup.embed}
          allowFullScreen
          style={{
            height: "calc(100dvh - 144px)",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "8px",
            width: "100%",
          }}
        />
      )}
    </ProjectTableRow>
  );
}
