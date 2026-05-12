import { useRef, useEffect, useCallback } from "react";
import { Typography, useTheme } from "@mui/material";
import type { Category } from "../../types/entities/categoryTypes";
import type { Stack } from "../../types/entities/stackTypes";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import SectionTitle from "./SectionTitle";
import StackGrid from "./StackGrid";
import setupSrc from "../../assets/images/setup.png";
import { useBreakpoints } from "../../hooks/mediaQueries";
import { useAuthContext } from "../../context/AuthContext";

export default function MethodWorkspaceSection({
  stacks,
  categories,
}: {
  stacks: Stack[];
  categories: Category[];
}) {
  const theme = useTheme();
  const { isXl } = useBreakpoints();
  const { isAuthenticated } = useAuthContext();
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);

  const calculateOffset = useCallback(() => {
    const img = imgRef.current;
    const container = containerRef.current;
    if (!img || !container || !img.naturalWidth || !img.naturalHeight) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    // largeur naturelle de l'image si elle remplissait la hauteur du conteneur
    const naturalWidthAtHeight =
      (img.naturalWidth / img.naturalHeight) * containerHeight;
    const overflow = Math.max(0, naturalWidthAtHeight - containerWidth);
    const offset = overflow / 2;

    offsetRef.current = offset;
    img.style.width = `calc(100% + ${overflow}px)`;
    img.style.marginLeft = `${-offset}px`;
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleScroll = () => {
      const rect = img.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when entering bottom of viewport, 1 when leaving top
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      const offset = offsetRef.current;
      // shift from +offset (right) to -offset (left)
      const translateX = offset - clamped * 2 * offset;
      img.style.transform = `translateX(${translateX}px)`;
    };

    const init = () => {
      calculateOffset();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", init);

    if (img.complete && img.naturalWidth) {
      init();
    } else {
      img.addEventListener("load", init);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", init);
      img.removeEventListener("load", init);
    };
  }, [calculateOffset]);

  return (
    <ResponsiveStack id="workspace" rowGap={3} sx={{ flex: "1 1 auto" }}>
      <SectionTitle
        title="Environnement de&nbsp;travail."
        subtitle="S'organiser au&nbsp;quotidien"
      />
      <ResponsiveStack
        rowGap={3}
        sx={{
          flexDirection: { xs: "column", xl: "row" },
          columnGap: 4,
          alignItems: { xl: "flex-end", xs: "stretch" },
        }}
      >
        <ResponsiveStack rowGap={3}>
          <StackGrid
            stacks={stacks
              .filter((stack) =>
                stack.categories?.some(
                  (c) =>
                    (c as Category).parent ===
                      categories.find(
                        (cat) => cat.label === "Environnement de travail",
                      )?.id ||
                    (c as Category).label === "Environnement de travail",
                ),
              )
              .sort((a, b) =>
                ((a.categories?.[0] as Category)?.label ?? "").localeCompare(
                  (b.categories?.[0] as Category)?.label ?? "",
                ),
              )}
          />
          <Typography variant="bodyMd">
            Mon environnement de travail est pensé comme un espace de production
            à part entière.
          </Typography>
          <Typography>
            Je travaille principalement sous Debian. Mais j'utilise également un
            environnement sous Windows 11 avec WSL et Ubuntu. L’ensemble repose
            sur une stack de travail cohérente et homogène : terminal Zsh,
            Homebrew, VS Code, Docker Compose pour les environnements
            conteneurisés, TablePlus pour l’administration des bases de données
            et Postman pour les tests et la validation des APIs.
          </Typography>
          <Typography>
            L’objectif n’est pas tant de disposer d’un environnement confortable
            que d’assurer une production fiable, reproductible et maintenable,
            quel que soit le contexte d’exécution du projet.
          </Typography>
          <Typography>
            Une place particulière est également laissée à la musique qui
            m'accompagne au quotidien et fait partie intégrante de mon équilibre
            de conception et de développement.
          </Typography>
        </ResponsiveStack>
        <div
          style={{
            maxWidth: isXl ? "calc((100% - 32px) / 2)" : "100%",
            maxHeight: `calc(100dvh - ${isAuthenticated ? 288 : 240}px)`,
            aspectRatio: "16 / 9",
            overflow: "hidden",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 8,
            flexShrink: 0,
            marginTop: !isXl ? 24 : 0,
          }}
          ref={containerRef}
        >
          <img
            ref={imgRef}
            src={setupSrc}
            style={{
              display: "block",
              width: `calc((100dvh - ${isAuthenticated ? 288 : 240}px) * (842 / 1869))`,
              height: "100%",
              maxHeight: `calc(100dvh - ${isAuthenticated ? 288 : 240}px)`,
              objectFit: "cover",
              willChange: "transform",
            }}
          />
        </div>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
