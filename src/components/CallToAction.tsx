import { Button, useTheme } from "@mui/material";
import ResponsiveBodyTypography from "./custom/ResponsiveBodyTypography";
import { ResponsiveStack } from "./custom/ResponsiveLayout";

export default function CallToAction({ emphasis }: { emphasis?: boolean }) {
  const theme = useTheme();
  return (
    <ResponsiveStack
      paddingY={3}
      rowGap={3}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: theme.palette.primary.dark,
        paddingX: 8,
        width: emphasis ? "100%" : "fit-content",
        minWidth: theme.sizes.columnWidth(3, 2, "min(100dvw, 1920px)"),
        margin: "0 auto",
        borderRadius: emphasis ? 0 : 1,
      }}
    >
      <ResponsiveBodyTypography variant="bodyLg" sx={{ fontStyle: "italic" }}>
        Une&nbsp;question&nbsp;? {emphasis ? "N'hésitez\u00A0plus... " : ""}
        <br />
        Je&nbsp;serais {emphasis ? "sincèrement " : ""}ravie&nbsp;d'échanger
        avec&nbsp;vous&nbsp;!
      </ResponsiveBodyTypography>
      <Button
        size="large"
        color="inherit"
        sx={{
          marginTop: 9,
          margin: "auto",
        }}
      >
        Me contacter
      </Button>
    </ResponsiveStack>
  );
}
