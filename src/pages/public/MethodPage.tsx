import {
  Card,
  CardContent,
  Link,
  Typography,
  useTheme,
  type CardProps,
} from "@mui/material";
import Layout from "../../layout";
import Icon from "@mdi/react";
import { mdiCheck, mdiRabbit, mdiReplay } from "@mdi/js";
import {
  ResponsiveBox,
  ResponsiveStack,
} from "../../components/custom/ResponsiveLayout";
import Timeline from "@mui/lab/Timeline";
import CustomTimelineItem from "../../components/custom/CustomTimelineItem";
import useStacks from "../../hooks/queries/useStacks";
import Picture from "../../components/custom/Picture";
import useCategories from "../../hooks/queries/useCategories";
import StickyMenuBar from "../../components/custom/StickyMenuBar";
import type { Stack } from "../../types/entities/stackTypes";
import type { Media } from "../../types/entities/mediaTypes";
import { useAuthContext } from "../../context/AuthContext";
import CallToAction from "../../components/CallToAction";

function SectionTitle({
  title,
  titleColor,
  subtitle,
  subtitleColor,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  titleColor?: string;
  subtitleColor?: string;
}) {
  const theme = useTheme();

  return (
    <ResponsiveStack
      sx={{
        flexDirection: "row",
        columnGap: "1ch",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: titleColor || theme.palette.primary.light,
          letterSpacing: "-0.05em",
          whiteSpace: "nowrap",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h2"
        component="p"
        sx={{
          fontWeight: "100",
          color: subtitleColor || "inherit",
        }}
      >
        {subtitle}
      </Typography>
    </ResponsiveStack>
  );
}

function StackGrid({ stacks }: { stacks: Stack[] }) {
  return (
    <ResponsiveBox
      rowGap={3}
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, 3rem)`,
        columnGap: 2,
      }}
    >
      {stacks.map(
        (stack) =>
          stack.icon && (
            <Picture
              key={stack.id}
              image={stack.icon as Media}
              maxHeight="3rem"
              style={{ aspectRatio: "1 / 1" }}
            />
          ),
      )}
    </ResponsiveBox>
  );
}

function SectionCard({
  title,
  children,
  ...props
}: {
  children: React.ReactNode;
  title?: string;
} & CardProps) {
  const theme = useTheme();
  return (
    <Card
      {...props}
      sx={{
        display: "flex",
        flexDirection: "column",
        background: `linear-gradient(rgba(11, 12, 14), ${theme.palette.background.paper}) padding-box, linear-gradient(180deg, ${theme.palette.primary.dark}, ${theme.palette.background.paper}) border-box`,
        borderRadius: 1,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        border: `1px solid transparent`,
        ...props.sx,
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          rowGap: 3,
          padding: "36px 32px !important",
          paddingBottom: "36px !important",
        }}
      >
        {title && <Typography variant="h3">{title}</Typography>}
        {children}
      </CardContent>
    </Card>
  );
}

function TimelineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const { isAuthenticated } = useAuthContext();
  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        const id = href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const y =
            el.getBoundingClientRect().top +
            window.scrollY -
            (isAuthenticated ? 144 : 96);
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }}
      sx={{
        color: theme.palette.text.primary,
        textDecoration: "none",
        display: "inline",
        // transition: `color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
        backgroundImage: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.primary.main})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "100% calc(100%)",
        backgroundSize: "0% 1px",
        transition: `color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}, background-size ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
        "&:hover": {
          color: theme.palette.primary.main,
          backgroundSize: "100% 1px",
          backgroundPosition: "0% calc(100%)",
        },
      }}
    >
      {children}
    </Link>
  );
}

export default function MethodPage() {
  const theme = useTheme();

  const { stacks } = useStacks();
  const { categories } = useCategories();

  return (
    <>
      <StickyMenuBar
        sections={[
          { id: "workflow", label: "Cycle de production" },
          { id: "project-management", label: "Gestion de projet" },
          { id: "design", label: "Design" },
          { id: "ux", label: "Expérience utilisateur" },
          { id: "dev", label: "Développement" },
          { id: "ia-infra", label: "IA" },
          { id: "ia-infra", label: "Infrastructure" },
          { id: "workspace", label: "Environnement de travail" },
          { id: "contract", label: "Cadre contractuel" },
        ]}
      />
      <Layout.Content
        sx={{
          rowGap: 12,
          paddingX: { xs: 4, lg: 8 },
          paddingTop: 6,
          paddingBottom: 0,
        }}
      >
        {/* Header */}
        <ResponsiveStack rowGap={3}>
          <Typography
            variant="h1"
            sx={{ fontWeight: "100", textTransform: "uppercase" }}
          >
            Dans la pratique
          </Typography>
          <Typography variant="bodyMd">
            Cette charte rassemble les intentions, les principes et les
            exigences
            <br />
            qui structurent ma manière d’aborder chaque projet
            <br />- envisagé comme un produit à part entière aux enjeux réels
            <br />
            et pensé pour être exploitable dans le temps.
          </Typography>
        </ResponsiveStack>
        {/* Workflows */}
        <ResponsiveStack id="workflow" rowGap={7.5}>
          <SectionTitle
            title="Cycle de production."
            subtitle="Définir une trajectoire adaptée"
          />
          <ResponsiveStack sx={{ flexDirection: "row", columnGap: 2 }}>
            <ResponsiveStack rowGap={7.5} sx={{ flex: "1 1 auto" }}>
              <ResponsiveStack rowGap={1.5}>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: "100",
                  }}
                >
                  Site statique
                </Typography>
                <Typography
                  variant="bodyMd"
                  sx={{
                    fontStyle: "italic",
                    textAlign: "center",
                    color: theme.palette.text.secondary,
                    fontWeight: "300",
                  }}
                >
                  Production focalisée sur l’expérience utilisateur
                </Typography>
              </ResponsiveStack>
              <Timeline
                position="alternate"
                sx={{
                  margin: "0 !important",
                  padding: "0 !important",
                }}
              >
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#project-management">
                      Cadrage fonctionnel
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#design">
                      Wireframes{" "}
                      <span style={{ color: theme.palette.primary.light }}>
                        &
                      </span>
                      &nbsp;Maquettes
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#dev">
                      Développement frontend
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#dev">
                      Tests{" "}
                      <span style={{ color: theme.palette.primary.light }}>
                        &
                      </span>
                      &nbsp;Validation
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#ia-infra">
                      Livraison en&nbsp;production
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <Typography>
                      <span style={{ color: theme.palette.primary.light }}>
                        Résultat :
                      </span>{" "}
                      Site&nbsp;autonome
                    </Typography>
                  }
                  dotIcon={mdiCheck}
                  connectorProps={{
                    sx: {
                      background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                    },
                  }}
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#contract">
                      Maintenance légère
                    </TimelineLink>
                  }
                  connectorProps={{
                    sx: {
                      background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                    },
                  }}
                />
              </Timeline>
            </ResponsiveStack>
            <ResponsiveStack rowGap={7.5} sx={{ flex: "1 1 auto" }}>
              <ResponsiveStack rowGap={1.5}>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: "100",
                  }}
                >
                  Produit dynamique
                </Typography>
                <Typography
                  variant="bodyMd"
                  sx={{
                    fontStyle: "italic",
                    textAlign: "center",
                    color: theme.palette.text.secondary,
                    fontWeight: "300",
                  }}
                >
                  Architecture évolutive orientée produit
                </Typography>
              </ResponsiveStack>
              <Timeline
                position="alternate"
                sx={{
                  margin: "0 !important",
                  padding: "0 !important",
                }}
              >
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#project-management">
                      Analyse des besoins{" "}
                      <span style={{ color: theme.palette.primary.light }}>
                        &
                      </span>
                      &nbsp;Cadrage&nbsp;fonctionnel
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#design">
                      Wireframes{" "}
                      <span style={{ color: theme.palette.primary.light }}>
                        &
                      </span>
                      &nbsp;Maquettes
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#dev">
                      Développement frontend{" "}
                      <span style={{ color: theme.palette.primary.light }}>
                        &
                      </span>
                      &nbsp;backend
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#dev">
                      Tests{" "}
                      <span style={{ color: theme.palette.primary.light }}>
                        &
                      </span>
                      &nbsp;Validation
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#ia-infra">
                      Déploiement continu
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <Typography>Évolution par&nbsp;itérations</Typography>
                  }
                  dotIcon={mdiReplay}
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#contract">Formation</TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#ia-infra">
                      Livraison en&nbsp;production
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <Typography>
                      <span style={{ color: theme.palette.primary.light }}>
                        Résulat :{" "}
                      </span>
                      Produit&nbsp;évolutif
                    </Typography>
                  }
                  dotIcon={mdiCheck}
                  connectorProps={{
                    sx: {
                      background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                    },
                  }}
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#contract">Maintenance</TimelineLink>
                  }
                  connectorProps={{
                    sx: {
                      background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                    },
                  }}
                />
              </Timeline>
            </ResponsiveStack>
            <ResponsiveStack rowGap={7.5} sx={{ flex: "1 1 auto" }}>
              <ResponsiveStack rowGap={1.5}>
                <Typography
                  variant="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: "100",
                  }}
                >
                  Produit existant
                </Typography>
                <Typography
                  variant="bodyMd"
                  sx={{
                    fontStyle: "italic",
                    textAlign: "center",
                    color: theme.palette.text.secondary,
                    fontWeight: "300",
                  }}
                >
                  Adaptation à la réalité du projet
                </Typography>
              </ResponsiveStack>
              <Timeline
                position="alternate"
                sx={{
                  margin: "0 !important",
                  padding: "0 !important",
                }}
              >
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#project-management">
                      Audit technique{" "}
                      <span style={{ color: theme.palette.primary.light }}>
                        &
                      </span>
                      &nbsp;fonctionnel
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#project-management">
                      Cartographie du&nbsp;système&nbsp;existant
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#project-management">
                      Priorisation des&nbsp;corrections
                    </TimelineLink>
                  }
                />
                <CustomTimelineItem
                  content={
                    <Typography>Évolution par&nbsp;itérations</Typography>
                  }
                  dotIcon={mdiReplay}
                />
                <CustomTimelineItem
                  content={
                    <Typography>
                      <span style={{ color: theme.palette.primary.light }}>
                        Résulat :{" "}
                      </span>
                      Système&nbsp;fiabilisé
                    </Typography>
                  }
                  dotIcon={mdiCheck}
                  connectorProps={{
                    sx: {
                      background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                    },
                  }}
                />
                <CustomTimelineItem
                  content={
                    <TimelineLink href="#contract">Maintenance</TimelineLink>
                  }
                  connectorProps={{
                    sx: {
                      background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                    },
                  }}
                />
              </Timeline>
            </ResponsiveStack>
          </ResponsiveStack>
        </ResponsiveStack>
        {/* Gestion de projet */}
        <ResponsiveStack id="project-management" rowGap={3}>
          <SectionTitle
            title="Gestion de projet."
            subtitle="Collaborer au rythme du produit"
          />
          {/* Contenu */}
          <ResponsiveStack sx={{ flexDirection: "row", columnGap: 4 }}>
            {/* Contenu principal */}
            <ResponsiveStack rowGap={3}>
              <StackGrid
                stacks={stacks.filter((stack) =>
                  stack.categories?.some(
                    (c) => c.label === "Gestion de projet",
                  ),
                )}
              />
              <Typography sx={{ paddingY: "12px" }}>
                Le pilotage des projets suit une logique agile adaptée au
                contexte du projet, combinant un flux Kanban et, lorsque cela
                est pertinent, des cycles courts de type sprint.
              </Typography>
              <Typography>
                Une organisation GitHub centralise l’ensemble des repositories
                liés au projet. Cette organisation peut contenir plusieurs
                repositories distincts, permettant d’isoler les responsabilités
                techniques tout en conservant une vision globale du produit.
              </Typography>
              <Typography>
                Les branches suivent une convention stricte afin de garantir la
                stabilité du code. La branche principale correspond toujours à
                la version en production, tandis que les développements
                s’effectuent sur des branches dédiées aux fonctionnalités ou aux
                corrections. Toute intégration dans la branche principale se
                fait via une pull request, systématiquement revue avant fusion.
              </Typography>
              <Typography>
                La gestion de projet elle-même est en principe réalisée
                directement dans GitHub Projects. Cet espace sert de hub central
                pour la planification, la rédaction des tâches, leur estimation
                et leur priorisation. Chaque tâche est décrite de manière
                structurée, avec un contexte clair, une intention fonctionnelle,
                des critères d’acceptation et une checklist technique permettant
                de garantir l’exécution sans ambiguïté.
              </Typography>
              <Typography>
                Les échanges avec le client s’intègrent directement dans ce
                système de gestion. La priorisation des tâches, leur validation
                ainsi que leur découpage sont réalisés en collaboration avec le
                client, afin d’assurer un alignement continu entre les attentes
                métier et l’exécution technique.
              </Typography>
              <Typography>
                Le workflow global suit une logique fluide mais maîtrisée :
                cadrage des besoins, structuration dans GitHub Projects,
                estimation des charges, priorisation collaborative, puis
                exécution progressive avec suivi des livraisons. Cette approche
                permet de conserver une forte agilité tout en gardant une
                visibilité claire sur l’avancement du produit.
              </Typography>
            </ResponsiveStack>
            {/* Produit existant */}
            <SectionCard title="Produit existant">
              <Typography>
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
                produit avant d’engager de nouveaux développements, afin
                d’éviter l’accumulation de dette technique ou l’introduction de
                régressions.
              </Typography>
              <Typography>
                Selon les résultats de l’audit, certaines recommandations
                peuvent être formulées concernant la structure du projet, les
                priorités de correction ou le niveau de maintenabilité à long
                terme.
              </Typography>
            </SectionCard>
          </ResponsiveStack>
        </ResponsiveStack>
        {/* Design */}
        <ResponsiveStack id="design" rowGap={3}>
          <SectionTitle title="Design." subtitle="Structurer l’expérience" />
          {/* Contenu */}
          <ResponsiveStack
            sx={{ flexDirection: "row", columnGap: 4, alignItems: "stretch" }}
          >
            {/* Design System */}
            <ResponsiveStack
              rowGap={3}
              sx={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <StackGrid
                stacks={stacks.filter((stack) =>
                  stack.categories?.some((c) => c.label === "Design"),
                )}
              />
              <SectionCard title="Design System" sx={{ flex: 1 }}>
                <Typography>
                  Le design s’appuie sur une base cohérente qui structure
                  l’ensemble du produit et garantit l’unité visuelle de
                  l’interface avant la conception des pages.
                </Typography>
                <Typography>
                  Le système repose sur des breakpoints à la fois horizontaux et
                  verticaux. Ils influencent la composition des écrans et la
                  densité de contenu, notamment sur des interfaces complexes ou
                  riches en données. L’objectif est d’obtenir des interfaces
                  réellement adaptatives, et non simplement responsive.
                </Typography>
                <Typography>
                  La structure des layouts s’appuie sur un pas vertical et sur
                  une grille flexible. Cette variation permet de gérer des
                  interfaces mobile comme desktop, tout en conservant une
                  logique de composition cohérente.
                </Typography>
                <Typography>
                  L'identité visuelle repose au minimum sur une couleur
                  primaire, une couleur secondaire, une couleur d’accent ainsi
                  qu’une palette de couleurs neutres destinée aux éléments de
                  fond, de surface et de séparation. À cela s’ajoute un système
                  de feedback standardisé composé de quatre états fonctionnels :
                  erreur, avertissement, succès et information.
                </Typography>
                <Typography>
                  Les composants intègrent également un système d’états
                  interactifs afin de garantir une cohérence comportementale sur
                  l’ensemble du produit.
                </Typography>
                <Typography>
                  Une librairie Material Design sert de fondation et est adaptée
                  à chaque projet, ce qui permet de bénéficier d’un socle
                  robuste tout en conservant une flexibilité de personnalisation
                  forte au niveau de l’identité visuelle et des besoins
                  fonctionnels.
                </Typography>
              </SectionCard>
            </ResponsiveStack>
            {/* Wireframe & Maquettes */}
            <ResponsiveStack sx={{ flex: 1, rowGap: 3 }}>
              {/* Wireframes */}
              <SectionCard title="Wireframes">
                <Typography>
                  En amont de la phase de maquettage, des wireframes peuvent
                  être utilisés afin de structurer la logique fonctionnelle des
                  interfaces.
                </Typography>
                <Typography>
                  Ils permettent de définir la hiérarchie de l’information, les
                  parcours utilisateurs et la structure globale des écrans sans
                  interférence liée à l’identité visuelle. Cette approche
                  garantit une validation rapide des choix fonctionnels avant
                  d’engager le travail graphique.
                </Typography>
                <Typography>
                  Les wireframes servent également de support d’échange entre la
                  conception et le développement. Ils permettent d’aligner la
                  compréhension du produit avant toute implémentation technique
                  et facilitent la transition vers le design system et les
                  composants réutilisables.
                </Typography>
              </SectionCard>
              {/* Maquettes */}
              <SectionCard title="Maquettes">
                <Typography>
                  Chaque interface est conçue selon une logique d’atomic design,
                  dans laquelle les composants de base sont combinés pour former
                  des structures plus complexes, jusqu’aux écrans complets.
                </Typography>
                <Typography>
                  Les maquettes sont construites dès le départ pour être
                  directement exploitables par le développement. Elles intègrent
                  les comportements attendus, les différents états des
                  composants et les règles d’interaction, afin de limiter les
                  interprétations et d’assurer une intégration fluide entre
                  design et code.
                </Typography>
              </SectionCard>
            </ResponsiveStack>
          </ResponsiveStack>
        </ResponsiveStack>
        {/* Expérience utilisateur */}
        <ResponsiveStack id="ux" rowGap={3}>
          <SectionTitle
            title="Expérience utilisateur."
            subtitle="Guider les usages"
          />
          <ResponsiveStack sx={{ flexDirection: "row", columnGap: 4 }}>
            {/* Interfaces d'administration */}
            <SectionCard sx={{ flex: 1 }} title="Interface d’administration">
              <Typography>
                Chaque projet dynamique intègre une interface d’administration
                permettant la gestion des contenus. Cette interface inclut
                généralement la gestion des pages ou entités, une librairie de
                médias centralisée, ainsi qu’un système de rôles et de
                permissions permettant de contrôler les accès des différents
                utilisateurs.
              </Typography>
              <Typography>
                Une attention particulière est portée à la simplicité d’usage.
                Les parcours, les intitulés et les structures sont pensés pour
                rester clairs et intuitifs au quotidien pour des utilisateurs
                non techniques. L’objectif est de limiter les actions complexes,
                réduire les risques d’erreur et permettre une prise en main
                rapide de l’outil.
              </Typography>
            </SectionCard>
            {/* Interface publique */}
            <SectionCard sx={{ flex: 1 }} title="Interface publique">
              <Typography>
                L’expérience utilisateur côté visiteur est conçue comme un
                élément central du produit.
              </Typography>
              <Typography>
                L’objectif est de construire des interfaces claires, lisibles et
                efficaces, dans lesquelles la navigation est pensée pour guider
                naturellement les interactions. Chaque écran doit répondre à une
                intention précise : informer, convertir, explorer ou interagir.
              </Typography>
              <Typography>
                L’interaction est également un élément structurant de
                l’expérience. Les états visuels, les transitions et les retours
                utilisateurs sont utilisés pour rendre l’interface
                compréhensible et réactive. Le temps de chargement et la
                stabilité de l’interface sont optimisés afin de garantir une
                expérience fluide, y compris sur des connexions ou des appareils
                moins performants.
              </Typography>
            </SectionCard>
          </ResponsiveStack>
        </ResponsiveStack>
        {/* Développement */}
        <ResponsiveStack id="dev" rowGap={3}>
          <SectionTitle
            title="Développement."
            subtitle="Concevoir des architectures durables"
          />
          {/* Contenu principal */}
          <ResponsiveStack sx={{ flexDirection: "row", columnGap: 4 }}>
            {/* Frontend */}
            <SectionCard sx={{ flex: 1 }} title="Frontend">
              <StackGrid
                stacks={stacks
                  .filter((stack) =>
                    stack.categories?.some(
                      (c) =>
                        c.parent ===
                        categories.find((cat) => cat.label === "Frontend")?.id,
                    ),
                  )
                  .sort((a, b) =>
                    (a.categories?.[0]?.label ?? "").localeCompare(
                      b.categories?.[0]?.label ?? "",
                    ),
                  )}
              />
              <Typography>
                Dans le cas de sites statiques le frontend constitue la couche
                principale de l’application. Dans cette configuration,
                l’application fonctionne comme une interface entièrement
                autonome, où les contenus sont soit intégrés directement dans le
                code, soit consommés via des sources externes simples (fichiers
                ou services).
              </Typography>
              <Typography>
                Lorsque le projet nécessite des données dynamiques, le frontend
                développé en React communique avec une API dédiée.{" "}
              </Typography>
              <Typography>
                Dans certains cas, des mécanismes temps réel peuvent également
                être intégrés via WebSocket, notamment pour des besoins de mise
                à jour instantanée (chat, notifications...). Le frontend peut
                également consommer des services externes comme des systèmes
                d’envoi d’emails ou des API tierces.
              </Typography>
            </SectionCard>
            {/* Backend */}
            <SectionCard sx={{ flex: 1 }} title="Backend">
              <StackGrid
                stacks={stacks
                  .filter((stack) =>
                    stack.categories?.some(
                      (c) =>
                        c.parent ===
                        categories.find((cat) => cat.label === "Backend")?.id,
                    ),
                  )
                  .sort((a, b) =>
                    (a.categories?.[0]?.label ?? "").localeCompare(
                      b.categories?.[0]?.label ?? "",
                    ),
                  )}
              />
              <Typography>
                Le backend est mis en place uniquement lorsque le projet dépasse
                le cadre d’une application frontend autonome. Il est responsable
                de la logique métier, de la gestion des données et des règles de
                fonctionnement du produit.
              </Typography>
              <Typography>
                Le backend, développé en Node.js ou Symfony selon les besoins,
                expose une API consommée par le frontend. Cette API isole la
                logique métier, sécurise les échanges et garantit la cohérence
                des données.
              </Typography>
            </SectionCard>
            {/* Wordpress */}
            <SectionCard sx={{ flex: 1 }} title="Wordpress">
              <StackGrid
                stacks={stacks.filter((stack) =>
                  stack.categories?.some((c) => c.label === "Wordpress"),
                )}
              />
              <Typography>
                WordPress permet d'accélérer le développement de projets
                nécessitant une gestion de contenu via une interface
                administrative conviviale. Il n'est cependant envisagé que pour
                des projets dont la structure de données reste simple.
              </Typography>
              <Typography>
                Dans ce cas, le développement est structuré autour d’un thème
                personnalisé, conçu spécifiquement pour le projet, et de
                l'utilisation d'ACF qui permet de modéliser les contenus de
                manière flexible.
              </Typography>
              <Typography>
                Des blocs Gutenberg personnalisés peuvent également être
                développés afin de permettre une édition plus modulaire des
                contenus.
              </Typography>
            </SectionCard>
          </ResponsiveStack>
          {/* Contenu secondaire */}
          <ResponsiveStack sx={{ flexDirection: "row", columnGap: 4 }}>
            {/* Performance */}
            <SectionCard sx={{ flex: 1 }} title="Performance">
              <StackGrid
                stacks={stacks.filter((stack) =>
                  stack.categories?.some((c) => c.label === "Performance"),
                )}
              />
              <Typography>
                La performance repose à la fois sur une optimisation frontend
                (réduction des requêtes inutiles, chargement différé des
                ressources, optimisation du rendu), et sur une optimisation
                backend (mise en cache via Redis, limitation des traitements
                lourds, structuration efficace des requêtes).
              </Typography>
              <Typography>
                L’objectif est de garantir une expérience fluide, même en cas de
                montée en charge ou d’augmentation du volume de données.
              </Typography>
            </SectionCard>
            {/* Sécurité */}
            <SectionCard sx={{ flex: 1 }} title="Sécurité">
              <StackGrid
                stacks={stacks.filter((stack) =>
                  stack.categories?.some((c) => c.label === "Sécurité"),
                )}
              />
              <Typography>
                Un socle de sécurité est appliqué à l’ensemble des projets. Il
                inclut notamment la sécurisation des accès API, la validation
                des données côté serveur, la gestion des permissions
                utilisateurs et la protection contre les injections et requêtes
                non autorisées.
              </Typography>
              <Typography>
                Les informations sensibles sont isolées du code source et gérées
                via des mécanismes sécurisés d’environnement.
              </Typography>
            </SectionCard>
            {/* Tests */}
            <SectionCard sx={{ flex: 1 }} title="Tests">
              <StackGrid
                stacks={stacks.filter((stack) =>
                  stack.categories?.some((c) => c.label === "Tests"),
                )}
              />
              <Typography>
                Les projets simples reposent principalement sur des tests
                manuels structurés, tandis que les projets plus complexes
                peuvent intégrer des tests automatisés pour sécuriser les règles
                métier et les interactions critiques.
              </Typography>
              <Typography>
                Les interfaces sont vérifiées sur la cohérence des états, la
                gestion des erreurs et la compatibilité multi-supports afin
                d’assurer une expérience utilisateur stable.
              </Typography>
            </SectionCard>
            {/* Documentation */}
            <SectionCard sx={{ flex: 1 }} title="Documentation">
              <StackGrid
                stacks={stacks.filter((stack) =>
                  stack.categories?.some((c) => c.label === "Documentation"),
                )}
              />
              <Typography>
                Afin de de conserver un projet exploitable, une documentation
                technique est maintenue tout au long du projet afin de garantir
                la lisibilité, la transmission et la maintenabilité du système
                dans le temps.
              </Typography>
              <Typography>
                Elle inclut au minimum les informations essentielles au
                lancement de l’environnement, à la structure du projet et aux
                principaux workflows.
              </Typography>
            </SectionCard>
          </ResponsiveStack>
        </ResponsiveStack>
        {/* IA & Infrastructure */}
        <ResponsiveStack
          id="ia-infra"
          sx={{ flexDirection: "row", columnGap: 8 }}
        >
          {/* IA */}
          <SectionCard sx={{ flex: 1 }}>
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
                  stack.categories?.some((c) => c.label === "IA"),
                )}
              />
            </ResponsiveStack>
            <Typography>
              Les outils d’assistance par IA font partie des workflows modernes
              de développement. Je les utilise pour accélérer certaines tâches
              techniques ou explorer des pistes d’implémentation.
            </Typography>
            <Typography>
              Leur efficacité reste cependant directement liée à l’expertise de
              la personne qui les utilise. La qualité d’un produit dépend avant
              tout de la capacité à structurer une architecture cohérente,
              comprendre les besoins métier implicites, appliquer les standards
              de développement et concevoir une expérience utilisateur claire et
              maintenable.
            </Typography>
            <Typography>
              Cet outil est donc utilisé comme une interface d’assistance sous
              contrôle humain, au service de la qualité, de la fiabilité et de
              l’efficacité de production.
            </Typography>
          </SectionCard>
          {/* Infrastructure */}
          <ResponsiveStack rowGap={3} sx={{ flex: 1, paddingY: "36px" }}>
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
                stack.categories?.some((c) => c.label === "Infrastructure"),
              )}
            />
            <Typography>
              La gestion des environnements suit une logique claire de
              séparation entre local, staging et production. L’environnement
              local est conteneurisé via Docker Compose afin de garantir une
              reproduction fidèle des conditions d’exécution.
            </Typography>
            <Typography>
              L’environnement de staging est considéré comme une réplique
              fonctionnelle de la production. Il permet de valider les
              évolutions avant mise en ligne et constitue une étape obligatoire
              dans le cycle de livraison.
            </Typography>
            <Typography>
              Les déploiements sont automatisés autant que possible via des
              pipelines CI/CD. Ces pipelines intègrent des étapes de
              vérification telles que le linting, l’exécution des tests, la
              construction de l’application et le déploiement sur
              l’environnement cible. Un contrôle manuel peut être conservé avant
              la mise en production lorsque le niveau de risque le nécessite.
            </Typography>
            <Typography>
              La gestion des secrets et des variables d’environnement est
              strictement externalisée du code source afin de garantir la
              sécurité du système. Les logs et le monitoring sont intégrés dans
              une logique de suivi continu de la stabilité applicative.
            </Typography>
          </ResponsiveStack>
        </ResponsiveStack>
        {/* Environnement de travail */}
        <ResponsiveStack id="workspace" rowGap={3}>
          <SectionTitle
            title="Environnement de travail."
            subtitle="S'organiser au quotidien"
          />
          <StackGrid
            stacks={stacks
              .filter((stack) =>
                stack.categories?.some(
                  (c) =>
                    c.parent ===
                      categories.find(
                        (cat) => cat.label === "Environnement de travail",
                      )?.id || c.label === "Environnement de travail",
                ),
              )
              .sort((a, b) =>
                (a.categories?.[0]?.label ?? "").localeCompare(
                  b.categories?.[0]?.label ?? "",
                ),
              )}
          />
          <Typography>
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
        {/* Cadre contractuel */}
        <ResponsiveStack id="contract" rowGap={3}>
          <SectionTitle
            title="Cadre contractuel."
            subtitle="Structurer la continuité du projet"
          />
          <ResponsiveStack sx={{ flexDirection: "row", columnGap: 4 }}>
            <SectionCard title="Formation">
              <Typography>
                La formation fait partie intégrante de la livraison.
              </Typography>
              <Typography>
                Elle comprend la prise en main des interfaces d’administration,
                la compréhension des workflows et, lorsque nécessaire, la remise
                d’une documentation technique.
              </Typography>
            </SectionCard>
            <SectionCard title="Garantie & Maintenance">
              <Typography>
                Une période de garantie est généralement appliquée après la
                livraison d’un projet. Durant cette période, les corrections de
                bugs liés au périmètre initial sont prises en charge sans
                facturation supplémentaire. Les évolutions fonctionnelles, en
                revanche, sont considérées comme des prestations additionnelles
                et font l’objet d’une estimation distincte.
              </Typography>
              <Typography>
                La maintenance d’un projet est divisée entre une approche
                préventive et une approche curative. La maintenance préventive
                inclut les mises à jour de dépendances, les corrections de
                sécurité, la surveillance des performances et la gestion des
                sauvegardes. La maintenance curative intervient en cas
                d’anomalie et suit un niveau de priorité défini selon la
                criticité du problème.
              </Typography>
            </SectionCard>
            <SectionCard title="Confidentialité &&nbsp;Propriété">
              <Typography>
                Sur le plan juridique, une clause de confidentialité peut être
                appliquée afin de protéger les informations sensibles du projet.
              </Typography>
              <Typography>
                {" "}
                La propriété intellectuelle quant à elle, est transférée au
                client une fois le paiement intégral effectué, à l’exception des
                composants open source ou des librairies tierces utilisées dans
                le projet.
              </Typography>
            </SectionCard>
          </ResponsiveStack>
        </ResponsiveStack>
        <CallToAction
          emphasis
          sx={{
            marginX: { xs: "-32px", lg: "-64px" },
            width: { xs: "calc(100% + 64px)", lg: "calc(100% + 128px)" },
          }}
        />
      </Layout.Content>
    </>
  );
}
