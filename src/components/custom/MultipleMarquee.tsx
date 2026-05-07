import { Children } from "react";
import Marquee from "react-fast-marquee";
import { ResponsiveStack } from "./ResponsiveLayout";

const MAX_ROWS = 10;

export default function MultipleMarquee({
  rows = 2,
  distribute = false,
  direction = "horizontal",
  gap = "24px",
  sx,
  children,
  ...props
}: {
  rows?: number;
  distribute?: boolean;
  direction?: "vertical" | "horizontal";
  gap?: string;
  sx?: React.CSSProperties;
  children: React.ReactNode[];
} & Omit<React.ComponentProps<typeof Marquee>, "children" | "direction">) {
  const items = Children.toArray(children).filter(Boolean);

  if (!rows || rows < 2 || rows > MAX_ROWS) {
    throw new Error(
      `MultipleMarquee: le nombre de lignes doit être compris entre 2 et ${MAX_ROWS}.`,
    );
  }

  if (!distribute) {
    // Mêmes items dans toutes les lignes
    return (
      <ResponsiveStack
        rowGap={gap}
        sx={{
          gap,
          flexDirection: direction === "vertical" ? "row" : "column",
          ...sx,
        }}
      >
        {[...Array(rows)].map((_, rowIndex) => (
          <Marquee
            key={rowIndex}
            direction={
              rowIndex % 2 === 0
                ? direction === "horizontal"
                  ? "left"
                  : "up"
                : direction === "horizontal"
                  ? "right"
                  : "down"
            }
            {...props}
          >
            {items}
          </Marquee>
        ))}
      </ResponsiveStack>
    );
  }

  // Distribuer les items sur les lignes
  const itemsPerRow = Math.ceil(items.length / rows);

  return (
    <ResponsiveStack
      rowGap={gap}
      sx={{
        gap,
        flexDirection: direction === "vertical" ? "row" : "column",
        ...sx,
      }}
    >
      {[...Array(rows)].map((_, rowIndex) => {
        const start = rowIndex * itemsPerRow;
        const end = start + itemsPerRow;
        const rowItems = items.slice(start, end);

        return (
          <Marquee
            key={rowIndex}
            direction={
              rowIndex % 2 === 0
                ? direction === "horizontal"
                  ? "left"
                  : "up"
                : direction === "horizontal"
                  ? "right"
                  : "down"
            }
            {...props}
          >
            {rowItems}
          </Marquee>
        );
      })}
    </ResponsiveStack>
  );
}
