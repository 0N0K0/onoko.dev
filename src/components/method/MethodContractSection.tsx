import { Typography } from "@mui/material";
import { ResponsiveBox, ResponsiveStack } from "../custom/ResponsiveLayout";
import SectionCard from "./SectionCard";
import SectionTitle from "./SectionTitle";
import { useBreakpoints } from "../../hooks/mediaQueries";

export default function MethodContractSection() {
  const { isLg } = useBreakpoints();

  return (
    <ResponsiveStack id="contract" rowGap={3}>
      <SectionTitle
        title="Cadre contractuel."
        subtitle="Structurer la continuité du projet"
      />
      <ResponsiveBox
        rowGap={6}
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xl: "1fr 2fr 1fr",
            lg: "1fr 2fr",
            xs: "1fr",
          },
          columnGap: { lg: 4, xs: 2 },
        }}
      >
        <SectionCard
          title="Formation"
          sx={{
            gridColumn: { xl: "1 / 2", lg: "1 / 2", xs: "1 / 2" },
            gridRow: { xl: "1 / 2", lg: "2 / 3", xs: "1 / 2" },
          }}
          invisible={!isLg}
        >
          <Typography>
            La formation fait partie intégrante de la livraison.
          </Typography>
          <Typography>
            Elle comprend la prise en main des interfaces d’administration, la
            compréhension des workflows et, lorsque nécessaire, la remise d’une
            documentation technique.
          </Typography>
        </SectionCard>
        <SectionCard
          title="Garantie & Maintenance"
          sx={{
            gridColumn: { xl: "2 / 2", lg: "1 / 3", xs: "1 / 2" },
            gridRow: { xl: "1 / 2", lg: "1 / 2", xs: "2 / 3" },
          }}
          invisible={!isLg}
        >
          <Typography>
            Une période de garantie est généralement appliquée après la
            livraison d’un projet. Durant cette période, les corrections de bugs
            liés au périmètre initial sont prises en charge sans facturation
            supplémentaire. Les évolutions fonctionnelles, en revanche, sont
            considérées comme des prestations additionnelles et font l’objet
            d’une estimation distincte.
          </Typography>
          <Typography>
            La maintenance d’un projet est divisée entre une approche préventive
            et une approche curative. La maintenance préventive inclut les mises
            à jour de dépendances, les corrections de sécurité, la surveillance
            des performances et la gestion des sauvegardes. La maintenance
            curative intervient en cas d’anomalie et suit un niveau de priorité
            défini selon la criticité du problème.
          </Typography>
        </SectionCard>
        <SectionCard
          title="Confidentialité &&nbsp;Propriété"
          sx={{
            gridColumn: { xl: "3 / 4", lg: "2 / 3", xs: "1 / 2" },
            gridRow: { xl: "1 / 2", lg: "2 / 3", xs: "3 / 4" },
          }}
        >
          <Typography>
            Sur le plan juridique, une clause de confidentialité peut être
            appliquée afin de protéger les informations sensibles du projet.
          </Typography>
          <Typography>
            La propriété intellectuelle quant à elle, est transférée au client
            une fois le paiement intégral effectué, à l’exception des composants
            open source ou des librairies tierces utilisées dans le projet.
          </Typography>
        </SectionCard>
      </ResponsiveBox>
    </ResponsiveStack>
  );
}
