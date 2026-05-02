import { Typography } from "@mui/material";
import type { ProjectSectionProps } from "../../../../types/entities/projectTypes";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import WysiwygField from "../../../custom/WysiwygField";

export default function ProjectContentSection({
  editingProject,
  setEditingProject,
  initialProject,
  setHasChanges,
}: ProjectSectionProps) {
  return (
    <>
      {/* Introduction */}
      <WysiwygField
        label="Introduction"
        value={editingProject?.intro || ""}
        onChange={(val) => {
          setEditingProject((prev) => (prev ? { ...prev, intro: val } : null));
          val !== (initialProject?.intro || "") && setHasChanges(true);
        }}
      />

      {/* Présentation */}
      <ResponsiveStack rowGap={3}>
        <Typography variant="h6" component="h3">
          Présentation
        </Typography>
        <WysiwygField
          label="Contexte"
          value={editingProject?.presentation?.context || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    presentation: { ...prev.presentation, context: val },
                  }
                : null,
            );
            val !== (initialProject?.presentation?.context || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Client"
          value={editingProject?.presentation?.client || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    presentation: { ...prev.presentation, client: val },
                  }
                : null,
            );
            val !== (initialProject?.presentation?.client || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Finalités et enjeux"
          value={editingProject?.presentation?.issue || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    presentation: { ...prev.presentation, issue: val },
                  }
                : null,
            );
            val !== (initialProject?.presentation?.issue || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Utilisateurs cibles"
          value={editingProject?.presentation?.audience || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    presentation: { ...prev.presentation, audience: val },
                  }
                : null,
            );
            val !== (initialProject?.presentation?.audience || "") &&
              setHasChanges(true);
          }}
        />
      </ResponsiveStack>

      {/* Besoin */}
      <ResponsiveStack rowGap={3}>
        <Typography variant="h6" component="h3">
          Analyse du besoin
        </Typography>
        <WysiwygField
          label="Fonctionnalités attendues"
          value={editingProject?.need?.features || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev ? { ...prev, need: { ...prev.need, features: val } } : null,
            );
            val !== (initialProject?.need?.features || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Contraintes fonctionnelles"
          value={editingProject?.need?.functionalConstraints || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    need: { ...prev.need, functionalConstraints: val },
                  }
                : null,
            );
            val !== (initialProject?.need?.functionalConstraints || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Contraintes techniques"
          value={editingProject?.need?.technicalConstraints || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    need: { ...prev.need, technicalConstraints: val },
                  }
                : null,
            );
            val !== (initialProject?.need?.technicalConstraints || "") &&
              setHasChanges(true);
          }}
        />
      </ResponsiveStack>
    </>
  );
}
