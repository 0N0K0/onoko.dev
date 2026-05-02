import { useEffect, useState } from "react";
import useProjects from "../../hooks/queries/useProjects";
import Layout from "../../layout";
import ProjectsCarousel from "../../components/entities/project/public/ProjectsCarousel";
import { Button } from "@mui/material";

/**
 * Page d'accueil publique du site.
 */
export default function Home() {
  const TITLE_2 = "Web FullStack";
  const [titleLine2, setTitleLine2] = useState(TITLE_2);

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

  const pinnedProjects = projects.projects.filter((project) =>
    project.categories?.some((c) => c.label === "Epinglé"),
  );

  return (
    <Layout.Content
      sx={{ padding: 0, flex: "1 1 auto", minHeight: 0, overflow: "hidden" }}
    >
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
    </Layout.Content>
  );
}
