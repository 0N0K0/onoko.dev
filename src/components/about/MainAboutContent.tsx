import { Typography, useTheme } from "@mui/material";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import { useContactForm } from "../../context/ContactFormContext";

export default function MainAboutContent() {
  const theme = useTheme();
  const { openContactForm } = useContactForm();

  return (
    <ResponsiveStack
      rowGap={9}
      sx={{
        width: "100%",
        maxWidth: "656px",
        justifyContent: "space-between",
        paddingTop: "48px !important",
      }}
    >
      {/* A propos */}
      <Typography
        variant="h1"
        sx={{ fontWeight: "100", textTransform: "uppercase" }}
      >
        Hello world!
      </Typography>
      <ResponsiveStack rowGap={3}>
        <Typography variant="bodySm">Je m'appelle Noémie Koelblen.</Typography>
        <Typography variant="bodySm">
          Développeuse web full-stack, j'ai une forte appétence pour le backend,
          l'architecture applicative et les outils bien pensés.
        </Typography>
        <Typography variant="bodySm">
          Je travaille principalement avec PHP & Symfony, Node.js, React et
          Wordpress, tout en intervenant sur l'ensemble de l'écosystème du
          développement moderne : design, UX, automatisation, tooling, DevOps,
          gestion de projet...
        </Typography>
        <Typography variant="bodySm">
          Viscéralement curieuse, j’aime comprendre comment les choses
          fonctionnent et construire des solutions propres, durables et utiles.
          Pleinement investie dans les domaines qui me passionnent, je prends
          naturellement le temps de creuser les problèmes, d’expérimenter,
          d’apprendre de nouvelles technologies et de chercher des façons plus
          efficaces et plus simples de travailler.
        </Typography>
        <Typography variant="bodySm">
          Qu’il s’agisse d’un produit ambitieux, d’un besoin métier concret ou
          d’une idée en germe — je suis toujours partante pour participer à de
          nouveaux projets ou partager différents points de vue. Parlons en !
        </Typography>
      </ResponsiveStack>
      {/* Contact */}
      <Typography
        variant="h1"
        component="p"
        sx={{
          marginX: "auto",
          whiteSpace: "nowrap",
          WebkitBoxReflect:
            "below -24px linear-gradient(transparent, rgba(0, 0, 0, 0.25))",
          fontWeight: 100,
          color: theme.palette.primary.light,
          cursor: "pointer",
          transition: "color 0.5s ease-in-out",
          "&:hover": {
            color: theme.palette.primary.main,
          },
        }}
        onClick={openContactForm}
      >
        prendre contact
      </Typography>
      {/* Complément d'information */}
      <ResponsiveStack rowGap={3}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontStyle: "italic",
            color: theme.palette.text.secondary,
            fontWeight: "100",
          }}
        >
          Expérience de terrain
        </Typography>
        <Typography variant="bodySm">
          J'ai occupé pendant plus de 10 ans des fonctions administratives et de
          support technique : secrétariat, RH, comptabilité, assistance
          informatique...
        </Typography>
        <Typography variant="bodySm">
          Mais mon rapport au développement ne date pas de ma reconversion en
          2023.
          <br />
          Très vite, je ne me suis plus contentée d'utiliser les outils. J'ai
          appris le VBA, manipulé des bases SQL, configuré des logiciels
          métiers, fait du webscraping, de la PAO, de la DAO, automatisé des
          process — et formé mes pairs aux dispositifs numériques.
        </Typography>
        <Typography variant="bodySm">
          J'ai acquis de cette expérience rigueur, et compréhension fine des
          besoins métiers. Pour moi, la technique n’a de valeur que lorsqu’elle
          améliore le quotidien des personnes qui l’utilisent.
        </Typography>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
