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

  interface Theme {
    sizes: {
      adminHeaderHeight: number;
      rootPaddingY: number;
      rootPaddingX: number;
      rowGap: number;
      columnGap: number;
      rootWidth: string;
      columnWidth: (
        division: number,
        columns: number,
        baseWidth?: string,
      ) => string;
      [key: `${number}col`]: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
    };
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

declare module "@mui/material/IconButton" {
  interface IconButtonPropsSizeOverrides {
    adminMenu: true;
  }
}
