import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Link, Typography, useTheme } from "@mui/material";
import { mdiEye } from "@mdi/js";
import {
  ResponsiveBox,
  ResponsiveStack,
} from "../../../custom/ResponsiveLayout";
import { API_URL } from "../../../../constants/apiConstants";
import type { Project } from "../../../../types/entities/projectTypes";
import type { Media } from "../../../../types/entities/mediaTypes";
import CustomCursor from "../../../custom/CustomCursor";
import { handleReverseMouseWheel } from "../../../../utils/scrollUtils";
import { useBreakpoints, useCanHover } from "../../../../hooks/mediaQueries";

export default function ProjectsCarousel({
  title,
  titleLevel,
  subtitle,
  action,
  projects,
  minHeight,
  reverseMouseWheel = false,
}: {
  title?: ReactNode;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  subtitle?: ReactNode;
  action?: ReactNode;
  projects: Project[];
  minHeight?: number | string;
  reverseMouseWheel?: boolean;
}) {
  const theme = useTheme();
  const { isLg, isMd } = useBreakpoints();
  const canHover = useCanHover();

  const containerRef = useRef<HTMLDivElement>(null);
  const projectsListRef = useRef<HTMLDivElement>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const hgroupRef = useRef<HTMLDivElement>(null);
  const [hgroupVisible, setHgroupVisible] = useState(false);
  const [hgroupWidthMeasured, setHgroupWidthMeasured] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  const cursorRef = useRef<HTMLDivElement>(null);

  // Mesure la largeur du hgroup
  useLayoutEffect(() => {
    const hgroup = hgroupRef.current;
    if (!hgroup) return;

    const expandedPaddingRight = Number.parseFloat(theme.spacing(4));
    setContentWidth(hgroup.scrollWidth + expandedPaddingRight);
    setHgroupWidthMeasured(true);
  }, [theme]);

  // Affiche le hgroup selon sa largeur mesuree
  useLayoutEffect(() => {
    if (!hgroupWidthMeasured) return;

    const frameId = requestAnimationFrame(() => {
      setHgroupVisible(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, [hgroupWidthMeasured]);

  // Affiche le curseur personnalisé au survol des projets
  const handleProjectsListMouseMove = (e: React.MouseEvent) => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Positionne le curseur personnalisé
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    const projectsList = projectsListRef.current;
    if (projectsList) {
      const r = projectsList.getBoundingClientRect();

      // Vérifie si la souris est au-dessus de la liste des projets
      const over =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;

      // Affiche le curseur personnalisé
      cursor.style.opacity = over ? "1" : "0";

      // Masque le curseur natif
      const container = containerRef.current;
      if (container) container.style.cursor = over ? "none" : "";
    }
  };

  // Gère la sortie de la souris du conteneur des projets
  const handleProjectsListMouseLeave = () => {
    // Réinitialise l'état du hgroup et des projets
    setHgroupVisible(true);
    setActiveProjectId(null);

    // Masque le curseur personnalisé et réactive les interactions
    if (cursorRef.current) cursorRef.current.style.opacity = "0";
    if (containerRef.current) containerRef.current.style.cursor = "";

    const container = containerRef.current;
    if (!container) return;
    const projectsList = projectsListRef.current;
    if (!projectsList) return;

    projectsList.style.pointerEvents = "";

    if (container.scrollLeft === 0) return;

    // Remet le conteneur à la position initiale
    const startScroll = container.scrollLeft;
    const startTime = performance.now();
    const duration = 1500;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const scrollBack = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      container.scrollLeft = startScroll * (1 - easeOut(t));
      if (t < 1) requestAnimationFrame(scrollBack);
    };
    requestAnimationFrame(scrollBack);
  };

  const handleProjectHover = (
    e: React.MouseEvent<HTMLElement>,
    projectId: string,
  ) => {
    setHgroupVisible(false);

    const container = containerRef.current;
    if (!container) return;

    const projectRect = e.currentTarget.getBoundingClientRect();
    let isAfter = true;
    if (activeProjectId) {
      const prevActiveProject = document.getElementById(
        `project-${activeProjectId}`,
      );
      const prevActiveProjectRect = prevActiveProject?.getBoundingClientRect();
      if (prevActiveProjectRect)
        isAfter = projectRect.left > prevActiveProjectRect.left;
    }
    setActiveProjectId(projectId);
    const isFirstProject = projects[0].id === projectId;

    const containerRect = container.getBoundingClientRect();
    const expandedWidth = projectRect.width * (isMd ? 2 : 1.5);
    const widthDiff = expandedWidth - projectRect.width;
    const delta =
      projectRect.left +
      projectRect.width / 2 +
      (widthDiff / 2) * (isAfter ? -1 : 1) -
      containerRect.width / 2;
    console.log({ delta });

    const startScroll = container.scrollLeft;
    console.log({ startScroll });
    const duration = 1500;
    const startTime = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    if (isFirstProject && container.scrollLeft === 0) return;

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      container.scrollLeft = isFirstProject
        ? startScroll * (1 - easeOut(t))
        : startScroll + delta * easeOut(t);
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <>
      <ResponsiveStack
        ref={containerRef}
        sx={{
          flexDirection: "row",
          flex: minHeight ? undefined : "1 1 auto",
          minHeight: minHeight || 0,
          paddingLeft: {
            lg: 8,
            xs: 4,
          },
          overflowX: "auto",
          overflowY: "hidden",
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
        onWheel={
          reverseMouseWheel
            ? (e) => handleReverseMouseWheel(e, containerRef)
            : undefined
        }
      >
        {title && (
          <ResponsiveStack
            ref={hgroupRef}
            component="hgroup"
            maxWidth="unset"
            sx={{
              flex: "0 0 auto",
              maxWidth: !hgroupWidthMeasured
                ? "none"
                : hgroupVisible
                  ? `${contentWidth}px`
                  : "0px",
              minWidth: !hgroupWidthMeasured
                ? "none"
                : hgroupVisible
                  ? `calc((min(100dvw, 1920px) - 10rem) / 3.5)`
                  : "0px",
              overflow: !hgroupWidthMeasured ? "visible" : "hidden",
              opacity: hgroupVisible ? 1 : 0,
              rowGap: "48px !important",
              paddingY: "24px !important",
              paddingRight: hgroupVisible ? 4 : 0,
              transition: hgroupWidthMeasured
                ? `opacity 900ms ${theme.transitions.easing.easeInOut}, min-width 1500ms ${theme.transitions.easing.easeInOut}, max-width 1500ms ${theme.transitions.easing.easeInOut}, padding 1500ms ${theme.transitions.easing.easeInOut}`
                : "none",
            }}
          >
            <Typography
              variant={titleLevel || "h1"}
              style={{
                fontWeight: "100",
                letterSpacing: "-0.067em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="bodyLg"
                style={{ whiteSpace: "nowrap", fontWeight: "300" }}
              >
                {subtitle}
              </Typography>
            )}
            {action}
          </ResponsiveStack>
        )}
        {projects.length > 0 && (
          <div
            style={{
              minHeight: "100%",
              // flex: "0 1 100%", overflow: "hidden"
            }}
            onMouseLeave={handleProjectsListMouseLeave}
            onMouseMove={handleProjectsListMouseMove}
          >
            <ResponsiveStack
              ref={projectsListRef}
              sx={{
                flexDirection: "row",
                gap: 2,
                maxWidth: "100%",
                cursor: "none",
                minHeight: "100%",
              }}
            >
              {projects.map((project, idx) => {
                const thumbnailUrl =
                  API_URL +
                  (project.thumbnail as Media)?.path.replace(
                    /\.webp$/,
                    `_xl.webp`,
                  );
                return (
                  <ResponsiveBox
                    key={project.id}
                    id={`project-${project.id}`}
                    component={Link}
                    href={`/projects/${project.slug}`}
                    sx={{
                      flex:
                        activeProjectId === project.id || !canHover
                          ? `0 0 calc((min(100dvw, 1920px) - ${isLg ? "10rem" : "6rem"}) / ${isLg ? 3.5 : isMd ? 2.5 : 1.5} * ${isMd ? 2 : 1.5})`
                          : `0 0 calc((min(100dvw, 1920px) - ${isLg ? "10rem" : "6rem"}) / ${isLg ? 3.5 : isMd ? 2.5 : 1.5})`,
                      maxHeight: "100%",
                      position: "relative",
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1,
                      overflow: "hidden",
                      background: `url(${thumbnailUrl}) ${project.thumbnail && typeof project.thumbnail !== "string" ? project.thumbnail?.focus || "center" : "center"} / cover no-repeat`,
                      transition: `all 1500ms ${theme.transitions.easing.easeOut}`,
                      cursor: "none",
                      marginRight:
                        idx === projects.length - 1 ? { lg: 8, xs: 4 } : 0,
                    }}
                    onMouseEnter={(e) => handleProjectHover(e, project.id)}
                  >
                    <Typography
                      variant="h1"
                      component="h2"
                      sx={{
                        opacity:
                          activeProjectId === project.id || !canHover ? 1 : 0,
                        transition: `opacity 1200ms ${theme.transitions.easing.easeInOut}`,
                        position: "absolute",
                        bottom: "1.5rem",
                        right: { sm: "2rem", xs: "1rem" },
                        maxWidth: {
                          sm: "calc(100% - 4rem)",
                          xs: "calc(100% - 2rem)",
                        },
                        zIndex: 1,
                        fontWeight: "900",
                        textShadow: `0 0 5px rgba(0,0,0,0.5)`,
                        textWrap: "pretty",
                        textAlign: "right",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {new DOMParser().parseFromString(
                        project.label,
                        "text/html",
                      ).body.textContent ?? project.label}
                    </Typography>
                    {project.startDate && (
                      <Typography
                        variant="bodyLg"
                        style={{
                          opacity:
                            activeProjectId === project.id || !canHover ? 1 : 0,
                          transition: `opacity 1200ms ${theme.transitions.easing.easeInOut}`,
                          position: "absolute",
                          top: "1.5rem",
                          left: "2rem",
                          zIndex: 1,
                          textShadow: `0 0 5px rgba(0,0,0,0.5)`,
                          textWrap: "nowrap",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {!project.endDate && project.startDate && "Depuis "}
                        {project.startDate.format("YYYY")}
                        {project.endDate &&
                        project.endDate.format("YYYY") !==
                          project.startDate.format("YYYY")
                          ? ` -${project.endDate.format("YYYY")}`
                          : ""}
                      </Typography>
                    )}
                  </ResponsiveBox>
                );
              })}
            </ResponsiveStack>
          </div>
        )}
      </ResponsiveStack>

      {canHover && <CustomCursor icon={mdiEye} ref={cursorRef} />}
    </>
  );
}
