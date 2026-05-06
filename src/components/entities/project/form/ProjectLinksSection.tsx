import { TextField, Typography } from "@mui/material";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import MediaPicker from "../../media/MediaPicker";
import type { Media } from "../../../../types/entities/mediaTypes";
import type { ProjectSectionProps } from "../../../../types/entities/projectTypes";
import { stripHtml } from "../../../../utils/stringUtils";

export default function ProjectLinksSection({
  editingProject,
  setEditingProject,
  initialProject,
  setHasChanges,
}: ProjectSectionProps) {
  return (
    <>
      {/* Site internet */}
      <ResponsiveStack rowGap={3}>
        <Typography variant="h6" component="h3">
          Site internet
        </Typography>
        <ResponsiveStack
          sx={{ flexDirection: "row", columnGap: 2, alignItems: "center" }}
        >
          <TextField
            label="URL"
            value={editingProject?.website?.url || ""}
            onChange={(e) => {
              setEditingProject((prev) =>
                prev
                  ? {
                      ...prev,
                      website: {
                        label: prev.website?.label ?? "",
                        ...prev.website,
                        url: e.target.value,
                      },
                    }
                  : null,
              );
              e.target.value !== (initialProject?.website?.url || "") &&
                setHasChanges(true);
            }}
          />
          <TextField
            label="Label"
            value={stripHtml(editingProject?.website?.label || "")}
            onChange={(e) => {
              setEditingProject((prev) =>
                prev
                  ? {
                      ...prev,
                      website: {
                        url: prev.website?.url ?? "",
                        ...prev.website,
                        label: e.target.value,
                      },
                    }
                  : null,
              );
              e.target.value !== (initialProject?.website?.label || "") &&
                setHasChanges(true);
            }}
          />
        </ResponsiveStack>
      </ResponsiveStack>

      {/* Maquette */}
      <ResponsiveStack rowGap={3}>
        <Typography variant="h6" component="h3">
          Maquette
        </Typography>
        <MediaPicker
          labels={{
            singular: "une image de maquette",
            plural: "des images de maquette",
          }}
          multiple
          initialImages={(() => {
            const images = editingProject?.mockup?.images;
            return images?.length
              ? images.filter((i): i is Media => "path" in i)
              : [];
          })()}
          onChange={(value) => {
            const newIds = value ? value.split(",").filter(Boolean) : [];
            const existingMedia = (editingProject?.mockup?.images ?? []).filter(
              (i): i is Media => "path" in i,
            );
            const merged = newIds.map((id, position) => {
              const full = existingMedia.find((m) => m.id === id);
              if (full) full.position = position; // Mettre à jour la position
              return full ? full : { id, position };
            });
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    mockup: {
                      url: prev.mockup?.url ?? "",
                      label: prev.mockup?.label ?? "",
                      embed: prev.mockup?.embed ?? "",
                      ...prev.mockup,
                      images: merged,
                    },
                  }
                : null,
            );
            const initialIds = (initialProject?.mockup?.images ?? [])
              .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
              .map((i) => i.id)
              .join(",");
            const newSortedIds = [...newIds].sort().join(",");
            initialIds !== newSortedIds && setHasChanges(true);
          }}
        />
        <ResponsiveStack
          sx={{ flexDirection: "row", columnGap: 2, alignItems: "center" }}
        >
          <TextField
            label="URL"
            value={editingProject?.mockup?.url || ""}
            onChange={(e) => {
              setEditingProject((prev) =>
                prev
                  ? {
                      ...prev,
                      mockup: {
                        label: prev.mockup?.label ?? "",
                        images: prev.mockup?.images ?? [],
                        embed: prev.mockup?.embed ?? "",
                        ...prev.mockup,
                        url: e.target.value,
                      },
                    }
                  : null,
              );
              e.target.value !== (initialProject?.mockup?.url || "") &&
                setHasChanges(true);
            }}
          />
          <TextField
            label="Label"
            value={stripHtml(editingProject?.mockup?.label || "")}
            onChange={(e) => {
              setEditingProject((prev) =>
                prev
                  ? {
                      ...prev,
                      mockup: {
                        url: prev.mockup?.url ?? "",
                        images: prev.mockup?.images ?? [],
                        embed: prev.mockup?.embed ?? "",
                        ...prev.mockup,
                        label: e.target.value,
                      },
                    }
                  : null,
              );
              e.target.value !== (initialProject?.mockup?.label || "") &&
                setHasChanges(true);
            }}
          />
        </ResponsiveStack>
        <TextField
          label="Embed URL"
          value={editingProject?.mockup?.embed || ""}
          onChange={(e) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    mockup: {
                      url: prev.mockup?.url ?? "",
                      label: prev.mockup?.label ?? "",
                      images: prev.mockup?.images ?? [],
                      ...prev.mockup,
                      embed: e.target.value,
                    },
                  }
                : null,
            );
            e.target.value !== (initialProject?.mockup?.embed || "") &&
              setHasChanges(true);
          }}
        />
      </ResponsiveStack>
    </>
  );
}
