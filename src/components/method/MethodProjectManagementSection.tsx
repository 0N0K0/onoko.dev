import { Typography } from "@mui/material";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import SectionTitle from "./SectionTitle";
import StackGrid from "./StackGrid";
import SectionCard from "./SectionCard";
import type { Stack } from "../../types/entities/stackTypes";
import type { Category } from "../../types/entities/categoryTypes";

export default function MethodProjectManagementSection({
  stacks,
}: {
  stacks: Stack[];
}) {
  return (
    <ResponsiveStack id="project-management" rowGap={3}>
      <SectionTitle
        title="Gestion de&nbsp;projet."
        subtitle="Collaborer au&nbsp;rythme du&nbsp;produit"
      />
      <StackGrid
        stacks={stacks.filter((stack) =>
          stack.categories?.some(
            (c) => (c as Category).label === "Gestion de projet",
          ),
        )}
      />
      {/* Contenu */}
      <ResponsiveStack
        rowGap={3}
        sx={{ flexDirection: { lg: "row", xs: "column" }, columnGap: 4 }}
      >
        {/* Contenu principal */}
        <ResponsiveStack rowGap={3}>
          <Typography variant="bodyMd" sx={{ paddingY: "12px" }}>
            Le pilotage des projets suit une logique agile adaptée au contexte
            du projet.
          </Typography>
          <Typography>
            Il combine un flux Kanban et, lorsque cela est pertinent, des cycles
            courts de type sprint.
          </Typography>
          <Typography>
            Une organisation GitHub centralise l’ensemble des repositories liés
            au projet. Cette organisation peut contenir plusieurs repositories
            distincts, permettant d’isoler les responsabilités techniques tout
            en conservant une vision globale du produit.
          </Typography>
          <Typography>
            Les branches suivent une convention stricte afin de garantir la
            stabilité du code. La branche principale correspond toujours à la
            version en production, tandis que les développements s’effectuent
            sur des branches dédiées aux fonctionnalités ou aux corrections.
            Toute intégration dans la branche principale se fait via une pull
            request, systématiquement revue avant fusion.
          </Typography>
          <Typography>
            La gestion de projet elle-même est en principe réalisée directement
            dans GitHub Projects. Cet espace sert de hub central pour la
            planification, la rédaction des tâches, leur estimation et leur
            priorisation. Chaque tâche est décrite de manière structurée, avec
            un contexte clair, une intention fonctionnelle, des critères
            d’acceptation et une checklist technique permettant de garantir
            l’exécution sans ambiguïté.
          </Typography>
          <Typography>
            Les échanges avec le client s’intègrent directement dans ce système
            de gestion. La priorisation des tâches, leur validation ainsi que
            leur découpage sont réalisés en collaboration avec le client, afin
            d’assurer un alignement continu entre les attentes métier et
            l’exécution technique.
          </Typography>
          <Typography>
            Le workflow global suit une logique fluide mais maîtrisée : cadrage
            des besoins, structuration dans GitHub Projects, estimation des
            charges, priorisation collaborative, puis exécution progressive avec
            suivi des livraisons. Cette approche permet de conserver une forte
            agilité tout en gardant une visibilité claire sur l’avancement du
            produit.
          </Typography>
        </ResponsiveStack>
        {/* Produit existant */}
        <SectionCard title="Produit existant">
          <Typography variant="bodyMd">
            Lorsqu’un projet repose sur une base déjà existante, une phase
            d’audit peut être réalisée en amont.
          </Typography>
          <Typography>
            Cet audit permet d’évaluer la structure du projet, la qualité du
            code, les dépendances, les niveaux de sécurité, les performances
            ainsi que les éventuels points de fragilité techniques ou
            organisationnels.
          </Typography>
          <Typography>
            L’objectif est de disposer d’une vision claire de l’état réel du
            produit avant d’engager de nouveaux développements, afin d’éviter
            l’accumulation de dette technique ou l’introduction de régressions.
          </Typography>
          <Typography>
            Selon les résultats de l’audit, certaines recommandations peuvent
            être formulées concernant la structure du projet, les priorités de
            correction ou le niveau de maintenabilité à long terme.
          </Typography>
        </SectionCard>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
