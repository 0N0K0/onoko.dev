import { TextField } from "@mui/material";
import { ResponsiveStack } from "../../custom/ResponsiveLayout";
import ResponsiveTitle from "../../custom/ResponsiveTitle";
import MediaPicker from "../media/MediaPicker";
import type { Media } from "../../../types/entities/mediaTypes";
import { extractIds } from "../../../utils/normalizeRef";
import type { ProjectSectionProps } from "../../../types/entities/projectTypes";

interface Props extends ProjectSectionProps {
  medias: Media[];
}

export default function ProjectLinksSection({
  editingProject,
  setEditingProject,
  initialProject,
  setHasChanges,
  medias,
}: Props) {
  return (
    <>
      {/* Site internet */}
      <ResponsiveStack rowGap={3}>
        <ResponsiveTitle variant="h6" component="h3">
          Site internet
        </ResponsiveTitle>
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
            value={editingProject?.website?.label || ""}
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
        <ResponsiveTitle variant="h6" component="h3">
          Maquette
        </ResponsiveTitle>
        <MediaPicker
          labels={{
            singular: "une image de maquette",
            plural: "des images de maquette",
          }}
          multiple
          initialImages={(() => {
            const images = editingProject?.mockup?.images;
            if (!images?.length) return [];
            const ids = new Set(extractIds(images));
            return medias.filter((m) => ids.has(m.id));
          })()}
          onChange={(value) => {
            const newIds = value ? value.split(",").filter(Boolean) : [];
            const existingMedia = (editingProject?.mockup?.images ?? []).filter(
              (i): i is Media => "path" in i,
            );
            const merged = newIds.map((id, position) => {
              const full = existingMedia.find((m) => m.id === id);
              return full ? full : { id, position };
            });
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    mockup: {
                      url: prev.mockup?.url ?? "",
                      label: prev.mockup?.label ?? "",
                      ...prev.mockup,
                      images: merged,
                    },
                  }
                : null,
            );
            const initialIds = (initialProject?.mockup?.images ?? [])
              .map((i) => i.id)
              .sort()
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
            value={editingProject?.mockup?.label || ""}
            onChange={(e) => {
              setEditingProject((prev) =>
                prev
                  ? {
                      ...prev,
                      mockup: {
                        url: prev.mockup?.url ?? "",
                        images: prev.mockup?.images ?? [],
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
      </ResponsiveStack>
    </>
  );
}
