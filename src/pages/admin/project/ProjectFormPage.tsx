import { useSearchParams } from "react-router-dom";
import useProjectMutations from "../../../hooks/mutations/useProjectMutations";
import { useProject } from "../../../hooks/useProject";
import { useState } from "react";
import ResponsiveTitle from "../../../components/custom/ResponsiveTitle";
import { ResponsiveStack } from "../../../components/custom/ResponsiveLayout";
import { TextField } from "@mui/material";
import type { Project } from "../../../types/entities/projectTypes";
import CustomSelect from "../../../components/custom/CustomSelect";
import type { Category } from "../../../types/entities/categoryTypes";
import { useCategory } from "../../../hooks/useCategory";

export default function ProjectForm() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";

  const { projects, setProjects } = useProject();
  const { categories } = useCategory();

  const initialProject = projects?.find((p) => p.id === id) || null;
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(
    id
      ? initialProject
      : {
          label: "",
          thumbnailFile: null,
          categories: [],
          website: { url: "", label: "" },
          mockup: { url: "", label: "", imagesFiles: [] },
          client: { label: "", logoFile: null },
          manager: { name: "", email: "" },
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
  );
  const [hasChanges, setHasChanges] = useState(false);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  const { handleAdd, handleEdit } = useProjectMutations({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setProjects,
  });

  const handleDropThumbnail = (files: File[]) => {
    if (files && files.length > 0) {
      setEditingProject(
        editingProject ? { ...editingProject, thumbnailFile: files[0] } : null,
      );
      setHasChanges(true);
    }
  };

  return (
    <>
      <ResponsiveTitle variant="h1">
        {id ? "Modifier le projet" : "Ajouter un projet"}
      </ResponsiveTitle>
      <ResponsiveStack rowGap={3} style={{ overflow: "visible" }}>
        <TextField
          label="Label"
          value={editingProject?.label || ""}
          onChange={(e) => {
            setEditingProject(
              editingProject
                ? { ...editingProject, label: e.target.value }
                : null,
            );
            setHasChanges(e.target.value !== (initialProject?.label || ""));
          }}
          required
        />
        <CustomSelect
          label="Catégories"
          labelId="categories-label"
          value={
            editingProject?.categories?.map((c) =>
              typeof c === "string" ? c : (c as Category).id,
            ) || []
          }
          onChange={(e) => {
            const value = Array.isArray(e.target.value)
              ? e.target.value
              : [e.target.value];
            setEditingProject(
              editingProject ? { ...editingProject, categories: value } : null,
            );
            const initial = Array.isArray(initialProject?.categories)
              ? initialProject.categories
              : [];
            const changed = JSON.stringify(value) !== JSON.stringify(initial);
            changed && setHasChanges(true);
          }}
          options={
            categories?.map((c: Category) => ({
              id: c.id,
              label: c.label,
            })) || []
          }
        />
        <ResponsiveStack direction="row" columnGap={2} component="fieldset">
          <legend>Site web</legend>
          <TextField
            label="URL"
            value={editingProject?.website?.url || ""}
            onChange={(e) => {
              setEditingProject(
                editingProject
                  ? {
                      ...editingProject,
                      website: {
                        url: e.target.value,
                        label: editingProject.website?.label || "",
                      },
                    }
                  : null,
              );
              setHasChanges(
                e.target.value !== (initialProject?.website?.url || ""),
              );
            }}
          />
          <TextField
            label="Label"
            value={editingProject?.website?.label || ""}
            onChange={(e) => {
              setEditingProject(
                editingProject
                  ? {
                      ...editingProject,
                      website: {
                        url: editingProject.website?.url || "",
                        label: e.target.value,
                      },
                    }
                  : null,
              );
              setHasChanges(
                e.target.value !== (initialProject?.website?.label || ""),
              );
            }}
          />
        </ResponsiveStack>
      </ResponsiveStack>
    </>
  );
}
