import { Typography } from "@mui/material";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import SectionCard from "./SectionCard";
import SectionTitle from "./SectionTitle";

export default function MethodContractSection() {
  return (
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
            Elle comprend la prise en main des interfaces d’administration, la
            compréhension des workflows et, lorsque nécessaire, la remise d’une
            documentation technique.
          </Typography>
        </SectionCard>
        <SectionCard title="Garantie & Maintenance">
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
        <SectionCard title="Confidentialité &&nbsp;Propriété">
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
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
