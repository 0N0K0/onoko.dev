import { Typography, useTheme } from "@mui/material";
import type { Media } from "../../../../types/entities/mediaTypes";
import type { Project } from "../../../../types/entities/projectTypes";
import Picture from "../../../custom/Picture";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import { WysiwygBox } from "../../../custom/WysiwygBox";
import ProjectTableRow from "./ProjectTableRow";
import { hasRichTextContent, stripHtml } from "../../../../utils/stringUtils";

export default function ProjectPresentationSection({
  project,
}: {
  project: Project;
}) {
  const theme = useTheme();

  if (!project.presentation) return null;

  return (
    <>
      {hasRichTextContent(project.presentation.context) && (
        <ProjectTableRow id="context" title="Contexte">
          <WysiwygBox __html={project.presentation.context!} />
        </ProjectTableRow>
      )}
      {hasRichTextContent(project.presentation.client) && (
        <ProjectTableRow id="client" title="Client">
          <ResponsiveStack sx={{ rowGap: { md: 6, xs: 3 } }}>
            {(project.client || project.manager) && (
              <ResponsiveStack
                rowGap={3}
                sx={{
                  flexDirection: "row",
                  columnGap: 4,
                  borderBottom: {
                    md: `1px solid rgb(81, 81, 81)`,
                  },
                  marginLeft: "-2rem",
                  marginRight: "-4rem",
                  paddingLeft: "2rem",
                  paddingRight: "4rem",
                  paddingBottom: { md: "3rem !important" },
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                {project.client && (
                  <ResponsiveStack
                    direction="row"
                    sx={{
                      alignItems: "center",
                      columnGap: 1,
                      flex: "1 1 auto",
                    }}
                  >
                    <Typography variant="bodyLg">Entité :</Typography>
                    {project.client.logo && (
                      <Picture
                        image={project.client.logo as Media}
                        maxHeight="48px"
                        maxWidth="48px"
                        style={{
                          minWidth: "48px",
                          minHeight: "48px",
                        }}
                      />
                    )}
                    <Typography variant="bodyLg">
                      {stripHtml(project.client.label)}
                    </Typography>
                  </ResponsiveStack>
                )}
                {project.manager && (
                  <Typography
                    variant="bodyLg"
                    sx={{
                      flex: "1 1 auto",
                      height: "fit-content",
                      "& a": {
                        color: theme.palette.primary.light,
                        textDecoration: "none",
                        display: "inline-block",
                        position: "relative",
                        transition: `color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                        "&::after": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          bottom: "10px",
                          left: 0,
                          transform: "scaleX(0)",
                          transformOrigin: "right",
                          width: "100%",
                          height: "1px",
                          backgroundColor: theme.palette.primary.main,
                          transition: `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                        },
                        "&:hover": {
                          color: theme.palette.primary.main,
                          "&::after": {
                            transform: "scaleX(1)",
                            transformOrigin: "left",
                          },
                        },
                      },
                    }}
                  >
                    Responsable :{" "}
                    {project.manager.email ? (
                      <a href={`mailto:${project.manager.email}`}>
                        {stripHtml(project.manager.name)}
                      </a>
                    ) : (
                      stripHtml(project.manager.name)
                    )}
                  </Typography>
                )}
              </ResponsiveStack>
            )}
            <WysiwygBox __html={project.presentation.client!} />
          </ResponsiveStack>
        </ProjectTableRow>
      )}
      {hasRichTextContent(project.presentation.issue) && (
        <ProjectTableRow id="issue" title="Finalités & enjeux">
          <WysiwygBox __html={project.presentation.issue!} />
        </ProjectTableRow>
      )}
      {hasRichTextContent(project.presentation.audience) && (
        <ProjectTableRow
          id="audience"
          title={"Utilisateurs\u00A0& audience\u00A0cible"}
        >
          <WysiwygBox __html={project.presentation.audience!} />
        </ProjectTableRow>
      )}
    </>
  );
}
