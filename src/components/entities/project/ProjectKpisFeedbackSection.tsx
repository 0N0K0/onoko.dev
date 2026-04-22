import { TextField } from "@mui/material";
import { ResponsiveStack } from "../../custom/ResponsiveLayout";
import ResponsiveTitle from "../../custom/ResponsiveTitle";
import WysiwygField from "../../custom/WysiwygField";
import type { ProjectSectionProps } from "../../../types/entities/projectTypes";

export default function ProjectKpisFeedbackSection({
  editingProject,
  setEditingProject,
  initialProject,
  setHasChanges,
}: ProjectSectionProps) {
  return (
    <>
      {/* KPIs */}
      <ResponsiveStack rowGap={3}>
        <ResponsiveTitle variant="h6" component="h3">
          KPIs
        </ResponsiveTitle>
        <ResponsiveStack
          sx={{ flexDirection: "row", columnGap: 2, alignItems: "center" }}
        >
          {(
            [
              { key: "issues", label: "Taches" },
              { key: "points", label: "Points" },
              { key: "commits", label: "Commits" },
              { key: "pullRequests", label: "Pull requests" },
            ] as const
          ).map(({ key, label }) => (
            <TextField
              key={key}
              label={label}
              type="number"
              value={editingProject?.kpis?.[key] ?? 0}
              onChange={(e) => {
                const newValue = parseInt(e.target.value, 10) || 0;
                setEditingProject((prev) =>
                  prev
                    ? { ...prev, kpis: { ...prev.kpis, [key]: newValue } }
                    : null,
                );
                newValue !== (initialProject?.kpis?.[key] ?? 0) &&
                  setHasChanges(true);
              }}
            />
          ))}
        </ResponsiveStack>
      </ResponsiveStack>

      {/* Retours */}
      <ResponsiveStack rowGap={3}>
        <ResponsiveTitle variant="h6" component="h3">
          Retours
        </ResponsiveTitle>
        <WysiwygField
          label="Général"
          value={editingProject?.feedback?.general || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? { ...prev, feedback: { ...prev.feedback, general: val } }
                : null,
            );
            val !== (initialProject?.feedback?.general || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Client"
          value={editingProject?.feedback?.client || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? { ...prev, feedback: { ...prev.feedback, client: val } }
                : null,
            );
            val !== (initialProject?.feedback?.client || "") &&
              setHasChanges(true);
          }}
        />
      </ResponsiveStack>
    </>
  );
}
