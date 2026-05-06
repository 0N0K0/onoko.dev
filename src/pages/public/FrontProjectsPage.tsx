import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@mui/material";
import CallToAction from "../../components/CallToAction";
import ProjectsCarousel from "../../components/entities/project/public/ProjectsCarousel";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import useProjects from "../../hooks/queries/useProjects";
import Layout from "../../layout";
import { API_URL } from "../../constants/apiConstants";
import type { Media } from "../../types/entities/mediaTypes";
import { useAuthContext } from "../../context/AuthContext";

export function FrontProjectsPage() {
  const { isAuthenticated } = useAuthContext();

  const projects = useProjects();

  const webSiteProjects = projects.projects.filter((project) => {
    const labels = project.categories?.map((c) => c.label) ?? [];
    return labels.includes("Site web") && !labels.includes("Bac à sable");
  });

  const softwareProjects = projects.projects.filter((project) => {
    const labels = project.categories?.map((c) => c.label) ?? [];
    return labels.includes("Logiciel") && !labels.includes("Bac à sable");
  });

  const toolProjects = projects.projects.filter((project) => {
    const labels = project.categories?.map((c) => c.label) ?? [];
    return (
      (labels.includes("Libraire") ||
        labels.includes("Plugin") ||
        labels.includes("Automatisation")) &&
      !labels.includes("Bac à sable")
    );
  });

  const persoProjects = projects.projects.filter((project) =>
    project.categories?.some((c) => c.label === "Bac à sable"),
  );

  const carouselSections = useMemo(
    () => [
      {
        id: "web",
        title: <>Sites Web</>,
        subtitle: <>Du pixel à la prod</>,
        projects: webSiteProjects,
      },
      {
        id: "software",
        title: <>Logiciels</>,
        subtitle: <>Des solutions sur mesure</>,
        projects: softwareProjects,
      },
      {
        id: "tools",
        title: <>Modules</>,
        subtitle: (
          <>
            Librairies, Plugins
            <br />& Automatisations
          </>
        ),
        projects: toolProjects,
      },
      {
        id: "sandbox",
        title: <>Bac à sable</>,
        subtitle: <>Libres curiosités</>,
        projects: persoProjects,
      },
    ],
    [webSiteProjects, softwareProjects, toolProjects, persoProjects],
  );

  const visibleSections = useMemo(
    () => carouselSections.filter((section) => section.projects.length > 0),
    [carouselSections],
  );

  const firstDisplayedSections = useMemo(
    () => visibleSections.slice(0, Math.min(2, visibleSections.length)),
    [visibleSections],
  );

  const preloadImageUrls = useMemo(() => {
    const urls = firstDisplayedSections.flatMap((section) =>
      section.projects
        .slice(0, 3)
        .map((project) => {
          if (!project.thumbnail || typeof project.thumbnail === "string") {
            return null;
          }
          const path = (project.thumbnail as Media).path;
          if (!path) return null;
          const thumbnailPath = path.endsWith(".webp")
            ? path.replace(/\.webp$/, "_xl.webp")
            : path;
          return API_URL + thumbnailPath;
        })
        .filter((url): url is string => Boolean(url)),
    );

    return Array.from(new Set(urls));
  }, [firstDisplayedSections]);

  const preloadKey = useMemo(
    () => preloadImageUrls.join("|"),
    [preloadImageUrls],
  );

  const [isPreloadReady, setIsPreloadReady] = useState(false);

  useEffect(() => {
    let active = true;

    if (preloadImageUrls.length === 0) {
      setIsPreloadReady(true);
      return;
    }

    setIsPreloadReady(false);

    Promise.all(
      preloadImageUrls.map(
        (url) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = url;
          }),
      ),
    ).then(() => {
      if (active) setIsPreloadReady(true);
    });

    return () => {
      active = false;
    };
  }, [preloadKey]);

  const canRenderCarousels = isPreloadReady;

  return (
    <Layout.Content
      rowGap={6}
      sx={{
        paddingX: 0,
        overflowY: canRenderCarousels ? "auto" : "hidden",
        maxHeight: canRenderCarousels
          ? undefined
          : `calc(100dvh - ${isAuthenticated ? "168px" : "120px"})`,
      }}
    >
      {canRenderCarousels
        ? visibleSections.map((section) => (
            <ProjectsCarousel
              key={section.id}
              title={section.title}
              subtitle={section.subtitle}
              projects={section.projects}
              minHeight="calc(100dvh - 18rem)"
            />
          ))
        : firstDisplayedSections.map((section) => (
            <ResponsiveStack
              key={`${section.id}-skeleton`}
              sx={{
                flexDirection: "row",
                gap: 2,
                minHeight: "calc(100dvh - 18rem)",
                paddingLeft: { lg: 8, xs: 4 },
                paddingRight: { lg: 8, xs: 4 },
                overflow: "hidden",
              }}
            >
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  variant="rectangular"
                  sx={{
                    flex: "0 0 auto",
                    width: {
                      lg: "calc((min(100dvw, 1920px) - 10rem) / 3.5)",
                      md: "calc((100dvw - 6rem) / 2.5)",
                      xs: "calc((100dvw - 6rem) / 1.5)",
                    },
                    minHeight: "calc(100dvh - 18rem)",
                    borderRadius: 1,
                  }}
                />
              ))}
            </ResponsiveStack>
          ))}
      {canRenderCarousels && visibleSections.length > 0 && (
        <CallToAction emphasis />
      )}
    </Layout.Content>
  );
}
