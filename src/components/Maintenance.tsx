import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveStack } from "./custom/ResponsiveLayout";
import superDuckSrc from "../assets/images/SuperDuck-transparent.png";

export default function Maintenance() {
  const maintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  const theme = useTheme();

  if (!maintenanceMode) return null;

  return (
    <ResponsiveStack
      sx={{
        flexDirection: "row",
        maxHeight: "calc(100dvh - 144px)",
        height: "min-content",
        padding: {
          xs: "3rem 0 3rem 2rem !important",
          lg: "3rem 0 3rem 4rem !important",
        },
        alignItems: "stretch",
        marginY: "auto !important",
        marginX: { xs: 4, lg: 8 },
        justifyContent: "space-around",
        columnGap: 4,
        "@media (orientation: portrait)": {
          flexDirection: "column-reverse",
          padding: {
            xs: "0 2rem 3rem 2rem !important",
            lg: "0 4rem 3rem 4rem !important",
          },
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
          },
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: "700" }}>
          Mon&nbsp;site est&nbsp;en maintenance
        </Typography>
        <ResponsiveStack rowGap={3}>
          <Typography variant="bodyLg">
            Je&nbsp;fais tout mon&nbsp;possible pour&nbsp;le&nbsp;remettre
            en&nbsp;ligne rapidement.
          </Typography>
          <Typography variant="bodyLg">
            Merci de votre&nbsp;patience.
          </Typography>
        </ResponsiveStack>
      </ResponsiveStack>
      <Box
        sx={{
          flex: "0 1 600px",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          backgroundImage: `url(${superDuckSrc})`,
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          marginTop: "3rem",
          marginBottom: "-3rem",
          "@media (orientation: portrait)": {
            flex: "0 1 auto",
            marginLeft: "5%",
            marginRight: "-5%",
            marginY: "0",
          },
        }}
      />
    </ResponsiveStack>
  );
}
