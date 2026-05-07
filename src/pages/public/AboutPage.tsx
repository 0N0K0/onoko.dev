import { Typography, useTheme } from "@mui/material";
import Layout from "../../layout";
import { useContactForm } from "../../context/ContactFormContext";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import profil from "../../assets/images/profil.jpeg";
import { useBreakpoints } from "../../hooks/mediaQueries";

export default function AboutPage() {
  const theme = useTheme();
  const { isLg } = useBreakpoints();
  const { openContactForm } = useContactForm();

  return (
    <Layout.Content
      sx={{
        flexDirection: "row",
        paddingX: { xs: 4, lg: 8 },
        columnGap: 8,
        marginX: "auto !important",
      }}
    >
      <ResponsiveStack
        rowGap={9}
        sx={{
          width: `calc((min(100vw, 1920px) - (${isLg ? 64 : 32}px * 3)) / 3 * 2)`,
          maxWidth: "656px",
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: "100", textTransform: "uppercase" }}
        >
          Hello world!
        </Typography>
        <ResponsiveStack rowGap={3}>
          <Typography variant="bodySm">
            Je m'appelle Noémie Koelblen.
          </Typography>
          <Typography variant="bodySm">
            Je suis développeuse web full-stack, avec une forte appétence pour
            le backend, l'architecture applicative et les outils bien pensés.
          </Typography>
          <Typography variant="bodySm">
            Je travaille principalement avec PHP & Symfony, Node.js, React et
            Wordpress, tout en intervenant sur l'ensemble de l'écosystème qui
            gravite autour du développement moderne : design, UX,
            automatisation, tooling, DevOps, gestion de projet...
          </Typography>
          <Typography variant="bodySm">
            Viscéralement curieuse, j’aime comprendre comment les choses
            fonctionnent et construire des solutions propres, durables et
            utiles. J’ai tendance à m’investir à fond dans tout ce qui
            m’intéresse : creuser un problème, expérimenter, apprendre une
            nouvelle technologie, optimiser un workflow ou simplifier les
            manières de travailler.
          </Typography>
          <Typography variant="bodySm">
            Qu’il s’agisse d’un produit ambitieux, d’un besoin métier concret ou
            d’une idée en germe — je suis toujours partante pour partager
            différents points de vue et participer à de nouveaux projets.
            Parlons en !
          </Typography>
        </ResponsiveStack>
        <Typography
          variant="bodyLg"
          sx={{
            marginX: "auto",
            whiteSpace: "nowrap",
            WebkitBoxReflect:
              "below -24px linear-gradient(transparent, rgba(0, 0, 0, 0.25))",
            fontSize: "4rem",
            lineHeight: 1.125,
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
        <ResponsiveStack rowGap={3}>
          <Typography variant="h5" component="h2" sx={{ fontStyle: "italic" }}>
            Construire à partir du réel
          </Typography>
          <Typography variant="bodySm">
            Mon rapport au développement ne date pas de ma reconversion en 2024.
            <br />
            J'ai occupé pendant plus de 10 ans des fonctions administratives et
            de support technique : secrétariat, RH, comptabilité, assistance
            informatique... Très vite, je ne me suis plus contentée d'utiliser
            les outils. J'ai appris le VBA, manipulé des bases SQL, configuré
            des logiciels métiers, fait du webscraping, de la PAO, de la DAO,
            automatisé des process — et formé mes pairs aux dispositifs
            numériques.
          </Typography>
          <Typography variant="bodySm">
            J'ai acquis de cette expérience rigueur, et compréhension fine des
            besoins métiers. Pour moi, la technique n’a de valeur que
            lorsqu’elle améliore le quotidien des personnes qui l’utilisent.
          </Typography>
        </ResponsiveStack>
      </ResponsiveStack>
      <img
        src={profil}
        style={{
          minWidth: `min(calc(100vh - 144px), calc((min(100vw, 1920px) - (${isLg ? 64 : 32}px * 3)) / 3))`,
          maxWidth: `min(calc(100vh - 144px), calc((min(100vw, 1920px) - (${isLg ? 64 : 32}px * 3)) / 3))`,
          maxHeight: `min(calc(100vh - 144px), calc((min(100vw, 1920px) - (${isLg ? 64 : 32}px * 3)) / 3))`,
          objectFit: "cover",
          borderRadius: "50%",
          position: "sticky",
          top: "72px",
          alignSelf: "flex-start",
        }}
      />
    </Layout.Content>
  );
}

// J'ai eu le plaisir d'être le mentor de Noémie et de l'accompagner dans sa reconversion professionnelle en tant que développeuse web. J'ai été surpris par son écoute, sa capacité d'apprentissage ainsi que sa curiosité qui lui ont permis de dépasser à plusieurs reprises les attentes de différents projets. Noémie sera un vrai atout dans une équipe et s'adaptera facilement à de nouveaux challenges. Alix V. | 22/04/2024
