import { Box, Button, Typography, useTheme } from "@mui/material";
import notFoundSrc from "../assets/images/not-found.jpg";
import { ResponsiveStack } from "../components/custom/ResponsiveLayout";

export default function NotFound() {
  const maintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  const theme = useTheme();

  if (!maintenanceMode) return null;

  return (
    <ResponsiveStack
      rowGap={6}
      sx={{
        flexDirection: "row",
        maxHeight: "calc(100dvh - 144px)",
        height: "min-content",
        padding: {
          xs: "3rem 2rem 3rem 2rem !important",
          lg: "3rem 4rem 3rem 4rem !important",
        },
        alignItems: "stretch",
        marginY: "auto !important",
        marginX: { xs: 4, lg: 8 },
        justifyContent: "space-around",
        columnGap: 4,
        "@media (orientation: portrait)": {
          flexDirection: "column-reverse",
        },
        backgroundImage: `linear-gradient(225deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1))`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <ResponsiveStack
        rowGap={6}
        sx={{
          flex: 1,
          maxWidth: "fit-content",
          justifyContent: "center",
          "@media (orientation: portrait)": {
            flex: "none",
            maxWidth: "100%",
          },
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: "700" }}>
          Erratum&nbsp;404
        </Typography>
        <ResponsiveStack rowGap={3}>
          <Typography variant="bodyLg">Il y a un quack !</Typography>
          <Typography variant="bodyLg">
            La page que vous cherchez n'existe pas.
          </Typography>
        </ResponsiveStack>
        <Button size="large" color="primary" href="/" sx={{ marginX: "auto" }}>
          Sortir la tête de l'eau
        </Button>
      </ResponsiveStack>
      <Box
        sx={{
          flex: "0 1 600px",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          backgroundImage: `url(${notFoundSrc})`,
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          "@media (orientation: portrait)": {
            flex: "0 1 auto",
          },
        }}
      />
    </ResponsiveStack>
  );
}
