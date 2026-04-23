import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "@mui/material";
import Icon from "@mdi/react";
import { mdiEye } from "@mdi/js";
import {
  ResponsiveBox,
  ResponsiveStack,
} from "../../../custom/ResponsiveLayout";
import ResponsiveTitle from "../../../custom/ResponsiveTitle";
import ResponsiveBodyTypography from "../../../custom/ResponsiveBodyTypography";
import { API_URL } from "../../../../constants/apiConstants";
import type { Project } from "../../../../types/entities/projectTypes";
import type { Media } from "../../../../types/entities/mediaTypes";

export default function ProjectsCarousel({
  title,
  titleLevel,
  subtitle,
  action,
  projects,
  minHeight,
  reverseMouseWheel = false,
}: {
  title: ReactNode;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  subtitle?: ReactNode;
  action?: ReactNode;
  projects: Project[];
  minHeight?: number | string;
  reverseMouseWheel?: boolean;
}) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const articlesStackRef = useRef<HTMLDivElement>(null);
  const hgroupRef = useRef<HTMLDivElement>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [hgroupVisible, setHgroupVisible] = useState(false);
  const hgroupCollapsedRef = useRef(false);
  const [measured, setMeasured] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const hgroup = hgroupRef.current;
    if (!hgroup) return;
    setContentWidth(hgroup.getBoundingClientRect().width);
    setMeasured(true);
  }, []);

  useEffect(() => {
    if (!measured) return;
    const id = requestAnimationFrame(() => setHgroupVisible(true));
    return () => cancelAnimationFrame(id);
  }, [measured]);

  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY + e.deltaX;
    }
  };

  const handleArticleHover = (
    e: React.MouseEvent<HTMLElement>,
    projectId: string,
  ) => {
    setHgroupVisible(false);
    hgroupCollapsedRef.current = true;

    if (
      isScrollingRef.current ||
      projectId === activeProjectId ||
      !hgroupCollapsedRef.current
    )
      return;
    const article = e.currentTarget;
    const container = containerRef.current;
    const stack = articlesStackRef.current;
    if (!container) return;
    isScrollingRef.current = true;
    if (stack) stack.style.pointerEvents = "none";

    const containerRect = container.getBoundingClientRect();
    const articleRect = article.getBoundingClientRect();
    const style = getComputedStyle(container);
    const paddingLeft = parseFloat(style.paddingLeft);
    const paddingRight = parseFloat(style.paddingRight);
    const visibleWidth = container.clientWidth - paddingLeft - paddingRight;

    const articleScrollLeft =
      articleRect.left - containerRect.left + container.scrollLeft;
    const currentWidth = article.offsetWidth;
    const expandedWidth = currentWidth * 2;
    const mouseRatio = (e.clientX - articleRect.left) / currentWidth;
    let target =
      articleScrollLeft +
      mouseRatio * expandedWidth -
      (e.clientX - containerRect.left);
    const clampMax = articleScrollLeft - paddingLeft - 48;
    const clampMin =
      articleScrollLeft + expandedWidth - paddingLeft - visibleWidth + 48;
    if (clampMin <= clampMax) {
      target = Math.max(clampMin, Math.min(clampMax, target));
    } else {
      target = articleScrollLeft - paddingLeft;
    }
    target = Math.max(0, target);

    setActiveProjectId(projectId);

    const startScroll = container.scrollLeft;
    const duration = 1500;
    const startTime = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      container.scrollLeft = startScroll + (target - startScroll) * easeOut(t);
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        isScrollingRef.current = false;
        if (stack) stack.style.pointerEvents = "";
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <>
      <ResponsiveStack
        ref={containerRef}
        onWheel={reverseMouseWheel ? handleWheel : undefined}
        onMouseMove={(e: React.MouseEvent) => {
          const cursor = cursorRef.current;
          if (!cursor) return;
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
          const stack = articlesStackRef.current;
          if (stack) {
            const r = stack.getBoundingClientRect();
            const over =
              e.clientX >= r.left &&
              e.clientX <= r.right &&
              e.clientY >= r.top &&
              e.clientY <= r.bottom;
            cursor.style.opacity = over ? "1" : "0";
            const container = containerRef.current;
            if (container) container.style.cursor = over ? "none" : "";
          }
        }}
        onMouseLeave={() => {
          setHgroupVisible(true);
          setActiveProjectId(null);
          isScrollingRef.current = false;
          if (cursorRef.current) cursorRef.current.style.opacity = "0";
          if (containerRef.current) containerRef.current.style.cursor = "";
          if (articlesStackRef.current)
            articlesStackRef.current.style.pointerEvents = "";
          const container = containerRef.current;
          if (!container || container.scrollLeft === 0) return;
          const startScroll = container.scrollLeft;
          const startTime = performance.now();
          const duration = 900;
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
          const scrollBack = (now: number) => {
            const t = Math.min((now - startTime) / duration, 1);
            container.scrollLeft = startScroll * (1 - easeOut(t));
            if (t < 1) requestAnimationFrame(scrollBack);
          };
          requestAnimationFrame(scrollBack);
        }}
        sx={{
          flexDirection: "row",
          flex: minHeight ? undefined : "1 1 auto",
          minHeight: minHeight || 0,
          paddingX: 8,
          overflowX: "auto",
          overflowY: "hidden",
          transition: `all 1500ms ${theme.transitions.easing.easeOut}`,
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <ResponsiveStack
          ref={hgroupRef}
          component="hgroup"
          maxWidth="unset"
          sx={{
            flex: "0 0 auto",
            maxWidth: !measured
              ? "none"
              : hgroupVisible
                ? `${contentWidth}px`
                : "0px",
            minWidth: !measured
              ? "none"
              : hgroupVisible
                ? `calc((min(100dvw, 1920px) - 10rem) / 3.5)`
                : "0px",
            overflow: !measured ? "visible" : "hidden",
            rowGap: 4,
            paddingY: 3,
            paddingRight: hgroupVisible ? 4 : 0,
            transition: measured
              ? `min-width 1500ms ${theme.transitions.easing.easeInOut}, max-width 1500ms ${theme.transitions.easing.easeInOut}, padding 1500ms ${theme.transitions.easing.easeInOut}`
              : "none",
          }}
        >
          <ResponsiveTitle
            variant={titleLevel || "h1"}
            style={{
              fontWeight: "100",
              letterSpacing: "-0.067em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </ResponsiveTitle>
          {subtitle && (
            <ResponsiveBodyTypography
              variant="bodyLg"
              style={{ whiteSpace: "nowrap", fontWeight: "300" }}
            >
              {subtitle}
            </ResponsiveBodyTypography>
          )}
          {action}
        </ResponsiveStack>
        {projects.length > 0 && (
          <ResponsiveStack
            ref={articlesStackRef}
            sx={{
              flexDirection: "row",
              gap: 2,
              maxWidth: "unset",
              cursor: "none",
            }}
          >
            {projects.map((project) => {
              const thumbnailUrl =
                API_URL +
                (project.thumbnail as Media)?.path.replace(
                  /\.webp$/,
                  `_xl.webp`,
                );
              return (
                <ResponsiveBox
                  key={project.id}
                  component="article"
                  sx={{
                    flex:
                      activeProjectId === project.id
                        ? "0 0 calc((min(100dvw, 1920px) - 10rem) / 3.5 * 2)"
                        : "0 0 calc((min(100dvw, 1920px) - 10rem) / 3.5)",
                    maxHeight: "100%",
                    position: "relative",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    overflow: "hidden",
                    background: `url(${thumbnailUrl}) ${project.thumbnail && typeof project.thumbnail !== "string" ? project.thumbnail?.focus || "center" : "center"} / cover no-repeat`,
                    transition: `all 1800ms ${theme.transitions.easing.easeOut}`,
                  }}
                  onMouseEnter={(e) => handleArticleHover(e, project.id)}
                >
                  <ResponsiveTitle
                    variant="h1"
                    component="h2"
                    style={{
                      opacity: activeProjectId === project.id ? 1 : 0,
                      transition: `opacity 1200ms ${theme.transitions.easing.easeInOut}`,
                      position: "absolute",
                      bottom: "1.5rem",
                      right: "2rem",
                      zIndex: 1,
                      fontWeight: "900",
                      textShadow: `0 0 5px rgba(0,0,0,0.5)`,
                      textWrap: "nowrap",
                    }}
                  >
                    {project.label}
                  </ResponsiveTitle>
                  {project.startDate && (
                    <ResponsiveBodyTypography
                      variant="bodyLg"
                      style={{
                        opacity: activeProjectId === project.id ? 1 : 0,
                        transition: `opacity 1200ms ${theme.transitions.easing.easeInOut}`,
                        position: "absolute",
                        top: "1.5rem",
                        left: "2rem",
                        zIndex: 1,
                        textShadow: `0 0 5px rgba(0,0,0,0.5)`,
                        textWrap: "nowrap",
                      }}
                    >
                      {project.startDate.format("YYYY")}
                      {project.endDate
                        ? project.endDate.format("YYYY") !==
                          project.startDate.format("YYYY")
                          ? ` - ${project.endDate.format("YYYY")}`
                          : ""
                        : " - Présent"}
                    </ResponsiveBodyTypography>
                  )}
                </ResponsiveBox>
              );
            })}
          </ResponsiveStack>
        )}
      </ResponsiveStack>

      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "opacity 180ms ease",
        }}
      >
        <Icon path={mdiEye} size={1} />
      </div>
    </>
  );
}
