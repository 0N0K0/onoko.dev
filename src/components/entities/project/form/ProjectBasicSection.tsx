import { TextField } from "@mui/material";
import MediaPicker from "../../media/MediaPicker";
import CustomSelect from "../../../custom/CustomSelect";
import type { Category } from "../../../../types/entities/categoryTypes";
import type { Media } from "../../../../types/entities/mediaTypes";
import { extractId, extractIds } from "../../../../utils/normalizeRef";
import { getMultiSelectValue } from "../../../../utils/normalizeRef";
import type { ProjectSectionProps } from "../../../../types/entities/projectTypes";
import { slugify } from "../../../../utils/urlUtils";
import useProjects from "../../../../hooks/queries/useProjects";

interface Props extends ProjectSectionProps {
  categories: Category[];
  medias: Media[];
}

export default function ProjectBasicSection({
  editingProject,
  setEditingProject,
  initialProject,
  setHasChanges,
  categories,
  medias,
}: Props) {
  const { projects } = useProjects();
  return (
    <>
      <MediaPicker
        labels={{ singular: "une miniature", plural: "des miniatures" }}
        initialImages={
          editingProject?.thumbnail
            ? (medias.filter(
                (m) => m.id === extractId(editingProject.thumbnail),
              ) ?? [])
            : []
        }
        onChange={(value) => {
          setEditingProject((prev) =>
            prev ? { ...prev, thumbnail: value } : prev,
          );
          value !== (initialProject?.thumbnail || "") && setHasChanges(true);
        }}
      />
      <TextField
        label="Label"
        value={editingProject?.label || ""}
        onChange={(e) => {
          setEditingProject((prev) =>
            prev
              ? {
                  ...prev,
                  label: e.target.value,
                  slug:
                    e.target.value && !editingProject?.slug
                      ? slugify(e.target.value)
                      : editingProject?.slug,
                }
              : null,
          );
          e.target.value !== (initialProject?.label || "") &&
            setHasChanges(true);
        }}
        required
      />
      <TextField
        label="Slug"
        value={editingProject?.slug || ""}
        onChange={(e) => {
          setEditingProject((prev) =>
            prev ? { ...prev, slug: e.target.value } : null,
          );
          e.target.value !== (initialProject?.slug || "") &&
            setHasChanges(true);
        }}
        error={projects?.some(
          (p) => p.slug === editingProject?.slug && p.id !== editingProject.id,
        )}
        helperText={
          projects?.some(
            (p) =>
              p.slug === editingProject?.slug && p.id !== editingProject.id,
          )
            ? "Ce slug est déjà utilisé par un autre projet."
            : ""
        }
        required
      />
      <CustomSelect
        label="Catégories"
        labelId="categories-label"
        value={extractIds(editingProject?.categories)}
        onChange={(e) => {
          const value = getMultiSelectValue(e);
          setEditingProject((prev) =>
            prev ? { ...prev, categories: value } : prev,
          );
          const initial = extractIds(initialProject?.categories);
          JSON.stringify([...initial].sort()) !==
            JSON.stringify([...value].sort()) && setHasChanges(true);
        }}
        options={categories
          .filter((c) => c.entity === "project")
          .map((c) => ({
            id: c.id,
            label: c.depth ? "__".repeat(c.depth) + ` ${c.label}` : c.label,
          }))}
      />
    </>
  );
}
