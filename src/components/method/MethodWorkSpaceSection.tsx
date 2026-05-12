import { useRef, useEffect } from "react";
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

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleScroll = () => {
      const rect = img.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when entering bottom of viewport, 1 when leaving top
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      // shift from +40px (right) to -40px (left)
      const translateX = 40 - clamped * 80;
      img.style.transform = `translateX(${translateX}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ResponsiveStack id="workspace" rowGap={3} sx={{ flex: "1 1 auto" }}>
      <SectionTitle
        title="Environnement de travail."
        subtitle="S'organiser au quotidien"
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
            maxHeight: `calc(100dvh - ${isAuthenticated ? 240 : 192}px)`,
            overflow: "hidden",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 8,
            flexShrink: 0,
          }}
        >
          <img
            ref={imgRef}
            src={setupSrc}
            style={{
              display: "block",
              width: "calc(100% + 80px)",
              maxHeight: `calc(100dvh - ${isAuthenticated ? 240 : 192}px)`,
              objectFit: "cover",
              marginLeft: -40,
              willChange: "transform",
            }}
          />
        </div>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
