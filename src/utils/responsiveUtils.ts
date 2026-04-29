import { useTheme } from "@mui/material";
import { verticalMediaQuery } from "../theme/options/breakpoints";
import type {
  GetResponsiveSxProps,
  ResponsiveSxProps,
} from "../types/components/responsiveTypes";
import { getFactors } from "./nbUtils";

/**
 * Utilitaire pour générer des styles responsives basés sur les propriétés de marge, de padding et d'espacement entre les éléments.
 * Utilise les breakpoints et les fonctions de thème de Material-UI pour créer des styles qui s'adaptent à différentes tailles d'écran et orientations.
 * Permet de limiter les valeurs de marge, de padding et d'espacement à des maximums définis dans le thème pour éviter des espacements excessifs sur les grands écrans.
 * @param {string} props.marginY La marge verticale à appliquer, qui sera limitée par les breakpoints du thème.
 * @param {string} props.paddingY Le padding vertical à appliquer, qui sera limité par les breakpoints du thème.
 * @param {string} props.rowGap L'espacement entre les éléments (row gap) à appliquer, qui sera limité par les breakpoints du thème.
 * @returns {{ maxWidth: number; marginY: { xs: string; sm: string; md: string }; paddingY: { xs: string; sm: string; md: string }; rowGap: { xs: string; sm: string; md: string }; [key: string]: any;}} Un objet de styles responsives à appliquer aux composants.
 */
export function getResponsiveSx({
  marginY = "0px",
  paddingY = "0px",
  rowGap = "0px",
}: GetResponsiveSxProps): ResponsiveSxProps {
  const theme = useTheme();

  const maxSpacing = theme.spacing(24);
  const maxCompactSpacing = theme.spacing(18);
  const maxTightSpacing = theme.spacing(12);

  return {
    marginY: {
      xs: `min(${marginY}, ${maxTightSpacing})`,
      sm: `min(${marginY}, ${maxCompactSpacing})`,
      md: `min(${marginY}, ${maxSpacing})`,
    },
    paddingY: {
      xs: `min(${paddingY}, ${maxTightSpacing})`,
      sm: `min(${paddingY}, ${maxCompactSpacing})`,
      md: `min(${paddingY}, ${maxSpacing})`,
    },
    rowGap: {
      xs: `min(${rowGap}, ${maxTightSpacing})`,
      sm: `min(${rowGap}, ${maxCompactSpacing})`,
      md: `min(${rowGap}, ${maxSpacing})`,
    },
    [verticalMediaQuery("loose", "down")]: {
      marginY: `min(${marginY}, ${maxCompactSpacing})`,
      paddingY: `min(${paddingY}, ${maxCompactSpacing})`,
      rowGap: `min(${rowGap}, ${maxCompactSpacing})`,
    },
    [verticalMediaQuery("compact", "down")]: {
      marginY: `min(${marginY}, ${maxTightSpacing})`,
      paddingY: `min(${paddingY}, ${maxTightSpacing})`,
      rowGap: `min(${rowGap}, ${maxTightSpacing})`,
    },
  };
}

/**
 * Fonction pour calculer la disposition optimale d'une grille d'éléments dans un conteneur donné.
 * Elle prend en compte le nombre d'éléments, les dimensions du conteneur, les marges, les espaces entre les éléments, et le ratio minimum des cellules.
 * @param {HTMLDivElement} container Le conteneur dans lequel la grille doit être affichée
 * @param {number} nbItems Le nombre total d'éléments à afficher
 * @param {number} padding La marge intérieure du conteneur
 * @param {number} gap L'espace entre les éléments dans la grille
 * @param {number} minRatio Le ratio minimum (largeur/hauteur) pour les cellules de la grille
 * @param {number} maxCols Le nombre maximum de colonnes autorisé dans la grille
 * @return {{ cols: number; rowHeight: number } | void} Un objet contenant le nombre de colonnes et la hauteur des lignes optimales, ou void si le nombre d'éléments est zéro
 */
export function calculateGridLayout(
  container: HTMLDivElement,
  nbItems: number,
  padding: number,
  gap: number,
  minRatio: number,
  maxCols: number,
): { cols: number; rowHeight: number } | void {
  const w = container.clientWidth - 2 * padding;
  const h = container.clientHeight - 2 * padding;
  if (nbItems === 0) return;

  const ratioContainer = w / h;

  let bestCols = 1;
  let bestRows = nbItems;
  let bestDiff = Infinity;

  const factorPairs = getFactors(nbItems, maxCols);

  for (const [colsCandidate, rowsCandidate] of factorPairs) {
    if (colsCandidate === undefined || rowsCandidate === undefined) continue;
    const totalGapW = (colsCandidate - 1) * gap;
    const totalGapH = (rowsCandidate - 1) * gap;

    let cellW = (w - totalGapW) / colsCandidate;
    let cellH = (h - totalGapH) / rowsCandidate;

    const cellRatio = cellW / cellH;
    if (cellRatio < minRatio) {
      cellH = cellW / minRatio;
    }

    const ratioGrid = colsCandidate / rowsCandidate;
    const diff = Math.abs(ratioGrid - ratioContainer);

    if (diff < bestDiff) {
      bestDiff = diff;
      bestCols = colsCandidate;
      bestRows = rowsCandidate;
    }
  }

  const totalGapH = (bestRows - 1) * gap;
  const rowHeight = Math.max(
    (h - totalGapH) / bestRows,
    w / bestCols / minRatio,
  );

  return { cols: bestCols, rowHeight };
}
