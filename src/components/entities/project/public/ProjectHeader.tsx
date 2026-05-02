import { Box } from "@mui/system";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Picture from "../../../custom/Picture";
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
  if (isMD) clientLogoSize = theme.typography.h1.fontSize;
  else if (isSM) clientLogoSize = theme.typography.h4.fontSize;
  else if (isXS) clientLogoSize = theme.typography.h5.fontSize;

  return (
    <ResponsiveStack
      component="hgroup"
      rowGap={3}
      sx={{ borderBottom: `1px solid rgb(81, 81, 81)` }}
    >
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
          <Typography variant="h1" style={{ fontWeight: "900" }}>
            {project
              ? (new DOMParser().parseFromString(project.label, "text/html")
                  .body.textContent ?? project.label)
              : "Project not found"}
          </Typography>

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
                    width: clientLogoSize,
                    height: clientLogoSize,
                  }}
                />
              )}
              <Typography
                variant="h1"
                component="p"
                style={{
                  fontWeight: "100",
                }}
              >
                {project.client.label}
              </Typography>
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
            <Typography variant="bodyLg">
              {project.categories
                .filter(
                  (category) =>
                    (category as Category).label !== "Epinglé" &&
                    (category as Category).label !== "Professionnel",
                )
                .map((category) => (category as Category).label)
                .join(" | ")}
            </Typography>
          )}

          {/* Dates */}
          {project.startDate && (
            <Typography variant="bodyLg" style={{ fontWeight: "200" }}>
              {`${project.endDate ? "De" : "Depuis"} ${project.startDate.locale("fr").format("MMMM YYYY")} ${
                project.endDate
                  ? `à ${project.endDate.locale("fr").format("MMMM YYYY")}`
                  : ""
              }`}
            </Typography>
          )}
        </ResponsiveStack>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
