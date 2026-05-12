import { Typography } from "@mui/material";
import type { Category } from "../../types/entities/categoryTypes";
import type { Stack } from "../../types/entities/stackTypes";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import SectionCard from "./SectionCard";
import SectionTitle from "./SectionTitle";
import StackGrid from "./StackGrid";
import { useBreakpoints } from "../../hooks/mediaQueries";

export default function MethodDesignSection({ stacks }: { stacks: Stack[] }) {
  const { isLg } = useBreakpoints();

  return (
    <ResponsiveStack id="design" rowGap={6}>
      <SectionTitle title="Design." subtitle="Structurer l’expérience" />
      <StackGrid
        stacks={stacks.filter((stack) =>
          stack.categories?.some((c) => (c as Category).label === "Design"),
        )}
      />
      {/* Contenu */}
      <ResponsiveStack
        rowGap={6}
        sx={{
          flexDirection: { lg: "row", xs: "column-reverse" },
          columnGap: 4,
          alignItems: "stretch",
        }}
      >
        {/* Design System */}
        <ResponsiveStack
          rowGap={3}
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <SectionCard title="Design System" sx={{ flex: 1 }}>
            <Typography variant="bodyMd">
              Le design s’appuie sur une base cohérente qui structure l’ensemble
              du produit et garantit l’unité visuelle de l’interface avant la
              conception des pages.
            </Typography>
            <Typography>
              Le système repose sur des breakpoints à la fois horizontaux et
              verticaux. Ils influencent la composition des écrans et la densité
              de contenu, notamment sur des interfaces complexes ou riches en
              données. L’objectif est d’obtenir des interfaces réellement
              adaptatives, et non simplement responsive.
            </Typography>
            <Typography>
              La structure des layouts s’appuie sur un pas vertical et sur une
              grille flexible. Cette variation permet de gérer des interfaces
              mobile comme desktop, tout en conservant une logique de
              composition cohérente.
            </Typography>
            <Typography>
              L'identité visuelle repose au minimum sur une couleur primaire,
              une couleur secondaire, une couleur d’accent ainsi qu’une palette
              de couleurs neutres destinée aux éléments de fond, de surface et
              de séparation. À cela s’ajoute un système de feedback standardisé
              composé de quatre états fonctionnels : erreur, avertissement,
              succès et information.
            </Typography>
            <Typography>
              Les composants intègrent également un système d’états interactifs
              afin de garantir une cohérence comportementale sur l’ensemble du
              produit.
            </Typography>
            <Typography>
              Une librairie Material Design sert de fondation et est adaptée à
              chaque projet, ce qui permet de bénéficier d’un socle robuste tout
              en conservant une flexibilité de personnalisation forte au niveau
              de l’identité visuelle et des besoins fonctionnels.
            </Typography>
          </SectionCard>
        </ResponsiveStack>
        {/* Wireframe & Maquettes */}
        <ResponsiveStack sx={{ flex: 1, rowGap: 6 }}>
          {/* Wireframes */}
          <SectionCard title="Wireframes" invisible={!isLg}>
            <Typography variant="bodyMd">
              En amont de la phase de maquettage, des wireframes peuvent être
              utilisés afin de structurer la logique fonctionnelle des
              interfaces.
            </Typography>
            <Typography>
              Ils permettent de définir la hiérarchie de l’information, les
              parcours utilisateurs et la structure globale des écrans sans
              interférence liée à l’identité visuelle. Cette approche garantit
              une validation rapide des choix fonctionnels avant d’engager le
              travail graphique.
            </Typography>
            <Typography>
              Les wireframes servent également de support d’échange entre la
              conception et le développement. Ils permettent d’aligner la
              compréhension du produit avant toute implémentation technique et
              facilitent la transition vers le design system et les composants
              réutilisables.
            </Typography>
          </SectionCard>
          {/* Maquettes */}
          <SectionCard title="Maquettes" invisible={!isLg}>
            <Typography variant="bodyMd">
              Chaque interface est conçue selon une logique d’atomic design.
            </Typography>
            <Typography>
              Les composants de base sont combinés pour former des structures
              plus complexes, jusqu’aux écrans complets.
            </Typography>
            <Typography>
              Les maquettes sont construites dès le départ pour être directement
              exploitables par le développement. Elles intègrent les
              comportements attendus, les différents états des composants et les
              règles d’interaction, afin de limiter les interprétations et
              d’assurer une intégration fluide entre design et code.
            </Typography>
          </SectionCard>
        </ResponsiveStack>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
