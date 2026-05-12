import { Typography } from "@mui/material";
import { ResponsiveBox, ResponsiveStack } from "../custom/ResponsiveLayout";
import SectionCard from "./SectionCard";
import SectionTitle from "./SectionTitle";
import StackGrid from "./StackGrid";
import type { Category } from "../../types/entities/categoryTypes";
import type { Stack } from "../../types/entities/stackTypes";
import { useBreakpoints } from "../../hooks/mediaQueries";

function SecondaryContent({ stacks }: { stacks: Stack[] }) {
  const { isLg } = useBreakpoints();

  return (
    <>
      {/* Performance */}
      <SectionCard sx={{ flex: 1 }} title="Performance" invisible={!isLg}>
        <StackGrid
          stacks={stacks.filter((stack) =>
            stack.categories?.some(
              (c) => (c as Category).label === "Performance",
            ),
          )}
        />
        <Typography>
          La performance repose à la fois sur une optimisation frontend
          (réduction des requêtes inutiles, chargement différé des ressources,
          optimisation du rendu), et sur une optimisation backend (mise en cache
          via Redis, limitation des traitements lourds, structuration efficace
          des requêtes).
        </Typography>
        <Typography>
          L’objectif est de garantir une expérience fluide, même en cas de
          montée en charge ou d’augmentation du volume de données.
        </Typography>
      </SectionCard>
      {/* Sécurité */}
      <SectionCard sx={{ flex: 1 }} title="Sécurité" invisible={!isLg}>
        <StackGrid
          stacks={stacks.filter((stack) =>
            stack.categories?.some((c) => (c as Category).label === "Sécurité"),
          )}
        />
        <Typography>
          Un socle de sécurité est appliqué à l’ensemble des projets.
        </Typography>
        <Typography>
          Il inclut notamment la sécurisation des accès API, la validation des
          données côté serveur, la gestion des permissions utilisateurs et la
          protection contre les injections et requêtes non autorisées.
        </Typography>
        <Typography>
          Les informations sensibles sont isolées du code source et gérées via
          des mécanismes sécurisés d’environnement.
        </Typography>
      </SectionCard>
      {/* Tests */}
      <SectionCard sx={{ flex: 1 }} title="Tests" invisible={!isLg}>
        <StackGrid
          stacks={stacks.filter((stack) =>
            stack.categories?.some((c) => (c as Category).label === "Tests"),
          )}
        />
        <Typography>
          Les projets simples reposent principalement sur des tests manuels
          structurés, tandis que les projets plus complexes peuvent intégrer des
          tests automatisés pour sécuriser les règles métier et les interactions
          critiques.
        </Typography>
        <Typography>
          Les interfaces sont vérifiées sur la cohérence des états, la gestion
          des erreurs et la compatibilité multi-supports afin d’assurer une
          expérience utilisateur stable.
        </Typography>
      </SectionCard>
      {/* Documentation */}
      <SectionCard sx={{ flex: 1 }} title="Documentation" invisible={!isLg}>
        <StackGrid
          stacks={stacks.filter((stack) =>
            stack.categories?.some(
              (c) => (c as Category).label === "Documentation",
            ),
          )}
        />
        <Typography>
          Afin de de conserver un projet exploitable, une documentation
          technique est maintenue tout au long du projet afin de garantir la
          lisibilité, la transmission et la maintenabilité du système dans le
          temps.
        </Typography>
        <Typography>
          Elle inclut au minimum les informations essentielles au lancement de
          l’environnement, à la structure du projet et aux principaux workflows.
        </Typography>
      </SectionCard>
    </>
  );
}

export default function MethodDevSection({
  stacks,
  categories,
}: {
  stacks: Stack[];
  categories: Category[];
}) {
  const { isLg, isMd } = useBreakpoints();

  return (
    <ResponsiveStack id="dev" rowGap={3}>
      <SectionTitle
        title="Développement."
        subtitle="Concevoir des&nbsp;architectures durables"
      />
      {/* Contenu principal */}
      <ResponsiveBox
        rowGap={3}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xl: "repeat(3, 1fr)",
            lg: "repeat(2, 1fr)",
            xs: "1fr",
          },
          columnGap: { lg: 4, xs: 2 },
        }}
      >
        {/* Frontend */}
        <SectionCard title="Frontend" invisible={!isLg}>
          <StackGrid
            stacks={stacks
              .filter((stack) =>
                stack.categories?.some(
                  (c) =>
                    (c as Category).parent ===
                    categories.find((cat) => cat.label === "Frontend")?.id,
                ),
              )
              .sort((a, b) =>
                ((a.categories?.[0] as Category)?.label ?? "").localeCompare(
                  (b.categories?.[0] as Category)?.label ?? "",
                ),
              )}
          />
          <Typography variant="bodyMd">
            Dans le cas de sites statiques le frontend constitue la couche
            principale de l’application.
          </Typography>
          <Typography>
            Dans cette configuration, l’application fonctionne comme une
            interface entièrement autonome, où les contenus sont soit intégrés
            directement dans le code, soit consommés via des sources externes
            simples (fichiers ou services).
          </Typography>
          <Typography variant="bodyMd">
            Lorsque le projet nécessite des données dynamiques, le frontend
            développé en React communique avec une API dédiée.{" "}
          </Typography>
          <Typography>
            Dans certains cas, des mécanismes temps réel peuvent également être
            intégrés via WebSocket, notamment pour des besoins de mise à jour
            instantanée (chat, notifications...). Le frontend peut également
            consommer des services externes comme des systèmes d’envoi d’emails
            ou des API tierces.
          </Typography>
        </SectionCard>
        {/* Backend */}
        <SectionCard title="Backend" invisible={!isLg}>
          <StackGrid
            stacks={stacks
              .filter((stack) =>
                stack.categories?.some(
                  (c) =>
                    (c as Category).parent ===
                    categories.find((cat) => cat.label === "Backend")?.id,
                ),
              )
              .sort((a, b) =>
                ((a.categories?.[0] as Category)?.label ?? "").localeCompare(
                  (b.categories?.[0] as Category)?.label ?? "",
                ),
              )}
          />
          <Typography variant="bodyMd">
            Le backend est mis en place uniquement lorsque le projet dépasse le
            cadre d’une application frontend autonome.
          </Typography>
          <Typography>
            Il est responsable de la logique métier, de la gestion des données
            et des règles de fonctionnement du produit.
          </Typography>
          <Typography>
            Le backend, développé en Node.js ou Symfony selon les besoins,
            expose une API consommée par le frontend. Cette API isole la logique
            métier, sécurise les échanges et garantit la cohérence des données.
          </Typography>
        </SectionCard>
        {/* Wordpress */}
        <SectionCard
          sx={{ gridColumn: { xl: "3/3", lg: "1/3", xs: "1/1" } }}
          title="Wordpress"
          invisible={!isLg}
        >
          <StackGrid
            stacks={stacks.filter((stack) =>
              stack.categories?.some(
                (c) => (c as Category).label === "Wordpress",
              ),
            )}
          />
          <Typography variant="bodyMd">
            WordPress permet d'accélérer le développement de projets nécessitant
            une gestion de contenu via une interface administrative conviviale.
          </Typography>
          <Typography>
            Il n'est cependant envisagé que pour des projets dont la structure
            de données reste simple.
          </Typography>
          <Typography>
            Dans ce cas, le développement est structuré autour d’un thème
            personnalisé, conçu spécifiquement pour le projet, et de
            l'utilisation d'ACF qui permet de modéliser les contenus de manière
            flexible.
          </Typography>
          <Typography>
            Des blocs Gutenberg personnalisés peuvent également être développés
            afin de permettre une édition plus modulaire des contenus.
          </Typography>
        </SectionCard>
      </ResponsiveBox>
      {/* Contenu secondaire */}
      {isLg ? (
        <ResponsiveBox
          rowGap={3}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xl: "repeat(4, 1fr)",
              lg: "repeat(2, 1fr)",
              xs: "1fr",
            },
            columnGap: { lg: 4, xs: 2 },
          }}
        >
          <SecondaryContent stacks={stacks} />
        </ResponsiveBox>
      ) : (
        <SectionCard>
          <SecondaryContent stacks={stacks} />
        </SectionCard>
      )}
    </ResponsiveStack>
  );
}
