import { BREAKPOINTS, VERTICAL_BREAKPOINTS } from "../options/breakpoints";
import { TYPOGRAPHY } from "../options/typography";

export const BUTTON = {
  defaultProps: {
    variant: "contained" as const,
  },
  styleOverrides: {
    root: {
      borderRadius: "4px",
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "normal",
      marginTop: "4px",
      marginBottom: "4px",
      padding: "8px 16px",
      textAlign: "center" as const,
      variants: [
        {
          props: { size: "large" },
          style: {
            fontSize: TYPOGRAPHY.bodyMd.fontSize,
            lineHeight: TYPOGRAPHY.bodyMd.lineHeight,
            marginTop: "0",
            marginBottom: "0",
            padding: "0.75rem 2rem",
            [`@media (max-width: ${BREAKPOINTS.values.md - 1}px) or (max-height: ${VERTICAL_BREAKPOINTS.compact - 1}px)`]:
              {
                fontSize: TYPOGRAPHY.bodySm.fontSize,
                lineHeight: TYPOGRAPHY.bodySm.lineHeight,
                marginTop: "4px",
                marginBottom: "4px",
                padding: "8px 16px",
              },
          },
        },
      ],
    },
  },
};
