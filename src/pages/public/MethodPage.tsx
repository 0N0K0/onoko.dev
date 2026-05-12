import { Typography } from "@mui/material";
import Layout from "../../layout";
import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import useStacks from "../../hooks/queries/useStacks";
import Picture from "../../components/custom/Picture";
import useCategories from "../../hooks/queries/useCategories";
import StickyMenuBar from "../../components/custom/StickyMenuBar";
import CallToAction from "../../components/CallToAction";
import { useMemo, useState } from "react";

import MultipleMarquee from "../../components/custom/MultipleMarquee";
import MethodWorkflowsSection from "../../components/method/MethodWorkflowsSection";
import MethodProjectManagementSection from "../../components/method/MethodProjectManagementSection";
import MethodDesignSection from "../../components/method/MethodDesignSection";
import MethodUXSection from "../../components/method/MethodUXSection";
import MethodDevSection from "../../components/method/MethodDevSection";
import MethodIAInfraSection from "../../components/method/MethodIAInfraSection";
import MethodWorkspaceSection from "../../components/method/MethodWorkSpaceSection";
import MethodContractSection from "../../components/method/MethodContractSection";

export default function MethodPage() {
  const { stacks } = useStacks();
  const { categories } = useCategories();

  const [stackShuffleSeed] = useState(() => Math.random().toString(36));

  const shuffledStacks = useMemo(() => {
    const hashWithSeed = (value: string) => {
      const input = `${stackShuffleSeed}:${value}`;
      let hash = 2166136261;
      for (let i = 0; i < input.length; i++) {
        hash ^= input.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
      }
      return hash >>> 0;
    };

    return [...stacks].sort(
      (a, b) => hashWithSeed(String(a.id)) - hashWithSeed(String(b.id)),
    );
  }, [stacks, stackShuffleSeed]);

  return (
    <>
      <StickyMenuBar
        sections={[
          { id: "workflow", label: "Cycle de production" },
          { id: "project-management", label: "Gestion de projet" },
          { id: "design", label: "Design" },
          { id: "ux", label: "Expérience utilisateur" },
          { id: "dev", label: "Développement" },
          { id: "ia", label: "IA" },
          { id: "infra", label: "Infrastructure" },
          { id: "workspace", label: "Environnement de travail" },
          { id: "contract", label: "Cadre contractuel" },
        ]}
      />
      <Layout.Content
        sx={{
          rowGap: 12,
          paddingX: { xs: 4, lg: 8 },
          paddingTop: 6,
          paddingBottom: 0,
        }}
      >
        {/* Header */}
        <ResponsiveStack rowGap={3}>
          <Typography
            variant="h1"
            sx={{ fontWeight: "100", textTransform: "uppercase" }}
          >
            Dans la pratique
          </Typography>
          <Typography variant="bodyMd">
            Cette charte rassemble les intentions, les principes et les
            exigences qui structurent ma manière d’aborder chaque projet -
            envisagé comme un produit à part entière aux enjeux réels et pensé
            pour être exploitable dans le temps.
          </Typography>
        </ResponsiveStack>

        <MethodWorkflowsSection />
        <MethodProjectManagementSection stacks={stacks} />
        <MethodDesignSection stacks={stacks} />
        <MethodUXSection />
        <MethodDevSection stacks={stacks} categories={categories} />
        <MethodIAInfraSection stacks={stacks} />
        <MethodWorkspaceSection stacks={stacks} categories={categories} />
        <MethodContractSection />

        {/* Footer */}
        <ResponsiveStack rowGap={3}>
          <MultipleMarquee
            autoFill
            speed={25}
            distribute
            sx={{ marginX: { xs: "-32px", lg: "-64px" } }}
          >
            {shuffledStacks
              .filter((stack) => !!stack.icon)
              .map((stack) => (
                <Picture
                  key={stack.id}
                  image={stack.icon!}
                  maxWidth="48px"
                  maxHeight="48px"
                  style={{
                    width: "48px",
                    height: "48px",
                    aspectRatio: "1 / 1",
                    marginRight: "16px",
                  }}
                />
              ))}
          </MultipleMarquee>
          <CallToAction
            emphasis
            sx={{
              marginX: { xs: "-32px", lg: "-64px" },
              width: { xs: "calc(100% + 64px)", lg: "calc(100% + 128px)" },
            }}
          />
        </ResponsiveStack>
      </Layout.Content>
    </>
  );
}
