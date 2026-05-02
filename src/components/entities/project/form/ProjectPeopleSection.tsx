import { TextField, Typography } from "@mui/material";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import MediaPicker from "../../media/MediaPicker";
import type { Media } from "../../../../types/entities/mediaTypes";
import { extractId } from "../../../../utils/normalizeRef";
import type { ProjectSectionProps } from "../../../../types/entities/projectTypes";

interface Props extends ProjectSectionProps {
  medias: Media[];
}

export default function ProjectPeopleSection({
  editingProject,
  setEditingProject,
  initialProject,
  setHasChanges,
  medias,
}: Props) {
  return (
    <>
      {/* Client */}
      <ResponsiveStack rowGap={3}>
        <Typography variant="h6" component="h3">
          Client
        </Typography>
        <MediaPicker
          labels={{ singular: "un logo", plural: "des logos" }}
          initialImages={
            editingProject?.client?.logo
              ? (medias.filter(
                  (m) => m.id === extractId(editingProject.client?.logo),
                ) ?? [])
              : []
          }
          onChange={(value) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    client: {
                      label: prev.client?.label ?? "",
                      ...prev.client,
                      logo: value,
                    },
                  }
                : null,
            );
            value !== (initialProject?.client?.logo || "") &&
              setHasChanges(true);
          }}
        />
        <TextField
          label="Label"
          value={editingProject?.client?.label || ""}
          onChange={(e) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    client: {
                      logo: prev.client?.logo ?? "",
                      ...prev.client,
                      label: e.target.value,
                    },
                  }
                : null,
            );
            e.target.value !== (initialProject?.client?.label || "") &&
              setHasChanges(true);
          }}
        />
      </ResponsiveStack>

      {/* Responsable */}
      <ResponsiveStack rowGap={3}>
        <Typography variant="h6" component="h3">
          Responsable
        </Typography>
        <ResponsiveStack
          sx={{ flexDirection: "row", columnGap: 2, alignItems: "center" }}
        >
          <TextField
            label="Nom"
            value={editingProject?.manager?.name || ""}
            onChange={(e) => {
              setEditingProject((prev) =>
                prev
                  ? {
                      ...prev,
                      manager: {
                        email: prev.manager?.email ?? "",
                        ...prev.manager,
                        name: e.target.value,
                      },
                    }
                  : null,
              );
              e.target.value !== (initialProject?.manager?.name || "") &&
                setHasChanges(true);
            }}
          />
          <TextField
            label="Email"
            value={editingProject?.manager?.email || ""}
            onChange={(e) => {
              setEditingProject((prev) =>
                prev
                  ? {
                      ...prev,
                      manager: {
                        name: prev.manager?.name ?? "",
                        ...prev.manager,
                        email: e.target.value,
                      },
                    }
                  : null,
              );
              e.target.value !== (initialProject?.manager?.email || "") &&
                setHasChanges(true);
            }}
          />
        </ResponsiveStack>
      </ResponsiveStack>
    </>
  );
}
