import { useParams } from "react-router-dom";
import useProjects from "../../hooks/queries/useProjects";
import Layout from "..";
import { Table, TableBody, useTheme } from "@mui/material";
import ProjectTableRow from "../../components/entities/project/public/ProjectTableRow";
import ProjectHeader from "../../components/entities/project/public/ProjectHeader";
import ProjectMenuBar from "../../components/entities/project/public/ProjectMenuBar";
import { ProjectRelatedSection } from "../../components/entities/project/public/ProjectRelatedSection";
import ProjectIntro from "../../components/entities/project/public/ProjectIntro";
import ProjectMockupSection from "../../components/entities/project/public/ProjectMockupSection";
import ProjectMainInfosSection from "../../components/entities/project/public/ProjectMainInfosSection";
import ProjectPresentationSection from "../../components/entities/project/public/ProjectPresentationSection";
import ProjectNeedSection from "../../components/entities/project/public/ProjectNeedSection";
import ProjectOrganizationSection from "../../components/entities/project/public/ProjectOrganizationSection";
import ProjectFeedbackSection from "../../components/entities/project/public/ProjectFeedbackSection";
import CallToAction from "../../components/CallToAction";
import { useResponsiveWidth } from "../../hooks/layout/useResponsiveWidth";
import { useBreakpoints } from "../../hooks/mediaQueries";

export function SingleProject() {
  const params = useParams();
  const { projects } = useProjects();
  const project = projects?.find((p) => p.slug === params.slug);

  const theme = useTheme();
  const { isLg, isXl } = useBreakpoints();
  const mainCellWidth = isXl
    ? useResponsiveWidth(8)
    : isLg
      ? useResponsiveWidth(6)
      : useResponsiveWidth(4);

  if (!project) return null;

  return (
    <Layout.Content
      sx={{
        paddingTop: "0 !important",
        paddingX: 0,
        scrollBehavior: "smooth",
      }}
      className="single-project-content"
    >
      <ProjectHeader project={project} />
      <ProjectMenuBar project={project} />

      <Table
        sx={{
          "& .MuiTableCell-root:first-of-type": {
            maxWidth: `calc(100dvw - ${mainCellWidth}) !important`,
          },
        }}
      >
        <TableBody>
          <ProjectIntro project={project} />
          <ProjectMockupSection project={project} />
          <ProjectMainInfosSection project={project} />

          {(project.presentation?.context ||
            project.presentation?.client ||
            project.presentation?.issue ||
            project.presentation?.audience ||
            project.need?.features ||
            project.need?.functionalConstraints ||
            project.need?.technicalConstraints ||
            project.organization?.methodology ||
            project.organization?.anticipation ||
            project.organization?.evolution ||
            project.organization?.validation) && (
            <ProjectTableRow merged>
              <CallToAction />
            </ProjectTableRow>
          )}

          <ProjectPresentationSection project={project} />
          <ProjectNeedSection project={project} />
          <ProjectOrganizationSection project={project} />
          <ProjectFeedbackSection project={project} />
          <ProjectRelatedSection project={project} projects={projects} />

          <ProjectTableRow
            merged
            sx={{
              background: theme.palette.primary.dark,
            }}
            tableCellProps={{ sx: { padding: "24px 0 !important" } }}
          >
            <CallToAction emphasis />
          </ProjectTableRow>
        </TableBody>
      </Table>
    </Layout.Content>
  );
}
