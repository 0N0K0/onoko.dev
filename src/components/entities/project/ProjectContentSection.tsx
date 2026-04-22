import type { ProjectSectionProps } from "../../../types/entities/projectTypes";
import { ResponsiveStack } from "../../custom/ResponsiveLayout";
import ResponsiveTitle from "../../custom/ResponsiveTitle";
import WysiwygField from "../../custom/WysiwygField";

export default function ProjectContentSection({
  editingProject,
  setEditingProject,
  initialProject,
  setHasChanges,
}: ProjectSectionProps) {
  return (
    <>
      {/* Introduction */}
      <ResponsiveStack rowGap={3}>
        <ResponsiveTitle variant="h6" component="h3">
          Introduction
        </ResponsiveTitle>
        <WysiwygField
          label="Contexte"
          value={editingProject?.intro?.context || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev ? { ...prev, intro: { ...prev.intro, context: val } } : null,
            );
            val !== (initialProject?.intro?.context || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Objectif"
          value={editingProject?.intro?.objective || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? { ...prev, intro: { ...prev.intro, objective: val } }
                : null,
            );
            val !== (initialProject?.intro?.objective || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Client"
          value={editingProject?.intro?.client || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev ? { ...prev, intro: { ...prev.intro, client: val } } : null,
            );
            val !== (initialProject?.intro?.client || "") &&
              setHasChanges(true);
          }}
        />
      </ResponsiveStack>

      {/* Présentation */}
      <ResponsiveStack rowGap={3}>
        <ResponsiveTitle variant="h6" component="h3">
          Présentation
        </ResponsiveTitle>
        <WysiwygField
          label="Description"
          value={editingProject?.presentation?.description || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    presentation: { ...prev.presentation, description: val },
                  }
                : null,
            );
            val !== (initialProject?.presentation?.description || "") &&
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
        <ResponsiveTitle variant="h6" component="h3">
          Analyse du besoin
        </ResponsiveTitle>
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
