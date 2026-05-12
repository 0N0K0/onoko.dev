import type { Media } from "../../types/entities/mediaTypes";
import type { Stack } from "../../types/entities/stackTypes";
import Picture from "../custom/Picture";
import { ResponsiveBox } from "../custom/ResponsiveLayout";

export default function StackGrid({ stacks }: { stacks: Stack[] }) {
  return (
    <ResponsiveBox
      rowGap={3}
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, 3rem)`,
        columnGap: 2,
        marginBottom: "24px !important",
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
