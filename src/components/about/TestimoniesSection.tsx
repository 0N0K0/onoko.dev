import Masonry from "@mui/lab/Masonry";
import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import { WysiwygBox } from "../custom/WysiwygBox";
import useTestimonies from "../../hooks/queries/useTestimonies";
import StretchyTypography from "../custom/StretchyTypography";
import type { Testimony } from "../../types/entities/testimonyTypes";
import { useRef } from "react";

function TestimonyCard({ testimony }: { testimony: Testimony }) {
  const theme = useTheme();

  const testimonyRef = useRef<HTMLDivElement>(null);

  return (
    <Card
      key={testimony.id}
      sx={{
        background: `linear-gradient(rgba(11, 12, 14, 0.9), ${theme.palette.background.paper}) padding-box, linear-gradient(180deg, ${theme.palette.background.paper}, ${theme.palette.primary.dark}) border-box`,
        borderRadius: "0 0 8px 8px",
        border: `1px solid transparent`,
        zIndex: 2,
        padding: "0px 32px 36px",
        height: "fit-content",
      }}
    >
      <CardContent
        ref={testimonyRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: 6,
          padding: "0",
        }}
      >
        <ResponsiveStack sx={{ marginBottom: "auto !important" }}>
          <StretchyTypography
            variant="h1"
            component="h2"
            fontSize={64}
            containerRef={testimonyRef}
            sx={{
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
              textAlign: "right",
            }}
          >
            {testimony.name}
          </StretchyTypography>
          <ResponsiveStack
            sx={{
              flexDirection: "row",
              columnGap: 2,
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="bodyLg"
              sx={{
                fontStyle: "italic",
                fontWeight: "100",
                color: theme.palette.text.secondary,
                textAlign: "right",
                width: "100%",
              }}
            >
              {testimony.createdAt
                ? testimony.createdAt.locale("fr").format("MMMM YYYY")
                : ""}
            </Typography>
          </ResponsiveStack>
        </ResponsiveStack>
        <WysiwygBox __html={testimony.content!} />
      </CardContent>
    </Card>
  );
}

export default function TestimoniesSection() {
  const theme = useTheme();

  const { testimonies } = useTestimonies();

  return (
    <ResponsiveStack rowGap={9} sx={{ paddingX: { xs: 4, lg: 8 } }}>
      <Typography
        variant="h1"
        component="h2"
        sx={{
          fontWeight: "100",
          textAlign: "center",
          color: theme.palette.text.secondary,
        }}
      >
        Échos croisés
      </Typography>
      <Masonry
        columns={{ xs: 1, sm: 2, lg: 3 }}
        spacing={4}
        sx={{ width: "calc(100% + 32px)" }}
      >
        {testimonies.map((testimony) => (
          <TestimonyCard key={testimony.id} testimony={testimony} />
        ))}
      </Masonry>
    </ResponsiveStack>
  );
}
