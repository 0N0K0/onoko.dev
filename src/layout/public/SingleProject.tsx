import { useParams } from "react-router-dom";
import useProjects from "../../hooks/queries/useProjects";
import Layout from "..";
import { Skeleton, Table, TableBody, useTheme } from "@mui/material";
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
import type { Project } from "../../types/entities/projectTypes";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import { useAuthContext } from "../../context/AuthContext";
import { useLayoutEffect, useRef, useState } from "react";
import { isResolvedMedia } from "../../utils/mediaUtils";

function isProjectMediaReady(project: Project): boolean {
  if (project.thumbnail && !isResolvedMedia(project.thumbnail)) return false;

  if (project.client?.logo && !isResolvedMedia(project.client.logo))
    return false;

  if (project.mockup?.images?.some((image) => !isResolvedMedia(image))) {
    return false;
  }

  if (project.stacks?.some((stack) => !isResolvedMedia(stack.icon))) {
    return false;
  }

  return true;
}

export function SingleProject() {
  const params = useParams();
  const { projects, loading } = useProjects();
  const project = projects?.find((p) => p.slug === params.slug);

  const theme = useTheme();
  const { isXs, isSm, isMd, isLg, isXl } = useBreakpoints();
  const mainCellWidth = isXl
    ? useResponsiveWidth(8)
    : isLg
      ? useResponsiveWidth(6)
      : useResponsiveWidth(4);

  const { isAuthenticated } = useAuthContext();

  const [infosHeight, setInfosHeight] = useState(0);
  const infosRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (infosRef.current) {
      setInfosHeight(infosRef.current.offsetHeight);
    }
    window.addEventListener("resize", () => {
      if (infosRef.current) {
        setInfosHeight(infosRef.current.offsetHeight);
      }
    });
  }, []);

  let clientLogoSize;
  if (isMd) clientLogoSize = theme.typography.h1.fontSize;
  else if (isSm) clientLogoSize = theme.typography.h4.fontSize;
  else if (isXs) clientLogoSize = theme.typography.h5.fontSize;

  return (
    <Layout.Content
      sx={{
        paddingTop: "0 !important",
        paddingX: 0,
        scrollBehavior: "smooth",
      }}
      className="single-project-content"
    >
      {project && !loading && isProjectMediaReady(project) ? (
        <>
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
        </>
      ) : (
        <>
          <ResponsiveStack
            component="hgroup"
            rowGap={3}
            sx={{ borderBottom: `1px solid rgb(81, 81, 81)` }}
          >
            {/* Miniature */}
            <Skeleton
              variant="rectangular"
              height={`calc(100dvh - ${isAuthenticated ? "144px" : "96px"} - ${infosHeight}px)`}
              sx={{
                position: "relative",
              }}
            />

            {/* Titre et Infos */}
            <ResponsiveStack
              ref={infosRef}
              sx={{
                paddingX: { xs: 4, lg: 8 },
                paddingBottom: "1.5rem !important",
              }}
            >
              {/* Titre et Client */}
              <ResponsiveStack
                direction="row"
                sx={{
                  alignItems: "end",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  columnGap: 2,
                }}
              >
                {/* Titre */}
                <Skeleton
                  variant="text"
                  width="50%"
                  style={{ fontSize: "64px", lineHeight: "72px" }}
                />

                {/* Client */}
                <ResponsiveStack
                  direction="row"
                  sx={{ alignItems: "center", columnGap: 1, width: "30%" }}
                >
                  <Skeleton variant="circular" width={64} height={64} />
                  <Skeleton
                    variant="text"
                    width="calc(100% - 72px)"
                    style={{ fontSize: "64px", lineHeight: "72px" }}
                  />
                </ResponsiveStack>
              </ResponsiveStack>

              {/* Catégories et Dates */}
              <ResponsiveStack
                direction="row"
                sx={{
                  columnGap: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontStyle: "italic",
                  fontWeight: "200",
                  flexWrap: "wrap",
                }}
              >
                {/* Catégories */}
                <Skeleton
                  variant="text"
                  width="30%"
                  style={{ fontSize: "32px", lineHeight: "48px" }}
                />
                {/* Dates */}
                <Skeleton
                  variant="text"
                  width="30%"
                  style={{ fontSize: "32px", lineHeight: "48px" }}
                />
              </ResponsiveStack>
            </ResponsiveStack>
          </ResponsiveStack>
        </>
      )}
    </Layout.Content>
  );
}
