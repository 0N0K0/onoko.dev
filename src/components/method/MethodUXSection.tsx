import { Typography } from "@mui/material";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import SectionCard from "./SectionCard";
import SectionTitle from "./SectionTitle";
import { useBreakpoints } from "../../hooks/mediaQueries";

export default function MethodUXSection() {
  const { isLg } = useBreakpoints();

  return (
    <ResponsiveStack id="ux" rowGap={6}>
      <SectionTitle
        title="Expérience utilisateur."
        subtitle="Guider les usages"
      />
      <ResponsiveStack
        rowGap={6}
        sx={{ flexDirection: { lg: "row", xs: "column" }, columnGap: 4 }}
      >
        {/* Interfaces d'administration */}
        <SectionCard
          sx={{ flex: 1 }}
          title="Interface d’administration"
          invisible={!isLg}
        >
          <Typography variant="bodyMd">
            Chaque projet dynamique intègre une interface d’administration
            permettant la gestion des contenus.{" "}
          </Typography>
          <Typography>
            Cette interface inclut généralement la gestion des pages ou entités,
            une librairie de médias centralisée, ainsi qu’un système de rôles et
            de permissions permettant de contrôler les accès des différents
            utilisateurs.
          </Typography>
          <Typography>
            Une attention particulière est portée à la simplicité d’usage. Les
            parcours, les intitulés et les structures sont pensés pour rester
            clairs et intuitifs au quotidien pour des utilisateurs non
            techniques. L’objectif est de limiter les actions complexes, réduire
            les risques d’erreur et permettre une prise en main rapide de
            l’outil.
          </Typography>
        </SectionCard>
        {/* Interface publique */}
        <SectionCard
          sx={{ flex: 1 }}
          title="Interface publique"
          invisible={!isLg}
        >
          <Typography variant="bodyMd">
            L’expérience utilisateur côté visiteur est conçue comme un élément
            central du produit.
          </Typography>
          <Typography>
            L’objectif est de construire des interfaces claires, lisibles et
            efficaces, dans lesquelles la navigation est pensée pour guider
            naturellement les interactions. Chaque écran doit répondre à une
            intention précise : informer, convertir, explorer ou interagir.
          </Typography>
          <Typography>
            L’interaction est également un élément structurant de l’expérience.
            Les états visuels, les transitions et les retours utilisateurs sont
            utilisés pour rendre l’interface compréhensible et réactive. Le
            temps de chargement et la stabilité de l’interface sont optimisés
            afin de garantir une expérience fluide, y compris sur des connexions
            ou des appareils moins performants.
          </Typography>
        </SectionCard>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
