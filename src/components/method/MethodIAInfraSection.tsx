import Icon from "@mdi/react";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import SectionCard from "./SectionCard";
import SectionTitle from "./SectionTitle";
import { mdiRabbit } from "@mdi/js";
import { useTheme } from "@mui/system";
import StackGrid from "./StackGrid";
import type { Stack } from "../../types/entities/stackTypes";
import type { Category } from "../../types/entities/categoryTypes";
import { Typography } from "@mui/material";

export default function MethodIAInfraSection({ stacks }: { stacks: Stack[] }) {
  const theme = useTheme();

  return (
    <ResponsiveStack sx={{ flexDirection: "row", columnGap: 8 }}>
      {/* IA */}
      <SectionCard id="ia" sx={{ flex: 1 }}>
        <ResponsiveStack
          rowGap={3}
          sx={{
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 4,
            justifyContent: "space-between",
          }}
        >
          <SectionTitle
            title={
              <>
                IA <Icon path={mdiRabbit} size={1} />
              </>
            }
            titleColor={theme.palette.text.primary}
            subtitle="Encadrer l'outil grâce à&nbsp;l’expertise métier"
            subtitleColor={theme.palette.primary.light}
          />

          <StackGrid
            stacks={stacks.filter((stack) =>
              stack.categories?.some((c) => (c as Category).label === "IA"),
            )}
          />
        </ResponsiveStack>
        <Typography>
          Les outils d’assistance par IA font partie des workflows modernes de
          développement. Je les utilise pour accélérer certaines tâches
          techniques ou explorer des pistes d’implémentation.
        </Typography>
        <Typography>
          Leur efficacité reste cependant directement liée à l’expertise de la
          personne qui les utilise. La qualité d’un produit dépend avant tout de
          la capacité à structurer une architecture cohérente, comprendre les
          besoins métier implicites, appliquer les standards de développement et
          concevoir une expérience utilisateur claire et maintenable.
        </Typography>
        <Typography>
          Cet outil est donc utilisé comme une interface d’assistance sous
          contrôle humain, au service de la qualité, de la fiabilité et de
          l’efficacité de production.
        </Typography>
      </SectionCard>
      {/* Infrastructure */}
      <ResponsiveStack id="infra" rowGap={3} sx={{ flex: 1, paddingY: "36px" }}>
        <ResponsiveStack
          rowGap={3}
          sx={{
            flexDirection: "row",
            columnGap: "1ch",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.primary.light,
              letterSpacing: "-0.05em",
            }}
          >
            Infrastructure.
          </Typography>
          <Typography variant="h2" component="p" sx={{ fontWeight: "100" }}>
            Préserver la cohérence
          </Typography>
        </ResponsiveStack>
        <StackGrid
          stacks={stacks.filter((stack) =>
            stack.categories?.some(
              (c) => (c as Category).label === "Infrastructure",
            ),
          )}
        />
        <Typography variant="bodyMd">
          La gestion des environnements suit une logique claire de séparation
          entre local, staging et production.
        </Typography>
        <Typography>
          L’environnement local est conteneurisé via Docker Compose afin de
          garantir une reproduction fidèle des conditions d’exécution.
        </Typography>
        <Typography>
          L’environnement de staging est considéré comme une réplique
          fonctionnelle de la production. Il permet de valider les évolutions
          avant mise en ligne et constitue une étape obligatoire dans le cycle
          de livraison.
        </Typography>
        <Typography>
          Les déploiements sont automatisés autant que possible via des
          pipelines CI/CD. Ces pipelines intègrent des étapes de vérification
          telles que le linting, l’exécution des tests, la construction de
          l’application et le déploiement sur l’environnement cible. Un contrôle
          manuel peut être conservé avant la mise en production lorsque le
          niveau de risque le nécessite.
        </Typography>
        <Typography>
          La gestion des secrets et des variables d’environnement est
          strictement externalisée du code source afin de garantir la sécurité
          du système. Les logs et le monitoring sont intégrés dans une logique
          de suivi continu de la stabilité applicative.
        </Typography>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
