import Layout from "../../layout";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import TestimoniesSection from "../../components/about/TestimoniesSection";
import MainProfileSection from "../../components/about/MainProfileSection";
import ComplementaryProfileSection from "../../components/about/ComplementaryProfileSection";
import { useBreakpoints } from "../../hooks/mediaQueries";
import MainAboutContent from "../../components/about/MainAboutContent";

export default function AboutPage() {
  const { isLg } = useBreakpoints();

  return (
    <Layout.Content
      rowGap={18}
      sx={{ paddingX: "0 !important", paddingBottom: 12 }}
    >
      <ResponsiveStack
        rowGap={9}
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          paddingX: { xs: 4, lg: 8 },
          columnGap: { xs: 4, lg: 8 },
          marginX: "auto !important",
        }}
      >
        {!isLg && <MainProfileSection />}
        <MainAboutContent />
        {!isLg && <ComplementaryProfileSection />}

        {isLg && (
          <ResponsiveStack
            component="aside"
            rowGap={6}
            sx={{
              width: "fit-content",
              alignItems: "center",
            }}
          >
            <MainProfileSection />
            <ComplementaryProfileSection />
          </ResponsiveStack>
        )}
      </ResponsiveStack>

      <TestimoniesSection />
    </Layout.Content>
  );
}
