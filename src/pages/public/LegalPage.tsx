import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import Layout from "../../layout";
import {
  ResponsiveBox,
  ResponsiveStack,
} from "../../components/custom/ResponsiveLayout";
import { useResponsiveWidth } from "../../hooks/layout/useResponsiveWidth";
import { useBreakpoints } from "../../hooks/mediaQueries";

export default function LegalPage() {
  const theme = useTheme();
  const { isMd, isLg, isXl } = useBreakpoints();
  const mainCellWidth = isXl
    ? useResponsiveWidth(8)
    : isLg
      ? useResponsiveWidth(6)
      : useResponsiveWidth(4);

  return (
    <Layout.Content
      rowGap={6}
      sx={{
        paddingX: { xs: 4, lg: 8 },
        "& a": {
          color: theme.palette.primary.light,
          textDecoration: "none",
          display: "inline-block",
          position: "relative",
          transition: `color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          "&::after": {
            content: '""',
            display: "block",
            position: "absolute",
            bottom: "2px",
            left: 0,
            transform: "scaleX(0)",
            transformOrigin: "right",
            width: "100%",
            height: "1px",
            backgroundColor: theme.palette.primary.main,
            transition: `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          },
          "&:hover": {
            color: theme.palette.primary.main,
            "&::after": {
              transform: "scaleX(1)",
              transformOrigin: "left",
            },
          },
        },
      }}
    >
      <Typography variant="h1">Mentions légales</Typography>
      <Typography variant="bodyMd">
        Conformément aux dispositions prévues par la loi n° 2004-575 du 21 juin
        2004 pour la confiance dans l’économie numérique à l’égard des
        utilisateur du site https://onoko.dev/, les présentes mentions légales
        détaille l’identité des différents intervenants dans le cadre de sa
        réalisation.
      </Typography>

      <Table
        sx={{
          marginX: { xs: "-32px", lg: "-64px" },
          width: `calc(100% + ${isLg ? "128px" : "64px"})`,
        }}
      >
        <TableBody
          sx={{
            borderTop: "1px solid rgba(81, 81, 81)",
            "& .MuiTableCell-root": {
              width: mainCellWidth,
              paddingY: 3,
              paddingX: { xs: 4, lg: 8 },
              "&:first-of-type": {
                verticalAlign: "top",
                maxWidth: isMd
                  ? `calc(100dvw - ${mainCellWidth}) !important`
                  : "none",
                borderRight: isMd ? "1px solid rgba(81, 81, 81)" : "none",
              },
            },
          }}
        >
          <TableRow>
            {isMd && (
              <TableCell>
                <Typography variant="h5" component="h2">
                  Onoko
                </Typography>
              </TableCell>
            )}
            <TableCell>
              <ResponsiveStack rowGap={3}>
                {!isMd && (
                  <Typography variant="h5" component="h2">
                    Onoko
                  </Typography>
                )}
                <ResponsiveBox
                  sx={{
                    display: "grid",
                    rowGap: 3,
                    columnGap: 1,
                    gridTemplateColumns: "max-content 1fr",
                  }}
                >
                  <Typography variant="bodySm">SIRET</Typography>
                  <Typography variant="bodySm">75152369700033</Typography>
                  <Typography variant="bodySm">Siège social :</Typography>
                  <Typography variant="bodySm">
                    2 rue des Charrettes
                    <br />
                    Lieu-dit Bens
                    <br />
                    63260 Chaptuzat - FRANCE
                  </Typography>
                  <Typography variant="bodySm">Téléphone :</Typography>
                  <Typography variant="bodySm">
                    <a href="tel:+33632077408">06 32 07 74 08</a>
                  </Typography>
                  <Typography variant="bodySm">Email :</Typography>
                  <Typography variant="bodySm">
                    <a href="mailto:hello@onoko.dev">hello@onoko.dev</a>
                  </Typography>
                </ResponsiveBox>
              </ResponsiveStack>
            </TableCell>
          </TableRow>
          <TableRow>
            {isMd && (
              <TableCell>
                <Typography variant="h5" component="h2">
                  Directeur de la publication
                </Typography>
              </TableCell>
            )}
            <TableCell>
              <ResponsiveStack rowGap={3}>
                {!isMd && (
                  <Typography variant="h5" component="h2">
                    Directeur de la publication
                  </Typography>
                )}
                <Typography variant="bodyMd">Noémie Koelblen</Typography>
              </ResponsiveStack>
            </TableCell>
          </TableRow>
          <TableRow>
            {isMd && (
              <TableCell>
                <Typography variant="h5" component="h2">
                  Hébergement
                </Typography>
              </TableCell>
            )}
            <TableCell>
              <ResponsiveStack rowGap={3}>
                {!isMd && (
                  <Typography variant="h5" component="h2">
                    Hébergement
                  </Typography>
                )}
                <Typography variant="bodyMd">O2Switch</Typography>
                <Typography variant="bodySm">
                  Chemin des Pardiaux
                  <br />
                  63000 Clermont-Ferrand - FRANCE
                </Typography>
              </ResponsiveStack>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Layout.Content>
  );
}
