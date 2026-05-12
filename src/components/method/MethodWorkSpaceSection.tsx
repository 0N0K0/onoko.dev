import { Typography, useTheme } from "@mui/material";
import type { Category } from "../../types/entities/categoryTypes";
import type { Stack } from "../../types/entities/stackTypes";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import SectionTitle from "./SectionTitle";
import StackGrid from "./StackGrid";
import setupSrc from "../../assets/images/setup.png";

export default function MethodWorkspaceSection({
  stacks,
  categories,
}: {
  stacks: Stack[];
  categories: Category[];
}) {
  const theme = useTheme();

  return (
    <ResponsiveStack id="workspace" rowGap={3} sx={{ flex: "1 1 auto" }}>
      <SectionTitle
        title="Environnement de travail."
        subtitle="S'organiser au quotidien"
      />
      <ResponsiveStack sx={{ flexDirection: "row", columnGap: 4 }}>
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
        <img
          src={setupSrc}
          style={{
            maxWidth: "calc((100% - 32px) / 2)",
            objectFit: "cover",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 8,
          }}
        />
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
