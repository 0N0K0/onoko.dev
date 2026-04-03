export const SIZES = () => {
  const rootPaddingY = "24px";
  const rootPaddingX = "32px";
  const columnGap = "16px";
  const rowGap = "24px";
  const rootWidth = `calc(min(100dvw, 1920px) - ${rootPaddingX} * 2)`;
  const divisions = {
    xs: 3,
    sm: 4,
    md: 6,
    lg: 9,
    xl: 12,
    xxl: 12,
  };
  const columnWidth = (
    division: number,
    columns: number,
    baseWidth: string = rootWidth,
  ) => {
    if (columns > division) columns = division;
    if (columns < 1) return "100dvw";
    return `calc(${baseWidth} / ${division} * ${columns})`;
  };
  const colCounts = Array.from({ length: 11 }, (_, i) => i + 2);
  const colSizes = Object.fromEntries(
    colCounts.map((n) => [
      `${n}col`,
      Object.fromEntries(
        Object.entries(divisions).map(([breakpoint, cols]) => [
          breakpoint,
          columnWidth(cols, n),
        ]),
      ),
    ]),
  );

  return {
    adminHeaderHeight: "48px",
    rootPaddingY,
    rootPaddingX,
    rowGap,
    columnGap,
    rootWidth,
    ...colSizes,
    columnWidth,
  };
};
