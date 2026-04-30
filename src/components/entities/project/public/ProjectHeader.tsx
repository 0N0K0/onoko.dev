import { Box } from "@mui/system";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import { useMediaQuery, useTheme } from "@mui/material";
import ResponsiveTitle from "../../../custom/ResponsiveTitle";
import Picture from "../../../custom/Picture";
import ResponsiveBodyTypography from "../../../custom/ResponsiveBodyTypography";
import type { Project } from "../../../../types/entities/projectTypes";
import type { Media } from "../../../../types/entities/mediaTypes";
import type { Category } from "../../../../types/entities/categoryTypes";
import { API_URL } from "../../../../constants/apiConstants";
import { useLayoutEffect, useRef, useState } from "react";

export default function ProjectHeader({ project }: { project: Project }) {
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.up("xs"));
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isMD = useMediaQuery(theme.breakpoints.up("md"));

  const thumbnailUrl =
    API_URL + (project.thumbnail as Media)?.path.replace(/\.webp$/, `_xl.webp`);

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
  if (isMD)
    clientLogoSize = `calc(${theme.typography.h1.fontSize} * ${theme.typography.h1.lineHeight})`;
  else if (isSM)
    clientLogoSize = `calc(${theme.typography.h4.fontSize} * ${theme.typography.h4.lineHeight})`;
  else if (isXS)
    clientLogoSize = `calc(${theme.typography.h5.fontSize} * ${theme.typography.h5.lineHeight})`;
  console.log(clientLogoSize);

  return (
    <ResponsiveStack component="hgroup" rowGap={3}>
      {/* Miniature */}
      <Box
        sx={{
          position: "relative",
          minHeight: `calc(100dvh - 96px - ${infosHeight}px)`,
          background: `url(${thumbnailUrl}) ${(project.thumbnail as Media)?.focus || "center"} / cover no-repeat`,
          backgroundAttachment: "fixed",
          justifyContent: "end",
          alignItems: "center",
          borderTop: `1px solid ${theme.palette.divider}`,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      />

      {/* Titre et Infos */}
      <ResponsiveStack
        ref={infosRef}
        sx={{ paddingX: { xs: 4, lg: 8 }, paddingBottom: "1.5rem !important" }}
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
          <ResponsiveTitle variant="h1" style={{ fontWeight: "900" }}>
            {project ? project.label : "Project not found"}
          </ResponsiveTitle>

          {/* Client */}
          {project.client && (
            <ResponsiveStack
              direction="row"
              sx={{ alignItems: "center", columnGap: 1 }}
            >
              {project.client.logo && (
                <Picture
                  image={project.client.logo as Media}
                  style={{
                    minWidth: clientLogoSize,
                    minHeight: clientLogoSize,
                  }}
                />
              )}
              <ResponsiveTitle
                variant="h1"
                component="p"
                style={{
                  fontWeight: "100",
                }}
              >
                {project.client.label}
              </ResponsiveTitle>
            </ResponsiveStack>
          )}
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
          {project.categories && (
            <ResponsiveBodyTypography variant="bodyLg">
              {project.categories
                .filter(
                  (category) =>
                    (category as Category).label !== "Epinglé" &&
                    (category as Category).label !== "Professionnel",
                )
                .map((category) => (category as Category).label)
                .join(" | ")}
            </ResponsiveBodyTypography>
          )}

          {/* Dates */}
          {project.startDate && (
            <ResponsiveBodyTypography
              variant="bodyLg"
              style={{ fontWeight: "200" }}
            >
              {`${project.endDate ? "De" : "Depuis"} ${project.startDate.locale("fr").format("MMMM YYYY")} ${
                project.endDate
                  ? `à ${project.endDate.locale("fr").format("MMMM YYYY")}`
                  : ""
              }`}
            </ResponsiveBodyTypography>
          )}
        </ResponsiveStack>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
