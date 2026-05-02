import { Button, Typography, useTheme } from "@mui/material";
import { ResponsiveStack } from "./custom/ResponsiveLayout";
import { useResponsiveWidth } from "../hooks/layout/useResponsiveWidth";

export default function CallToAction({
  emphasis,
  ...props
}: { emphasis?: boolean } & Omit<
  React.ComponentProps<typeof ResponsiveStack>,
  "children"
>) {
  const theme = useTheme();
  const minWidth = useResponsiveWidth(8);
  return (
    <ResponsiveStack
      paddingY={3}
      rowGap={3}
      {...props}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: theme.palette.primary.dark,
        paddingX: { xs: 4, lg: 8 },
        width: emphasis ? "100%" : "fit-content",
        minWidth: `min(${minWidth}, 100%)`,
        margin: "0 auto",
        borderRadius: emphasis ? 0 : 1,
        ...props.sx,
      }}
    >
      <Typography variant="bodyLg" sx={{ fontStyle: "italic", width: "100%" }}>
        Une&nbsp;question&nbsp;? {emphasis ? "N'hésitez\u00A0plus... " : ""}
        <br />
        Je&nbsp;serais{emphasis ? " sincèrement\u00A0" : "\u00A0"}
        ravie d'échanger&nbsp;avec&nbsp;vous&nbsp;!
      </Typography>
      <Button
        size="large"
        color="inherit"
        sx={{
          marginTop: 9,
          margin: "auto",
          whiteSpace: "nowrap",
        }}
        component="a"
        href="mailto:hello@onoko.dev"
      >
        Me contacter
      </Button>
    </ResponsiveStack>
  );
}
