import { useEffect, useMemo, useState } from "react";
import useProjects from "../../hooks/queries/useProjects";
import Layout from "../../layout";
import ProjectsCarousel from "../../components/entities/project/public/ProjectsCarousel";
import { Button, Skeleton } from "@mui/material";
import Maintenance from "../../components/Maintenance";
import { useAuthContext } from "../../context/AuthContext";
import { isResolvedMedia } from "../../utils/mediaUtils";
import type { Project } from "../../types/entities/projectTypes";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import { useBreakpoints } from "../../hooks/mediaQueries";
import useSettings from "../../hooks/queries/useSettings";
import { API_URL } from "../../constants/apiConstants";
import type { Media } from "../../types/entities/mediaTypes";

function isProjectsMediasReady(projects: Project[]): boolean {
  for (const project of projects) {
    if (project.thumbnail && !isResolvedMedia(project.thumbnail)) return false;
  }
  return true;
}

function getProjectThumbnailUrl(project: Project): string | null {
  if (!project.thumbnail || typeof project.thumbnail === "string") return null;

  return (
    API_URL + (project.thumbnail as Media).path.replace(/\.webp$/, `_xl.webp`)
  );
}

/**
 * Page d'accueil publique du site.
 */
export default function Home() {
  const { maintenanceMode, loading: settingsLoading } = useSettings();
  const { isAuthenticated } = useAuthContext();

  const { isLg, isMd } = useBreakpoints();

  const TITLE_2 = "Web FullStack";
  const [titleLine2, setTitleLine2] = useState(TITLE_2);
  const [carouselImagesLoaded, setCarouselImagesLoaded] = useState(false);

  useEffect(() => {
    const CHARS = "<>{}[]=>/\\|;!@&+_?:-";
    const total = TITLE_2.length;
    const delay = 600;
    const duration = 900;
    const scrambleInterval = 60;
    let rafId: number;
    let lastScramble = 0;

    const randomChars = () =>
      TITLE_2.split("")
        .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
        .join("");

    // Phase 1 : brouillage pur pendant `delay` ms
    const scramble = (now: number) => {
      if (now - lastScramble >= scrambleInterval) {
        lastScramble = now;
        setTitleLine2(randomChars());
      }
      rafId = requestAnimationFrame(scramble);
    };
    rafId = requestAnimationFrame(scramble);

    // Phase 2 : révélation progressive après le délai
    const timeout = setTimeout(() => {
      cancelAnimationFrame(rafId);
      lastScramble = 0;
      const start = performance.now();
      const reveal = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        if (now - lastScramble >= scrambleInterval) {
          lastScramble = now;
          let idx = 0;
          setTitleLine2(
            TITLE_2.split("")
              .map((char) => {
                const revealAt = idx++ / total;
                return progress > revealAt
                  ? char
                  : CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join(""),
          );
        }
        if (progress < 1) rafId = requestAnimationFrame(reveal);
        else setTitleLine2(TITLE_2);
      };
      rafId = requestAnimationFrame(reveal);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const projects = useProjects();

  const pinnedProjects = useMemo(
    () =>
      projects.projects.filter((project) =>
        project.pined ? project.pined : false,
      ),
    [projects.projects],
  );
  const pinnedProjectThumbnailUrls = useMemo(
    () =>
      pinnedProjects
        .map(getProjectThumbnailUrl)
        .filter((url): url is string => !!url),
    [pinnedProjects],
  );
  const arePinnedProjectMediasReady = isProjectsMediasReady(pinnedProjects);
  const pinnedProjectThumbnailUrlsKey = pinnedProjectThumbnailUrls.join("|");

  useEffect(() => {
    if (projects.loading || !arePinnedProjectMediasReady) {
      setCarouselImagesLoaded((loaded) => (loaded ? false : loaded));
      return;
    }

    if (pinnedProjectThumbnailUrls.length === 0) {
      setCarouselImagesLoaded((loaded) => (loaded ? loaded : true));
      return;
    }

    let cancelled = false;
    setCarouselImagesLoaded((loaded) => (loaded ? false : loaded));

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => resolve();
        image.src = src;
      });

    Promise.all(pinnedProjectThumbnailUrls.map(preloadImage)).then(() => {
      if (!cancelled) {
        setCarouselImagesLoaded(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [
    projects.loading,
    arePinnedProjectMediasReady,
    pinnedProjectThumbnailUrls.length,
    pinnedProjectThumbnailUrlsKey,
  ]);

  const shouldShowSkeleton =
    projects.loading || !arePinnedProjectMediasReady || !carouselImagesLoaded;

  return (
    <Layout.Content
      sx={{
        padding: 0,
        flex: "1 1 auto",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      {maintenanceMode && !settingsLoading && !isAuthenticated ? (
        <Maintenance />
      ) : !shouldShowSkeleton ? (
        <ProjectsCarousel
          title={
            <>
              Développement
              <br />
              {titleLine2}
            </>
          }
          subtitle={
            <>
              /** <br />
              {"\u00A0\u00A0"}* Sites web
              <br />
              {"\u00A0\u00A0"}* Applicatifs cross-plateformes
              <br />
              {"\u00A0\u00A0"}* Solutions métiers
              <br />
              {"\u00A0\u00A0"}* Outils d'automatisation
              <br />
              {"\u00A0\u00A0"}* Débogage & optimisation <br />
              {"\u00A0\u00A0"}*/
            </>
          }
          action={
            <Button
              size="large"
              sx={{
                margin: "auto !important",
                whiteSpace: "nowrap",
                width: "fit-content",
              }}
              component="a"
              href="mailto:hello@onoko.dev"
            >
              Me contacter
            </Button>
          }
          projects={pinnedProjects}
          reverseMouseWheel
        />
      ) : (
        <ResponsiveStack
          sx={{
            flexDirection: "row",
            gap: 2,
            width: "100%",
            cursor: "none",
            maxHeight: "100%",
            paddingLeft: { xs: 4, lg: 8 },
            overflow: "hidden",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={`calc((min(100dvw, 1920px) - ${isLg ? "10rem" : "6rem"}) / ${isLg ? 3.5 : isMd ? 2.5 : 1.5})`}
              height={`calc(100dvh - ${isAuthenticated ? "196px" : "144px"})`}
              sx={{ borderRadius: "8px", flexShrink: 0 }}
            />
          ))}
        </ResponsiveStack>
      )}
    </Layout.Content>
  );
}
