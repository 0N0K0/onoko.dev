import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
  interface TypographyVariants {
    bodyLg: React.CSSProperties;
    bodyMd: React.CSSProperties;
    bodySm: React.CSSProperties;
    bodyXs: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    bodyLg?: React.CSSProperties;
    bodyMd?: React.CSSProperties;
    bodySm?: React.CSSProperties;
    bodyXs?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    bodyLg: true;
    bodyMd: true;
    bodySm: true;
    bodyXs: true;
  }
}
