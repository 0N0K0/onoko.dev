import { Button } from "@mui/material";
import CustomDialog from "../../../custom/CustomDialog";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import type {
  Project,
  ProjectFormDialogProps,
} from "../../../../types/entities/projectTypes";
import useFormDialog from "../../../../hooks/useFormDialog";
import useCategories from "../../../../hooks/queries/useCategories";
import useRoles from "../../../../hooks/queries/useRoles";
import useCoworkers from "../../../../hooks/queries/useCoworkers";
import useStacks from "../../../../hooks/queries/useStacks";
import useMedias from "../../../../hooks/queries/useMedias";
import { extractId, extractIds } from "../../../../utils/normalizeRef";
import ProjectBasicSection from "./ProjectBasicSection";
import ProjectLinksSection from "./ProjectLinksSection";
import ProjectPeopleSection from "./ProjectPeopleSection";
import ProjectContentSection from "./ProjectContentSection";
import ProjectOrganizationSection from "./ProjectOrganizationSection";
import ProjectKpisFeedbackSection from "./ProjectKpisFeedbackSection";

export default function ProjectFormDialog({
  open,
  setOpen,
  projects,
  handleAdd,
  handleEdit,
  submitting,
}: ProjectFormDialogProps) {
  const {
    initialItem: initialProject,
    editingItem: editingProject,
    setEditingItem: setEditingProject,
    hasChanges,
    setHasChanges,
  } = useFormDialog<Project>({
    open,
    items: projects,
    defaults: {
      label: "",
      thumbnail: "",
      categories: [],
      website: { url: "", label: "" },
      mockup: { url: "", label: "", images: [] },
      client: { label: "", logo: "" },
      manager: { name: "", email: "" },
      startDate: undefined,
      endDate: undefined,
      intro: { context: "", objective: "", client: "" },
      presentation: { description: "", issue: "", audience: "" },
      need: {
        features: "",
        functionalConstraints: "",
        technicalConstraints: "",
      },
      organization: {
        workload: "",
        anticipation: "",
        methodology: "",
        evolution: "",
        validation: "",
      },
      roles: [],
      coworkers: [],
      stacks: [],
      kpis: { issues: 0, points: 0, commits: 0, pullRequests: 0 },
      feedback: { general: "", client: "" },
    },
  });

  const { categories } = useCategories();
  const { roles } = useRoles();
  const { coworkers } = useCoworkers();
  const { stacks } = useStacks();
  const { medias } = useMedias();

  const sectionProps = {
    editingProject,
    setEditingProject,
    initialProject,
    setHasChanges,
  };

  const handleSubmit = () => {
    if (!editingProject) return;

    const stripTypename = (obj: unknown): unknown => {
      if (Array.isArray(obj)) return obj.map(stripTypename);
      if (obj && typeof obj === "object") {
        const { __typename, ...rest } = obj as Record<string, unknown>;
        void __typename;
        return Object.fromEntries(
          Object.entries(rest).map(([k, v]) => [k, stripTypename(v)]),
        );
      }
      return obj;
    };

    const input = {
      ...(stripTypename(editingProject) as Record<string, unknown>),
      categories: extractIds(editingProject.categories),
      roles: extractIds(editingProject.roles),
      thumbnail: extractId(editingProject.thumbnail),
      client: editingProject.client
        ? {
            ...(stripTypename(editingProject.client) as object),
            logo: extractId(editingProject.client.logo),
          }
        : undefined,
      coworkers: (editingProject.coworkers ?? []).map((c) => ({
        id: extractId(c.id ?? c),
        roles: extractIds(c.roles),
      })),
      stacks: (editingProject.stacks ?? []).map((s) => ({
        id: s.id,
        version: s.version,
        section: s.section,
      })),
      mockup: editingProject.mockup
        ? {
            ...(stripTypename(editingProject.mockup) as object),
            images: (editingProject.mockup.images ?? []).map((img) => ({
              id: extractId(img),
              position: (img as { position?: number }).position,
            })),
          }
        : undefined,
      startDate: editingProject.startDate?.toISOString(),
      endDate: editingProject.endDate?.toISOString(),
    };
    delete (input as Record<string, unknown>).id;

    if (typeof open === "string" && editingProject.id) {
      handleEdit({ variables: { id: open, input } });
    } else {
      handleAdd({ variables: { input } });
    }
  };

  return (
    <CustomDialog
      key="formDialog"
      open={!!open}
      onClose={() => setOpen(false)}
      title={`${typeof open === "string" ? "Modifier le" : "Ajouter un"} projet`}
      content={
        <ResponsiveStack rowGap={3} sx={{ overflow: "visible" }}>
          <ProjectBasicSection
            {...sectionProps}
            categories={categories}
            medias={medias}
          />
          <ProjectLinksSection {...sectionProps} />
          <ProjectPeopleSection {...sectionProps} medias={medias} />
          <ProjectContentSection {...sectionProps} />
          <ProjectOrganizationSection
            {...sectionProps}
            roles={roles}
            coworkers={coworkers}
            stacks={stacks}
          />
          <ProjectKpisFeedbackSection {...sectionProps} />
        </ResponsiveStack>
      }
      actions={[
        <Button
          key="cancel"
          onClick={() => setOpen(false)}
          disabled={submitting}
          startIcon={<Icon path={mdiClose} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          Annuler
        </Button>,
        <Button
          key="confirm"
          color="success"
          onClick={handleSubmit}
          disabled={submitting || !hasChanges || !editingProject?.label}
          startIcon={<Icon path={mdiCheck} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          {typeof open === "string" ? "Modifier" : "Ajouter"}
        </Button>,
      ]}
      width={12}
    />
  );
}
