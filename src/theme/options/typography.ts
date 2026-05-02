import { BREAKPOINTS, VERTICAL_BREAKPOINTS } from "./breakpoints";

export const TYPOGRAPHY = {
  fontSize: 16,
  htmlFontSize: 16,
  h1: { fontSize: "4rem", lineHeight: 1.125, letterSpacing: "normal" },
  h2: { fontSize: "3.5rem", lineHeight: "72px", letterSpacing: "normal" },
  h3: { fontSize: "3rem", lineHeight: 1, letterSpacing: "normal" },
  h4: { fontSize: "2.5rem", lineHeight: 1.2, letterSpacing: "normal" },
  h5: { fontSize: "2rem", lineHeight: 1.5, letterSpacing: "normal" },
  h6: { fontSize: "1.25rem", lineHeight: 1.2, letterSpacing: "normal" },
  body1: { fontSize: "1rem", lineHeight: 1.5, letterSpacing: "normal" },
  body2: { fontSize: "0.75rem", lineHeight: 2, letterSpacing: "normal" },
  bodyLg: { fontSize: "2rem", lineHeight: 1.5 },
  bodyMd: { fontSize: "1.25rem", lineHeight: 1.2 },
  bodySm: { fontSize: "1rem", lineHeight: 1.5 },
  bodyXs: { fontSize: "0.75rem", lineHeight: 2 },
};

const MEDIA_COMPACT = `@media (max-width: ${BREAKPOINTS.values.sm - 1}px), (max-height: ${VERTICAL_BREAKPOINTS.compact - 1}px)`;
const MEDIA_LOOSE = `@media (max-width: ${BREAKPOINTS.values.md - 1}px), (max-height: ${VERTICAL_BREAKPOINTS.loose - 1}px)`;

export const RESPONSIVE_TYPOGRAPHY = {
  ...TYPOGRAPHY,
  h1: {
    ...TYPOGRAPHY.h1,
    [MEDIA_LOOSE]: {
      ...TYPOGRAPHY.h4,
    },
    [MEDIA_COMPACT]: {
      ...TYPOGRAPHY.h5,
    },
  },
  h2: {
    ...TYPOGRAPHY.h2,
    [MEDIA_LOOSE]: {
      ...TYPOGRAPHY.h4,
    },
    [MEDIA_COMPACT]: {
      ...TYPOGRAPHY.h5,
    },
  },
  h3: {
    ...TYPOGRAPHY.h3,
    [MEDIA_LOOSE]: {
      ...TYPOGRAPHY.h4,
    },
    [MEDIA_COMPACT]: {
      ...TYPOGRAPHY.h5,
    },
  },
  h4: {
    ...TYPOGRAPHY.h4,
    [MEDIA_COMPACT]: {
      ...TYPOGRAPHY.h5,
    },
  },
  bodyLg: {
    ...TYPOGRAPHY.bodyLg,
    [MEDIA_LOOSE]: {
      ...TYPOGRAPHY.bodyMd,
    },
    [MEDIA_COMPACT]: {
      ...TYPOGRAPHY.bodySm,
    },
  },
  bodyMd: {
    ...TYPOGRAPHY.bodyMd,
    [MEDIA_COMPACT]: {
      ...TYPOGRAPHY.bodySm,
    },
  },
};
